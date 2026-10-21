<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
} from "vue";
import { publicationRequest, safeWebURL } from "/publication.js";
const props = defineProps({ core: Object });
const t = props.core.t,
  dialog = ref(null),
  success = ref(null),
  submissionHeading = ref(null);
const current = shallowRef(null),
  submission = ref(false),
  needsLogin = ref(false),
  ready = ref(false);
const title = ref(""),
  cover = ref(""),
  feedback = ref(""),
  link = ref("");
const successKey = ref("publicationDone"),
  submittedKey = ref("");
const form = reactive({
  author: "",
  description: "",
  license: "CC-BY-SA-4.0",
  editable: false,
  confirmed: false,
});
let path = "",
  serial = 0;
const loginNext = computed(() =>
  encodeURIComponent("/llibres-login.html?lang=" + props.core.state.locale),
);
const states = {
  pending: "reviewPending",
  returned: "reviewReturned",
  approved: "reviewApproved",
  cancelled: "reviewCancelled",
  draft: "reviewDraft",
};
const status = computed(() => current.value?.status || "draft");
const heading = computed(
  () => submittedKey.value || states[status.value] || "reviewDraft",
);
const help = computed(() =>
  status.value === "pending"
    ? current.value?.published
      ? "reviewPendingPublished"
      : "reviewPendingHelp"
    : status.value === "returned"
      ? "reviewReturnedHelp"
      : status.value === "cancelled"
        ? current.value?.published
          ? "reviewCancelledPublished"
          : "reviewCancelledHelp"
        : "submissionIntro",
);
function setCurrent(value) {
  link.value = value.url ? safeWebURL(value.url) : "";
  current.value = value;
  successKey.value = "publicationDone";
  submittedKey.value = "";
}
function task(fn, key = "working") {
  return props.core.action(async () => {
    try {
      return await fn();
    } catch (error) {
      if (dialog.value.open)
        feedback.value =
          t(error.message) === error.message
            ? "publication_unavailable"
            : error.message;
      throw error;
    } finally {
      await nextTick();
    }
  }, key);
}
async function prepare() {
  const sequence = ++serial;
  feedback.value = "";
  needsLogin.value = false;
  ready.value = false;
  current.value = null;
  submission.value = false;
  const permission = await publicationRequest("/me");
  if (sequence !== serial || !dialog.value.open) return;
  submission.value = !permission.can_publish && !!permission.can_submit;
  if (!permission.can_publish && !permission.can_submit) {
    needsLogin.value = true;
    if (
      ["publication_teacher_required", "review_class_required"].includes(
        permission.reason,
      )
    )
      feedback.value = permission.reason;
    return;
  }
  const data = await props.core.publicationData();
  if (sequence !== serial || !dialog.value.open) return;
  // eXe can move focus into its iframe while preparing the cover. Return it
  // to this modal so Escape and keyboard navigation still reach the dialog.
  dialog.value.focus({ preventScroll: true });
  path =
    (submission.value ? "/submissions/" : "/mine/") +
    encodeURIComponent(data.id);
  const value = await publicationRequest(path);
  if (sequence !== serial || !dialog.value.open) return;
  setCurrent(value);
  title.value = data.title;
  Object.assign(form, {
    author: value.author || "",
    description: value.description || "",
    license: value.license || "CC-BY-SA-4.0",
    editable: !!value.editable,
    confirmed: false,
  });
  URL.revokeObjectURL(cover.value);
  cover.value = URL.createObjectURL(data.cover);
  ready.value = true;
}
function open() {
  dialog.value.showModal();
  task(prepare);
}
function close() {
  serial++;
  dialog.value.close();
  URL.revokeObjectURL(cover.value);
  cover.value = "";
  props.core.resume();
}
async function submit() {
  if (!current.value || !form.confirmed) return;
  const wasPublished = current.value.published;
  feedback.value = "";
  const bytes = await props.core.packageBook({
    author: form.author.trim(),
    description: form.description.trim(),
    license: form.license,
    editable: form.editable,
  });
  setCurrent(
    await publicationRequest(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/zip",
        "If-Match": `"${current.value.revision}"`,
      },
      body: bytes,
    }),
  );
  form.confirmed = false;
  if (submission.value)
    submittedKey.value =
      status.value === "approved" ? "reviewApproved" : "submissionDone";
  else
    successKey.value = wasPublished ? "publicationUpdated" : "publicationDone";
  await nextTick();
  if (dialog.value.open) {
    (submission.value ? submissionHeading.value : success.value).focus({
      preventScroll: true,
    });
    dialog.value.scrollTop = 0;
  }
  props.core.notice(t(submission.value ? "submissionDone" : successKey.value));
}
function withdraw() {
  if (!current.value?.published || !confirm(t("withdrawConfirm"))) return;
  task(async () => {
    setCurrent(
      await publicationRequest(
        path + (submission.value ? "?publication=1" : ""),
        {
          method: "DELETE",
          headers: { "If-Match": `"${current.value.revision}"` },
        },
      ),
    );
    props.core.notice(t("publicationWithdrawn"));
  });
}
function cancelSubmission() {
  if (
    !submission.value ||
    !current.value ||
    !confirm(t("cancelSubmissionConfirm"))
  )
    return;
  task(async () => {
    setCurrent(
      await publicationRequest(path, {
        method: "DELETE",
        headers: { "If-Match": `"${current.value.revision}"` },
      }),
    );
    await nextTick();
    if (dialog.value.open) {
      submissionHeading.value.focus({ preventScroll: true });
      dialog.value.scrollTop = 0;
    }
  });
}
async function copy() {
  const url = safeWebURL(current.value.url);
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
  else {
    const input = document.createElement("textarea");
    input.value = url;
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    if (!copied) throw new Error("publication_copy_failed");
  }
  props.core.notice(t("publicationCopied"));
}
function resume() {
  if (
    !props.core.state.busy &&
    document.visibilityState !== "hidden" &&
    dialog.value.open &&
    needsLogin.value
  )
    task(prepare);
}
onMounted(() => {
  window.addEventListener("focus", resume);
  document.addEventListener("visibilitychange", resume);
});
onUnmounted(() => {
  serial++;
  URL.revokeObjectURL(cover.value);
  window.removeEventListener("focus", resume);
  document.removeEventListener("visibilitychange", resume);
});
defineExpose({ open });
</script>
<template>
  <dialog
    id="publish-dialog"
    ref="dialog"
    tabindex="-1"
    aria-labelledby="publish-heading"
    @cancel="close"
  >
    <div class="dialog-heading">
      <h2 id="publish-heading">
        {{ t(submission ? "submitReview" : "publishBook") }}
      </h2>
      <button id="close-publish" @click="close">{{ t("close") }}</button>
    </div>
    <p id="publish-intro" :hidden="submission">{{ t("publishIntro") }}</p>
    <section
      id="publication-current"
      role="status"
      aria-live="polite"
      :hidden="!current?.published"
    >
      <h3 id="publication-success-title" ref="success" tabindex="-1">
        {{ t(successKey) }}
      </h3>
      <p>{{ t("publicationActive") }}</p>
      <a
        id="publication-link"
        :href="link || undefined"
        target="_blank"
        rel="noopener"
        >{{ t("openPublication") }}</a
      >
      <button id="copy-publication" @click="task(copy)">
        {{ t("copyPublication") }}
      </button>
      <button id="withdraw-publication" @click="withdraw">
        {{ t("withdrawPublication") }}
      </button>
    </section>
    <section
      id="submission-state"
      role="status"
      :data-status="status"
      :hidden="!submission || !current || status === 'draft'"
    >
      <h3 id="submission-heading" ref="submissionHeading" tabindex="-1">
        {{ t(heading) }}
      </h3>
      <p id="submission-message">{{ t(help) }}</p>
      <p id="submission-feedback">{{ current?.feedback }}</p>
      <button id="refresh-submission" @click="task(prepare)">
        {{ t("refreshReviewStatus") }}
      </button>
      <button
        id="cancel-submission"
        :hidden="!['pending', 'returned'].includes(status)"
        @click="cancelSubmission"
      >
        {{ t("cancelSubmission") }}
      </button>
    </section>
    <p id="publication-feedback" role="alert">{{ t(feedback) }}</p>
    <section id="publication-login" :hidden="!needsLogin">
      <p>{{ t("publicationLogin") }}</p>
      <a
        id="publication-sign-in"
        class="button"
        :href="'/api/auth/oidc/login?next=' + loginNext"
        target="_blank"
        rel="noopener"
        >{{ t("publicationSignIn") }}</a
      >
      <a
        id="publication-student-sign-in"
        class="button"
        :href="'/student.html?next=' + loginNext"
        target="_blank"
        rel="noopener"
        >{{ t("studentSignIn") }}</a
      >
      <button id="check-publication-login" @click="task(prepare)">
        {{ t("refreshRebost") }}
      </button>
    </section>
    <p id="submission-intro" :hidden="!submission">
      {{ t("submissionIntro") }}
    </p>
    <form
      id="publish-form"
      :hidden="!ready"
      @submit.prevent="task(submit, 'publishing')"
    >
      <h3 id="publish-title">{{ title }}</h3>
      <img
        id="publish-cover"
        :src="cover || undefined"
        width="320"
        height="180"
        alt=""
      />
      <label
        ><span>{{ t("publishAuthor") }}</span
        ><input
          id="publish-author"
          v-model="form.author"
          required
          maxlength="120"
          autocomplete="off"
      /></label>
      <label
        ><span>{{ t("publishDescription") }}</span
        ><textarea
          id="publish-description"
          v-model="form.description"
          maxlength="2000"
          rows="3"
        ></textarea>
      </label>
      <label
        ><span>{{ t("publishLicense") }}</span
        ><select id="publish-license" v-model="form.license">
          <option value="CC-BY-SA-4.0">CC BY-SA 4.0</option>
          <option value="CC-BY-4.0">CC BY 4.0</option>
          <option value="CC0-1.0">CC0 1.0</option>
        </select></label
      >
      <label class="check"
        ><input
          id="publish-editable"
          v-model="form.editable"
          type="checkbox"
        /><span>{{ t("publishEditable") }}</span></label
      >
      <label class="check"
        ><input
          id="publish-confirm"
          v-model="form.confirmed"
          type="checkbox"
          required
        /><span id="publication-consent-label">{{
          t(submission ? "submissionConfirm" : "publishConfirm")
        }}</span></label
      >
      <button id="confirm-publish" type="submit" class="primary">
        {{
          t(
            submission
              ? "submitReview"
              : current?.published
                ? "updatePublication"
                : "publishBook",
          )
        }}
      </button>
    </form>
  </dialog>
</template>
