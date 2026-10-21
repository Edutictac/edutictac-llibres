<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { publicationRequest } from "/publication.js";
import { messages } from "/i18n.js";
import ReviewCard from "./ReviewCard.vue";

const props = defineProps({
  locale: String,
  action: Function,
  notice: Function,
});
const t = (key) => messages[props.locale][key] || key;
const states = {
  pending: "reviewPending",
  returned: "reviewReturned",
  approved: "reviewApproved",
  cancelled: "reviewCancelled",
};
const queue = ref(null),
  detail = ref(null),
  statusElement = ref(null);
const items = ref([]),
  selected = ref(null),
  showAll = ref(false);
const needsLogin = ref(false),
  more = ref(false),
  busy = ref(false);
const status = ref(""),
  feedback = ref(""),
  comment = ref(""),
  confirmed = ref(false);
let offset = 0,
  serial = 0;
const loginURL = computed(
  () =>
    "/api/auth/oidc/login?next=" +
    encodeURIComponent("/llibres-login.html?lang=" + props.locale),
);
const pending = computed(() => selected.value?.status === "pending");
const preview = computed(() => {
  const item = selected.value;
  if (!item) return undefined;
  if (["pending", "returned"].includes(item.status))
    return `/api/llibres/reviews/${item.id}/files/index.html`;
  if (item.published) return `/api/llibres/public/${item.id}/index.html`;
  return undefined;
});
const errorKey = (error) =>
  t(error.message) === error.message
    ? "publication_unavailable"
    : error.message;

function task(fn) {
  if (busy.value) return;
  return props.action(async () => {
    busy.value = true;
    try {
      return await fn();
    } catch (error) {
      if (detail.value.open) feedback.value = errorKey(error);
      else if (queue.value.open) status.value = errorKey(error);
      throw error;
    } finally {
      busy.value = false;
      // Flush reactive DOM changes before the host removes its busy overlay.
      await nextTick();
    }
  });
}
async function load(append = false) {
  const sequence = ++serial;
  status.value = "loading";
  needsLogin.value = false;
  more.value = false;
  if (!append) {
    offset = 0;
    items.value = [];
  }
  const permission = await publicationRequest("/me");
  if (sequence !== serial || !queue.value.open) return;
  if (!permission.can_review) {
    items.value = [];
    needsLogin.value = true;
    status.value = "reviewsLogin";
    return;
  }
  const result = await publicationRequest(
    "/reviews?" +
      new URLSearchParams({
        offset,
        all: showAll.value ? "1" : "0",
      }),
  );
  if (sequence !== serial || !queue.value.open) return;
  items.value.push(
    ...result.items.filter((item) => /^[a-f0-9]{32}$/.test(item.id)),
  );
  offset += result.items.length;
  more.value = !!result.more;
  status.value = items.value.length ? "" : "reviewsEmpty";
}
function openItem(item) {
  selected.value = item;
  comment.value = item.feedback || "";
  feedback.value = "";
  confirmed.value = false;
  if (!["pending", "returned"].includes(item.status) && !item.published)
    feedback.value = "reviewNoPreview";
  detail.value.showModal();
}
function clearDetail() {
  selected.value = null;
  confirmed.value = false;
  comment.value = "";
  feedback.value = "";
}
function closeDetail() {
  detail.value.close();
  clearDetail();
}
function closeQueue() {
  serial++;
  queue.value.close();
  items.value = [];
}
async function decide(decision) {
  if (!selected.value) return;
  if (decision === "approve" && !confirmed.value)
    throw new Error("reviewPleaseConfirm");
  if (decision === "return" && !comment.value.trim())
    throw new Error("review_feedback_required");
  if (decision === "withdraw" && !confirm(t("reviewWithdrawConfirm"))) return;
  await publicationRequest("/reviews/" + selected.value.id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "If-Match": `"${selected.value.revision}"`,
    },
    body: JSON.stringify({ decision, feedback: comment.value.trim() }),
  });
  closeDetail();
  await load();
  if (!queue.value.open) return;
  status.value =
    decision === "approve"
      ? "reviewApprovedDone"
      : decision === "return"
        ? "reviewReturnedDone"
        : "reviewWithdrawn";
  await nextTick();
  statusElement.value.focus({ preventScroll: true });
  queue.value.scrollTop = 0;
  props.notice(t(status.value));
}
function open() {
  queue.value.showModal();
  task(() => load());
}
function resume() {
  if (
    document.visibilityState !== "hidden" &&
    queue.value.open &&
    needsLogin.value
  )
    task(() => load());
}
onMounted(() => {
  window.addEventListener("focus", resume);
  document.addEventListener("visibilitychange", resume);
});
onUnmounted(() => {
  serial++;
  window.removeEventListener("focus", resume);
  document.removeEventListener("visibilitychange", resume);
});
defineExpose({ open });
</script>

