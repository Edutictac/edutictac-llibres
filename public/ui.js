import { Editor as e } from "/adapter.js";
import { allBooks as t, removeBook as n, saveBook as r, uid as i } from "/store.js";
import { messages as a } from "/i18n.js";
import { inspectBook as o } from "/import.js";
import { coverImage as s, publicationPackage as c, publicationRequest as l, safeWebURL as u } from "/publication.js";
import { fetchImage as d, selection as f } from "/rebost.js";
import { exampleSlugs as p, loadExample as m } from "/examples.js";
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function h(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var g = {}, _ = [], v = () => {}, y = () => !1, b = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), x = (e) => e.startsWith("onUpdate:"), S = Object.assign, ee = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, C = Object.prototype.hasOwnProperty, w = (e, t) => C.call(e, t), T = Array.isArray, E = (e) => M(e) === "[object Map]", D = (e) => M(e) === "[object Set]", te = (e) => M(e) === "[object Date]", O = (e) => typeof e == "function", k = (e) => typeof e == "string", A = (e) => typeof e == "symbol", j = (e) => typeof e == "object" && !!e, ne = (e) => (j(e) || O(e)) && O(e.then) && O(e.catch), re = Object.prototype.toString, M = (e) => re.call(e), ie = (e) => M(e).slice(8, -1), ae = (e) => M(e) === "[object Object]", oe = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, se = /* @__PURE__ */ h(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ce = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, le = /-\w/g, N = ce((e) => e.replace(le, (e) => e.slice(1).toUpperCase())), ue = /\B([A-Z])/g, de = ce((e) => e.replace(ue, "-$1").toLowerCase()), fe = ce((e) => e.charAt(0).toUpperCase() + e.slice(1)), pe = ce((e) => e ? `on${fe(e)}` : ""), me = (e, t) => !Object.is(e, t), he = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, ge = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, _e = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ve, ye = () => ve ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function be(e) {
	if (T(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = k(r) ? we(r) : be(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (k(e) || j(e)) return e;
}
var xe = /;(?![^(]*\))/g, Se = /:([^]+)/, Ce = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function we(e) {
	let t = {};
	return e.replace(Ce, (e) => e.startsWith("/*") ? "" : e).split(xe).forEach((e) => {
		if (e) {
			let n = e.split(Se);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Te(e) {
	let t = "";
	if (k(e)) t = e;
	else if (T(e)) for (let n = 0; n < e.length; n++) {
		let r = Te(e[n]);
		r && (t += r + " ");
	}
	else if (j(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Ee = /* @__PURE__ */ h("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function De(e) {
	return !!e || e === "";
}
function Oe(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Me(e[i], t[i], n);
	return r;
}
function ke(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Me(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function Ae(e, t, n) {
	let r = E(e), i = E(t);
	if (r || i || (r = D(e), i = D(t), r || i)) return r && i ? ke(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Me(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function je(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Me(e, t, n) {
	if (e === t) return !0;
	let r = te(e), i = te(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = A(e), i = A(t), r || i ? e === t : (r = T(e), i = T(t), r || i ? r && i ? je(e, t, n, Oe) : !1 : (r = j(e), i = j(t), r || i ? !r || !i ? !1 : je(e, t, n, Ae) : String(e) === String(t))));
}
function Ne(e, t) {
	return e.findIndex((e) => Me(e, t));
}
var Pe = (e) => !!(e && e.__v_isRef === !0), P = (e) => k(e) ? e : e == null ? "" : T(e) || j(e) && (e.toString === re || !O(e.toString)) ? Pe(e) ? P(e.value) : JSON.stringify(e, Fe, 2) : String(e), Fe = (e, t) => Pe(t) ? Fe(e, t.value) : E(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ie(t, r) + " =>"] = n, e), {}) } : D(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ie(e)) } : A(t) ? Ie(t) : j(t) && !T(t) && !ae(t) ? String(t) : t, Ie = (e, t = "") => A(e) ? `Symbol(${e.description ?? t})` : e, F, Le = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && F && (F.active ? (this.parent = F, this.index = (F.scopes || (F.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = F;
			try {
				return F = this, e();
			} finally {
				F = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = F, F = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (F === this) F = this.prevScope;
			else {
				let e = F;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
}, I, Re = /* @__PURE__ */ new WeakSet(), ze = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, F && (F.active ? F.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Re.has(this) && (Re.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ue(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, nt(this), Ke(this);
		let e = I, t = Qe;
		I = this, Qe = !0;
		try {
			return this.fn();
		} finally {
			qe(this), I = e, Qe = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Xe(e);
			this.deps = this.depsTail = void 0, nt(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Re.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Je(this) && this.run();
	}
	get dirty() {
		return Je(this);
	}
}, Be = 0, Ve, He;
function Ue(e, t = !1) {
	e.flags |= 8, t ? (e.next = He, He = e) : (e.next = Ve, Ve = e);
}
function We() {
	Be++;
}
function Ge() {
	if (--Be > 0) return;
	if (He) {
		let e = He;
		for (He = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ve;) {
		let t = Ve;
		for (Ve = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Ke(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function qe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Xe(r), Ze(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Je(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ye(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ye(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rt) || (e.globalVersion = rt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Je(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = I, r = Qe;
	I = e, Qe = !0;
	try {
		Ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || me(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		I = n, Qe = r, qe(e), e.flags &= -3;
	}
}
function Xe(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Xe(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ze(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Qe = !0, $e = [];
function et() {
	$e.push(Qe), Qe = !1;
}
function tt() {
	let e = $e.pop();
	Qe = e === void 0 || e;
}
function nt(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = I;
		I = void 0;
		try {
			t();
		} finally {
			I = e;
		}
	}
}
var rt = 0, it = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, at = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!I || !Qe || I === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== I) t = this.activeLink = new it(I, this), I.deps ? (t.prevDep = I.depsTail, I.depsTail.nextDep = t, I.depsTail = t) : I.deps = I.depsTail = t, ot(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = I.depsTail, t.nextDep = void 0, I.depsTail.nextDep = t, I.depsTail = t, I.deps === t && (I.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, rt++, this.notify(e);
	}
	notify(e) {
		We();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ge();
		}
	}
};
function ot(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) ot(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var st = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ Symbol(""), lt = /* @__PURE__ */ Symbol(""), ut = /* @__PURE__ */ Symbol("");
function L(e, t, n) {
	if (Qe && I) {
		let t = st.get(e);
		t || st.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new at()), r.map = t, r.key = n), r.track();
	}
}
function dt(e, t, n, r, i, a) {
	let o = st.get(e);
	if (!o) {
		rt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (We(), t === "clear") o.forEach(s);
	else {
		let i = T(e), a = i && oe(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ut || !A(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ut)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ct)), E(e) && s(o.get(lt)));
				break;
			case "delete":
				i || (s(o.get(ct)), E(e) && s(o.get(lt)));
				break;
			case "set": E(e) && s(o.get(ct));
		}
	}
	Ge();
}
function ft(e) {
	let t = /* @__PURE__ */ R(e);
	return t === e || (L(t, "iterate", ut), /* @__PURE__ */ Qt(e)) ? t : /* @__PURE__ */ Zt(e) ? /* @__PURE__ */ Xt(e) ? t.map((e) => tn(z(e))) : t.map(tn) : t.map(z);
}
function pt(e) {
	return L(e = /* @__PURE__ */ R(e), "iterate", ut), e;
}
function mt(e, t) {
	return /* @__PURE__ */ Zt(e) ? tn(/* @__PURE__ */ Xt(e) ? z(t) : t) : z(t);
}
var ht = {
	__proto__: null,
	[Symbol.iterator]() {
		return gt(this, Symbol.iterator, (e) => mt(this, e));
	},
	concat(...e) {
		return ft(this).concat(...e.map((e) => T(e) ? ft(e) : e));
	},
	entries() {
		return gt(this, "entries", (e) => (e[1] = mt(this, e[1]), e));
	},
	every(e, t) {
		return yt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return yt(this, "filter", e, t, (e) => e.map((e) => mt(this, e)), arguments);
	},
	find(e, t) {
		return yt(this, "find", e, t, (e) => mt(this, e), arguments);
	},
	findIndex(e, t) {
		return yt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return yt(this, "findLast", e, t, (e) => mt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return yt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return yt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return xt(this, "includes", e);
	},
	indexOf(...e) {
		return xt(this, "indexOf", e);
	},
	join(e) {
		return ft(this).join(e);
	},
	lastIndexOf(...e) {
		return xt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return yt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return St(this, "pop");
	},
	push(...e) {
		return St(this, "push", e);
	},
	reduce(e, ...t) {
		return bt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return bt(this, "reduceRight", e, t);
	},
	shift() {
		return St(this, "shift");
	},
	some(e, t) {
		return yt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return St(this, "splice", e);
	},
	toReversed() {
		return ft(this).toReversed();
	},
	toSorted(e) {
		return ft(this).toSorted(e);
	},
	toSpliced(...e) {
		return ft(this).toSpliced(...e);
	},
	unshift(...e) {
		return St(this, "unshift", e);
	},
	values() {
		return gt(this, "values", (e) => mt(this, e));
	}
};
function gt(e, t, n) {
	let r = pt(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ Qt(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => _t(a.next(), n), i !== vt[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => _t(a._next(), n);
	}
	return a;
}
function _t(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var vt = Array.prototype;
function yt(e, t, n, r, i, a) {
	let o = pt(e), s = o !== e && !/* @__PURE__ */ Qt(e), c = o[t];
	if (c !== vt[t]) {
		let t = c.apply(e, a);
		return s ? z(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, mt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function bt(e, t, n, r) {
	let i = pt(e), a = i !== e && !/* @__PURE__ */ Qt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = mt(e, t)), n.call(this, t, mt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? mt(e, c) : c;
}
function xt(e, t, n) {
	let r = /* @__PURE__ */ R(e);
	L(r, "iterate", ut);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ $t(n[0]) ? (n[0] = /* @__PURE__ */ R(n[0]), r[t](...n)) : i;
}
function St(e, t, n = []) {
	et(), We();
	let r = (/* @__PURE__ */ R(e))[t].apply(e, n);
	return Ge(), tt(), r;
}
var Ct = /* @__PURE__ */ h("__proto__,__v_isRef,__isVue"), wt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(A));
function Tt(e) {
	A(e) || (e = String(e));
	let t = /* @__PURE__ */ R(this);
	return L(t, "has", e), t.hasOwnProperty(e);
}
var Et = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Wt : Ut : i ? Ht : Vt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = T(e);
		if (!r) {
			let e;
			if (a && (e = ht[t])) return e;
			if (t === "hasOwnProperty") return Tt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ B(e) ? e : n);
		if ((A(t) ? wt.has(t) : Ct(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ B(o)) {
			let e = a && oe(t) ? o : o.value;
			return r && j(e) ? /* @__PURE__ */ Jt(e) : e;
		}
		return j(o) ? r ? /* @__PURE__ */ Jt(o) : /* @__PURE__ */ Kt(o) : o;
	}
}, Dt = class extends Et {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = T(e) && oe(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Zt(i);
			if (!/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (i = /* @__PURE__ */ R(i), n = /* @__PURE__ */ R(n)), !a && /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : w(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ B(e) ? e : r);
		return e === /* @__PURE__ */ R(r) && s && (o ? me(n, i) && dt(e, "set", t, n, i) : dt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = w(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && dt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return A(t) && wt.has(t) || L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", T(e) ? "length" : ct), Reflect.ownKeys(e);
	}
}, Ot = class extends Et {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, kt = /* @__PURE__ */ new Dt(), At = /* @__PURE__ */ new Ot(), jt = /* @__PURE__ */ new Dt(!0), Mt = (e) => e, Nt = (e) => Reflect.getPrototypeOf(e);
function Pt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ R(i), o = E(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Mt : t ? tn : z;
		return !t && L(a, "iterate", c ? lt : ct), S(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Ft(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function It(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ R(r), a = /* @__PURE__ */ R(n);
			e || (me(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = Nt(i), s = t ? Mt : e ? tn : z;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ R(t), "iterate", ct), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ R(n), i = /* @__PURE__ */ R(t);
			return e || (me(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ R(a), s = t ? Mt : e ? tn : z;
			return !e && L(o, "iterate", ct), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return S(n, e ? {
		add: Ft("add"),
		set: Ft("set"),
		delete: Ft("delete"),
		clear: Ft("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ R(this), r = Nt(n), i = /* @__PURE__ */ R(e), a = !t && !/* @__PURE__ */ Qt(e) && !/* @__PURE__ */ Zt(e) ? i : e;
			return r.has.call(n, a) || me(e, a) && r.has.call(n, e) || me(i, a) && r.has.call(n, i) || (n.add(a), dt(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ Qt(n) || /* @__PURE__ */ Zt(n) || (n = /* @__PURE__ */ R(n));
			let r = /* @__PURE__ */ R(this), { has: i, get: a } = Nt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ R(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? me(n, s) && dt(r, "set", e, n, s) : dt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ R(this), { has: n, get: r } = Nt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ R(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && dt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ R(this), t = e.size !== 0, n = e.clear();
			return t && dt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Pt(r, e, t);
	}), n;
}
function Lt(e, t) {
	let n = It(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(w(n, i) && i in r ? n : r, i, a);
}
var Rt = { get: /* @__PURE__ */ Lt(!1, !1) }, zt = { get: /* @__PURE__ */ Lt(!1, !0) }, Bt = { get: /* @__PURE__ */ Lt(!0, !1) }, Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap();
function Gt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return /* @__PURE__ */ Zt(e) ? e : Yt(e, !1, kt, Rt, Vt);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return Yt(e, !1, jt, zt, Ht);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !0, At, Bt, Ut);
}
function Yt(e, t, n, r, i) {
	if (!j(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Gt(ie(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return /* @__PURE__ */ Zt(e) ? /* @__PURE__ */ Xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function R(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ R(t) : e;
}
function en(e) {
	return !w(e, "__v_skip") && Object.isExtensible(e) && ge(e, "__v_skip", !0), e;
}
var z = (e) => j(e) ? /* @__PURE__ */ Kt(e) : e, tn = (e) => j(e) ? /* @__PURE__ */ Jt(e) : e;
// @__NO_SIDE_EFFECTS__
function B(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function V(e) {
	return rn(e, !1);
}
// @__NO_SIDE_EFFECTS__
function nn(e) {
	return rn(e, !0);
}
function rn(e, t) {
	return /* @__PURE__ */ B(e) ? e : new an(e, t);
}
var an = class {
	constructor(e, t) {
		this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ R(e), this._value = t ? e : z(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qt(e) || /* @__PURE__ */ Zt(e);
		e = n ? e : /* @__PURE__ */ R(e), me(e, t) && (this._rawValue = e, this._value = n ? e : z(e), this.dep.trigger());
	}
};
function H(e) {
	return /* @__PURE__ */ B(e) ? e.value : e;
}
var on = {
	get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function sn(e) {
	return /* @__PURE__ */ Xt(e) ? e : new Proxy(e, on);
}
var cn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && I !== this) return Ue(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ye(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function ln(e, t, n = !1) {
	let r, i;
	return O(e) ? r = e : (r = e.get, i = e.set), new cn(r, i, n);
}
function un(e, t = Infinity, n) {
	if (t <= 0 || !j(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ B(e)) un(e.value, t, n);
	else if (T(e)) for (let r = 0; r < e.length; r++) un(e[r], t, n);
	else if (D(e) || E(e)) e.forEach((e) => {
		un(e, t, n);
	});
	else if (ae(e)) {
		for (let r in e) un(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && un(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function dn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		pn(e, t, n);
	}
}
function fn(e, t, n, r) {
	if (O(e)) {
		let i = dn(e, t, n, r);
		return i && ne(i) && i.catch((e) => {
			pn(e, t, n);
		}), i;
	}
	if (T(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(fn(e[a], t, n, r));
		return i;
	}
}
function pn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || g;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			et(), dn(a, null, 10, [
				e,
				i,
				o
			]), tt();
			return;
		}
	}
	mn(e, n, i, r, o);
}
function mn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var U = [], hn = -1, gn = [], _n = null, vn = 0, yn = /* @__PURE__ */ Promise.resolve(), bn = null;
function W(e) {
	let t = bn || yn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function xn(e) {
	let t = hn + 1, n = U.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = U[r], a = kn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Sn(e) {
	if (!(e.flags & 1)) {
		let t = kn(e), n = U[U.length - 1];
		!n || !(e.flags & 2) && t >= kn(n) ? U.push(e) : U.splice(xn(t), 0, e), e.flags |= 1, Cn();
	}
}
function Cn() {
	bn ||= yn.then(An);
}
function wn(e) {
	if (!T(e)) _n && e.id === -1 ? _n.splice(vn + 1, 0, e) : e.flags & 1 || (gn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) gn.push(e[t]);
	Cn();
}
function Tn(e, t, n, r = hn + 1) {
	for (; r < U.length; r++) {
		let n = U[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			U.splice(r, 1), r = e ? r - 1 : hn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function En(e, t, n = 0) {
	if (gn.length) {
		let e = gn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < gn.length; i++) {
				let a = gn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? gn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => kn(e) - kn(t));
		if (gn.length = r, _n) {
			for (let e = 0; e < i.length; e++) _n.push(i[e]);
			return;
		}
		for (_n = i, vn = 0; vn < _n.length; vn++) {
			let e = _n[vn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		_n = null, vn = 0;
	}
}
var Dn = !1;
function On(e, t) {
	if (Dn) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(gn);
	e(), Dn = !0;
	try {
		Tn(void 0, t), En(void 0, n, t);
	} finally {
		Dn = !1;
	}
}
var kn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function An(e) {
	try {
		for (hn = 0; hn < U.length; hn++) {
			let e = U[hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), dn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; hn < U.length; hn++) {
			let e = U[hn];
			e && (e.flags &= -2);
		}
		hn = -1, U.length = 0, En(e), bn = null, (U.length || gn.length) && An(e);
	}
}
var jn = null, Mn = null;
function Nn(e) {
	let t = jn;
	return jn = e, Mn = e && e.type.__scopeId || null, t;
}
function Pn(e, t = jn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ri(-1);
		let i = Nn(t), a = ei.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ei.length; e > a; e--) ti();
			Nn(i), r._d && ri(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function G(e, t) {
	if (jn === null) return e;
	let n = Li(jn), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = g] = t[e];
		i && (O(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && un(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function Fn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (et(), fn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), tt());
	}
}
var In = /* @__PURE__ */ Symbol("_vte"), Ln = (e) => e.__isTeleport, Rn = /* @__PURE__ */ Symbol("_leaveCb");
function zn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Qr) {
			t = n;
			break;
		}
	}
	return t;
}
function Bn(e) {
	if (!Yn(e)) return Ln(e.type) && e.children ? zn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && O(n.default)) return n.default();
	}
}
function Vn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Vn(Ln(n.type) && Bn(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === q && T(e.children)) {
		let n = hr(e.children, !1);
		n && Vn(n, t);
	}
}
function Hn(e) {
	if (e.component) return Hn(e.component.subTree);
	if (e.type === q) {
		let t = T(e.children) && hr(e.children, !1);
		return t ? Hn(t) : void 0;
	}
	if (e.type !== Qr) return e;
}
function Un(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Wn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Gn = /* @__PURE__ */ new WeakMap();
function Kn(e, t, n, r, i = !1) {
	if (T(e)) {
		e.forEach((e, a) => Kn(e, t && (T(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Jn(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Kn(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Li(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === g ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ R(d), p = d === g ? y : (e) => !Wn(u, e) && w(f, e), m = (e, t) => !(t && Wn(u, t));
	if (l != null && l !== c) {
		if (qn(t), k(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ B(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (O(c)) dn(c, s, 12, [o, u]);
	else {
		let t = k(c), r = /* @__PURE__ */ B(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) T(n) && ee(n, a);
					else if (T(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Gn.delete(e);
				};
				t.id = -1, Gn.set(e, t), K(t, n);
			} else qn(e), s();
		}
	}
}
function qn(e) {
	let t = Gn.get(e);
	t && (t.flags |= 8, Gn.delete(e));
}
ye().requestIdleCallback, ye().cancelIdleCallback;
var Jn = (e) => !!e.type.__asyncLoader, Yn = (e) => e.type.__isKeepAlive;
function Xn(e, t, n = wi, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			et();
			let i = Di(n), a = fn(t, n, e, r);
			return i(), tt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Zn = (e) => (t, n = wi) => {
	Ai && e !== "sp" || Xn(e, (...e) => t(...e), n);
}, Qn = Zn("m"), $n = Zn("um"), er = /* @__PURE__ */ Symbol.for("v-ndc");
function tr(e, t, n, r) {
	let i, a = n && n[r], o = T(e);
	if (o || k(e)) {
		let n = o && /* @__PURE__ */ Xt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Qt(e), s = /* @__PURE__ */ Zt(e), e = pt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? tn(z(e[n])) : z(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (j(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
var nr = (e) => e ? ki(e) ? Li(e) : nr(e.parent) : null, rr = /* @__PURE__ */ S(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => nr(e.parent),
	$root: (e) => nr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		Sn(e.update);
	},
	$nextTick: (e) => e.n ||= W.bind(e.proxy),
	$watch: (e) => v
}), ir = (e, t) => e !== g && !e.__isScriptSetup && w(e, t), ar = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (ir(r, t)) return o[t] = 1, r[t];
			else if (w(a, t)) return o[t] = 3, a[t];
			else if (n !== g && w(n, t)) return o[t] = 4, n[t];
			else o[t] = 0;
		}
		let l = rr[t], u, d;
		if (l) return t === "$attrs" && L(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== g && w(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, w(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return ir(i, t) ? (i[t] = n, !0) : w(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || ir(t, s) || w(a, s) || w(r, s) || w(rr, s) || w(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? w(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function or() {
	return {
		app: null,
		config: {
			isNativeTag: y,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var sr = 0;
function cr(e, t) {
	return function(n, r = null) {
		O(n) || (n = S({}, n)), r != null && !j(r) && (r = null);
		let i = or(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: sr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Bi,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && O(e.install) ? (a.add(e), e.install(c, ...t)) : O(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || Q(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Li(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (fn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = lr;
				lr = c;
				try {
					return e();
				} finally {
					lr = t;
				}
			}
		};
		return c;
	};
}
var lr = null, ur = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${N(t)}Modifiers`] || e[`${de(t)}Modifiers`];
function dr(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || g, i = n, a = t.startsWith("update:"), o = a && ur(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => k(e) ? e.trim() : e)), o.number && (i = i.map(_e)));
	let s, c = r[s = pe(t)] || r[s = pe(N(t))];
	!c && a && (c = r[s = pe(de(t))]), c && fn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, fn(l, e, 6, i);
	}
}
function fr(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (T(a) ? a.forEach((e) => o[e] = null) : S(o, a), j(e) && r.set(e, o), o) : (j(e) && r.set(e, null), null);
}
function pr(e, t) {
	return !e || !b(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), w(e, t[0].toLowerCase() + t.slice(1)) || w(e, de(t)) || w(e, t));
}
function mr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Nn(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = hi(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = hi(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : gr(s);
		}
	} catch (t) {
		ei.length = 0, pn(t, e, 1), _ = Q(Qr);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(x) && (v = _r(v, a)), y = fi(y, v, !1, !0));
	}
	return n.dirs && (y = fi(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && Vn(Ln(y.type) && Bn(y) || y, n.transition), _ = y, Nn(g), _;
}
function hr(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (oi(r)) {
			if (r.type !== Qr || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var gr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || b(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, _r = (e, t) => {
	let n = {};
	for (let r in e) x(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function vr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? yr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (br(o, r, n) && !pr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || yr(r, o, l) : !!o;
	return !1;
}
function yr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!w(e, a) || br(t, e, a) && !pr(n, a)) return !0;
	}
	return !1;
}
function br(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && j(r) && j(i) ? !Me(r, i) : r !== i;
}
function xr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Sr = {}, Cr = () => Object.create(Sr), wr = (e) => Object.getPrototypeOf(e) === Sr;
function Tr(e, t, n, r = !1) {
	let i = {}, a = Cr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Dr(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ qt(i) : e.type.props ? i : a, e.attrs = a;
}
function Er(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ R(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (pr(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (w(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = N(o);
						i[t] = Or(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Dr(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (w(t, a) || (r = de(a)) !== a && w(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Or(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && w(t, e) || (delete a[e], l = !0);
	}
	l && dt(e.attrs, "set", "");
}
function Dr(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (se(c)) continue;
		let l = t[c], u;
		i && w(i, u = N(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : pr(e.emitsOptions, c) || c in r && l === r[c] || (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ R(n), r = s || g;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Or(i, t, s, r[s], e, !w(r, s));
		}
	}
	return o;
}
function Or(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = w(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && O(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Di(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === de(n)) && (r = !0));
	}
	return r;
}
function kr(e, t, n = !1) {
	let r = t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [];
	if (!a) return j(e) && r.set(e, _), _;
	if (T(a)) for (let e = 0; e < a.length; e++) {
		let t = N(a[e]);
		Ar(t) && (o[t] = g);
	}
	else if (a) for (let e in a) {
		let t = N(e);
		if (Ar(t)) {
			let n = a[e], r = o[t] = T(n) || O(n) ? { type: n } : S({}, n), i = r.type, c = !1, l = !0;
			if (T(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = O(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = O(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || w(r, "default")) && s.push(t);
		}
	}
	let c = [o, s];
	return j(e) && r.set(e, c), c;
}
function Ar(e) {
	return e[0] !== "$" && !se(e);
}
var jr = (e) => e === "_" || e === "_ctx" || e === "$stable", Mr = (e) => T(e) ? e.map(hi) : [hi(e)], Nr = (e, t, n) => {
	if (t._n) return t;
	let r = Pn((...e) => Mr(t(...e)), n);
	return r._c = !1, r;
}, Pr = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (jr(n)) continue;
		let i = e[n];
		if (O(i)) t[n] = Nr(n, i, r);
		else if (i != null) {
			let e = Mr(i);
			t[n] = () => e;
		}
	}
}, Fr = (e, t) => {
	let n = Mr(t);
	e.slots.default = () => n;
}, Ir = (e, t, n) => {
	for (let r in t) (n || !jr(r)) && (e[r] = t[r]);
}, Lr = (e, t, n) => {
	let r = e.slots = Cr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ir(r, t, n), n && ge(r, "_", e, !0)) : Pr(t, r);
	} else t && Fr(e, t);
}, Rr = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = g;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Ir(i, t, n) : (a = !t.$stable, Pr(t, i)), o = t;
	} else t && (Fr(e, t), o = { default: 1 });
	if (a) for (let e in i) !jr(e) && o[e] == null && delete i[e];
}, K = Xr;
function zr(e) {
	return Br(e);
}
function Br(e, t) {
	let n = ye();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = v, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !si(e, t) && (r = pe(e), le(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === _ && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Zr:
				y(e, t, n, r);
				break;
			case Qr:
				b(e, t, n, r);
				break;
			case $r:
				e ?? x(t, n, r, o);
				break;
			case q:
				k(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? C(e, t, n, r, i, a, o, s, c) : d & 6 ? A(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ge);
		}
		u != null && i ? Kn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Kn(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, ee = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, C = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) w(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), D(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, w = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && E(e.children, f, null, i, s, Vr(e, c), l, d), _ && Fn(e, null, i, "created"), T(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !se(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && yi(p, i, e);
		}
		_ && Fn(e, null, i, "beforeMount");
		let v = Ur(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && K(() => {
			try {
				p && yi(p, i, e), v && g.enter(f), _ && Fn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, T = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Yr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				T(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? gi(e[l]) : hi(e[l]);
			h(null, c, t, n, r, i, a, o, s);
		}
	}, D = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || g, m = t.props || g, h;
		if (n && Hr(n, !1), (h = m.onVnodeBeforeUpdate) && yi(h, n, t, e), f && Fn(t, e, n, "beforeUpdate"), n && Hr(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? te(e.dynamicChildren, d, c, n, r, Vr(t, i), o) : s || ie(e, t, c, null, n, r, Vr(t, i), o, !1), l > 0) {
			if (l & 16) O(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && O(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && K(() => {
			h && yi(h, n, t, e), f && Fn(t, e, n, "updated");
		}, r);
	}, te = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Jr(c), f = u && (c.type === q || !si(c, l) || c.shapeFlag & 198) ? d(u) : n;
			h(c, l, f, null, r, i, a, o, !0);
		}
	}, O = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== g) for (let o in t) !se(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (se(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, k = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), E(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (te(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Wr(e, t, !0)) : ie(e, t, n, f, a, o, c, l, u);
	}, A = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : j(t, n, r, i, a, o, c) : ne(e, t, c);
	}, j = (e, t, n, r, i, a, o) => {
		let s = e.component = Ci(e, r, i);
		if (Yn(e) && (s.ctx.renderer = ge), ji(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, re, o, a), !e.el) {
				let r = s.subTree = Q(Qr);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else re(s, e, t, n, i, a, o);
	}, ne = (e, t, n) => {
		let r = t.component = e.component;
		if (vr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, M(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, re = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Kr(e);
					if (n) {
						t && (t.el = c.el, M(e, t, o)), n.asyncDep.then(() => {
							K(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Hr(e, !1), t ? (t.el = c.el, M(e, t, o)) : t = c, n && he(n), (f = t.props && t.props.onVnodeBeforeUpdate) && yi(f, s, t, c), Hr(e, !0);
				let p = mr(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), pe(m), e, i, a), t.el = p.el, u === null && xr(e, p.el), r && K(r, i), (f = t.props && t.props.onVnodeUpdated) && K(() => yi(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Jn(t);
				if (Hr(e, !1), l && he(l), !m && (o = c && c.onVnodeBeforeMount) && yi(o, d, t), Hr(e, !0), s && ve) {
					let t = () => {
						e.subTree = mr(e), ve(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = mr(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && K(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					K(() => yi(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Jn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && K(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ze(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Sn(u), Hr(e, !0), l();
	}, M = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Er(e, t.props, r, n), Rr(e, t.children, n), et(), Tn(e), tt();
	}, ie = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				oe(l, f, n, r, i, a, o, s, c);
				return;
			}
			if (p & 256) {
				ae(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && fe(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? oe(l, f, n, r, i, a, o, s, c) : fe(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && E(f, n, r, i, a, o, s, c));
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		e ||= _, t ||= _;
		let l = e.length, u = t.length, d = Math.min(l, u), f = 0;
		for (; f < d; f++) {
			let r = t[f] = c ? gi(t[f]) : hi(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? fe(e, i, a, !0, !1, d) : E(t, n, r, i, a, o, s, c, d);
	}, oe = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? gi(t[l]) : hi(t[l]);
			if (si(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? gi(t[f]) : hi(t[f]);
			if (si(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? gi(t[l]) : hi(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) le(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? gi(t[l]) : hi(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let v, y = 0, b = f - m + 1, x = !1, S = 0, ee = Array(b);
			for (l = 0; l < b; l++) ee[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (y >= b) {
					le(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (v = m; v <= f; v++) if (ee[v - m] === 0 && si(r, t[v])) {
					u = v;
					break;
				}
				u === void 0 ? le(r, i, a, !0) : (ee[u - m] = l + 1, u >= S ? S = u : x = !0, h(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let C = x ? Gr(ee) : _;
			for (v = C.length - 1, l = b - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Jr(f) : r;
				ee[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : x && (v < 0 || l !== C[v] ? ce(d, n, p, 2) : v--);
			}
		}
	}, ce = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) ce(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, ge);
		else if (c === q) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) ce(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === $r) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[Rn] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), K(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[Rn];
					s._isLeaving && s[Rn](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, le = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (et(), Kn(s, null, n, e, !0), tt()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Jn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && yi(_, t, e), u & 6) de(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Fn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ge, r) : l && !l.hasOnce && (a !== q || d > 0 && d & 64) ? fe(l, t, n, !1, !0) : (a === q && d & 384 || !i && u & 16) && fe(c, t, n), r && N(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && K(() => {
			_ && yi(_, t, e), h && Fn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, N = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e, o = t === q;
		if (o && !a) {
			ue(n, r);
			return;
		}
		if (t === $r) {
			ee(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let s = o ? Hn(e) : e, c = () => {
			o ? d(n) && ue(n, r) : i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (s && s.shapeFlag & 1 && a && !a.persisted) {
			let { leave: e, delayLeave: t } = a, n = s.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, ue = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, de = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		qr(c), qr(l), r && he(r), i.stop(), a ? (a.flags |= 8, le(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, le(o, e, t, n)), s && K(s, t), K(() => {
			e.isUnmounted = !0;
		}, t);
	}, fe = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) le(e[o], t, n, r, i);
	}, pe = (e) => {
		if (e.shapeFlag & 6) return pe(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[In];
		return n ? f(n) : t;
	}, me = (e, t, n) => {
		On(() => {
			e == null ? t._vnode && le(t._vnode, null, null, !0) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : Si());
	}, ge = {
		p: h,
		um: le,
		m: ce,
		r: N,
		mt: j,
		mc: E,
		pc: ie,
		pbc: te,
		n: pe,
		o: e
	}, _e, ve;
	return t && ([_e, ve] = t(ge)), {
		render: me,
		hydrate: _e,
		createApp: cr(me, _e)
	};
}
function Vr({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Hr({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ur(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Wr(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (T(r) && T(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = gi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Wr(t, a)), a.type === Zr && (a.patchFlag === -1 && (a = i[e] = gi(a)), a.el = t.el), a.type === Qr && !a.el && (a.el = t.el);
	}
}
function Gr(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Kr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Kr(t);
}
function qr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Jr(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Jr(t.subTree) : null;
}
var Yr = (e) => e.__isSuspense;
function Xr(e, t) {
	t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : wn(e);
}
var q = /* @__PURE__ */ Symbol.for("v-fgt"), Zr = /* @__PURE__ */ Symbol.for("v-txt"), Qr = /* @__PURE__ */ Symbol.for("v-cmt"), $r = /* @__PURE__ */ Symbol.for("v-stc"), ei = [], J = null;
function Y(e = !1) {
	ei.push(J = e ? null : []);
}
function ti() {
	ei.pop(), J = ei[ei.length - 1] || null;
}
var ni = 1;
function ri(e, t = !1) {
	ni += e, e < 0 && J && t && (J.hasOnce = !0);
}
function ii(e) {
	return e.dynamicChildren = ni > 0 ? J || _ : null, ti(), ni > 0 && J && J.push(e), e;
}
function X(e, t, n, r, i, a) {
	return ii(Z(e, t, n, r, i, a, !0));
}
function ai(e, t, n, r, i) {
	return ii(Q(e, t, n, r, i, !0));
}
function oi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function si(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ci = ({ key: e }) => e ?? null, li = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : k(e) || /* @__PURE__ */ B(e) || O(e) ? {
	i: jn,
	r: e,
	k: t,
	f: !!n
} : e);
function Z(e, t = null, n = null, r = 0, i = null, a = e === q ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ci(t),
		ref: t && li(t),
		scopeId: Mn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: jn
	};
	return s ? (_i(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= k(n) ? 8 : 16), ni > 0 && !o && J && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && J.push(c), c;
}
var Q = ui;
function ui(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== er || (e = Qr), oi(e)) {
		let r = fi(e, t, !0);
		return n && _i(r, n), ni > 0 && !a && J && (r.shapeFlag & 6 ? J[J.indexOf(e)] = r : J.push(r)), r.patchFlag = -2, r;
	}
	if (Ri(e) && (e = e.__vccOpts), t) {
		t = di(t);
		let { class: e, style: n } = t;
		e && !k(e) && (t.class = Te(e)), j(n) && (/* @__PURE__ */ $t(n) && !T(n) && (n = S({}, n)), t.style = be(n));
	}
	let o = k(e) ? 1 : Yr(e) ? 128 : Ln(e) ? 64 : j(e) ? 4 : O(e) ? 2 : 0;
	return Z(e, t, n, r, i, o, a, !0);
}
function di(e) {
	return e ? /* @__PURE__ */ $t(e) || wr(e) ? S({}, e) : e : null;
}
function fi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? vi(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ci(l),
		ref: t && t.ref ? n && a ? T(a) ? a.concat(li(t)) : [a, li(t)] : li(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== q ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && fi(e.ssContent),
		ssFallback: e.ssFallback && fi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && Vn(u, c.clone(u)), u;
}
function pi(e = " ", t = 0) {
	return Q(Zr, null, e, t);
}
function mi(e = "", t = !1) {
	return t ? (Y(), ai(Qr, null, e)) : Q(Qr, null, e);
}
function hi(e) {
	return e == null || typeof e == "boolean" ? Q(Qr) : T(e) ? Q(q, null, e.slice()) : oi(e) ? gi(e) : Q(Zr, null, String(e));
}
function gi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : fi(e);
}
function _i(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (T(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), _i(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !wr(t) ? t._ctx = jn : r === 3 && jn && (jn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (O(t)) {
		if (r & 65) {
			_i(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: jn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [pi(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function vi(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Te([t.class, r.class]));
		else if (e === "style") t.style = be([t.style, r.style]);
		else if (b(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(T(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !x(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function yi(e, t, n, r = null) {
	fn(e, t, 7, [n, r]);
}
var bi = or(), xi = 0;
function Si() {
	return xi;
}
function Ci(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || bi, a = {
		uid: xi++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Le(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: kr(r, i),
		emitsOptions: fr(r, i),
		emit: null,
		emitted: null,
		propsDefaults: g,
		inheritAttrs: r.inheritAttrs,
		ctx: g,
		data: g,
		props: g,
		attrs: g,
		slots: g,
		refs: g,
		setupState: g,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = dr.bind(null, a), e.ce && e.ce(a), a;
}
var wi = null, Ti, Ei;
{
	let e = ye(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ti = t("__VUE_INSTANCE_SETTERS__", (e) => wi = e), Ei = t("__VUE_SSR_SETTERS__", (e) => Ai = e);
}
var Di = (e) => {
	let t = wi;
	return Ti(e), e.scope.on(), () => {
		e.scope.off(), Ti(t);
	};
}, Oi = () => {
	wi && wi.scope.off(), Ti(null);
};
function ki(e) {
	return e.vnode.shapeFlag & 4;
}
var Ai = !1;
function ji(e, t = !1, n = !1) {
	t && Ei(t);
	let { props: r, children: i } = e.vnode, a = ki(e);
	Tr(e, r, a, t), Lr(e, i, n || t);
	let o = a ? Mi(e, t) : void 0;
	return t && Ei(!1), o;
}
function Mi(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ar);
	let { setup: r } = n;
	if (r) {
		et();
		let n = e.setupContext = r.length > 1 ? Ii(e) : null, i = Di(e), a = dn(r, e, 0, [e.props, n]), o = ne(a);
		if (tt(), i(), (o || e.sp) && !Jn(e) && Un(e), o) {
			if (a.then(Oi, Oi), t) return a.then((n) => {
				Ei(!0);
				try {
					Ni(e, n, t);
				} finally {
					Ei(!1);
				}
			}).catch((t) => {
				pn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ni(e, a, t);
	} else Pi(e, t);
}
function Ni(e, t, n) {
	O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = sn(t)), Pi(e, n);
}
function Pi(e, t, n) {
	let r = e.type;
	e.render ||= r.render || v;
}
var Fi = { get(e, t) {
	return L(e, "get", ""), e[t];
} };
function Ii(e) {
	return {
		attrs: new Proxy(e.attrs, Fi),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Li(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(sn(en(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in rr) return rr[n](e);
		},
		has(e, t) {
			return t in e || t in rr;
		}
	}) : e.proxy;
}
function Ri(e) {
	return O(e) && "__vccOpts" in e;
}
var zi = (e, t) => /* @__PURE__ */ ln(e, t, Ai), Bi = "3.5.44", Vi = void 0, Hi = typeof window < "u" && window.trustedTypes;
if (Hi) try {
	Vi = /* @__PURE__ */ Hi.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ui = Vi ? (e) => Vi.createHTML(e) : (e) => e, Wi = "http://www.w3.org/2000/svg", Gi = "http://www.w3.org/1998/Math/MathML", Ki = typeof document < "u" ? document : null, qi = Ki && /* @__PURE__ */ Ki.createElement("template"), Ji = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Ki.createElementNS(Wi, e) : t === "mathml" ? Ki.createElementNS(Gi, e) : n ? Ki.createElement(e, { is: n }) : Ki.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Ki.createTextNode(e),
	createComment: (e) => Ki.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Ki.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			qi.innerHTML = Ui(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = qi.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Yi = /* @__PURE__ */ Symbol("_vtc");
function Xi(e, t, n) {
	let r = e[Yi];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Zi = /* @__PURE__ */ Symbol("_vod"), Qi = /* @__PURE__ */ Symbol("_vsh"), $i = /* @__PURE__ */ Symbol(""), ea = /(?:^|;)\s*display\s*:/;
function ta(e, t, n) {
	let r = e.style, i = k(n), a = !1;
	if (n && !i) {
		if (t) {
			if (k(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? ra(r, t, "");
			}
			else for (let e in t) n[e] ?? ra(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ra(r, i, "") : sa(e, i, !k(t) && t ? t[i] : void 0, o) || ra(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[$i];
			e && (n += ";" + e), r.cssText = n, a = ea.test(n);
		}
	} else t && e.removeAttribute("style");
	Zi in e && (i && t === n || (e[Zi] = a ? r.display : ""), e[Qi] && (r.display = "none"));
}
var na = /\s*!important$/;
function ra(e, t, n) {
	if (T(n)) n.forEach((n) => ra(e, t, n));
	else if (n ??= "", t.startsWith("--")) na.test(n) ? e.setProperty(t, n.replace(na, ""), "important") : e.setProperty(t, n);
	else {
		let r = oa(e, t);
		na.test(n) ? e.setProperty(de(r), n.replace(na, ""), "important") : e[r] = n;
	}
}
var ia = [
	"Webkit",
	"Moz",
	"ms"
], aa = {};
function oa(e, t) {
	let n = aa[t];
	if (n) return n;
	let r = N(t);
	if (r !== "filter" && r in e) return aa[t] = r;
	r = fe(r);
	for (let n = 0; n < ia.length; n++) {
		let i = ia[n] + r;
		if (i in e) return aa[t] = i;
	}
	return t;
}
function sa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && k(r) && n === r;
}
var ca = "http://www.w3.org/1999/xlink";
function la(e, t, n, r, i, a = Ee(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ca, t.slice(6, t.length)) : e.setAttributeNS(ca, t, n) : n == null || a && !De(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : A(n) ? String(n) : n);
}
function ua(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ui(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = De(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function da(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function fa(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var pa = /* @__PURE__ */ Symbol("_vei");
function ma(e, t, n, r, i = null) {
	let a = e[pa] || (e[pa] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = _a(t);
		r ? da(e, n, a[t] = xa(r, i), s) : o && (fa(e, n, o, s), a[t] = void 0);
	}
}
var ha = /(Once|Passive|Capture)$/, ga = /^on:?(?:Once|Passive|Capture)$/;
function _a(e) {
	let t, n;
	for (; (n = e.match(ha)) && !ga.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : de(e.slice(2)), t];
}
var va = 0, ya = /* @__PURE__ */ Promise.resolve(), ba = () => va ||= (ya.then(() => va = 0), Date.now());
function xa(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (T(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && fn(e, t, 5, a);
			}
		} else fn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ba(), n;
}
var Sa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Xi(e, r, o) : t === "style" ? ta(e, n, r) : b(t) ? x(t) || ma(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : wa(e, t, r, o)) ? (ua(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || la(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ta(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !k(r))) ? ua(e, N(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), la(e, t, r, o));
};
function wa(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Sa(t) && O(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Sa(t) && k(n) ? !1 : t in e;
}
function Ta(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = N(t);
	return Array.isArray(n) ? n.some((e) => N(e) === r) : Object.keys(n).some((e) => N(e) === r);
}
var Ea = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return T(t) ? (e) => he(t, e) : t;
};
function Da(e) {
	e.target.composing = !0;
}
function Oa(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var $ = /* @__PURE__ */ Symbol("_assign"), ka = /* @__PURE__ */ Symbol("_initialValue");
function Aa(e, t, n) {
	return t && (e = e.trim()), n && (e = _e(e)), e;
}
var ja = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[ka] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[ka] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[$] = Ea(i);
		let a = r || i.props && i.props.type === "number";
		da(e, t ? "change" : "input", (t) => {
			t.target.composing || e[$](Aa(e.value, n, a));
		}), (n || a) && da(e, "change", () => {
			e.value = Aa(e.value, n, a);
		}), t || (da(e, "compositionstart", Da), da(e, "compositionend", Oa), da(e, "change", Oa));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[ka];
		delete e[ka], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[$](Aa(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[$] = Ea(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? _e(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Ma = {
	deep: !0,
	created(e, t, n) {
		e[$] = Ea(n), da(e, "change", () => {
			let t = e._modelValue, n = Ra(e), r = e.checked, i = e[$];
			if (T(t)) {
				let e = Ne(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (D(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(za(e, r));
		});
	},
	mounted: Na,
	beforeUpdate(e, t, n) {
		e[$] = Ea(n), Na(e, t, n);
	}
};
function Na(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (T(t)) i = Ne(t, r.props.value) > -1;
	else if (D(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Me(t, za(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Pa = {
	created(e, { value: t }, n) {
		e.checked = Me(t, n.props.value), e[$] = Ea(n), da(e, "change", () => {
			e[$](Ra(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[$] = Ea(r), t !== n && (e.checked = Me(t, r.props.value));
	}
}, Fa = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, da(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? _e(Ra(e)) : Ra(e)), r = e.multiple, i = r ? D(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? T(i) ? t.slice() : t : i];
			try {
				e[$](i);
			} finally {
				W(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[$] = Ea(r);
	},
	mounted(e, { value: t }) {
		La(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[$] = Ea(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && Ia(t, n[1], n[0]) || La(e, t);
	}
};
function Ia(e, t, n) {
	if (!n || T(e)) return Me(e, t);
	if (D(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function La(e, t) {
	let n = e.multiple, r = T(t);
	if (!n || r || D(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ra(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Ne(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Me(Ra(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ra(e) {
	return "_value" in e ? e._value : e.value;
}
function za(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ba = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Va = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Ba.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ha = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Va[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ua = /* @__PURE__ */ S({ patchProp: Ca }, Ji), Wa;
function Ga() {
	return Wa ||= zr(Ua);
}
var Ka = ((...e) => {
	let t = Ga().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ja(e);
		if (!r) return;
		let i = t._component;
		O(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, qa(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function qa(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ja(e) {
	return k(e) ? document.querySelector(e) : e;
}
// src/workshop.js
var Ya = [
	"es",
	"ca",
	"va",
	"en"
];
function Xa(e = !1) {
	let t = e ? window.commonsLanguage?.stored() : window.commonsLanguage?.read();
	if (Ya.includes(t)) return t;
	try {
		let e = localStorage.getItem("llibres-language");
		if (Ya.includes(e)) return e;
	} catch {}
	return "es";
}
function Za(t) {
	let n = /* @__PURE__ */ Kt({
		locale: Xa(),
		active: !1,
		busy: !1,
		busyKey: "working",
		statusKey: "",
		title: "",
		pages: [],
		selected: null,
		contentIndex: -1,
		contentCount: 0,
		automatic: !1,
		comic: !1,
		comicPanels: 0,
		comicPanelIndex: 0,
		newComicLayout: 2,
		bubbleSelected: !1,
		advanced: !1,
		publicationEnabled: !1,
		rebostEnabled: !1,
		notice: "",
		noticeError: !1
	}), l, u, d, f = !1, p, m = !1, h = (e) => a[n.locale][e] || e;
	function g(e, t = !1) {
		n.notice = e, n.noticeError = t, clearTimeout(p), p = setTimeout(() => {
			n.notice = "";
		}, t ? 12e3 : 4500);
	}
	async function _(e, t = "working") {
		if (!n.busy) {
			n.busy = !0, n.busyKey = t;
			try {
				return await e();
			} catch (e) {
				return console.error("Llibres:", e), g(h([
					"invalid",
					"imageError",
					"rebostSession",
					"rebostError",
					"rebostChanged",
					"comicChoosePage",
					"comicSelectBubble",
					"comicTextTooLong"
				].includes(e.message) || /^(publication_|review_)/.test(e.message) || e.message === "invalid_publication" ? e.message : e.name === "QuotaExceededError" ? "storageError" : "error"), !0), !1;
			} finally {
				if (m && n.active && u) {
					m = !1;
					try {
						await D();
					} catch {
						g(h("error"), !0);
					}
				}
				n.busy = !1, await W();
			}
		}
	}
	function v(e, t = !0) {
		if (Ya.includes(e)) {
			n.locale = e;
			try {
				localStorage.setItem("llibres-language", n.locale);
			} catch {}
			t && window.commonsLanguage?.remember(n.locale), document.documentElement.lang = n.locale === "va" ? "ca-valencia" : n.locale;
		}
	}
	function y() {
		u && (f = !0, n.statusKey = "pending");
	}
	function b() {
		n.pages = l.pages().map(({ id: e, pageName: t }) => ({
			id: e,
			pageName: t
		}));
		let e = l.contentPages();
		n.selected = d, n.contentCount = e.length, n.contentIndex = e.findIndex((e) => e.id === d), n.automatic = n.contentIndex < 0;
		let t = l.comicInfo();
		n.comic = t.enabled, n.comicPanels = n.automatic ? 0 : t.layout, n.comicPanelIndex = Math.min(n.comicPanelIndex, Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex, n.bubbleSelected = !n.automatic && !!l.selectedBubble(), l.window.document.body.classList.toggle("llibres-credits", n.automatic), l.window.frameElement.inert = n.automatic;
	}
	async function x() {
		n.active = !0, n.advanced = !1, await W();
		let r = JSON.parse(localStorage.getItem("exe_user_preferences") || "{}");
		r.userPreferences ||= {}, r.userPreferences.locale = { value: n.locale === "va" ? "ca-valencia" : n.locale }, localStorage.setItem("exe_user_preferences", JSON.stringify(r));
		let i = document.createElement("iframe");
		i.id = "engine", i.title = h("edit"), i.src = "/engine/index.html", t.host().replaceChildren(i), l = new e(i), l.comicSelectionChanged = () => {
			n.bubbleSelected = !!l.selectedBubble();
		}, await l.ready(), l.changed = y, l.connectImagePicker(ce);
	}
	async function S(e = !0) {
		if (!u) return;
		n.statusKey = "saving";
		let t = await l.save(), i = {
			...u,
			title: l.title() || h("title"),
			bytes: t,
			pageCount: l.pages().length,
			updatedAt: Date.now()
		};
		await r(i), u = i, f = !1, n.statusKey = "saved", l.pages().some((e) => e.id === d) || (d = l.contentPages()[0].id), e && await l.select(d), b(), f = !1, n.statusKey = "saved";
	}
	async function ee({ title: e, template: t, layout: r = 2 }) {
		u = null, await x(), u = {
			id: i(),
			template: t,
			language: n.locale,
			title: e,
			createdAt: Date.now()
		}, n.newComicLayout = [
			2,
			3,
			4
		].includes(r) ? r : 2, d = await l.create(e, t, n.locale, n.newComicLayout), n.title = e, b(), await S();
	}
	async function C(e) {
		u = null, await x(), u = e, d = await l.open(e.bytes), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), b(), f = !1, n.statusKey = "saved";
	}
	async function w(e) {
		if (!e) return;
		let t = await o(await e.arrayBuffer());
		u = null, await x(), u = {
			id: i(),
			language: n.locale,
			template: "import",
			title: e.name,
			createdAt: Date.now()
		}, d = await l.open(t), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), b(), await S();
	}
	function T() {
		let e = n.title.trim();
		e && (l.title(e), u.title = e, y());
	}
	async function E() {
		await S(!1), u = null, f = !1, n.active = !1, ve(), t.host().replaceChildren(), await t.refreshShelf();
	}
	async function D(e = d) {
		await l.select(e), d = e, b();
	}
	async function te() {
		d = await l.addPage(h("page") + " " + l.contentPages().length, n.comic ? Number(n.newComicLayout) : 0), y(), b();
	}
	async function O(e) {
		await l.move(d, e), y(), b();
	}
	async function k() {
		let e = l.pages().find((e) => e.id === d)?.pageName, t = prompt(h("renamePrompt"), e);
		t?.trim() && (await l.rename(d, t.trim().slice(0, 120)), y(), b());
	}
	async function A() {
		if (l.contentPages().length <= 1) return g(h("onePage"));
		confirm(h("deletePage")) && (d = await l.delete(d), y(), b());
	}
	async function j(e) {
		await l.drawing(e), e && y();
	}
	function ne() {
		let e = l.window.document.body.classList.toggle("llibres-simple");
		n.advanced = !e;
	}
	function re(e, t, n = "application/octet-stream") {
		let r = URL.createObjectURL(new Blob([e], { type: n })), i = document.createElement("a");
		i.href = r, i.download = t, i.click(), setTimeout(() => URL.revokeObjectURL(r), 3e4);
	}
	let M = (e) => (u.title || "llibre").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 70) + e;
	async function ie() {
		await S(), re(u.bytes, M(".elpx"), "application/zip"), g(h("downloaded"));
	}
	async function ae(e, t) {
		let n = await l.export(e);
		re(n.bytes, M(t), n.mimeType);
	}
	async function oe() {
		await S(!1), t.read(u.title, await l.slides());
	}
	function se() {
		n.busy ? m = !0 : _(() => D());
	}
	function ce() {
		!n.busy && u && (n.rebostEnabled ? t.pick() : t.deviceImage());
	}
	let le = () => ({
		bookId: u?.id,
		pageId: d,
		editor: l
	}), N = (e) => e.bookId === u?.id && e.pageId === d && e.editor === l;
	async function ue(e, t) {
		e && (await l.image(e, t), t && await l.select(d), b());
	}
	function de(e = n.comicPanelIndex) {
		n.comicPanelIndex = Math.min(Math.max(0, Number(e) || 0), Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex;
	}
	function fe() {
		return l.bubbleDraft();
	}
	async function pe(e) {
		await l.writeBubble(e), y(), g("");
	}
	async function me() {
		return await S(!1), {
			id: u.id,
			title: u.title,
			cover: await s((await l.slides())[0].svg)
		};
	}
	let he = (e) => c(l, u, {
		...e,
		language: u.language || n.locale
	});
	function ge(e) {
		f && (e.preventDefault(), e.returnValue = "");
	}
	async function _e() {
		v(n.locale), window.addEventListener("pageshow", ve), window.addEventListener("focus", ve), window.addEventListener("beforeunload", ge);
		for (let [e, t] of [["publication", "publicationEnabled"], ["rebost", "rebostEnabled"]]) fetch("/" + e + "-status", { cache: "no-store" }).then(async (e) => {
			e.ok && (n[t] = (await e.json()).enabled === !0);
		}).catch(() => {});
		try {
			await t.refreshShelf();
		} catch {
			g(h("storageError"), !0);
		}
	}
	function ve() {
		n.active || v(Xa(!0));
	}
	function ye() {
		window.removeEventListener("pageshow", ve), window.removeEventListener("focus", ve), clearTimeout(p), window.removeEventListener("beforeunload", ge);
	}
	return {
		state: n,
		t: h,
		notice: g,
		action: _,
		language: v,
		start: _e,
		dispose: ye,
		create: ee,
		openStored: C,
		importFile: w,
		renameTitle: T,
		persist: S,
		back: E,
		select: D,
		addPage: te,
		move: O,
		renamePage: k,
		deletePage: A,
		drawing: j,
		advanced: ne,
		downloadBook: ie,
		exportBook: ae,
		read: oe,
		pickImage: ce,
		image: ue,
		chooseComicPanel: de,
		bubbleDraft: fe,
		writeBubble: pe,
		context: le,
		matches: N,
		publicationData: me,
		packageBook: he,
		resume: se
	};
}
// src/shelf/BookCard.vue
var Qa = { class: "book-card" }, $a = ["disabled"], eo = ["disabled", "aria-label"], to = {
	__name: "BookCard",
	props: {
		book: Object,
		locale: String,
		busy: Boolean
	},
	emits: ["open", "remove"],
	setup(e) {
		let t = e, n = (e) => a[t.locale][e] || e, r = zi(() => new Date(t.book.updatedAt).toLocaleDateString(t.locale === "va" ? "ca-ES-valencia" : t.locale));
		return (t, i) => (Y(), X("article", Qa, [
			Z("button", {
				class: "book-open",
				disabled: e.busy,
				onClick: i[0] ||= (n) => t.$emit("open", e.book)
			}, P(e.book.title), 9, $a),
			Z("p", null, P(r.value) + " · " + P(e.book.pageCount) + " " + P(n("pages").toLowerCase()), 1),
			Z("button", {
				class: "delete-book",
				disabled: e.busy,
				"aria-label": n("deleteLabel") + ": " + e.book.title,
				onClick: i[1] ||= (n) => t.$emit("remove", e.book)
			}, " × ", 8, eo)
		]));
	}
}, no = {
	class: "shelf",
	"aria-labelledby": "shelf-heading"
}, ro = { class: "section-heading" }, io = { id: "shelf-heading" }, ao = {
	id: "book-count",
	role: "status"
}, oo = {
	key: 0,
	class: "empty"
}, so = {
	__name: "Bookshelf",
	props: {
		locale: String,
		action: Function,
		openBook: Function
	},
	setup(e, { expose: r }) {
		let i = e, o = (e) => a[i.locale][e] || e, s = /* @__PURE__ */ nn([]), c = /* @__PURE__ */ V(!1), l = /* @__PURE__ */ V(null), u = 0;
		async function d() {
			let e = ++u, n = await t();
			e === u && (s.value = n.sort((e, t) => t.updatedAt - e.updatedAt), await W());
		}
		function f(e, t = "working") {
			if (!c.value) return i.action(async () => {
				c.value = !0;
				try {
					return await e();
				} finally {
					c.value = !1, await W();
				}
			}, t);
		}
		function p(e) {
			return f(() => i.openBook(e), "loading");
		}
		function m(e) {
			return f(async () => {
				if (!confirm(o("deleteBook"))) return;
				let t = s.value.findIndex((t) => t.id === e.id);
				await n(e.id), await d();
				let r = l.value.querySelectorAll(".book-open"), i = r[Math.min(t, r.length - 1)] || document.getElementById("new-book");
				c.value = !1, await W(), i.focus();
			});
		}
		return r({ refresh: d }), (t, n) => (Y(), X("section", no, [Z("div", ro, [Z("h2", io, P(o("myBooks")), 1), Z("span", ao, P(s.value.length), 1)]), Z("div", {
			id: "books",
			ref_key: "list",
			ref: l,
			class: "books"
		}, [s.value.length ? mi("", !0) : (Y(), X("div", oo, P(o("empty")), 1)), (Y(!0), X(q, null, tr(s.value, (t) => (Y(), ai(to, {
			key: t.id,
			book: t,
			locale: e.locale,
			busy: c.value,
			onOpen: p,
			onRemove: m
		}, null, 8, [
			"book",
			"locale",
			"busy"
		]))), 128))], 512)]));
	}
}, co = { class: "book-card" }, lo = ["src"], uo = {
	__name: "ReviewCard",
	props: {
		item: Object,
		status: String
	},
	emits: ["open"],
	setup(e) {
		return (t, n) => (Y(), X("article", co, [
			e.item.status === "pending" || e.item.status === "returned" || e.item.published ? (Y(), X("img", {
				key: 0,
				src: e.item.status === "pending" || e.item.status === "returned" ? `/api/llibres/reviews/${e.item.id}/files/cover.png` : `/api/llibres/public/${e.item.id}/cover.png`,
				alt: "",
				loading: "lazy",
				style: { width: "100%" }
			}, null, 8, lo)) : mi("", !0),
			Z("button", {
				class: "review-open",
				onClick: n[0] ||= (n) => t.$emit("open", e.item)
			}, P(e.item.title), 1),
			Z("p", null, P([
				e.item.author,
				e.item.class_name,
				e.status
			].join(" · ")), 1)
		]));
	}
}, fo = { class: "dialog-heading" }, po = { id: "reviews-heading" }, mo = ["hidden"], ho = ["href"], go = { class: "actions" }, _o = ["disabled"], vo = ["disabled"], yo = {
	id: "reviews-list",
	class: "books"
}, bo = ["hidden", "disabled"], xo = { class: "dialog-heading" }, So = { id: "review-title" }, Co = ["disabled"], wo = { id: "review-details" }, To = {
	id: "review-feedback",
	role: "alert"
}, Eo = ["src", "title"], Do = { class: "check" }, Oo = ["disabled"], ko = ["disabled"], Ao = { class: "actions" }, jo = ["disabled"], Mo = ["disabled"], No = ["hidden", "disabled"], Po = {
	__name: "ReviewsPanel",
	props: {
		locale: String,
		action: Function,
		notice: Function
	},
	setup(e, { expose: t }) {
		let n = e, r = (e) => a[n.locale][e] || e, i = {
			pending: "reviewPending",
			returned: "reviewReturned",
			approved: "reviewApproved",
			cancelled: "reviewCancelled"
		}, o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(null), c = /* @__PURE__ */ V(null), u = /* @__PURE__ */ V([]), d = /* @__PURE__ */ V(null), f = /* @__PURE__ */ V(!1), p = /* @__PURE__ */ V(!1), m = /* @__PURE__ */ V(!1), h = /* @__PURE__ */ V(!1), g = /* @__PURE__ */ V(""), _ = /* @__PURE__ */ V(""), v = /* @__PURE__ */ V(""), y = /* @__PURE__ */ V(!1), b = 0, x = 0, S = zi(() => "/api/auth/oidc/login?next=" + encodeURIComponent("/llibres-login.html?lang=" + n.locale)), ee = zi(() => d.value?.status === "pending"), C = zi(() => {
			let e = d.value;
			if (e) {
				if (["pending", "returned"].includes(e.status)) return `/api/llibres/reviews/${e.id}/files/index.html`;
				if (e.published) return `/api/llibres/public/${e.id}/index.html`;
			}
		}), w = (e) => r(e.message) === e.message ? "publication_unavailable" : e.message;
		function T(e) {
			if (!h.value) return n.action(async () => {
				h.value = !0;
				try {
					return await e();
				} catch (e) {
					throw s.value.open ? _.value = w(e) : o.value.open && (g.value = w(e)), e;
				} finally {
					h.value = !1, await W();
				}
			});
		}
		async function E(e = !1) {
			let t = ++x;
			g.value = "loading", p.value = !1, m.value = !1, e || (b = 0, u.value = []);
			let n = await l("/me");
			if (t !== x || !o.value.open) return;
			if (!n.can_review) {
				u.value = [], p.value = !0, g.value = "reviewsLogin";
				return;
			}
			let r = await l("/reviews?" + new URLSearchParams({
				offset: b,
				all: f.value ? "1" : "0"
			}));
			t === x && o.value.open && (u.value.push(...r.items.filter((e) => /^[a-f0-9]{32}$/.test(e.id))), b += r.items.length, m.value = !!r.more, g.value = u.value.length ? "" : "reviewsEmpty");
		}
		function D(e) {
			d.value = e, v.value = e.feedback || "", _.value = "", y.value = !1, !["pending", "returned"].includes(e.status) && !e.published && (_.value = "reviewNoPreview"), s.value.showModal();
		}
		function te() {
			d.value = null, y.value = !1, v.value = "", _.value = "";
		}
		function O() {
			s.value.close(), te();
		}
		function k() {
			x++, o.value.close(), u.value = [];
		}
		async function A(e) {
			if (d.value) {
				if (e === "approve" && !y.value) throw Error("reviewPleaseConfirm");
				if (e === "return" && !v.value.trim()) throw Error("review_feedback_required");
				(e !== "withdraw" || confirm(r("reviewWithdrawConfirm"))) && (await l("/reviews/" + d.value.id, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"If-Match": `"${d.value.revision}"`
					},
					body: JSON.stringify({
						decision: e,
						feedback: v.value.trim()
					})
				}), O(), await E(), o.value.open && (g.value = e === "approve" ? "reviewApprovedDone" : e === "return" ? "reviewReturnedDone" : "reviewWithdrawn", await W(), c.value.focus({ preventScroll: !0 }), o.value.scrollTop = 0, n.notice(r(g.value))));
			}
		}
		function j() {
			o.value.showModal(), T(() => E());
		}
		function ne() {
			document.visibilityState !== "hidden" && o.value.open && p.value && T(() => E());
		}
		return Qn(() => {
			window.addEventListener("focus", ne), document.addEventListener("visibilitychange", ne);
		}), $n(() => {
			x++, window.removeEventListener("focus", ne), document.removeEventListener("visibilitychange", ne);
		}), t({ open: j }), (e, t) => (Y(), X(q, null, [Z("dialog", {
			id: "reviews-dialog",
			ref_key: "queue",
			ref: o,
			"aria-labelledby": "reviews-heading",
			onCancel: t[4] ||= (e) => {
				/* @__PURE__ */ B(x) ? x.value++ : x++, u.value = [];
			}
		}, [
			Z("div", fo, [Z("h2", po, P(r("reviewBooks")), 1), Z("button", {
				id: "close-reviews",
				onClick: k
			}, P(r("close")), 1)]),
			Z("p", null, P(r("reviewsIntro")), 1),
			Z("section", {
				id: "reviews-login",
				hidden: !p.value
			}, [Z("p", null, P(r("reviewsLogin")), 1), Z("a", {
				id: "reviews-sign-in",
				class: "button",
				href: S.value,
				target: "_blank",
				rel: "noopener"
			}, P(r("publicationSignIn")), 9, ho)], 8, mo),
			Z("div", go, [Z("button", {
				id: "refresh-reviews",
				disabled: h.value,
				onClick: t[0] ||= (e) => T(() => E())
			}, P(r("refreshReviews")), 9, _o), Z("label", null, [G(Z("input", {
				id: "reviews-all",
				"onUpdate:modelValue": t[1] ||= (e) => f.value = e,
				disabled: h.value,
				type: "checkbox",
				onChange: t[2] ||= (e) => T(() => E())
			}, null, 40, vo), [[Ma, f.value]]), Z("span", null, P(r("reviewedToo")), 1)])]),
			Z("p", {
				id: "reviews-status",
				ref_key: "statusElement",
				ref: c,
				role: "status",
				tabindex: "-1"
			}, P(r(g.value)), 513),
			Z("div", yo, [(Y(!0), X(q, null, tr(u.value, (e) => (Y(), ai(uo, {
				key: e.id,
				item: e,
				status: r(i[e.status]),
				onOpen: D
			}, null, 8, ["item", "status"]))), 128))]),
			Z("button", {
				id: "reviews-more",
				hidden: !m.value,
				disabled: h.value,
				onClick: t[3] ||= (e) => T(() => E(!0))
			}, P(r("moreBooks")), 9, bo)
		], 544), Z("dialog", {
			id: "review-dialog",
			ref_key: "detail",
			ref: s,
			"aria-labelledby": "review-title",
			onCancel: te
		}, [
			Z("div", xo, [Z("h2", So, P(d.value?.title), 1), Z("button", {
				id: "close-review",
				disabled: h.value,
				onClick: O
			}, P(r("close")), 9, Co)]),
			Z("p", wo, P(d.value ? [
				d.value.author,
				d.value.class_name,
				d.value.license,
				r(i[d.value.status])
			].join(" · ") : ""), 1),
			Z("p", To, P(r(_.value)), 1),
			Z("iframe", {
				id: "review-frame",
				src: C.value,
				title: r("reviewOpen"),
				sandbox: "allow-same-origin allow-downloads"
			}, null, 8, Eo),
			Z("label", Do, [G(Z("input", {
				id: "review-confirm",
				"onUpdate:modelValue": t[5] ||= (e) => y.value = e,
				type: "checkbox",
				disabled: !ee.value || h.value
			}, null, 8, Oo), [[Ma, y.value]]), Z("span", null, P(r("reviewConfirm")), 1)]),
			Z("label", null, [Z("span", null, P(r("reviewComment")), 1), G(Z("textarea", {
				id: "review-comment",
				"onUpdate:modelValue": t[6] ||= (e) => v.value = e,
				disabled: h.value,
				maxlength: "1000",
				rows: "3"
			}, null, 8, ko), [[ja, v.value]])]),
			Z("div", Ao, [
				Z("button", {
					id: "approve-review",
					class: "primary",
					disabled: !ee.value || !y.value || h.value,
					onClick: t[7] ||= (e) => T(() => A("approve"))
				}, P(r("approveReview")), 9, jo),
				Z("button", {
					id: "return-review",
					disabled: !ee.value || h.value,
					onClick: t[8] ||= (e) => T(() => A("return"))
				}, P(r("returnReview")), 9, Mo),
				Z("button", {
					id: "withdraw-review",
					hidden: !d.value?.published,
					disabled: h.value,
					onClick: t[9] ||= (e) => T(() => A("withdraw"))
				}, P(r("withdrawPublication")), 9, No)
			])
		], 544)], 64));
	}
}, Fo = { class: "dialog-heading" }, Io = { id: "create-heading" }, Lo = ["aria-label"], Ro = { for: "title" }, zo = ["placeholder"], Bo = { class: "templates" }, Vo = { class: "template-card sage" }, Ho = { class: "template-card peach" }, Uo = { class: "template-card sage" }, Wo = { class: "template-card cream" }, Go = {
	key: 0,
	for: "comic-layout"
}, Ko = ["value"], qo = {
	class: "primary",
	type: "submit"
}, Jo = {
	__name: "CreateDialog",
	props: {
		locale: String,
		core: Object
	},
	setup(e, { expose: t }) {
		let n = e, r = (e) => a[n.locale][e] || e, i = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(""), c = /* @__PURE__ */ V("story"), l = /* @__PURE__ */ V(2);
		function u() {
			i.value.showModal(), o.value.focus();
		}
		function d() {
			let e = s.value.trim();
			e && [
				"story",
				"album",
				"blank",
				"comic"
			].includes(c.value) && (i.value.close(), n.core.action(() => n.core.create({
				title: e,
				template: c.value,
				layout: Number(l.value)
			}), "loading"));
		}
		return t({ open: u }), (e, t) => (Y(), X("dialog", {
			id: "create-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "create-heading"
		}, [Z("form", {
			id: "create-form",
			onSubmit: Ha(d, ["prevent"])
		}, [
			Z("div", Fo, [Z("h2", Io, P(r("createTitle")), 1), Z("button", {
				type: "button",
				class: "icon-button",
				id: "close-create",
				"aria-label": r("close"),
				onClick: t[0] ||= (e) => i.value.close()
			}, " × ", 8, Lo)]),
			Z("label", Ro, P(r("title")), 1),
			G(Z("input", {
				id: "title",
				ref_key: "input",
				ref: o,
				"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
				placeholder: r("firstBook"),
				required: "",
				maxlength: "120",
				autocomplete: "off"
			}, null, 8, zo), [[ja, s.value]]),
			Z("fieldset", null, [Z("legend", null, P(r("template")), 1), Z("div", Bo, [
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					name: "template",
					value: "comic"
				}, null, 512), [[Pa, c.value]]), Z("span", Vo, [Z("b", null, P(r("comic")), 1), Z("small", null, P(r("comicHelp")), 1)])]),
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					name: "template",
					value: "story"
				}, null, 512), [[Pa, c.value]]), Z("span", Ho, [Z("b", null, P(r("story")), 1), Z("small", null, P(r("storyHelp")), 1)])]),
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					name: "template",
					value: "album"
				}, null, 512), [[Pa, c.value]]), Z("span", Uo, [Z("b", null, P(r("album")), 1), Z("small", null, P(r("albumHelp")), 1)])]),
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[5] ||= (e) => c.value = e,
					name: "template",
					value: "blank"
				}, null, 512), [[Pa, c.value]]), Z("span", Wo, [Z("b", null, P(r("blank")), 1), Z("small", null, P(r("blankHelp")), 1)])])
			])]),
			c.value === "comic" ? (Y(), X("label", Go, [pi(P(r("comicLayout")) + " ", 1), G(Z("select", {
				id: "comic-layout",
				"onUpdate:modelValue": t[6] ||= (e) => l.value = e
			}, [(Y(), X(q, null, tr([
				2,
				3,
				4
			], (e) => Z("option", {
				key: e,
				value: e
			}, P(e) + " " + P(r("comicPanels")), 9, Ko)), 64))], 512), [[
				Fa,
				l.value,
				void 0,
				{ number: !0 }
			]])])) : mi("", !0),
			Z("button", qo, P(r("start")), 1)
		], 32)], 512));
	}
}, Yo = ["hidden", "aria-label"], Xo = { class: "book-toolbar" }, Zo = ["aria-label"], Qo = {
	id: "save-status",
	role: "status"
}, $o = ["hidden"], es = { class: "workspace-body" }, ts = { class: "pages-panel" }, ns = { class: "section-heading" }, rs = { id: "page-count" }, is = { id: "pages" }, as = [
	"data-id",
	"aria-current",
	"onClick"
], os = ["disabled"], ss = {
	key: 0,
	for: "new-comic-layout"
}, cs = ["value"], ls = { class: "page-actions" }, us = ["disabled"], ds = ["disabled"], fs = ["disabled"], ps = ["disabled"], ms = { class: "tip" }, hs = { class: "editor-panel" }, gs = { class: "editor-toolbar" }, _s = { id: "page-name" }, vs = ["disabled"], ys = ["disabled"], bs = ["disabled"], xs = ["disabled"], Ss = ["disabled"], Cs = ["aria-label"], ws = { for: "comic-panel" }, Ts = ["value"], Es = ["value"], Ds = ["disabled"], Os = {
	__name: "WorkshopView",
	props: { core: Object },
	emits: ["publish", "bubble"],
	setup(e, { expose: t }) {
		let n = e, r = n.core.state, i = n.core.t, a = /* @__PURE__ */ V(null), o = zi(() => r.automatic ? i("automaticCredits") : r.pages.find((e) => e.id === r.selected)?.pageName || "");
		return t({ host: () => a.value }), (t, n) => (Y(), X("section", {
			id: "workspace",
			hidden: !H(r).active,
			"aria-label": H(i)("workshop")
		}, [Z("div", Xo, [
			Z("button", {
				id: "back",
				onClick: n[0] ||= (t) => e.core.action(e.core.back, "saving")
			}, P(H(i)("back")), 1),
			G(Z("input", {
				id: "book-title",
				"onUpdate:modelValue": n[1] ||= (e) => H(r).title = e,
				"aria-label": H(i)("title"),
				onChange: n[2] ||= (t) => e.core.renameTitle(),
				maxlength: "120"
			}, null, 40, Zo), [[ja, H(r).title]]),
			Z("span", Qo, P(H(i)(H(r).statusKey)), 1),
			Z("button", {
				id: "save-book",
				onClick: n[3] ||= (t) => e.core.action(e.core.persist, "saving")
			}, P(H(i)("save")), 1),
			Z("button", {
				id: "download",
				onClick: n[4] ||= (t) => e.core.action(e.core.downloadBook, "saving")
			}, P(H(i)("download")), 1),
			Z("button", {
				id: "read",
				onClick: n[5] ||= (t) => e.core.action(e.core.read),
				class: "primary"
			}, P(H(i)("read")), 1),
			Z("button", {
				id: "publish-book",
				onClick: n[6] ||= (e) => t.$emit("publish"),
				hidden: !H(r).publicationEnabled
			}, P(H(i)("publishBook")), 9, $o)
		]), Z("div", es, [Z("aside", ts, [
			Z("div", ns, [Z("h2", null, P(H(i)("pages")), 1), Z("span", rs, P(H(r).pages.length), 1)]),
			Z("ol", is, [(Y(!0), X(q, null, tr(H(r).pages, (t, n) => (Y(), X("li", { key: t.id }, [Z("button", {
				class: "page-tab",
				"data-id": t.id,
				"aria-current": String(t.id === H(r).selected),
				onClick: (n) => e.core.action(() => e.core.select(t.id))
			}, [Z("small", null, P(H(i)("page")) + " " + P(n + 1), 1), pi(P(t.pageName), 1)], 8, as)]))), 128))]),
			Z("button", {
				id: "add-page",
				disabled: H(r).contentCount >= 50,
				onClick: n[7] ||= (t) => e.core.action(e.core.addPage),
				class: "add-page"
			}, P(H(i)("addPage")), 9, os),
			H(r).comic ? (Y(), X("label", ss, [pi(P(H(i)("comicNewPage")) + " ", 1), G(Z("select", {
				id: "new-comic-layout",
				"onUpdate:modelValue": n[8] ||= (e) => H(r).newComicLayout = e
			}, [(Y(), X(q, null, tr([
				2,
				3,
				4
			], (e) => Z("option", {
				key: e,
				value: e
			}, P(e) + " " + P(H(i)("comicPanels")), 9, cs)), 64))], 512), [[
				Fa,
				H(r).newComicLayout,
				void 0,
				{ number: !0 }
			]])])) : mi("", !0),
			Z("div", ls, [
				Z("button", {
					id: "move-up",
					disabled: H(r).automatic || H(r).contentIndex <= 0,
					onClick: n[9] ||= (t) => e.core.action(() => e.core.move(-1))
				}, P(H(i)("up")), 9, us),
				Z("button", {
					id: "move-down",
					disabled: H(r).automatic || H(r).contentIndex >= H(r).contentCount - 1,
					onClick: n[10] ||= (t) => e.core.action(() => e.core.move(1))
				}, P(H(i)("down")), 9, ds),
				Z("button", {
					id: "rename-page",
					disabled: H(r).automatic,
					onClick: n[11] ||= (t) => e.core.action(e.core.renamePage)
				}, P(H(i)("rename")), 9, fs),
				Z("button", {
					id: "delete-page",
					disabled: H(r).automatic || H(r).contentCount <= 1,
					onClick: n[12] ||= (t) => e.core.action(e.core.deletePage)
				}, P(H(i)("delete")), 9, ps)
			]),
			Z("p", ms, P(H(i)(H(r).automatic ? "creditsHint" : H(r).comicPanels ? "comicTip" : "tip")), 1)
		]), Z("div", hs, [
			Z("div", gs, [
				Z("span", _s, P(o.value), 1),
				Z("button", {
					id: "edit-page",
					disabled: H(r).automatic,
					onClick: n[13] ||= (t) => e.core.action(() => e.core.select())
				}, P(H(i)("edit")), 9, vs),
				Z("button", {
					id: "add-image",
					disabled: H(r).automatic,
					onClick: n[14] ||= (t) => e.core.pickImage()
				}, P(H(i)("image")), 9, ys),
				Z("button", {
					id: "draw",
					disabled: H(r).automatic,
					onClick: n[15] ||= (t) => e.core.action(() => e.core.drawing(!0))
				}, P(H(i)("draw")), 9, bs),
				Z("button", {
					id: "select",
					disabled: H(r).automatic,
					onClick: n[16] ||= (t) => e.core.action(() => e.core.drawing(!1))
				}, P(H(i)("select")), 9, xs),
				Z("button", {
					id: "advanced",
					disabled: H(r).automatic,
					onClick: n[17] ||= (t) => e.core.advanced()
				}, P(H(i)(H(r).advanced ? "editSimple" : "advanced")), 9, Ss)
			]),
			H(r).comicPanels ? (Y(), X("div", {
				key: 0,
				class: "comic-toolbar",
				"aria-label": H(i)("comic")
			}, [
				Z("label", ws, [pi(P(H(i)("comicPanel")) + " ", 1), Z("select", {
					id: "comic-panel",
					value: H(r).comicPanelIndex,
					onChange: n[18] ||= (t) => e.core.chooseComicPanel(t.target.value)
				}, [(Y(!0), X(q, null, tr(H(r).comicPanels, (e) => (Y(), X("option", {
					key: e,
					value: e - 1
				}, P(e), 9, Es))), 128))], 40, Ts)]),
				Z("button", {
					id: "add-bubble",
					onClick: n[19] ||= (e) => t.$emit("bubble", !1)
				}, P(H(i)("comicAddBubble")), 1),
				Z("button", {
					id: "edit-bubble",
					disabled: !H(r).bubbleSelected,
					onClick: n[20] ||= (e) => t.$emit("bubble", !0)
				}, P(H(i)("comicEditBubble")), 9, Ds),
				Z("span", null, P(H(i)("comicPlacementHint")), 1)
			], 8, Cs)) : mi("", !0),
			Z("div", {
				id: "engine-host",
				ref_key: "engineHost",
				ref: a
			}, null, 512)
		])])], 8, Yo));
	}
}, ks = { class: "reader-toolbar" }, As = { id: "reader-title" }, js = ["href"], Ms = {
	id: "reader-page",
	class: "reader-page"
}, Ns = { class: "reader-navigation" }, Ps = ["disabled"], Fs = { id: "reader-position" }, Is = ["disabled"], Ls = {
	__name: "ReaderDialog",
	props: { core: Object },
	emits: ["example-close"],
	setup(e, { expose: t, emit: n }) {
		let r = n, i = e, a = i.core.t, o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(""), c = /* @__PURE__ */ nn([]), l = /* @__PURE__ */ V(0), u = /* @__PURE__ */ V(!1), d = /* @__PURE__ */ V("");
		function f(e, { value: t }) {
			if (e.replaceChildren(), !t?.svg) {
				e.textContent = a("readEmpty");
				return;
			}
			let n = DOMPurify.sanitize(t.svg, {
				USE_PROFILES: {
					svg: !0,
					svgFilters: !0
				},
				ADD_TAGS: ["image"],
				ADD_DATA_URI_TAGS: ["image"],
				ADD_ATTR: ["href"],
				ALLOW_UNKNOWN_PROTOCOLS: !1
			}), r = new DOMParser().parseFromString(n, "image/svg+xml");
			r.documentElement.localName === "svg" && (r.documentElement.setAttribute("role", "img"), r.documentElement.setAttribute("aria-label", t.title), e.append(document.importNode(r.documentElement, !0)));
		}
		let p = {
			mounted: f,
			updated: f
		};
		function m(e, t, n = {}) {
			s.value = e, c.value = t, l.value = 0, u.value = n.preview === !0, d.value = n.download || "", o.value.showModal();
		}
		function h() {
			u.value ? r("example-close") : i.core.resume();
		}
		function g() {
			o.value.close(), h();
		}
		return t({ open: m }), (t, n) => (Y(), X("dialog", {
			id: "reader",
			ref_key: "dialog",
			ref: o,
			"aria-labelledby": "reader-title",
			onCancel: h
		}, [
			Z("div", ks, [
				Z("button", {
					id: "close-reader",
					onClick: g
				}, P(H(a)(u.value ? "close" : "returnEdit")), 1),
				Z("strong", As, P(s.value), 1),
				u.value ? mi("", !0) : (Y(), X("button", {
					key: 0,
					id: "export-html",
					onClick: n[0] ||= (t) => e.core.action(() => e.core.exportBook("html5", ".zip"), "exporting")
				}, P(H(a)("html")), 1)),
				u.value ? mi("", !0) : (Y(), X("button", {
					key: 1,
					id: "export-epub",
					onClick: n[1] ||= (t) => e.core.action(() => e.core.exportBook("epub3", ".epub"), "exporting")
				}, " EPUB ")),
				u.value ? (Y(), X("a", {
					key: 2,
					id: "reader-download-example",
					href: d.value,
					download: ""
				}, P(H(a)("demoDownload")), 9, js)) : mi("", !0)
			]),
			G(Z("div", Ms, null, 512), [[p, c.value[l.value]]]),
			Z("div", Ns, [
				Z("button", {
					id: "prev",
					disabled: l.value <= 0,
					onClick: n[2] ||= (e) => l.value--
				}, P(H(a)("prev")), 9, Ps),
				Z("span", Fs, P(l.value + 1) + " / " + P(c.value.length), 1),
				Z("button", {
					id: "next",
					disabled: l.value >= c.value.length - 1,
					onClick: n[3] ||= (e) => l.value++
				}, P(H(a)("next")), 9, Is)
			])
		], 544));
	}
}, Rs = { class: "dialog-heading" }, zs = { id: "image-picker-title" }, Bs = { class: "image-sources" }, Vs = {
	__name: "ImagePicker",
	props: { core: Object },
	emits: ["device"],
	setup(e, { expose: t, emit: n }) {
		let r = e, a = n, o = r.core.t, s = /* @__PURE__ */ V(null), c = /* @__PURE__ */ V(null), l = /* @__PURE__ */ V("sprite"), u = null;
		function p() {
			u?.controller.abort(), u = null, s.value.close(), c.value.replaceChildren();
		}
		function m(e = "sprite") {
			u?.controller.abort(), l.value = e;
			let t = i(), n = new AbortController(), a = document.createElement("iframe");
			a.id = "rebost-frame", a.title = o("rebost"), a.onload = () => {
				u?.frame === a && !a.contentDocument?.getElementById("status") && r.core.notice(o("rebostError"), !0);
			}, a.src = "/assets/?" + new URLSearchParams({
				mode: "pick",
				type: e,
				request: t,
				lang: r.core.state.locale
			}), u = {
				request: t,
				controller: n,
				frame: a,
				...r.core.context()
			}, c.value.replaceChildren(a);
		}
		function h() {
			s.value.showModal(), m();
		}
		function g() {
			p(), a("device");
		}
		function _(e) {
			let t = u;
			if (t && f(e, t.frame.contentWindow, t.request)) {
				if (e.data.cancel) return p();
				r.core.action(async () => {
					let n = setTimeout(() => t.controller.abort(), 3e4);
					try {
						let n = await d(e.data.id, r.core.state.locale, t.controller.signal);
						if (u !== t || !r.core.matches(t)) return;
						await r.core.image(n.file, n.credit), p();
					} catch (e) {
						if (u === t) throw e;
					} finally {
						clearTimeout(n);
					}
				});
			}
		}
		return Qn(() => window.addEventListener("message", _)), $n(() => {
			u?.controller.abort(), window.removeEventListener("message", _);
		}), t({ open: h }), (e, t) => (Y(), X("dialog", {
			id: "image-picker",
			ref_key: "dialog",
			ref: s,
			onCancel: p,
			"aria-labelledby": "image-picker-title"
		}, [
			Z("div", Rs, [Z("h2", zs, P(H(o)("chooseImage")), 1), Z("button", {
				id: "close-image-picker",
				onClick: p
			}, P(H(o)("close")), 1)]),
			Z("div", Bs, [
				Z("button", {
					id: "device-image",
					onClick: g
				}, P(H(o)("deviceImage")), 1),
				Z("button", {
					id: "rebost-sprites",
					onClick: t[0] ||= (e) => m("sprite")
				}, P(H(o)("rebostSprites")), 1),
				Z("button", {
					id: "rebost-backgrounds",
					onClick: t[1] ||= (e) => m("background")
				}, P(H(o)("rebostBackgrounds")), 1),
				Z("button", {
					id: "refresh-rebost",
					onClick: t[2] ||= (e) => m(l.value)
				}, P(H(o)("refreshRebost")), 1)
			]),
			Z("p", null, P(H(o)("rebostHint")), 1),
			Z("div", {
				id: "rebost-host",
				ref_key: "host",
				ref: c
			}, null, 512)
		], 544));
	}
}, Hs = { class: "dialog-heading" }, Us = { id: "publish-heading" }, Ws = ["hidden"], Gs = ["hidden"], Ks = ["href"], qs = ["data-status", "hidden"], Js = { id: "submission-message" }, Ys = { id: "submission-feedback" }, Xs = ["hidden"], Zs = {
	id: "publication-feedback",
	role: "alert"
}, Qs = ["hidden"], $s = ["href"], ec = ["href"], tc = ["hidden"], nc = ["hidden"], rc = { id: "publish-title" }, ic = ["src"], ac = { class: "check" }, oc = { class: "check" }, sc = { id: "publication-consent-label" }, cc = {
	id: "confirm-publish",
	type: "submit",
	class: "primary"
}, lc = {
	__name: "PublicationDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ nn(null), c = /* @__PURE__ */ V(!1), d = /* @__PURE__ */ V(!1), f = /* @__PURE__ */ V(!1), p = /* @__PURE__ */ V(""), m = /* @__PURE__ */ V(""), h = /* @__PURE__ */ V(""), g = /* @__PURE__ */ V(""), _ = /* @__PURE__ */ V("publicationDone"), v = /* @__PURE__ */ V(""), y = /* @__PURE__ */ Kt({
			author: "",
			description: "",
			license: "CC-BY-SA-4.0",
			editable: !1,
			confirmed: !1
		}), b = "", x = 0, S = zi(() => encodeURIComponent("/llibres-login.html?lang=" + n.core.state.locale)), ee = {
			pending: "reviewPending",
			returned: "reviewReturned",
			approved: "reviewApproved",
			cancelled: "reviewCancelled",
			draft: "reviewDraft"
		}, C = zi(() => s.value?.status || "draft"), w = zi(() => v.value || ee[C.value] || "reviewDraft"), T = zi(() => C.value === "pending" ? s.value?.published ? "reviewPendingPublished" : "reviewPendingHelp" : C.value === "returned" ? "reviewReturnedHelp" : C.value === "cancelled" ? s.value?.published ? "reviewCancelledPublished" : "reviewCancelledHelp" : "submissionIntro");
		function E(e) {
			g.value = e.url ? u(e.url) : "", s.value = e, _.value = "publicationDone", v.value = "";
		}
		function D(e, t = "working") {
			return n.core.action(async () => {
				try {
					return await e();
				} catch (e) {
					throw i.value.open && (h.value = r(e.message) === e.message ? "publication_unavailable" : e.message), e;
				} finally {
					await W();
				}
			}, t);
		}
		async function te() {
			let e = ++x;
			h.value = "", d.value = !1, f.value = !1, s.value = null, c.value = !1;
			let t = await l("/me");
			if (e !== x || !i.value.open) return;
			if (c.value = !t.can_publish && !!t.can_submit, !t.can_publish && !t.can_submit) {
				d.value = !0, ["publication_teacher_required", "review_class_required"].includes(t.reason) && (h.value = t.reason);
				return;
			}
			let r = await n.core.publicationData();
			if (e !== x || !i.value.open) return;
			i.value.focus({ preventScroll: !0 }), b = (c.value ? "/submissions/" : "/mine/") + encodeURIComponent(r.id);
			let a = await l(b);
			e === x && i.value.open && (E(a), p.value = r.title, Object.assign(y, {
				author: a.author || "",
				description: a.description || "",
				license: a.license || "CC-BY-SA-4.0",
				editable: !!a.editable,
				confirmed: !1
			}), URL.revokeObjectURL(m.value), m.value = URL.createObjectURL(r.cover), f.value = !0);
		}
		function O() {
			i.value.showModal(), D(te);
		}
		function k() {
			x++, i.value.close(), URL.revokeObjectURL(m.value), m.value = "", n.core.resume();
		}
		async function A() {
			if (!s.value || !y.confirmed) return;
			let e = s.value.published;
			h.value = "";
			let t = await n.core.packageBook({
				author: y.author.trim(),
				description: y.description.trim(),
				license: y.license,
				editable: y.editable
			});
			E(await l(b, {
				method: "POST",
				headers: {
					"Content-Type": "application/zip",
					"If-Match": `"${s.value.revision}"`
				},
				body: t
			})), y.confirmed = !1, c.value ? v.value = C.value === "approved" ? "reviewApproved" : "submissionDone" : _.value = e ? "publicationUpdated" : "publicationDone", await W(), i.value.open && ((c.value ? o.value : a.value).focus({ preventScroll: !0 }), i.value.scrollTop = 0), n.core.notice(r(c.value ? "submissionDone" : _.value));
		}
		function j() {
			s.value?.published && confirm(r("withdrawConfirm")) && D(async () => {
				E(await l(b + (c.value ? "?publication=1" : ""), {
					method: "DELETE",
					headers: { "If-Match": `"${s.value.revision}"` }
				})), n.core.notice(r("publicationWithdrawn"));
			});
		}
		function ne() {
			c.value && s.value && confirm(r("cancelSubmissionConfirm")) && D(async () => {
				E(await l(b, {
					method: "DELETE",
					headers: { "If-Match": `"${s.value.revision}"` }
				})), await W(), i.value.open && (o.value.focus({ preventScroll: !0 }), i.value.scrollTop = 0);
			});
		}
		async function re() {
			let e = u(s.value.url);
			if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(e);
			else {
				let t = document.createElement("textarea");
				t.value = e, document.body.append(t), t.select();
				let n = document.execCommand("copy");
				if (t.remove(), !n) throw Error("publication_copy_failed");
			}
			n.core.notice(r("publicationCopied"));
		}
		function M() {
			!n.core.state.busy && document.visibilityState !== "hidden" && i.value.open && d.value && D(te);
		}
		return Qn(() => {
			window.addEventListener("focus", M), document.addEventListener("visibilitychange", M);
		}), $n(() => {
			x++, URL.revokeObjectURL(m.value), window.removeEventListener("focus", M), document.removeEventListener("visibilitychange", M);
		}), t({ open: O }), (e, t) => (Y(), X("dialog", {
			id: "publish-dialog",
			ref_key: "dialog",
			ref: i,
			tabindex: "-1",
			"aria-labelledby": "publish-heading",
			onCancel: k
		}, [
			Z("div", Hs, [Z("h2", Us, P(H(r)(c.value ? "submitReview" : "publishBook")), 1), Z("button", {
				id: "close-publish",
				onClick: k
			}, P(H(r)("close")), 1)]),
			Z("p", {
				id: "publish-intro",
				hidden: c.value
			}, P(H(r)("publishIntro")), 9, Ws),
			Z("section", {
				id: "publication-current",
				role: "status",
				"aria-live": "polite",
				hidden: !s.value?.published
			}, [
				Z("h3", {
					id: "publication-success-title",
					ref_key: "success",
					ref: a,
					tabindex: "-1"
				}, P(H(r)(_.value)), 513),
				Z("p", null, P(H(r)("publicationActive")), 1),
				Z("a", {
					id: "publication-link",
					href: g.value || void 0,
					target: "_blank",
					rel: "noopener"
				}, P(H(r)("openPublication")), 9, Ks),
				Z("button", {
					id: "copy-publication",
					onClick: t[0] ||= (e) => D(re)
				}, P(H(r)("copyPublication")), 1),
				Z("button", {
					id: "withdraw-publication",
					onClick: j
				}, P(H(r)("withdrawPublication")), 1)
			], 8, Gs),
			Z("section", {
				id: "submission-state",
				role: "status",
				"data-status": C.value,
				hidden: !c.value || !s.value || C.value === "draft"
			}, [
				Z("h3", {
					id: "submission-heading",
					ref_key: "submissionHeading",
					ref: o,
					tabindex: "-1"
				}, P(H(r)(w.value)), 513),
				Z("p", Js, P(H(r)(T.value)), 1),
				Z("p", Ys, P(s.value?.feedback), 1),
				Z("button", {
					id: "refresh-submission",
					onClick: t[1] ||= (e) => D(te)
				}, P(H(r)("refreshReviewStatus")), 1),
				Z("button", {
					id: "cancel-submission",
					hidden: !["pending", "returned"].includes(C.value),
					onClick: ne
				}, P(H(r)("cancelSubmission")), 9, Xs)
			], 8, qs),
			Z("p", Zs, P(H(r)(h.value)), 1),
			Z("section", {
				id: "publication-login",
				hidden: !d.value
			}, [
				Z("p", null, P(H(r)("publicationLogin")), 1),
				Z("a", {
					id: "publication-sign-in",
					class: "button",
					href: "/api/auth/oidc/login?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, P(H(r)("publicationSignIn")), 9, $s),
				Z("a", {
					id: "publication-student-sign-in",
					class: "button",
					href: "/student.html?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, P(H(r)("studentSignIn")), 9, ec),
				Z("button", {
					id: "check-publication-login",
					onClick: t[2] ||= (e) => D(te)
				}, P(H(r)("refreshRebost")), 1)
			], 8, Qs),
			Z("p", {
				id: "submission-intro",
				hidden: !c.value
			}, P(H(r)("submissionIntro")), 9, tc),
			Z("form", {
				id: "publish-form",
				hidden: !f.value,
				onSubmit: t[8] ||= Ha((e) => D(A, "publishing"), ["prevent"])
			}, [
				Z("h3", rc, P(p.value), 1),
				Z("img", {
					id: "publish-cover",
					src: m.value || void 0,
					width: "320",
					height: "180",
					alt: ""
				}, null, 8, ic),
				Z("label", null, [Z("span", null, P(H(r)("publishAuthor")), 1), G(Z("input", {
					id: "publish-author",
					"onUpdate:modelValue": t[3] ||= (e) => y.author = e,
					required: "",
					maxlength: "120",
					autocomplete: "off"
				}, null, 512), [[ja, y.author]])]),
				Z("label", null, [Z("span", null, P(H(r)("publishDescription")), 1), G(Z("textarea", {
					id: "publish-description",
					"onUpdate:modelValue": t[4] ||= (e) => y.description = e,
					maxlength: "2000",
					rows: "3"
				}, null, 512), [[ja, y.description]])]),
				Z("label", null, [Z("span", null, P(H(r)("publishLicense")), 1), G(Z("select", {
					id: "publish-license",
					"onUpdate:modelValue": t[5] ||= (e) => y.license = e
				}, [...t[9] ||= [
					Z("option", { value: "CC-BY-SA-4.0" }, "CC BY-SA 4.0", -1),
					Z("option", { value: "CC-BY-4.0" }, "CC BY 4.0", -1),
					Z("option", { value: "CC0-1.0" }, "CC0 1.0", -1)
				]], 512), [[Fa, y.license]])]),
				Z("label", ac, [G(Z("input", {
					id: "publish-editable",
					"onUpdate:modelValue": t[6] ||= (e) => y.editable = e,
					type: "checkbox"
				}, null, 512), [[Ma, y.editable]]), Z("span", null, P(H(r)("publishEditable")), 1)]),
				Z("label", oc, [G(Z("input", {
					id: "publish-confirm",
					"onUpdate:modelValue": t[7] ||= (e) => y.confirmed = e,
					type: "checkbox",
					required: ""
				}, null, 512), [[Ma, y.confirmed]]), Z("span", sc, P(H(r)(c.value ? "submissionConfirm" : "publishConfirm")), 1)]),
				Z("button", cc, P(H(r)(c.value ? "submitReview" : s.value?.published ? "updatePublication" : "publishBook")), 1)
			], 40, nc)
		], 544));
	}
}, uc = { class: "dialog-heading" }, dc = { id: "shared-heading" }, fc = ["hidden", "href"], pc = ["aria-label"], mc = {
	id: "shared-status",
	role: "status"
}, hc = {
	id: "shared-books",
	class: "books"
}, gc = ["src"], _c = ["onClick"], vc = ["hidden"], yc = { class: "dialog-heading" }, bc = { id: "published-title" }, xc = ["src", "title"], Sc = {
	__name: "SharedStories",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(""), s = /* @__PURE__ */ V([]), c = /* @__PURE__ */ V(""), d = /* @__PURE__ */ V(!1), f = /* @__PURE__ */ V(""), p = /* @__PURE__ */ V(null), m = 0, h = 0;
		function g(e) {
			return n.core.action(async () => {
				try {
					await e();
				} catch (e) {
					throw i.value.open && (f.value = "publication_unavailable"), e;
				} finally {
					await W();
				}
			});
		}
		async function _(e = !1) {
			let t = ++h;
			e || (m = 0, s.value = [], c.value = ""), d.value = !1, f.value = "loading";
			let n = await l("/books?" + new URLSearchParams({
				q: o.value,
				offset: m,
				limit: 24
			}));
			t === h && i.value.open && (n.bank_url && (c.value = u(n.bank_url)), s.value.push(...n.items.filter((e) => /^[a-f0-9]{32}$/.test(e.external_id))), m += n.items.length, d.value = !!n.more, f.value = s.value.length ? "" : "sharedEmpty");
		}
		function v() {
			i.value.showModal(), g(() => _());
		}
		function y() {
			h++, i.value.close();
		}
		function b(e) {
			p.value = e, a.value.showModal();
		}
		function x() {
			a.value.close(), p.value = null;
		}
		return $n(() => h++), t({ open: v }), (e, t) => (Y(), X(q, null, [Z("dialog", {
			id: "shared-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "shared-heading",
			onCancel: t[3] ||= (e) => /* @__PURE__ */ B(h) ? h.value++ : h++
		}, [
			Z("div", uc, [Z("h2", dc, P(H(r)("sharedStories")), 1), Z("button", {
				id: "close-shared",
				onClick: y
			}, P(H(r)("close")), 1)]),
			Z("p", null, P(H(r)("sharedIntro")), 1),
			Z("a", {
				id: "shared-bank",
				hidden: !c.value,
				href: c.value || void 0,
				target: "_blank",
				rel: "noopener"
			}, P(H(r)("openBank")), 9, fc),
			Z("form", {
				id: "shared-search-form",
				onSubmit: t[1] ||= Ha((e) => g(() => _()), ["prevent"])
			}, [G(Z("input", {
				id: "shared-search",
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				type: "search",
				maxlength: "200",
				"aria-label": H(r)("searchBooksLabel")
			}, null, 8, pc), [[ja, o.value]]), Z("button", null, P(H(r)("searchBooks")), 1)], 32),
			Z("p", mc, P(H(r)(f.value)), 1),
			Z("div", hc, [(Y(!0), X(q, null, tr(s.value, (e) => (Y(), X("article", {
				key: e.external_id,
				class: "book-card"
			}, [
				Z("img", {
					src: `/api/llibres/public/${e.external_id}/cover.png`,
					alt: "",
					loading: "lazy"
				}, null, 8, gc),
				Z("button", {
					class: "book-open",
					onClick: (t) => b(e)
				}, P(e.title), 9, _c),
				Z("p", null, P(e.author), 1)
			]))), 128))]),
			Z("button", {
				id: "shared-more",
				hidden: !d.value,
				onClick: t[2] ||= (e) => g(() => _(!0))
			}, P(H(r)("moreBooks")), 9, vc)
		], 544), Z("dialog", {
			id: "published-reader",
			ref_key: "reader",
			ref: a,
			"aria-labelledby": "published-title",
			onCancel: t[4] ||= (e) => p.value = null
		}, [Z("div", yc, [Z("h2", bc, P(p.value?.title), 1), Z("button", {
			id: "close-published-reader",
			onClick: x
		}, P(H(r)("close")), 1)]), Z("iframe", {
			id: "published-frame",
			src: p.value ? `/api/llibres/public/${p.value.external_id}/index.html` : void 0,
			title: H(r)("publishedBook"),
			sandbox: "allow-downloads"
		}, null, 8, xc)], 544)], 64));
	}
}, Cc = ["id", "aria-labelledby"], wc = ["href", "aria-label"], Tc = ["src", "alt"], Ec = { class: "eyebrow" }, Dc = ["id"], Oc = { class: "actions" }, kc = ["id", "href"], Ac = ["id", "disabled"], jc = ["id", "href"], Mc = {
	__name: "DemoBook",
	props: {
		locale: String,
		busy: Boolean,
		comic: Boolean
	},
	emits: ["edit", "read"],
	setup(e) {
		let t = e, n = zi(() => "/examples/" + (t.comic ? "la-granota" : "la-papallona")), r = zi(() => t.comic ? "La granota i la idea brillant" : "La papallona i els colors del bosc"), i = zi(() => t.comic ? "comic-demo" : "demo");
		return (t, o) => (Y(), X("section", {
			id: e.comic ? "demo-comic" : "demo-book",
			class: "demo-book",
			"aria-labelledby": i.value + "-heading"
		}, [Z("a", {
			href: n.value + "/",
			"aria-label": H(a)[e.locale].demoRead,
			onClick: o[0] ||= Ha((e) => t.$emit("read"), ["prevent"])
		}, [Z("img", {
			src: n.value + "/cover.png",
			alt: r.value,
			width: "320",
			height: "180",
			loading: "lazy"
		}, null, 8, Tc)], 8, wc), Z("div", null, [
			Z("p", Ec, P(H(a)[e.locale][e.comic ? "demoComicLabel" : "demoLabel"]), 1),
			Z("h2", { id: i.value + "-heading" }, P(r.value), 9, Dc),
			Z("p", null, P(H(a)[e.locale].demoDescription), 1),
			Z("div", Oc, [
				Z("a", {
					id: e.comic ? "read-comic-demo" : "read-demo",
					class: "demo-link",
					href: n.value + "/",
					onClick: o[1] ||= Ha((e) => t.$emit("read"), ["prevent"])
				}, P(H(a)[e.locale].demoRead), 9, kc),
				Z("button", {
					id: e.comic ? "edit-comic-demo" : "edit-demo",
					disabled: e.busy,
					onClick: o[2] ||= (e) => t.$emit("edit")
				}, P(H(a)[e.locale].demoEdit), 9, Ac),
				Z("a", {
					id: e.comic ? "download-comic-demo" : "download-demo",
					class: "demo-link",
					href: n.value + "/" + (e.comic ? "la-granota" : "la-papallona") + ".elpx",
					download: ""
				}, P(H(a)[e.locale].demoDownload), 9, jc)
			])
		])], 8, Cc));
	}
}, Nc = { class: "dialog-heading" }, Pc = { id: "bubble-heading" }, Fc = ["aria-label"], Ic = { for: "bubble-kind" }, Lc = { value: "speech" }, Rc = { value: "thought" }, zc = { value: "narration" }, Bc = { for: "bubble-text" }, Vc = {
	id: "save-bubble",
	class: "primary",
	type: "submit"
}, Hc = {
	__name: "BubbleDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = /* @__PURE__ */ V(null), i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(""), o = /* @__PURE__ */ V("speech"), s = null, c;
		function l(e = !1) {
			let t = e ? n.core.bubbleDraft() : null;
			(!e || t) && (s = t?.id || null, a.value = t?.text || "", o.value = t?.kind || "speech", c = n.core.context(), r.value.showModal(), i.value.focus());
		}
		async function u() {
			if (!a.value.trim() || !n.core.matches(c)) return;
			let e = {
				id: s,
				kind: o.value,
				text: a.value
			};
			r.value.close(), await n.core.action(() => n.core.writeBubble(e)) === !1 && n.core.matches(c) && (r.value.showModal(), i.value.focus());
		}
		return t({ open: l }), (t, n) => (Y(), X("dialog", {
			id: "bubble-dialog",
			ref_key: "dialog",
			ref: r,
			"aria-labelledby": "bubble-heading"
		}, [Z("form", { onSubmit: Ha(u, ["prevent"]) }, [
			Z("div", Nc, [Z("h2", Pc, P(e.core.t("comicBubble")), 1), Z("button", {
				id: "close-bubble",
				type: "button",
				"aria-label": e.core.t("close"),
				onClick: n[0] ||= (e) => r.value.close()
			}, "×", 8, Fc)]),
			Z("label", Ic, P(e.core.t("comicBubbleKind")), 1),
			G(Z("select", {
				id: "bubble-kind",
				"onUpdate:modelValue": n[1] ||= (e) => o.value = e
			}, [
				Z("option", Lc, P(e.core.t("comicSpeech")), 1),
				Z("option", Rc, P(e.core.t("comicThought")), 1),
				Z("option", zc, P(e.core.t("comicNarration")), 1)
			], 512), [[Fa, o.value]]),
			Z("label", Bc, P(e.core.t("comicBubbleText")), 1),
			G(Z("textarea", {
				id: "bubble-text",
				ref_key: "input",
				ref: i,
				"onUpdate:modelValue": n[2] ||= (e) => a.value = e,
				maxlength: "300",
				rows: "5",
				required: ""
			}, null, 512), [[ja, a.value]]),
			Z("p", null, P(e.core.t("comicBubbleHint")), 1),
			Z("button", Vc, P(e.core.t("save")), 1)
		], 32)], 512));
	}
}, Uc = { class: "masthead" }, Wc = ["disabled"], Gc = ["hidden"], Kc = { class: "hero" }, qc = { class: "eyebrow" }, Jc = { class: "intro" }, Yc = { class: "actions" }, Xc = ["hidden"], Zc = ["hidden"], Qc = { class: "storage-note" }, $c = {
	class: "hero-art",
	"aria-hidden": "true"
}, el = { class: "book-cover" }, tl = { href: "/about.html" }, nl = ["hidden"], rl = ["hidden"], il = { id: "busy-text" }, al = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ V(null), n = /* @__PURE__ */ V(null), r = /* @__PURE__ */ V(null), i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(null), c = /* @__PURE__ */ V(null), l = /* @__PURE__ */ V(null), u = /* @__PURE__ */ V(null), d = /* @__PURE__ */ V(null), f = Za({
			host: () => i.value.host(),
			refreshShelf: () => t.value.refresh(),
			read: (e, t) => a.value.open(e, t),
			pick: () => o.value.open(),
			deviceImage: () => u.value.click()
		}), h = f.state, g = f.t;
		function _(e) {
			let t = e.target.files[0];
			e.target.value = "", f.action(() => f.importFile(t), "loading");
		}
		function v(e) {
			let t = e.target.files[0];
			e.target.value = "", t && f.action(() => f.image(t));
		}
		function y(e = !1) {
			f.action(async () => {
				let t = e ? "la-granota" : "la-papallona", n = await fetch("/examples/" + t + "/" + t + ".elpx");
				if (!n.ok) throw Error("invalid");
				let r = await n.arrayBuffer();
				if (r.byteLength > 26214400) throw Error("invalid");
				f.language("va", !1), await f.importFile(new File([r], t + ".elpx", { type: "application/zip" }));
			}, "loading");
		}
		function b(e) {
			return f.action(async () => {
				let t = await m(e);
				f.notice("");
				let n = new URL(location.href);
				n.searchParams.set("example", e), history.replaceState(null, "", n), a.value.open(t.title, t.slides, {
					preview: !0,
					download: "/examples/" + e + "/" + e + ".elpx"
				});
			}, "loading");
		}
		function x() {
			let e = new URL(location.href);
			e.searchParams.delete("example"), history.replaceState(null, "", e);
		}
		return Qn(async () => {
			await f.start();
			let e = new URL(location.href).searchParams.get("example");
			p.includes(e) && await b(e);
		}), $n(f.dispose), (e, p) => (Y(), X(q, null, [
			Z("header", Uc, [p[14] ||= Z("a", {
				class: "brand",
				href: "/"
			}, [pi("◧ EduTicTac "), Z("b", null, "Llibres")], -1), G(Z("select", {
				id: "language",
				"onUpdate:modelValue": p[0] ||= (e) => H(h).locale = e,
				disabled: H(h).active,
				onChange: p[1] ||= (e) => H(f).language(H(h).locale),
				"aria-label": "Idioma"
			}, [...p[13] ||= [
				Z("option", { value: "es" }, "Castellano", -1),
				Z("option", { value: "ca" }, "Català", -1),
				Z("option", { value: "va" }, "Valencià", -1),
				Z("option", { value: "en" }, "English", -1)
			]], 40, Wc), [[Fa, H(h).locale]])]),
			Z("main", {
				id: "home",
				hidden: H(h).active
			}, [
				Z("section", Kc, [Z("div", null, [
					Z("p", qc, P(H(g)("eyebrow")), 1),
					Z("h1", null, P(H(g)("headline")), 1),
					Z("p", Jc, P(H(g)("intro")), 1),
					Z("div", Yc, [
						Z("button", {
							id: "new-book",
							onClick: p[2] ||= (e) => r.value.open(),
							class: "primary"
						}, P(H(g)("new")), 1),
						Z("button", {
							id: "open-book",
							onClick: p[3] ||= (e) => d.value.click()
						}, P(H(g)("open")), 1),
						Z("button", {
							id: "open-shared",
							onClick: p[4] ||= (e) => c.value.open(),
							hidden: !H(h).publicationEnabled
						}, P(H(g)("sharedStories")), 9, Xc),
						Z("button", {
							id: "open-reviews",
							onClick: p[5] ||= (e) => n.value.open(),
							hidden: !H(h).publicationEnabled
						}, P(H(g)("reviewBooks")), 9, Zc)
					]),
					Z("p", Qc, P(H(g)("local")), 1)
				]), Z("div", $c, [Z("div", el, [
					Z("span", null, [
						pi(P(H(g)("coverTop")), 1),
						p[15] ||= Z("br", null, null, -1),
						pi(P(H(g)("coverBottom")), 1)
					]),
					p[16] ||= Z("div", { class: "sun" }, null, -1),
					p[17] ||= Z("div", { class: "hill" }, null, -1),
					Z("i", null, P(H(g)("storySubtitle")), 1)
				]), p[18] ||= Z("span", { class: "star" }, "✳", -1)])]),
				Q(Mc, {
					locale: H(h).locale,
					busy: H(h).busy,
					onEdit: p[6] ||= (e) => y(!1),
					onRead: p[7] ||= (e) => b("la-papallona")
				}, null, 8, ["locale", "busy"]),
				Q(Mc, {
					comic: "",
					locale: H(h).locale,
					busy: H(h).busy,
					onEdit: p[8] ||= (e) => y(!0),
					onRead: p[9] ||= (e) => b("la-granota")
				}, null, 8, ["locale", "busy"]),
				Q(so, {
					ref_key: "shelf",
					ref: t,
					locale: H(h).locale,
					action: H(f).action,
					"open-book": H(f).openStored
				}, null, 8, [
					"locale",
					"action",
					"open-book"
				]),
				Z("footer", null, [Z("span", null, P(H(g)("footer")), 1), Z("a", tl, P(H(g)("about")), 1)])
			], 8, Gc),
			Q(Os, {
				ref_key: "workshop",
				ref: i,
				core: H(f),
				onPublish: p[10] ||= (e) => s.value.open(),
				onBubble: p[11] ||= (e) => l.value.open(e)
			}, null, 8, ["core"]),
			Q(Hc, {
				ref_key: "bubble",
				ref: l,
				core: H(f)
			}, null, 8, ["core"]),
			Q(Jo, {
				ref_key: "createDialog",
				ref: r,
				locale: H(h).locale,
				core: H(f)
			}, null, 8, ["locale", "core"]),
			Q(Ls, {
				ref_key: "reader",
				ref: a,
				core: H(f),
				onExampleClose: x
			}, null, 8, ["core"]),
			Q(Vs, {
				ref_key: "picker",
				ref: o,
				core: H(f),
				onDevice: p[12] ||= (e) => u.value.click()
			}, null, 8, ["core"]),
			Q(lc, {
				ref_key: "publication",
				ref: s,
				core: H(f)
			}, null, 8, ["core"]),
			Q(Sc, {
				ref_key: "shared",
				ref: c,
				core: H(f)
			}, null, 8, ["core"]),
			Q(Po, {
				ref_key: "reviews",
				ref: n,
				locale: H(h).locale,
				action: H(f).action,
				notice: H(f).notice
			}, null, 8, [
				"locale",
				"action",
				"notice"
			]),
			Z("input", {
				id: "image-input",
				ref_key: "imageInput",
				ref: u,
				type: "file",
				accept: "image/png,image/jpeg,image/webp",
				hidden: "",
				onChange: v
			}, null, 544),
			Z("input", {
				id: "file-input",
				ref_key: "fileInput",
				ref: d,
				type: "file",
				accept: ".elpx",
				hidden: "",
				onChange: _
			}, null, 544),
			Z("div", {
				id: "notice",
				role: "status",
				"aria-live": "polite",
				class: Te({ error: H(h).noticeError }),
				hidden: !H(h).notice
			}, P(H(h).notice), 11, nl),
			Z("div", {
				id: "busy",
				hidden: !H(h).busy,
				role: "status"
			}, [p[19] ||= Z("span", { class: "spinner" }, null, -1), Z("span", il, P(H(g)(H(h).busyKey)), 1)], 8, rl)
		], 64));
	}
};
// src/ui.js
function ol() {
	return Ka(al).mount("#app");
}
export { ol as mountLlibres };