<template>
  <dialog
    id="reviews-dialog"
    ref="queue"
    aria-labelledby="reviews-heading"
    @cancel="
      serial++;
      items = [];
    "
  >
    <div class="dialog-heading">
      <h2 id="reviews-heading">{{ t("reviewBooks") }}</h2>
      <button id="close-reviews" @click="closeQueue">{{ t("close") }}</button>
    </div>
    <p>{{ t("reviewsIntro") }}</p>
    <section id="reviews-login" :hidden="!needsLogin">
      <p>{{ t("reviewsLogin") }}</p>
      <a
        id="reviews-sign-in"
        class="button"
        :href="loginURL"
        target="_blank"
        rel="noopener"
      >
        {{ t("publicationSignIn") }}
      </a>
    </section>
    <div class="actions">
      <button id="refresh-reviews" :disabled="busy" @click="task(() => load())">
        {{ t("refreshReviews") }}
      </button>
      <label
        ><input
          id="reviews-all"
          v-model="showAll"
          :disabled="busy"
          type="checkbox"
          @change="task(() => load())"
        />
        <span>{{ t("reviewedToo") }}</span>
      </label>
    </div>
    <p id="reviews-status" ref="statusElement" role="status" tabindex="-1">
      {{ t(status) }}
    </p>
    <div id="reviews-list" class="books">
      <ReviewCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        :status="t(states[item.status])"
        @open="openItem"
      />
    </div>
    <button
      id="reviews-more"
      :hidden="!more"
      :disabled="busy"
      @click="task(() => load(true))"
    >
      {{ t("moreBooks") }}
    </button>
  </dialog>
  <dialog
    id="review-dialog"
    ref="detail"
    aria-labelledby="review-title"
    @cancel="clearDetail"
  >
    <div class="dialog-heading">
      <h2 id="review-title">{{ selected?.title }}</h2>
      <button id="close-review" :disabled="busy" @click="closeDetail">
        {{ t("close") }}
      </button>
    </div>
    <p id="review-details">
      {{
        selected
          ? [
              selected.author,
              selected.class_name,
              selected.license,
              t(states[selected.status]),
            ].join(" · ")
          : ""
      }}
    </p>
    <p id="review-feedback" role="alert">{{ t(feedback) }}</p>
    <iframe
      id="review-frame"
      :src="preview"
      :title="t('reviewOpen')"
      sandbox="allow-same-origin allow-downloads"
    ></iframe>
    <label class="check"
      ><input
        id="review-confirm"
        v-model="confirmed"
        type="checkbox"
        :disabled="!pending || busy"
      />
      <span>{{ t("reviewConfirm") }}</span>
    </label>
    <label
      ><span>{{ t("reviewComment") }}</span>
      <textarea
        id="review-comment"
        v-model="comment"
        :disabled="busy"
        maxlength="1000"
        rows="3"
      ></textarea>
    </label>
    <div class="actions">
      <button
        id="approve-review"
        class="primary"
        :disabled="!pending || !confirmed || busy"
        @click="task(() => decide('approve'))"
      >
        {{ t("approveReview") }}
      </button>
      <button
        id="return-review"
        :disabled="!pending || busy"
        @click="task(() => decide('return'))"
      >
        {{ t("returnReview") }}
      </button>
      <button
        id="withdraw-review"
        :hidden="!selected?.published"
        :disabled="busy"
        @click="task(() => decide('withdraw'))"
      >
        {{ t("withdrawPublication") }}
      </button>
    </div>
  </dialog>
</template>
