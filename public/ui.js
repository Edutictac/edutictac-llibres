import { Editor as e } from "/adapter.js";
import { allBooks as t, removeBook as n, saveBook as r, uid as i } from "/store.js";
import { messages as a } from "/i18n.js";
import { inspectBook as o } from "/import.js";
import { coverImage as s, publicationPackage as c, publicationRequest as l, safeWebURL as u } from "/publication.js";
import { preferredLocale as d, supportedLanguages as f } from "/locale.js";
import { fetchImage as p, selection as m } from "/rebost.js";
import { exampleSlugs as h, loadExample as g } from "/examples.js";
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function _(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var v = {}, y = [], b = () => {}, x = () => !1, S = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), C = (e) => e.startsWith("onUpdate:"), w = Object.assign, ee = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, T = Object.prototype.hasOwnProperty, E = (e, t) => T.call(e, t), D = Array.isArray, O = (e) => ie(e) === "[object Map]", k = (e) => ie(e) === "[object Set]", te = (e) => ie(e) === "[object Date]", A = (e) => typeof e == "function", j = (e) => typeof e == "string", M = (e) => typeof e == "symbol", N = (e) => typeof e == "object" && !!e, ne = (e) => (N(e) || A(e)) && A(e.then) && A(e.catch), re = Object.prototype.toString, ie = (e) => re.call(e), ae = (e) => ie(e).slice(8, -1), oe = (e) => ie(e) === "[object Object]", P = (e) => j(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, se = /* @__PURE__ */ _(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ce = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, le = /-\w/g, F = ce((e) => e.replace(le, (e) => e.slice(1).toUpperCase())), ue = /\B([A-Z])/g, de = ce((e) => e.replace(ue, "-$1").toLowerCase()), fe = ce((e) => e.charAt(0).toUpperCase() + e.slice(1)), pe = ce((e) => e ? `on${fe(e)}` : ""), me = (e, t) => !Object.is(e, t), he = (e, ...t) => {
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
	if (D(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = j(r) ? we(r) : be(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (j(e) || N(e)) return e;
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
	if (j(e)) t = e;
	else if (D(e)) for (let n = 0; n < e.length; n++) {
		let r = Te(e[n]);
		r && (t += r + " ");
	}
	else if (N(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Ee = /* @__PURE__ */ _("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
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
	let r = O(e), i = O(t);
	if (r || i || (r = k(e), i = k(t), r || i)) return r && i ? ke(e, t, n) : !1;
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
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = M(e), i = M(t), r || i ? e === t : (r = D(e), i = D(t), r || i ? r && i ? je(e, t, n, Oe) : !1 : (r = N(e), i = N(t), r || i ? !r || !i ? !1 : je(e, t, n, Ae) : String(e) === String(t))));
}
function Ne(e, t) {
	return e.findIndex((e) => Me(e, t));
}
var Pe = (e) => !!(e && e.__v_isRef === !0), I = (e) => j(e) ? e : e == null ? "" : D(e) || N(e) && (e.toString === re || !A(e.toString)) ? Pe(e) ? I(e.value) : JSON.stringify(e, Fe, 2) : String(e), Fe = (e, t) => Pe(t) ? Fe(e, t.value) : O(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ie(t, r) + " =>"] = n, e), {}) } : k(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ie(e)) } : M(t) ? Ie(t) : N(t) && !D(t) && !oe(t) ? String(t) : t, Ie = (e, t = "") => M(e) ? `Symbol(${e.description ?? t})` : e, L, Le = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && L && (L.active ? (this.parent = L, this.index = (L.scopes || (L.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = L;
			try {
				return L = this, e();
			} finally {
				L = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = L, L = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (L === this) L = this.prevScope;
			else {
				let e = L;
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
}, R, Re = /* @__PURE__ */ new WeakSet(), ze = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, L && (L.active ? L.effects.push(this) : this.flags &= -2);
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
		let e = R, t = Qe;
		R = this, Qe = !0;
		try {
			return this.fn();
		} finally {
			qe(this), R = e, Qe = t, this.flags &= -3;
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
	let t = e.dep, n = R, r = Qe;
	R = e, Qe = !0;
	try {
		Ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || me(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		R = n, Qe = r, qe(e), e.flags &= -3;
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
		let e = R;
		R = void 0;
		try {
			t();
		} finally {
			R = e;
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
		if (!R || !Qe || R === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== R) t = this.activeLink = new it(R, this), R.deps ? (t.prevDep = R.depsTail, R.depsTail.nextDep = t, R.depsTail = t) : R.deps = R.depsTail = t, ot(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = R.depsTail, t.nextDep = void 0, R.depsTail.nextDep = t, R.depsTail = t, R.deps === t && (R.deps = e);
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
function z(e, t, n) {
	if (Qe && R) {
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
		let i = D(e), a = i && P(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ut || !M(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ut)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ct)), O(e) && s(o.get(lt)));
				break;
			case "delete":
				i || (s(o.get(ct)), O(e) && s(o.get(lt)));
				break;
			case "set": O(e) && s(o.get(ct));
		}
	}
	Ge();
}
function ft(e) {
	let t = /* @__PURE__ */ B(e);
	return t === e || (z(t, "iterate", ut), /* @__PURE__ */ Qt(e)) ? t : /* @__PURE__ */ Zt(e) ? /* @__PURE__ */ Xt(e) ? t.map((e) => nn(tn(e))) : t.map(nn) : t.map(tn);
}
function pt(e) {
	return z(e = /* @__PURE__ */ B(e), "iterate", ut), e;
}
function mt(e, t) {
	return /* @__PURE__ */ Zt(e) ? nn(/* @__PURE__ */ Xt(e) ? tn(t) : t) : tn(t);
}
var ht = {
	__proto__: null,
	[Symbol.iterator]() {
		return gt(this, Symbol.iterator, (e) => mt(this, e));
	},
	concat(...e) {
		return ft(this).concat(...e.map((e) => D(e) ? ft(e) : e));
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
		return s ? tn(t) : t;
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
	let r = /* @__PURE__ */ B(e);
	z(r, "iterate", ut);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ $t(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), r[t](...n)) : i;
}
function St(e, t, n = []) {
	et(), We();
	let r = (/* @__PURE__ */ B(e))[t].apply(e, n);
	return Ge(), tt(), r;
}
var Ct = /* @__PURE__ */ _("__proto__,__v_isRef,__isVue"), wt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(M));
function Tt(e) {
	M(e) || (e = String(e));
	let t = /* @__PURE__ */ B(this);
	return z(t, "has", e), t.hasOwnProperty(e);
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
		let a = D(e);
		if (!r) {
			let e;
			if (a && (e = ht[t])) return e;
			if (t === "hasOwnProperty") return Tt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ V(e) ? e : n);
		if ((M(t) ? wt.has(t) : Ct(t)) || (r || z(e, "get", t), i)) return o;
		if (/* @__PURE__ */ V(o)) {
			let e = a && P(t) ? o : o.value;
			return r && N(e) ? /* @__PURE__ */ Jt(e) : e;
		}
		return N(o) ? r ? /* @__PURE__ */ Jt(o) : /* @__PURE__ */ Kt(o) : o;
	}
}, Dt = class extends Et {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = D(e) && P(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Zt(i);
			if (!/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (i = /* @__PURE__ */ B(i), n = /* @__PURE__ */ B(n)), !a && /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : E(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ V(e) ? e : r);
		return e === /* @__PURE__ */ B(r) && s && (o ? me(n, i) && dt(e, "set", t, n, i) : dt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = E(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && dt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return M(t) && wt.has(t) || z(e, "has", t), n;
	}
	ownKeys(e) {
		return z(e, "iterate", D(e) ? "length" : ct), Reflect.ownKeys(e);
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
		let i = this.__v_raw, a = /* @__PURE__ */ B(i), o = O(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Mt : t ? nn : tn;
		return !t && z(a, "iterate", c ? lt : ct), w(Object.create(l), { next() {
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
			let r = this.__v_raw, i = /* @__PURE__ */ B(r), a = /* @__PURE__ */ B(n);
			e || (me(n, a) && z(i, "get", n), z(i, "get", a));
			let { has: o } = Nt(i), s = t ? Mt : e ? nn : tn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && z(/* @__PURE__ */ B(t), "iterate", ct), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ B(n), i = /* @__PURE__ */ B(t);
			return e || (me(t, i) && z(r, "has", t), z(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ B(a), s = t ? Mt : e ? nn : tn;
			return !e && z(o, "iterate", ct), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return w(n, e ? {
		add: Ft("add"),
		set: Ft("set"),
		delete: Ft("delete"),
		clear: Ft("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ B(this), r = Nt(n), i = /* @__PURE__ */ B(e), a = !t && !/* @__PURE__ */ Qt(e) && !/* @__PURE__ */ Zt(e) ? i : e;
			return r.has.call(n, a) || me(e, a) && r.has.call(n, e) || me(i, a) && r.has.call(n, i) || (n.add(a), dt(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ Qt(n) || /* @__PURE__ */ Zt(n) || (n = /* @__PURE__ */ B(n));
			let r = /* @__PURE__ */ B(this), { has: i, get: a } = Nt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ B(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? me(n, s) && dt(r, "set", e, n, s) : dt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ B(this), { has: n, get: r } = Nt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ B(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && dt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ B(this), t = e.size !== 0, n = e.clear();
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
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(E(n, i) && i in r ? n : r, i, a);
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
	if (!N(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Gt(ae(e));
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
function B(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ B(t) : e;
}
function en(e) {
	return !E(e, "__v_skip") && Object.isExtensible(e) && ge(e, "__v_skip", !0), e;
}
var tn = (e) => N(e) ? /* @__PURE__ */ Kt(e) : e, nn = (e) => N(e) ? /* @__PURE__ */ Jt(e) : e;
// @__NO_SIDE_EFFECTS__
function V(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
	return an(e, !1);
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return an(e, !0);
}
function an(e, t) {
	return /* @__PURE__ */ V(e) ? e : new on(e, t);
}
var on = class {
	constructor(e, t) {
		this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ B(e), this._value = t ? e : tn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qt(e) || /* @__PURE__ */ Zt(e);
		e = n ? e : /* @__PURE__ */ B(e), me(e, t) && (this._rawValue = e, this._value = n ? e : tn(e), this.dep.trigger());
	}
};
function U(e) {
	return /* @__PURE__ */ V(e) ? e.value : e;
}
var sn = {
	get: (e, t, n) => t === "__v_raw" ? e : U(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function cn(e) {
	return /* @__PURE__ */ Xt(e) ? e : new Proxy(e, sn);
}
var ln = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && R !== this) return Ue(this, !0), !0;
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
function un(e, t, n = !1) {
	let r, i;
	return A(e) ? r = e : (r = e.get, i = e.set), new ln(r, i, n);
}
function dn(e, t = Infinity, n) {
	if (t <= 0 || !N(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ V(e)) dn(e.value, t, n);
	else if (D(e)) for (let r = 0; r < e.length; r++) dn(e[r], t, n);
	else if (k(e) || O(e)) e.forEach((e) => {
		dn(e, t, n);
	});
	else if (oe(e)) {
		for (let r in e) dn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && dn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function fn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		mn(e, t, n);
	}
}
function pn(e, t, n, r) {
	if (A(e)) {
		let i = fn(e, t, n, r);
		return i && ne(i) && i.catch((e) => {
			mn(e, t, n);
		}), i;
	}
	if (D(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(pn(e[a], t, n, r));
		return i;
	}
}
function mn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || v;
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
			et(), fn(a, null, 10, [
				e,
				i,
				o
			]), tt();
			return;
		}
	}
	hn(e, n, i, r, o);
}
function hn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var W = [], gn = -1, _n = [], vn = null, yn = 0, bn = /* @__PURE__ */ Promise.resolve(), xn = null;
function G(e) {
	let t = xn || bn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
	let t = gn + 1, n = W.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = W[r], a = An(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Cn(e) {
	if (!(e.flags & 1)) {
		let t = An(e), n = W[W.length - 1];
		!n || !(e.flags & 2) && t >= An(n) ? W.push(e) : W.splice(Sn(t), 0, e), e.flags |= 1, wn();
	}
}
function wn() {
	xn ||= bn.then(jn);
}
function Tn(e) {
	if (!D(e)) vn && e.id === -1 ? vn.splice(yn + 1, 0, e) : e.flags & 1 || (_n.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) _n.push(e[t]);
	wn();
}
function En(e, t, n, r = gn + 1) {
	for (; r < W.length; r++) {
		let n = W[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			W.splice(r, 1), r = e ? r - 1 : gn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function Dn(e, t, n = 0) {
	if (_n.length) {
		let e = _n, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < _n.length; i++) {
				let a = _n[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? _n[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => An(e) - An(t));
		if (_n.length = r, vn) {
			for (let e = 0; e < i.length; e++) vn.push(i[e]);
			return;
		}
		for (vn = i, yn = 0; yn < vn.length; yn++) {
			let e = vn[yn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		vn = null, yn = 0;
	}
}
var On = !1;
function kn(e, t) {
	if (On) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(_n);
	e(), On = !0;
	try {
		En(void 0, t), Dn(void 0, n, t);
	} finally {
		On = !1;
	}
}
var An = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function jn(e) {
	try {
		for (gn = 0; gn < W.length; gn++) {
			let e = W[gn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), fn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; gn < W.length; gn++) {
			let e = W[gn];
			e && (e.flags &= -2);
		}
		gn = -1, W.length = 0, Dn(e), xn = null, (W.length || _n.length) && jn(e);
	}
}
var Mn = null, Nn = null;
function Pn(e) {
	let t = Mn;
	return Mn = e, Nn = e && e.type.__scopeId || null, t;
}
function Fn(e, t = Mn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ii(-1);
		let i = Pn(t), a = ti.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ti.length; e > a; e--) ni();
			Pn(i), r._d && ii(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function K(e, t) {
	if (Mn === null) return e;
	let n = Ri(Mn), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = v] = t[e];
		i && (A(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && dn(a), r.push({
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
function In(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (et(), pn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), tt());
	}
}
var Ln = /* @__PURE__ */ Symbol("_vte"), Rn = (e) => e.__isTeleport, zn = /* @__PURE__ */ Symbol("_leaveCb");
function Bn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== $r) {
			t = n;
			break;
		}
	}
	return t;
}
function Vn(e) {
	if (!Xn(e)) return Rn(e.type) && e.children ? Bn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && A(n.default)) return n.default();
	}
}
function Hn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Hn(Rn(n.type) && Vn(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === J && D(e.children)) {
		let n = gr(e.children, !1);
		n && Hn(n, t);
	}
}
function Un(e) {
	if (e.component) return Un(e.component.subTree);
	if (e.type === J) {
		let t = D(e.children) && gr(e.children, !1);
		return t ? Un(t) : void 0;
	}
	if (e.type !== $r) return e;
}
function Wn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Gn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Kn = /* @__PURE__ */ new WeakMap();
function qn(e, t, n, r, i = !1) {
	if (D(e)) {
		e.forEach((e, a) => qn(e, t && (D(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Yn(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && qn(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Ri(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === v ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ B(d), p = d === v ? x : (e) => !Gn(u, e) && E(f, e), m = (e, t) => !(t && Gn(u, t));
	if (l != null && l !== c) {
		if (Jn(t), j(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ V(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (A(c)) fn(c, s, 12, [o, u]);
	else {
		let t = j(c), r = /* @__PURE__ */ V(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) D(n) && ee(n, a);
					else if (D(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Kn.delete(e);
				};
				t.id = -1, Kn.set(e, t), q(t, n);
			} else Jn(e), s();
		}
	}
}
function Jn(e) {
	let t = Kn.get(e);
	t && (t.flags |= 8, Kn.delete(e));
}
ye().requestIdleCallback, ye().cancelIdleCallback;
var Yn = (e) => !!e.type.__asyncLoader, Xn = (e) => e.type.__isKeepAlive;
function Zn(e, t, n = Ti, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			et();
			let i = Oi(n), a = pn(t, n, e, r);
			return i(), tt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Qn = (e) => (t, n = Ti) => {
	ji && e !== "sp" || Zn(e, (...e) => t(...e), n);
}, $n = Qn("m"), er = Qn("um"), tr = /* @__PURE__ */ Symbol.for("v-ndc");
function nr(e, t, n, r) {
	let i, a = n && n[r], o = D(e);
	if (o || j(e)) {
		let n = o && /* @__PURE__ */ Xt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Qt(e), s = /* @__PURE__ */ Zt(e), e = pt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? nn(tn(e[n])) : tn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (N(e)) {
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
var rr = (e) => e ? Ai(e) ? Ri(e) : rr(e.parent) : null, ir = /* @__PURE__ */ w(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => rr(e.parent),
	$root: (e) => rr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= G.bind(e.proxy),
	$watch: (e) => b
}), ar = (e, t) => e !== v && !e.__isScriptSetup && E(e, t), or = {
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
			else if (ar(r, t)) return o[t] = 1, r[t];
			else if (E(a, t)) return o[t] = 3, a[t];
			else if (n !== v && E(n, t)) return o[t] = 4, n[t];
			else o[t] = 0;
		}
		let l = ir[t], u, d;
		if (l) return t === "$attrs" && z(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== v && E(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, E(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return ar(i, t) ? (i[t] = n, !0) : E(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || ar(t, s) || E(a, s) || E(r, s) || E(ir, s) || E(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? E(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function sr() {
	return {
		app: null,
		config: {
			isNativeTag: x,
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
var cr = 0;
function lr(e, t) {
	return function(n, r = null) {
		A(n) || (n = w({}, n)), r != null && !N(r) && (r = null);
		let i = sr(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: cr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Vi,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && A(e.install) ? (a.add(e), e.install(c, ...t)) : A(e) && (a.add(e), e(c, ...t))), c;
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
					let u = c._ceVNode || $(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ri(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (pn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ur;
				ur = c;
				try {
					return e();
				} finally {
					ur = t;
				}
			}
		};
		return c;
	};
}
var ur = null, dr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${F(t)}Modifiers`] || e[`${de(t)}Modifiers`];
function fr(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || v, i = n, a = t.startsWith("update:"), o = a && dr(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => j(e) ? e.trim() : e)), o.number && (i = i.map(_e)));
	let s, c = r[s = pe(t)] || r[s = pe(F(t))];
	!c && a && (c = r[s = pe(de(t))]), c && pn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, pn(l, e, 6, i);
	}
}
function pr(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (D(a) ? a.forEach((e) => o[e] = null) : w(o, a), N(e) && r.set(e, o), o) : (N(e) && r.set(e, null), null);
}
function mr(e, t) {
	return !e || !S(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), E(e, t[0].toLowerCase() + t.slice(1)) || E(e, de(t)) || E(e, t));
}
function hr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Pn(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = gi(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = gi(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : _r(s);
		}
	} catch (t) {
		ti.length = 0, mn(t, e, 1), _ = $($r);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(C) && (v = vr(v, a)), y = pi(y, v, !1, !0));
	}
	return n.dirs && (y = pi(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && Hn(Rn(y.type) && Vn(y) || y, n.transition), _ = y, Pn(g), _;
}
function gr(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (si(r)) {
			if (r.type !== $r || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var _r = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || S(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, vr = (e, t) => {
	let n = {};
	for (let r in e) C(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function yr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? br(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (xr(o, r, n) && !mr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || br(r, o, l) : !!o;
	return !1;
}
function br(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!E(e, a) || xr(t, e, a) && !mr(n, a)) return !0;
	}
	return !1;
}
function xr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && N(r) && N(i) ? !Me(r, i) : r !== i;
}
function Sr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Cr = {}, wr = () => Object.create(Cr), Tr = (e) => Object.getPrototypeOf(e) === Cr;
function Er(e, t, n, r = !1) {
	let i = {}, a = wr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Or(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ qt(i) : e.type.props ? i : a, e.attrs = a;
}
function Dr(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ B(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (mr(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (E(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = F(o);
						i[t] = kr(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Or(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (E(t, a) || (r = de(a)) !== a && E(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = kr(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && E(t, e) || (delete a[e], l = !0);
	}
	l && dt(e.attrs, "set", "");
}
function Or(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (se(c)) continue;
		let l = t[c], u;
		i && E(i, u = F(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : mr(e.emitsOptions, c) || c in r && l === r[c] || (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ B(n), r = s || v;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = kr(i, t, s, r[s], e, !E(r, s));
		}
	}
	return o;
}
function kr(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = E(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && A(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Oi(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === de(n)) && (r = !0));
	}
	return r;
}
function Ar(e, t, n = !1) {
	let r = t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [];
	if (!a) return N(e) && r.set(e, y), y;
	if (D(a)) for (let e = 0; e < a.length; e++) {
		let t = F(a[e]);
		jr(t) && (o[t] = v);
	}
	else if (a) for (let e in a) {
		let t = F(e);
		if (jr(t)) {
			let n = a[e], r = o[t] = D(n) || A(n) ? { type: n } : w({}, n), i = r.type, c = !1, l = !0;
			if (D(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = A(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = A(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || E(r, "default")) && s.push(t);
		}
	}
	let c = [o, s];
	return N(e) && r.set(e, c), c;
}
function jr(e) {
	return e[0] !== "$" && !se(e);
}
var Mr = (e) => e === "_" || e === "_ctx" || e === "$stable", Nr = (e) => D(e) ? e.map(gi) : [gi(e)], Pr = (e, t, n) => {
	if (t._n) return t;
	let r = Fn((...e) => Nr(t(...e)), n);
	return r._c = !1, r;
}, Fr = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Mr(n)) continue;
		let i = e[n];
		if (A(i)) t[n] = Pr(n, i, r);
		else if (i != null) {
			let e = Nr(i);
			t[n] = () => e;
		}
	}
}, Ir = (e, t) => {
	let n = Nr(t);
	e.slots.default = () => n;
}, Lr = (e, t, n) => {
	for (let r in t) (n || !Mr(r)) && (e[r] = t[r]);
}, Rr = (e, t, n) => {
	let r = e.slots = wr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Lr(r, t, n), n && ge(r, "_", e, !0)) : Fr(t, r);
	} else t && Ir(e, t);
}, zr = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = v;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Lr(i, t, n) : (a = !t.$stable, Fr(t, i)), o = t;
	} else t && (Ir(e, t), o = { default: 1 });
	if (a) for (let e in i) !Mr(e) && o[e] == null && delete i[e];
}, q = Zr;
function Br(e) {
	return Vr(e);
}
function Vr(e, t) {
	let n = ye();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = b, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ci(e, t) && (r = de(e), P(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === y && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Qr:
				g(e, t, n, r);
				break;
			case $r:
				_(e, t, n, r);
				break;
			case ei:
				e ?? x(t, n, r, o);
				break;
			case J:
				te(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? A(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, pe);
		}
		u != null && i ? qn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && qn(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, _ = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), D(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && E(e.children, f, null, i, s, Hr(e, c), l, d), _ && In(e, null, i, "created"), T(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !se(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && bi(p, i, e);
		}
		_ && In(e, null, i, "beforeMount");
		let v = Wr(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && q(() => {
			try {
				p && bi(p, i, e), v && g.enter(f), _ && In(e, null, i, "mounted");
			} finally {}
		}, s);
	}, T = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Xr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				T(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? _i(e[l]) : gi(e[l]);
			h(null, c, t, n, r, i, a, o, s);
		}
	}, D = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || v, m = t.props || v, h;
		if (n && Ur(n, !1), (h = m.onVnodeBeforeUpdate) && bi(h, n, t, e), f && In(t, e, n, "beforeUpdate"), n && Ur(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? O(e.dynamicChildren, d, c, n, r, Hr(t, i), o) : s || re(e, t, c, null, n, r, Hr(t, i), o, !1), l > 0) {
			if (l & 16) k(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && k(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && q(() => {
			h && bi(h, n, t, e), f && In(t, e, n, "updated");
		}, r);
	}, O = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Yr(c), f = u && (c.type === J || !ci(c, l) || c.shapeFlag & 198) ? d(u) : n;
			h(c, l, f, null, r, i, a, o, !0);
		}
	}, k = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== v) for (let o in t) !se(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (se(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, te = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), E(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (O(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Gr(e, t, !0)) : re(e, t, n, f, a, o, c, l, u);
	}, A = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : j(t, n, r, i, a, o, c) : M(e, t, c);
	}, j = (e, t, n, r, i, a, o) => {
		let s = e.component = wi(e, r, i);
		if (Xn(e) && (s.ctx.renderer = pe), Mi(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, N, o, a), !e.el) {
				let r = s.subTree = $($r);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else N(s, e, t, n, i, a, o);
	}, M = (e, t, n) => {
		let r = t.component = e.component;
		if (yr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, ne(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, N = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = qr(e);
					if (n) {
						t && (t.el = c.el, ne(e, t, o)), n.asyncDep.then(() => {
							q(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Ur(e, !1), t ? (t.el = c.el, ne(e, t, o)) : t = c, n && he(n), (f = t.props && t.props.onVnodeBeforeUpdate) && bi(f, s, t, c), Ur(e, !0);
				let p = hr(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), de(m), e, i, a), t.el = p.el, u === null && Sr(e, p.el), r && q(r, i), (f = t.props && t.props.onVnodeUpdated) && q(() => bi(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Yn(t);
				if (Ur(e, !1), l && he(l), !m && (o = c && c.onVnodeBeforeMount) && bi(o, d, t), Ur(e, !0), s && ge) {
					let t = () => {
						e.subTree = hr(e), ge(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = hr(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && q(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					q(() => bi(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Yn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && q(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ze(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Ur(e, !0), l();
	}, ne = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Dr(e, t.props, r, n), zr(e, t.children, n), et(), En(e), tt();
	}, re = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				ae(l, f, n, r, i, a, o, s, c);
				return;
			}
			if (p & 256) {
				ie(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && ue(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? ae(l, f, n, r, i, a, o, s, c) : ue(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && E(f, n, r, i, a, o, s, c));
	}, ie = (e, t, n, r, i, a, o, s, c) => {
		e ||= y, t ||= y;
		let l = e.length, u = t.length, d = Math.min(l, u), f = 0;
		for (; f < d; f++) {
			let r = t[f] = c ? _i(t[f]) : gi(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? ue(e, i, a, !0, !1, d) : E(t, n, r, i, a, o, s, c, d);
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? _i(t[l]) : gi(t[l]);
			if (ci(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? _i(t[f]) : gi(t[f]);
			if (ci(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? _i(t[l]) : gi(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) P(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? _i(t[l]) : gi(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, b = f - m + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= b) {
					P(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (C[_ - m] === 0 && ci(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? P(r, i, a, !0) : (C[u - m] = l + 1, u >= S ? S = u : x = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let w = x ? Kr(C) : y;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Yr(f) : r;
				C[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? oe(d, n, p, 2) : _--);
			}
		}
	}, oe = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) oe(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, pe);
		else if (c === J) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) oe(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === ei) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[zn] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), q(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[zn];
					s._isLeaving && s[zn](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, P = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (et(), qn(s, null, n, e, !0), tt()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Yn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && bi(_, t, e), u & 6) F(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && In(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, pe, r) : l && !l.hasOnce && (a !== J || d > 0 && d & 64) ? ue(l, t, n, !1, !0) : (a === J && d & 384 || !i && u & 16) && ue(c, t, n), r && ce(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && q(() => {
			_ && bi(_, t, e), h && In(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ce = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e, o = t === J;
		if (o && !a) {
			le(n, r);
			return;
		}
		if (t === ei) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let s = o ? Un(e) : e, c = () => {
			o ? d(n) && le(n, r) : i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (s && s.shapeFlag & 1 && a && !a.persisted) {
			let { leave: e, delayLeave: t } = a, n = s.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, le = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, F = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Jr(c), Jr(l), r && he(r), i.stop(), a ? (a.flags |= 8, P(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, P(o, e, t, n)), s && q(s, t), q(() => {
			e.isUnmounted = !0;
		}, t);
	}, ue = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) P(e[o], t, n, r, i);
	}, de = (e) => {
		if (e.shapeFlag & 6) return de(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[Ln];
		return n ? f(n) : t;
	}, fe = (e, t, n) => {
		kn(() => {
			e == null ? t._vnode && P(t._vnode, null, null, !0) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : Ci());
	}, pe = {
		p: h,
		um: P,
		m: oe,
		r: ce,
		mt: j,
		mc: E,
		pc: re,
		pbc: O,
		n: de,
		o: e
	}, me, ge;
	return t && ([me, ge] = t(pe)), {
		render: fe,
		hydrate: me,
		createApp: lr(fe, me)
	};
}
function Hr({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ur({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Wr(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gr(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (D(r) && D(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = _i(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Gr(t, a)), a.type === Qr && (a.patchFlag === -1 && (a = i[e] = _i(a)), a.el = t.el), a.type === $r && !a.el && (a.el = t.el);
	}
}
function Kr(e) {
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
function qr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : qr(t);
}
function Jr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Yr(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Yr(t.subTree) : null;
}
var Xr = (e) => e.__isSuspense;
function Zr(e, t) {
	t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
}
var J = /* @__PURE__ */ Symbol.for("v-fgt"), Qr = /* @__PURE__ */ Symbol.for("v-txt"), $r = /* @__PURE__ */ Symbol.for("v-cmt"), ei = /* @__PURE__ */ Symbol.for("v-stc"), ti = [], Y = null;
function X(e = !1) {
	ti.push(Y = e ? null : []);
}
function ni() {
	ti.pop(), Y = ti[ti.length - 1] || null;
}
var ri = 1;
function ii(e, t = !1) {
	ri += e, e < 0 && Y && t && (Y.hasOnce = !0);
}
function ai(e) {
	return e.dynamicChildren = ri > 0 ? Y || y : null, ni(), ri > 0 && Y && Y.push(e), e;
}
function Z(e, t, n, r, i, a) {
	return ai(Q(e, t, n, r, i, a, !0));
}
function oi(e, t, n, r, i) {
	return ai($(e, t, n, r, i, !0));
}
function si(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ci(e, t) {
	return e.type === t.type && e.key === t.key;
}
var li = ({ key: e }) => e ?? null, ui = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : j(e) || /* @__PURE__ */ V(e) || A(e) ? {
	i: Mn,
	r: e,
	k: t,
	f: !!n
} : e);
function Q(e, t = null, n = null, r = 0, i = null, a = e === J ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && li(t),
		ref: t && ui(t),
		scopeId: Nn,
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
		ctx: Mn
	};
	return s ? (vi(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= j(n) ? 8 : 16), ri > 0 && !o && Y && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Y.push(c), c;
}
var $ = di;
function di(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== tr || (e = $r), si(e)) {
		let r = pi(e, t, !0);
		return n && vi(r, n), ri > 0 && !a && Y && (r.shapeFlag & 6 ? Y[Y.indexOf(e)] = r : Y.push(r)), r.patchFlag = -2, r;
	}
	if (zi(e) && (e = e.__vccOpts), t) {
		t = fi(t);
		let { class: e, style: n } = t;
		e && !j(e) && (t.class = Te(e)), N(n) && (/* @__PURE__ */ $t(n) && !D(n) && (n = w({}, n)), t.style = be(n));
	}
	let o = j(e) ? 1 : Xr(e) ? 128 : Rn(e) ? 64 : N(e) ? 4 : A(e) ? 2 : 0;
	return Q(e, t, n, r, i, o, a, !0);
}
function fi(e) {
	return e ? /* @__PURE__ */ $t(e) || Tr(e) ? w({}, e) : e : null;
}
function pi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? yi(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && li(l),
		ref: t && t.ref ? n && a ? D(a) ? a.concat(ui(t)) : [a, ui(t)] : ui(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== J ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && pi(e.ssContent),
		ssFallback: e.ssFallback && pi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && Hn(u, c.clone(u)), u;
}
function mi(e = " ", t = 0) {
	return $(Qr, null, e, t);
}
function hi(e = "", t = !1) {
	return t ? (X(), oi($r, null, e)) : $($r, null, e);
}
function gi(e) {
	return e == null || typeof e == "boolean" ? $($r) : D(e) ? $(J, null, e.slice()) : si(e) ? _i(e) : $(Qr, null, String(e));
}
function _i(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : pi(e);
}
function vi(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (D(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), vi(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Tr(t) ? t._ctx = Mn : r === 3 && Mn && (Mn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (A(t)) {
		if (r & 65) {
			vi(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: Mn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [mi(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function yi(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Te([t.class, r.class]));
		else if (e === "style") t.style = be([t.style, r.style]);
		else if (S(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(D(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !C(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function bi(e, t, n, r = null) {
	pn(e, t, 7, [n, r]);
}
var xi = sr(), Si = 0;
function Ci() {
	return Si;
}
function wi(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || xi, a = {
		uid: Si++,
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
		propsOptions: Ar(r, i),
		emitsOptions: pr(r, i),
		emit: null,
		emitted: null,
		propsDefaults: v,
		inheritAttrs: r.inheritAttrs,
		ctx: v,
		data: v,
		props: v,
		attrs: v,
		slots: v,
		refs: v,
		setupState: v,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = fr.bind(null, a), e.ce && e.ce(a), a;
}
var Ti = null, Ei, Di;
{
	let e = ye(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ei = t("__VUE_INSTANCE_SETTERS__", (e) => Ti = e), Di = t("__VUE_SSR_SETTERS__", (e) => ji = e);
}
var Oi = (e) => {
	let t = Ti;
	return Ei(e), e.scope.on(), () => {
		e.scope.off(), Ei(t);
	};
}, ki = () => {
	Ti && Ti.scope.off(), Ei(null);
};
function Ai(e) {
	return e.vnode.shapeFlag & 4;
}
var ji = !1;
function Mi(e, t = !1, n = !1) {
	t && Di(t);
	let { props: r, children: i } = e.vnode, a = Ai(e);
	Er(e, r, a, t), Rr(e, i, n || t);
	let o = a ? Ni(e, t) : void 0;
	return t && Di(!1), o;
}
function Ni(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, or);
	let { setup: r } = n;
	if (r) {
		et();
		let n = e.setupContext = r.length > 1 ? Li(e) : null, i = Oi(e), a = fn(r, e, 0, [e.props, n]), o = ne(a);
		if (tt(), i(), (o || e.sp) && !Yn(e) && Wn(e), o) {
			if (a.then(ki, ki), t) return a.then((n) => {
				Di(!0);
				try {
					Pi(e, n, t);
				} finally {
					Di(!1);
				}
			}).catch((t) => {
				mn(t, e, 0);
			});
			e.asyncDep = a;
		} else Pi(e, a, t);
	} else Fi(e, t);
}
function Pi(e, t, n) {
	A(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : N(t) && (e.setupState = cn(t)), Fi(e, n);
}
function Fi(e, t, n) {
	let r = e.type;
	e.render ||= r.render || b;
}
var Ii = { get(e, t) {
	return z(e, "get", ""), e[t];
} };
function Li(e) {
	return {
		attrs: new Proxy(e.attrs, Ii),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ri(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(cn(en(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in ir) return ir[n](e);
		},
		has(e, t) {
			return t in e || t in ir;
		}
	}) : e.proxy;
}
function zi(e) {
	return A(e) && "__vccOpts" in e;
}
var Bi = (e, t) => /* @__PURE__ */ un(e, t, ji), Vi = "3.5.44", Hi = void 0, Ui = typeof window < "u" && window.trustedTypes;
if (Ui) try {
	Hi = /* @__PURE__ */ Ui.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Wi = Hi ? (e) => Hi.createHTML(e) : (e) => e, Gi = "http://www.w3.org/2000/svg", Ki = "http://www.w3.org/1998/Math/MathML", qi = typeof document < "u" ? document : null, Ji = qi && /* @__PURE__ */ qi.createElement("template"), Yi = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? qi.createElementNS(Gi, e) : t === "mathml" ? qi.createElementNS(Ki, e) : n ? qi.createElement(e, { is: n }) : qi.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => qi.createTextNode(e),
	createComment: (e) => qi.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => qi.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Ji.innerHTML = Wi(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ji.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Xi = /* @__PURE__ */ Symbol("_vtc");
function Zi(e, t, n) {
	let r = e[Xi];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Qi = /* @__PURE__ */ Symbol("_vod"), $i = /* @__PURE__ */ Symbol("_vsh"), ea = /* @__PURE__ */ Symbol(""), ta = /(?:^|;)\s*display\s*:/;
function na(e, t, n) {
	let r = e.style, i = j(n), a = !1;
	if (n && !i) {
		if (t) {
			if (j(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? ia(r, t, "");
			}
			else for (let e in t) n[e] ?? ia(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ia(r, i, "") : ca(e, i, !j(t) && t ? t[i] : void 0, o) || ia(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[ea];
			e && (n += ";" + e), r.cssText = n, a = ta.test(n);
		}
	} else t && e.removeAttribute("style");
	Qi in e && (i && t === n || (e[Qi] = a ? r.display : ""), e[$i] && (r.display = "none"));
}
var ra = /\s*!important$/;
function ia(e, t, n) {
	if (D(n)) n.forEach((n) => ia(e, t, n));
	else if (n ??= "", t.startsWith("--")) ra.test(n) ? e.setProperty(t, n.replace(ra, ""), "important") : e.setProperty(t, n);
	else {
		let r = sa(e, t);
		ra.test(n) ? e.setProperty(de(r), n.replace(ra, ""), "important") : e[r] = n;
	}
}
var aa = [
	"Webkit",
	"Moz",
	"ms"
], oa = {};
function sa(e, t) {
	let n = oa[t];
	if (n) return n;
	let r = F(t);
	if (r !== "filter" && r in e) return oa[t] = r;
	r = fe(r);
	for (let n = 0; n < aa.length; n++) {
		let i = aa[n] + r;
		if (i in e) return oa[t] = i;
	}
	return t;
}
function ca(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && j(r) && n === r;
}
var la = "http://www.w3.org/1999/xlink";
function ua(e, t, n, r, i, a = Ee(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(la, t.slice(6, t.length)) : e.setAttributeNS(la, t, n) : n == null || a && !De(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : M(n) ? String(n) : n);
}
function da(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Wi(n) : n);
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
function fa(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function pa(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ma = /* @__PURE__ */ Symbol("_vei");
function ha(e, t, n, r, i = null) {
	let a = e[ma] || (e[ma] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = va(t);
		r ? fa(e, n, a[t] = Sa(r, i), s) : o && (pa(e, n, o, s), a[t] = void 0);
	}
}
var ga = /(Once|Passive|Capture)$/, _a = /^on:?(?:Once|Passive|Capture)$/;
function va(e) {
	let t, n;
	for (; (n = e.match(ga)) && !_a.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : de(e.slice(2)), t];
}
var ya = 0, ba = /* @__PURE__ */ Promise.resolve(), xa = () => ya ||= (ba.then(() => ya = 0), Date.now());
function Sa(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (D(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && pn(e, t, 5, a);
			}
		} else pn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = xa(), n;
}
var Ca = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, wa = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Zi(e, r, o) : t === "style" ? na(e, n, r) : S(t) ? C(t) || ha(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Ta(e, t, r, o)) ? (da(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || ua(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ea(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !j(r))) ? da(e, F(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ua(e, t, r, o));
};
function Ta(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ca(t) && A(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ca(t) && j(n) ? !1 : t in e;
}
function Ea(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = F(t);
	return Array.isArray(n) ? n.some((e) => F(e) === r) : Object.keys(n).some((e) => F(e) === r);
}
var Da = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return D(t) ? (e) => he(t, e) : t;
};
function Oa(e) {
	e.target.composing = !0;
}
function ka(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Aa = /* @__PURE__ */ Symbol("_assign"), ja = /* @__PURE__ */ Symbol("_initialValue");
function Ma(e, t, n) {
	return t && (e = e.trim()), n && (e = _e(e)), e;
}
var Na = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[ja] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[ja] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[Aa] = Da(i);
		let a = r || i.props && i.props.type === "number";
		fa(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Aa](Ma(e.value, n, a));
		}), (n || a) && fa(e, "change", () => {
			e.value = Ma(e.value, n, a);
		}), t || (fa(e, "compositionstart", Oa), fa(e, "compositionend", ka), fa(e, "change", ka));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[ja];
		delete e[ja], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Aa](Ma(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Aa] = Da(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? _e(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Pa = {
	deep: !0,
	created(e, t, n) {
		e[Aa] = Da(n), fa(e, "change", () => {
			let t = e._modelValue, n = Ba(e), r = e.checked, i = e[Aa];
			if (D(t)) {
				let e = Ne(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (k(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Va(e, r));
		});
	},
	mounted: Fa,
	beforeUpdate(e, t, n) {
		e[Aa] = Da(n), Fa(e, t, n);
	}
};
function Fa(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (D(t)) i = Ne(t, r.props.value) > -1;
	else if (k(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Me(t, Va(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Ia = {
	created(e, { value: t }, n) {
		e.checked = Me(t, n.props.value), e[Aa] = Da(n), fa(e, "change", () => {
			e[Aa](Ba(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Aa] = Da(r), t !== n && (e.checked = Me(t, r.props.value));
	}
}, La = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, fa(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? _e(Ba(e)) : Ba(e)), r = e.multiple, i = r ? k(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? D(i) ? t.slice() : t : i];
			try {
				e[Aa](i);
			} finally {
				G(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[Aa] = Da(r);
	},
	mounted(e, { value: t }) {
		za(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Aa] = Da(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && Ra(t, n[1], n[0]) || za(e, t);
	}
};
function Ra(e, t, n) {
	if (!n || D(e)) return Me(e, t);
	if (k(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function za(e, t) {
	let n = e.multiple, r = D(t);
	if (!n || r || k(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ba(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Ne(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Me(Ba(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ba(e) {
	return "_value" in e ? e._value : e.value;
}
function Va(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ha = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ua = {
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
	exact: (e, t) => Ha.some((n) => e[`${n}Key`] && !t.includes(n))
}, Wa = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ua[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ga = /* @__PURE__ */ w({ patchProp: wa }, Yi), Ka;
function qa() {
	return Ka ||= Br(Ga);
}
var Ja = ((...e) => {
	let t = qa().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Xa(e);
		if (!r) return;
		let i = t._component;
		A(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Ya(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Ya(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Xa(e) {
	return j(e) ? document.querySelector(e) : e;
}
// src/workshop.js
function Za(t) {
	let n = /* @__PURE__ */ Kt({
		locale: d(),
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
	}), l, u, p, m = !1, h, g = !1, _ = (e) => a[n.locale][e] || e;
	function v(e, t = !1) {
		n.notice = e, n.noticeError = t, clearTimeout(h), h = setTimeout(() => {
			n.notice = "";
		}, t ? 12e3 : 4500);
	}
	async function y(e, t = "working") {
		if (!n.busy) {
			n.busy = !0, n.busyKey = t;
			try {
				return await e();
			} catch (e) {
				return console.error("Llibres:", e), v(_([
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
				if (g && n.active && u) {
					g = !1;
					try {
						await k();
					} catch {
						v(_("error"), !0);
					}
				}
				n.busy = !1, await G();
			}
		}
	}
	function b(e, t = !0) {
		if (f.includes(e)) {
			n.locale = e;
			try {
				localStorage.setItem("llibres-language", n.locale);
			} catch {}
			t && window.commonsLanguage?.remember(n.locale), document.documentElement.lang = n.locale === "va" ? "ca-valencia" : n.locale;
		}
	}
	function x() {
		u && (m = !0, n.statusKey = "pending");
	}
	function S() {
		n.pages = l.pages().map(({ id: e, pageName: t }) => ({
			id: e,
			pageName: t
		}));
		let e = l.contentPages();
		n.selected = p, n.contentCount = e.length, n.contentIndex = e.findIndex((e) => e.id === p), n.automatic = n.contentIndex < 0;
		let t = l.comicInfo();
		n.comic = t.enabled, n.comicPanels = n.automatic ? 0 : t.layout, n.comicPanelIndex = Math.min(n.comicPanelIndex, Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex, n.bubbleSelected = !n.automatic && !!l.selectedBubble(), l.window.document.body.classList.toggle("llibres-credits", n.automatic), l.window.frameElement.inert = n.automatic;
	}
	async function C() {
		n.active = !0, n.advanced = !1, await G();
		let r = JSON.parse(localStorage.getItem("exe_user_preferences") || "{}");
		r.userPreferences ||= {}, r.userPreferences.locale = { value: n.locale === "va" ? "ca-valencia" : n.locale }, localStorage.setItem("exe_user_preferences", JSON.stringify(r));
		let i = document.createElement("iframe");
		i.id = "engine", i.title = _("edit"), i.src = "/engine/index.html", t.host().replaceChildren(i), l = new e(i), l.comicSelectionChanged = () => {
			n.bubbleSelected = !!l.selectedBubble();
		}, await l.ready(), l.changed = x, l.connectImagePicker(ce);
	}
	async function w(e = !0) {
		if (!u) return;
		n.statusKey = "saving";
		let t = await l.save(), i = {
			...u,
			title: l.title() || _("title"),
			bytes: t,
			pageCount: l.pages().length,
			updatedAt: Date.now()
		};
		await r(i), u = i, m = !1, n.statusKey = "saved", l.pages().some((e) => e.id === p) || (p = l.contentPages()[0].id), e && await l.select(p), S(), m = !1, n.statusKey = "saved";
	}
	async function ee({ title: e, template: t, layout: r = 2 }) {
		u = null, await C(), u = {
			id: i(),
			template: t,
			language: n.locale,
			title: e,
			createdAt: Date.now()
		}, n.newComicLayout = [
			2,
			3,
			4
		].includes(r) ? r : 2, p = await l.create(e, t, n.locale, n.newComicLayout), n.title = e, S(), await w();
	}
	async function T(e) {
		u = null, await C(), u = e, p = await l.open(e.bytes), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), S(), m = !1, n.statusKey = "saved";
	}
	async function E(e) {
		if (!e) return;
		let t = await o(await e.arrayBuffer());
		u = null, await C(), u = {
			id: i(),
			language: n.locale,
			template: "import",
			title: e.name,
			createdAt: Date.now()
		}, p = await l.open(t), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), S(), await w();
	}
	function D() {
		let e = n.title.trim();
		e && (l.title(e), u.title = e, x());
	}
	async function O() {
		await w(!1), u = null, m = !1, n.active = !1, ve(), t.host().replaceChildren(), await t.refreshShelf();
	}
	async function k(e = p) {
		await l.select(e), p = e, S();
	}
	async function te() {
		p = await l.addPage(_("page") + " " + l.contentPages().length, n.comic ? Number(n.newComicLayout) : 0), x(), S();
	}
	async function A(e) {
		await l.move(p, e), x(), S();
	}
	async function j() {
		let e = l.pages().find((e) => e.id === p)?.pageName, t = prompt(_("renamePrompt"), e);
		t?.trim() && (await l.rename(p, t.trim().slice(0, 120)), x(), S());
	}
	async function M() {
		if (l.contentPages().length <= 1) return v(_("onePage"));
		confirm(_("deletePage")) && (p = await l.delete(p), x(), S());
	}
	async function N(e) {
		await l.drawing(e), e && x();
	}
	function ne() {
		let e = l.window.document.body.classList.toggle("llibres-simple");
		n.advanced = !e;
	}
	function re(e, t, n = "application/octet-stream") {
		let r = URL.createObjectURL(new Blob([e], { type: n })), i = document.createElement("a");
		i.href = r, i.download = t, i.click(), setTimeout(() => URL.revokeObjectURL(r), 3e4);
	}
	let ie = (e) => (u.title || "llibre").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 70) + e;
	async function ae() {
		await w(), re(u.bytes, ie(".elpx"), "application/zip"), v(_("downloaded"));
	}
	async function oe(e, t) {
		let n = await l.export(e);
		re(n.bytes, ie(t), n.mimeType);
	}
	async function P() {
		await w(!1), t.read(u.title, await l.slides());
	}
	function se() {
		n.busy ? g = !0 : y(() => k());
	}
	function ce() {
		!n.busy && u && (n.rebostEnabled ? t.pick() : t.deviceImage());
	}
	let le = () => ({
		bookId: u?.id,
		pageId: p,
		editor: l
	}), F = (e) => e.bookId === u?.id && e.pageId === p && e.editor === l;
	async function ue(e, t) {
		e && (await l.image(e, t), t && await l.select(p), S());
	}
	function de(e = n.comicPanelIndex) {
		n.comicPanelIndex = Math.min(Math.max(0, Number(e) || 0), Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex;
	}
	function fe() {
		return l.bubbleDraft();
	}
	async function pe(e) {
		await l.writeBubble(e), x(), v("");
	}
	async function me() {
		return await w(!1), {
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
		m && (e.preventDefault(), e.returnValue = "");
	}
	async function _e() {
		b(n.locale), window.addEventListener("pageshow", ve), window.addEventListener("focus", ve), window.addEventListener("beforeunload", ge);
		for (let [e, t] of [["publication", "publicationEnabled"], ["rebost", "rebostEnabled"]]) fetch("/" + e + "-status", { cache: "no-store" }).then(async (e) => {
			if (e.ok) {
				let r = (await e.json()).enabled;
				n[t] = r === !0 || t === "publication" && Array.isArray(r) && r.includes("recursos");
			}
		}).catch(() => {});
		try {
			await t.refreshShelf();
		} catch {
			v(_("storageError"), !0);
		}
	}
	function ve() {
		n.active || b(d(!0));
	}
	function ye() {
		window.removeEventListener("pageshow", ve), window.removeEventListener("focus", ve), clearTimeout(h), window.removeEventListener("beforeunload", ge);
	}
	return {
		state: n,
		t: _,
		notice: v,
		action: y,
		language: b,
		start: _e,
		dispose: ye,
		create: ee,
		openStored: T,
		importFile: E,
		renameTitle: D,
		persist: w,
		back: O,
		select: k,
		addPage: te,
		move: A,
		renamePage: j,
		deletePage: M,
		drawing: N,
		advanced: ne,
		downloadBook: ae,
		exportBook: oe,
		read: P,
		pickImage: ce,
		image: ue,
		chooseComicPanel: de,
		bubbleDraft: fe,
		writeBubble: pe,
		context: le,
		matches: F,
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
		let t = e, n = (e) => a[t.locale][e] || e, r = Bi(() => new Date(t.book.updatedAt).toLocaleDateString(t.locale === "va" ? "ca-ES-valencia" : t.locale));
		return (t, i) => (X(), Z("article", Qa, [
			Q("button", {
				class: "book-open",
				disabled: e.busy,
				onClick: i[0] ||= (n) => t.$emit("open", e.book)
			}, I(e.book.title), 9, $a),
			Q("p", null, I(r.value) + " · " + I(e.book.pageCount) + " " + I(n("pages").toLowerCase()), 1),
			Q("button", {
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
		let i = e, o = (e) => a[i.locale][e] || e, s = /* @__PURE__ */ rn([]), c = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(null), u = 0;
		async function d() {
			let e = ++u, n = await t();
			e === u && (s.value = n.sort((e, t) => t.updatedAt - e.updatedAt), await G());
		}
		function f(e, t = "working") {
			if (!c.value) return i.action(async () => {
				c.value = !0;
				try {
					return await e();
				} finally {
					c.value = !1, await G();
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
				c.value = !1, await G(), i.focus();
			});
		}
		return r({ refresh: d }), (t, n) => (X(), Z("section", no, [Q("div", ro, [Q("h2", io, I(o("myBooks")), 1), Q("span", ao, I(s.value.length), 1)]), Q("div", {
			id: "books",
			ref_key: "list",
			ref: l,
			class: "books"
		}, [s.value.length ? hi("", !0) : (X(), Z("div", oo, I(o("empty")), 1)), (X(!0), Z(J, null, nr(s.value, (t) => (X(), oi(to, {
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
		return (t, n) => (X(), Z("article", co, [
			e.item.status === "pending" || e.item.status === "returned" || e.item.published ? (X(), Z("img", {
				key: 0,
				src: e.item.status === "pending" || e.item.status === "returned" ? `/api/llibres/reviews/${e.item.id}/files/cover.png` : `/api/llibres/public/${e.item.id}/cover.png`,
				alt: "",
				loading: "lazy",
				style: { width: "100%" }
			}, null, 8, lo)) : hi("", !0),
			Q("button", {
				class: "review-open",
				onClick: n[0] ||= (n) => t.$emit("open", e.item)
			}, I(e.item.title), 1),
			Q("p", null, I([
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
		}, o = /* @__PURE__ */ H(null), s = /* @__PURE__ */ H(null), c = /* @__PURE__ */ H(null), u = /* @__PURE__ */ H([]), d = /* @__PURE__ */ H(null), f = /* @__PURE__ */ H(!1), p = /* @__PURE__ */ H(!1), m = /* @__PURE__ */ H(!1), h = /* @__PURE__ */ H(!1), g = /* @__PURE__ */ H(""), _ = /* @__PURE__ */ H(""), v = /* @__PURE__ */ H(""), y = /* @__PURE__ */ H(!1), b = 0, x = 0, S = Bi(() => "/api/auth/oidc/login?next=" + encodeURIComponent("/llibres-login.html?lang=" + n.locale)), C = Bi(() => d.value?.status === "pending"), w = Bi(() => {
			let e = d.value;
			if (e) {
				if (["pending", "returned"].includes(e.status)) return `/api/llibres/reviews/${e.id}/files/index.html`;
				if (e.published) return `/api/llibres/public/${e.id}/index.html`;
			}
		}), ee = (e) => r(e.message) === e.message ? "publication_unavailable" : e.message;
		function T(e) {
			if (!h.value) return n.action(async () => {
				h.value = !0;
				try {
					return await e();
				} catch (e) {
					throw s.value.open ? _.value = ee(e) : o.value.open && (g.value = ee(e)), e;
				} finally {
					h.value = !1, await G();
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
		function O() {
			d.value = null, y.value = !1, v.value = "", _.value = "";
		}
		function k() {
			s.value.close(), O();
		}
		function te() {
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
				}), k(), await E(), o.value.open && (g.value = e === "approve" ? "reviewApprovedDone" : e === "return" ? "reviewReturnedDone" : "reviewWithdrawn", await G(), c.value.focus({ preventScroll: !0 }), o.value.scrollTop = 0, n.notice(r(g.value))));
			}
		}
		function j() {
			o.value.showModal(), T(() => E());
		}
		function M() {
			document.visibilityState !== "hidden" && o.value.open && p.value && T(() => E());
		}
		return $n(() => {
			window.addEventListener("focus", M), document.addEventListener("visibilitychange", M);
		}), er(() => {
			x++, window.removeEventListener("focus", M), document.removeEventListener("visibilitychange", M);
		}), t({ open: j }), (e, t) => (X(), Z(J, null, [Q("dialog", {
			id: "reviews-dialog",
			ref_key: "queue",
			ref: o,
			"aria-labelledby": "reviews-heading",
			onCancel: t[4] ||= (e) => {
				/* @__PURE__ */ V(x) ? x.value++ : x++, u.value = [];
			}
		}, [
			Q("div", fo, [Q("h2", po, I(r("reviewBooks")), 1), Q("button", {
				id: "close-reviews",
				onClick: te
			}, I(r("close")), 1)]),
			Q("p", null, I(r("reviewsIntro")), 1),
			Q("section", {
				id: "reviews-login",
				hidden: !p.value
			}, [Q("p", null, I(r("reviewsLogin")), 1), Q("a", {
				id: "reviews-sign-in",
				class: "button",
				href: S.value,
				target: "_blank",
				rel: "noopener"
			}, I(r("publicationSignIn")), 9, ho)], 8, mo),
			Q("div", go, [Q("button", {
				id: "refresh-reviews",
				disabled: h.value,
				onClick: t[0] ||= (e) => T(() => E())
			}, I(r("refreshReviews")), 9, _o), Q("label", null, [K(Q("input", {
				id: "reviews-all",
				"onUpdate:modelValue": t[1] ||= (e) => f.value = e,
				disabled: h.value,
				type: "checkbox",
				onChange: t[2] ||= (e) => T(() => E())
			}, null, 40, vo), [[Pa, f.value]]), Q("span", null, I(r("reviewedToo")), 1)])]),
			Q("p", {
				id: "reviews-status",
				ref_key: "statusElement",
				ref: c,
				role: "status",
				tabindex: "-1"
			}, I(r(g.value)), 513),
			Q("div", yo, [(X(!0), Z(J, null, nr(u.value, (e) => (X(), oi(uo, {
				key: e.id,
				item: e,
				status: r(i[e.status]),
				onOpen: D
			}, null, 8, ["item", "status"]))), 128))]),
			Q("button", {
				id: "reviews-more",
				hidden: !m.value,
				disabled: h.value,
				onClick: t[3] ||= (e) => T(() => E(!0))
			}, I(r("moreBooks")), 9, bo)
		], 544), Q("dialog", {
			id: "review-dialog",
			ref_key: "detail",
			ref: s,
			"aria-labelledby": "review-title",
			onCancel: O
		}, [
			Q("div", xo, [Q("h2", So, I(d.value?.title), 1), Q("button", {
				id: "close-review",
				disabled: h.value,
				onClick: k
			}, I(r("close")), 9, Co)]),
			Q("p", wo, I(d.value ? [
				d.value.author,
				d.value.class_name,
				d.value.license,
				r(i[d.value.status])
			].join(" · ") : ""), 1),
			Q("p", To, I(r(_.value)), 1),
			Q("iframe", {
				id: "review-frame",
				src: w.value,
				title: r("reviewOpen"),
				sandbox: "allow-same-origin allow-downloads"
			}, null, 8, Eo),
			Q("label", Do, [K(Q("input", {
				id: "review-confirm",
				"onUpdate:modelValue": t[5] ||= (e) => y.value = e,
				type: "checkbox",
				disabled: !C.value || h.value
			}, null, 8, Oo), [[Pa, y.value]]), Q("span", null, I(r("reviewConfirm")), 1)]),
			Q("label", null, [Q("span", null, I(r("reviewComment")), 1), K(Q("textarea", {
				id: "review-comment",
				"onUpdate:modelValue": t[6] ||= (e) => v.value = e,
				disabled: h.value,
				maxlength: "1000",
				rows: "3"
			}, null, 8, ko), [[Na, v.value]])]),
			Q("div", Ao, [
				Q("button", {
					id: "approve-review",
					class: "primary",
					disabled: !C.value || !y.value || h.value,
					onClick: t[7] ||= (e) => T(() => A("approve"))
				}, I(r("approveReview")), 9, jo),
				Q("button", {
					id: "return-review",
					disabled: !C.value || h.value,
					onClick: t[8] ||= (e) => T(() => A("return"))
				}, I(r("returnReview")), 9, Mo),
				Q("button", {
					id: "withdraw-review",
					hidden: !d.value?.published,
					disabled: h.value,
					onClick: t[9] ||= (e) => T(() => A("withdraw"))
				}, I(r("withdrawPublication")), 9, No)
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
		let n = e, r = (e) => a[n.locale][e] || e, i = /* @__PURE__ */ H(null), o = /* @__PURE__ */ H(null), s = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H("story"), l = /* @__PURE__ */ H(2);
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
		return t({ open: u }), (e, t) => (X(), Z("dialog", {
			id: "create-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "create-heading"
		}, [Q("form", {
			id: "create-form",
			onSubmit: Wa(d, ["prevent"])
		}, [
			Q("div", Fo, [Q("h2", Io, I(r("createTitle")), 1), Q("button", {
				type: "button",
				class: "icon-button",
				id: "close-create",
				"aria-label": r("close"),
				onClick: t[0] ||= (e) => i.value.close()
			}, " × ", 8, Lo)]),
			Q("label", Ro, I(r("title")), 1),
			K(Q("input", {
				id: "title",
				ref_key: "input",
				ref: o,
				"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
				placeholder: r("firstBook"),
				required: "",
				maxlength: "120",
				autocomplete: "off"
			}, null, 8, zo), [[Na, s.value]]),
			Q("fieldset", null, [Q("legend", null, I(r("template")), 1), Q("div", Bo, [
				Q("label", null, [K(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					name: "template",
					value: "comic"
				}, null, 512), [[Ia, c.value]]), Q("span", Vo, [Q("b", null, I(r("comic")), 1), Q("small", null, I(r("comicHelp")), 1)])]),
				Q("label", null, [K(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					name: "template",
					value: "story"
				}, null, 512), [[Ia, c.value]]), Q("span", Ho, [Q("b", null, I(r("story")), 1), Q("small", null, I(r("storyHelp")), 1)])]),
				Q("label", null, [K(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					name: "template",
					value: "album"
				}, null, 512), [[Ia, c.value]]), Q("span", Uo, [Q("b", null, I(r("album")), 1), Q("small", null, I(r("albumHelp")), 1)])]),
				Q("label", null, [K(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[5] ||= (e) => c.value = e,
					name: "template",
					value: "blank"
				}, null, 512), [[Ia, c.value]]), Q("span", Wo, [Q("b", null, I(r("blank")), 1), Q("small", null, I(r("blankHelp")), 1)])])
			])]),
			c.value === "comic" ? (X(), Z("label", Go, [mi(I(r("comicLayout")) + " ", 1), K(Q("select", {
				id: "comic-layout",
				"onUpdate:modelValue": t[6] ||= (e) => l.value = e
			}, [(X(), Z(J, null, nr([
				2,
				3,
				4
			], (e) => Q("option", {
				key: e,
				value: e
			}, I(e) + " " + I(r("comicPanels")), 9, Ko)), 64))], 512), [[
				La,
				l.value,
				void 0,
				{ number: !0 }
			]])])) : hi("", !0),
			Q("button", qo, I(r("start")), 1)
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
		let n = e, r = n.core.state, i = n.core.t, a = /* @__PURE__ */ H(null), o = Bi(() => r.automatic ? i("automaticCredits") : r.pages.find((e) => e.id === r.selected)?.pageName || "");
		return t({ host: () => a.value }), (t, n) => (X(), Z("section", {
			id: "workspace",
			hidden: !U(r).active,
			"aria-label": U(i)("workshop")
		}, [Q("div", Xo, [
			Q("button", {
				id: "back",
				onClick: n[0] ||= (t) => e.core.action(e.core.back, "saving")
			}, I(U(i)("back")), 1),
			K(Q("input", {
				id: "book-title",
				"onUpdate:modelValue": n[1] ||= (e) => U(r).title = e,
				"aria-label": U(i)("title"),
				onChange: n[2] ||= (t) => e.core.renameTitle(),
				maxlength: "120"
			}, null, 40, Zo), [[Na, U(r).title]]),
			Q("span", Qo, I(U(i)(U(r).statusKey)), 1),
			Q("button", {
				id: "save-book",
				onClick: n[3] ||= (t) => e.core.action(e.core.persist, "saving")
			}, I(U(i)("save")), 1),
			Q("button", {
				id: "download",
				onClick: n[4] ||= (t) => e.core.action(e.core.downloadBook, "saving")
			}, I(U(i)("download")), 1),
			Q("button", {
				id: "read",
				onClick: n[5] ||= (t) => e.core.action(e.core.read),
				class: "primary"
			}, I(U(i)("read")), 1),
			Q("button", {
				id: "publish-book",
				onClick: n[6] ||= (e) => t.$emit("publish"),
				hidden: !U(r).publicationEnabled
			}, I(U(i)("publishBook")), 9, $o)
		]), Q("div", es, [Q("aside", ts, [
			Q("div", ns, [Q("h2", null, I(U(i)("pages")), 1), Q("span", rs, I(U(r).pages.length), 1)]),
			Q("ol", is, [(X(!0), Z(J, null, nr(U(r).pages, (t, n) => (X(), Z("li", { key: t.id }, [Q("button", {
				class: "page-tab",
				"data-id": t.id,
				"aria-current": String(t.id === U(r).selected),
				onClick: (n) => e.core.action(() => e.core.select(t.id))
			}, [Q("small", null, I(U(i)("page")) + " " + I(n + 1), 1), mi(I(t.pageName), 1)], 8, as)]))), 128))]),
			Q("button", {
				id: "add-page",
				disabled: U(r).contentCount >= 50,
				onClick: n[7] ||= (t) => e.core.action(e.core.addPage),
				class: "add-page"
			}, I(U(i)("addPage")), 9, os),
			U(r).comic ? (X(), Z("label", ss, [mi(I(U(i)("comicNewPage")) + " ", 1), K(Q("select", {
				id: "new-comic-layout",
				"onUpdate:modelValue": n[8] ||= (e) => U(r).newComicLayout = e
			}, [(X(), Z(J, null, nr([
				2,
				3,
				4
			], (e) => Q("option", {
				key: e,
				value: e
			}, I(e) + " " + I(U(i)("comicPanels")), 9, cs)), 64))], 512), [[
				La,
				U(r).newComicLayout,
				void 0,
				{ number: !0 }
			]])])) : hi("", !0),
			Q("div", ls, [
				Q("button", {
					id: "move-up",
					disabled: U(r).automatic || U(r).contentIndex <= 0,
					onClick: n[9] ||= (t) => e.core.action(() => e.core.move(-1))
				}, I(U(i)("up")), 9, us),
				Q("button", {
					id: "move-down",
					disabled: U(r).automatic || U(r).contentIndex >= U(r).contentCount - 1,
					onClick: n[10] ||= (t) => e.core.action(() => e.core.move(1))
				}, I(U(i)("down")), 9, ds),
				Q("button", {
					id: "rename-page",
					disabled: U(r).automatic,
					onClick: n[11] ||= (t) => e.core.action(e.core.renamePage)
				}, I(U(i)("rename")), 9, fs),
				Q("button", {
					id: "delete-page",
					disabled: U(r).automatic || U(r).contentCount <= 1,
					onClick: n[12] ||= (t) => e.core.action(e.core.deletePage)
				}, I(U(i)("delete")), 9, ps)
			]),
			Q("p", ms, I(U(i)(U(r).automatic ? "creditsHint" : U(r).comicPanels ? "comicTip" : "tip")), 1)
		]), Q("div", hs, [
			Q("div", gs, [
				Q("span", _s, I(o.value), 1),
				Q("button", {
					id: "edit-page",
					disabled: U(r).automatic,
					onClick: n[13] ||= (t) => e.core.action(() => e.core.select())
				}, I(U(i)("edit")), 9, vs),
				Q("button", {
					id: "add-image",
					disabled: U(r).automatic,
					onClick: n[14] ||= (t) => e.core.pickImage()
				}, I(U(i)("image")), 9, ys),
				Q("button", {
					id: "draw",
					disabled: U(r).automatic,
					onClick: n[15] ||= (t) => e.core.action(() => e.core.drawing(!0))
				}, I(U(i)("draw")), 9, bs),
				Q("button", {
					id: "select",
					disabled: U(r).automatic,
					onClick: n[16] ||= (t) => e.core.action(() => e.core.drawing(!1))
				}, I(U(i)("select")), 9, xs),
				Q("button", {
					id: "advanced",
					disabled: U(r).automatic,
					onClick: n[17] ||= (t) => e.core.advanced()
				}, I(U(i)(U(r).advanced ? "editSimple" : "advanced")), 9, Ss)
			]),
			U(r).comicPanels ? (X(), Z("div", {
				key: 0,
				class: "comic-toolbar",
				"aria-label": U(i)("comic")
			}, [
				Q("label", ws, [mi(I(U(i)("comicPanel")) + " ", 1), Q("select", {
					id: "comic-panel",
					value: U(r).comicPanelIndex,
					onChange: n[18] ||= (t) => e.core.chooseComicPanel(t.target.value)
				}, [(X(!0), Z(J, null, nr(U(r).comicPanels, (e) => (X(), Z("option", {
					key: e,
					value: e - 1
				}, I(e), 9, Es))), 128))], 40, Ts)]),
				Q("button", {
					id: "add-bubble",
					onClick: n[19] ||= (e) => t.$emit("bubble", !1)
				}, I(U(i)("comicAddBubble")), 1),
				Q("button", {
					id: "edit-bubble",
					disabled: !U(r).bubbleSelected,
					onClick: n[20] ||= (e) => t.$emit("bubble", !0)
				}, I(U(i)("comicEditBubble")), 9, Ds),
				Q("span", null, I(U(i)("comicPlacementHint")), 1)
			], 8, Cs)) : hi("", !0),
			Q("div", {
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
		let r = n, i = e, a = i.core.t, o = /* @__PURE__ */ H(null), s = /* @__PURE__ */ H(""), c = /* @__PURE__ */ rn([]), l = /* @__PURE__ */ H(0), u = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H("");
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
		return t({ open: m }), (t, n) => (X(), Z("dialog", {
			id: "reader",
			ref_key: "dialog",
			ref: o,
			"aria-labelledby": "reader-title",
			onCancel: h
		}, [
			Q("div", ks, [
				Q("button", {
					id: "close-reader",
					onClick: g
				}, I(U(a)(u.value ? "close" : "returnEdit")), 1),
				Q("strong", As, I(s.value), 1),
				u.value ? hi("", !0) : (X(), Z("button", {
					key: 0,
					id: "export-html",
					onClick: n[0] ||= (t) => e.core.action(() => e.core.exportBook("html5", ".zip"), "exporting")
				}, I(U(a)("html")), 1)),
				u.value ? hi("", !0) : (X(), Z("button", {
					key: 1,
					id: "export-epub",
					onClick: n[1] ||= (t) => e.core.action(() => e.core.exportBook("epub3", ".epub"), "exporting")
				}, " EPUB ")),
				u.value ? (X(), Z("a", {
					key: 2,
					id: "reader-download-example",
					href: d.value,
					download: ""
				}, I(U(a)("demoDownload")), 9, js)) : hi("", !0)
			]),
			K(Q("div", Ms, null, 512), [[p, c.value[l.value]]]),
			Q("div", Ns, [
				Q("button", {
					id: "prev",
					disabled: l.value <= 0,
					onClick: n[2] ||= (e) => l.value--
				}, I(U(a)("prev")), 9, Ps),
				Q("span", Fs, I(l.value + 1) + " / " + I(c.value.length), 1),
				Q("button", {
					id: "next",
					disabled: l.value >= c.value.length - 1,
					onClick: n[3] ||= (e) => l.value++
				}, I(U(a)("next")), 9, Is)
			])
		], 544));
	}
}, Rs = { class: "dialog-heading" }, zs = { id: "image-picker-title" }, Bs = { class: "image-sources" }, Vs = {
	__name: "ImagePicker",
	props: { core: Object },
	emits: ["device"],
	setup(e, { expose: t, emit: n }) {
		let r = e, a = n, o = r.core.t, s = /* @__PURE__ */ H(null), c = /* @__PURE__ */ H(null), l = /* @__PURE__ */ H("sprite"), u = null;
		function d() {
			u?.controller.abort(), u = null, s.value.close(), c.value.replaceChildren();
		}
		function f(e = "sprite") {
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
			s.value.showModal(), f();
		}
		function g() {
			d(), a("device");
		}
		function _(e) {
			let t = u;
			if (t && m(e, t.frame.contentWindow, t.request)) {
				if (e.data.cancel) return d();
				r.core.action(async () => {
					let n = setTimeout(() => t.controller.abort(), 3e4);
					try {
						let n = await p(e.data.id, r.core.state.locale, t.controller.signal);
						if (u !== t || !r.core.matches(t)) return;
						await r.core.image(n.file, n.credit), d();
					} catch (e) {
						if (u === t) throw e;
					} finally {
						clearTimeout(n);
					}
				});
			}
		}
		return $n(() => window.addEventListener("message", _)), er(() => {
			u?.controller.abort(), window.removeEventListener("message", _);
		}), t({ open: h }), (e, t) => (X(), Z("dialog", {
			id: "image-picker",
			ref_key: "dialog",
			ref: s,
			onCancel: d,
			"aria-labelledby": "image-picker-title"
		}, [
			Q("div", Rs, [Q("h2", zs, I(U(o)("chooseImage")), 1), Q("button", {
				id: "close-image-picker",
				onClick: d
			}, I(U(o)("close")), 1)]),
			Q("div", Bs, [
				Q("button", {
					id: "device-image",
					onClick: g
				}, I(U(o)("deviceImage")), 1),
				Q("button", {
					id: "rebost-sprites",
					onClick: t[0] ||= (e) => f("sprite")
				}, I(U(o)("rebostSprites")), 1),
				Q("button", {
					id: "rebost-backgrounds",
					onClick: t[1] ||= (e) => f("background")
				}, I(U(o)("rebostBackgrounds")), 1),
				Q("button", {
					id: "refresh-rebost",
					onClick: t[2] ||= (e) => f(l.value)
				}, I(U(o)("refreshRebost")), 1)
			]),
			Q("p", null, I(U(o)("rebostHint")), 1),
			Q("div", {
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
		let n = e, r = n.core.t, i = /* @__PURE__ */ H(null), a = /* @__PURE__ */ H(null), o = /* @__PURE__ */ H(null), s = /* @__PURE__ */ rn(null), c = /* @__PURE__ */ H(!1), d = /* @__PURE__ */ H(!1), f = /* @__PURE__ */ H(!1), p = /* @__PURE__ */ H(""), m = /* @__PURE__ */ H(""), h = /* @__PURE__ */ H(""), g = /* @__PURE__ */ H(""), _ = /* @__PURE__ */ H("publicationDone"), v = /* @__PURE__ */ H(""), y = /* @__PURE__ */ Kt({
			author: "",
			description: "",
			license: "CC-BY-SA-4.0",
			editable: !1,
			confirmed: !1
		}), b = "", x = 0, S = Bi(() => encodeURIComponent("/llibres-login.html?lang=" + n.core.state.locale)), C = {
			pending: "reviewPending",
			returned: "reviewReturned",
			approved: "reviewApproved",
			cancelled: "reviewCancelled",
			draft: "reviewDraft"
		}, w = Bi(() => s.value?.status || "draft"), ee = Bi(() => v.value || C[w.value] || "reviewDraft"), T = Bi(() => w.value === "pending" ? s.value?.published ? "reviewPendingPublished" : "reviewPendingHelp" : w.value === "returned" ? "reviewReturnedHelp" : w.value === "cancelled" ? s.value?.published ? "reviewCancelledPublished" : "reviewCancelledHelp" : "submissionIntro");
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
					await G();
				}
			}, t);
		}
		async function O() {
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
		function k() {
			i.value.showModal(), D(O);
		}
		function te() {
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
			})), y.confirmed = !1, c.value ? v.value = w.value === "approved" ? "reviewApproved" : "submissionDone" : _.value = e ? "publicationUpdated" : "publicationDone", await G(), i.value.open && ((c.value ? o.value : a.value).focus({ preventScroll: !0 }), i.value.scrollTop = 0), n.core.notice(r(c.value ? "submissionDone" : _.value));
		}
		function j() {
			s.value?.published && confirm(r("withdrawConfirm")) && D(async () => {
				E(await l(b + (c.value ? "?publication=1" : ""), {
					method: "DELETE",
					headers: { "If-Match": `"${s.value.revision}"` }
				})), n.core.notice(r("publicationWithdrawn"));
			});
		}
		function M() {
			c.value && s.value && confirm(r("cancelSubmissionConfirm")) && D(async () => {
				E(await l(b, {
					method: "DELETE",
					headers: { "If-Match": `"${s.value.revision}"` }
				})), await G(), i.value.open && (o.value.focus({ preventScroll: !0 }), i.value.scrollTop = 0);
			});
		}
		async function N() {
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
		function ne() {
			!n.core.state.busy && document.visibilityState !== "hidden" && i.value.open && d.value && D(O);
		}
		return $n(() => {
			window.addEventListener("focus", ne), document.addEventListener("visibilitychange", ne);
		}), er(() => {
			x++, URL.revokeObjectURL(m.value), window.removeEventListener("focus", ne), document.removeEventListener("visibilitychange", ne);
		}), t({ open: k }), (e, t) => (X(), Z("dialog", {
			id: "publish-dialog",
			ref_key: "dialog",
			ref: i,
			tabindex: "-1",
			"aria-labelledby": "publish-heading",
			onCancel: te
		}, [
			Q("div", Hs, [Q("h2", Us, I(U(r)(c.value ? "submitReview" : "publishBook")), 1), Q("button", {
				id: "close-publish",
				onClick: te
			}, I(U(r)("close")), 1)]),
			Q("p", {
				id: "publish-intro",
				hidden: c.value
			}, I(U(r)("publishIntro")), 9, Ws),
			Q("section", {
				id: "publication-current",
				role: "status",
				"aria-live": "polite",
				hidden: !s.value?.published
			}, [
				Q("h3", {
					id: "publication-success-title",
					ref_key: "success",
					ref: a,
					tabindex: "-1"
				}, I(U(r)(_.value)), 513),
				Q("p", null, I(U(r)("publicationActive")), 1),
				Q("a", {
					id: "publication-link",
					href: g.value || void 0,
					target: "_blank",
					rel: "noopener"
				}, I(U(r)("openPublication")), 9, Ks),
				Q("button", {
					id: "copy-publication",
					onClick: t[0] ||= (e) => D(N)
				}, I(U(r)("copyPublication")), 1),
				Q("button", {
					id: "withdraw-publication",
					onClick: j
				}, I(U(r)("withdrawPublication")), 1)
			], 8, Gs),
			Q("section", {
				id: "submission-state",
				role: "status",
				"data-status": w.value,
				hidden: !c.value || !s.value || w.value === "draft"
			}, [
				Q("h3", {
					id: "submission-heading",
					ref_key: "submissionHeading",
					ref: o,
					tabindex: "-1"
				}, I(U(r)(ee.value)), 513),
				Q("p", Js, I(U(r)(T.value)), 1),
				Q("p", Ys, I(s.value?.feedback), 1),
				Q("button", {
					id: "refresh-submission",
					onClick: t[1] ||= (e) => D(O)
				}, I(U(r)("refreshReviewStatus")), 1),
				Q("button", {
					id: "cancel-submission",
					hidden: !["pending", "returned"].includes(w.value),
					onClick: M
				}, I(U(r)("cancelSubmission")), 9, Xs)
			], 8, qs),
			Q("p", Zs, I(U(r)(h.value)), 1),
			Q("section", {
				id: "publication-login",
				hidden: !d.value
			}, [
				Q("p", null, I(U(r)("publicationLogin")), 1),
				Q("a", {
					id: "publication-sign-in",
					class: "button",
					href: "/api/auth/oidc/login?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, I(U(r)("publicationSignIn")), 9, $s),
				Q("a", {
					id: "publication-student-sign-in",
					class: "button",
					href: "/student.html?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, I(U(r)("studentSignIn")), 9, ec),
				Q("button", {
					id: "check-publication-login",
					onClick: t[2] ||= (e) => D(O)
				}, I(U(r)("refreshRebost")), 1)
			], 8, Qs),
			Q("p", {
				id: "submission-intro",
				hidden: !c.value
			}, I(U(r)("submissionIntro")), 9, tc),
			Q("form", {
				id: "publish-form",
				hidden: !f.value,
				onSubmit: t[8] ||= Wa((e) => D(A, "publishing"), ["prevent"])
			}, [
				Q("h3", rc, I(p.value), 1),
				Q("img", {
					id: "publish-cover",
					src: m.value || void 0,
					width: "320",
					height: "180",
					alt: ""
				}, null, 8, ic),
				Q("label", null, [Q("span", null, I(U(r)("publishAuthor")), 1), K(Q("input", {
					id: "publish-author",
					"onUpdate:modelValue": t[3] ||= (e) => y.author = e,
					required: "",
					maxlength: "120",
					autocomplete: "off"
				}, null, 512), [[Na, y.author]])]),
				Q("label", null, [Q("span", null, I(U(r)("publishDescription")), 1), K(Q("textarea", {
					id: "publish-description",
					"onUpdate:modelValue": t[4] ||= (e) => y.description = e,
					maxlength: "2000",
					rows: "3"
				}, null, 512), [[Na, y.description]])]),
				Q("label", null, [Q("span", null, I(U(r)("publishLicense")), 1), K(Q("select", {
					id: "publish-license",
					"onUpdate:modelValue": t[5] ||= (e) => y.license = e
				}, [...t[9] ||= [
					Q("option", { value: "CC-BY-SA-4.0" }, "CC BY-SA 4.0", -1),
					Q("option", { value: "CC-BY-4.0" }, "CC BY 4.0", -1),
					Q("option", { value: "CC0-1.0" }, "CC0 1.0", -1)
				]], 512), [[La, y.license]])]),
				Q("label", ac, [K(Q("input", {
					id: "publish-editable",
					"onUpdate:modelValue": t[6] ||= (e) => y.editable = e,
					type: "checkbox"
				}, null, 512), [[Pa, y.editable]]), Q("span", null, I(U(r)("publishEditable")), 1)]),
				Q("label", oc, [K(Q("input", {
					id: "publish-confirm",
					"onUpdate:modelValue": t[7] ||= (e) => y.confirmed = e,
					type: "checkbox",
					required: ""
				}, null, 512), [[Pa, y.confirmed]]), Q("span", sc, I(U(r)(c.value ? "submissionConfirm" : "publishConfirm")), 1)]),
				Q("button", cc, I(U(r)(c.value ? "submitReview" : s.value?.published ? "updatePublication" : "publishBook")), 1)
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
		let n = e, r = n.core.t, i = /* @__PURE__ */ H(null), a = /* @__PURE__ */ H(null), o = /* @__PURE__ */ H(""), s = /* @__PURE__ */ H([]), c = /* @__PURE__ */ H(""), d = /* @__PURE__ */ H(!1), f = /* @__PURE__ */ H(""), p = /* @__PURE__ */ H(null), m = 0, h = 0;
		function g(e) {
			return n.core.action(async () => {
				try {
					await e();
				} catch (e) {
					throw i.value.open && (f.value = "publication_unavailable"), e;
				} finally {
					await G();
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
		return er(() => h++), t({ open: v }), (e, t) => (X(), Z(J, null, [Q("dialog", {
			id: "shared-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "shared-heading",
			onCancel: t[3] ||= (e) => /* @__PURE__ */ V(h) ? h.value++ : h++
		}, [
			Q("div", uc, [Q("h2", dc, I(U(r)("sharedStories")), 1), Q("button", {
				id: "close-shared",
				onClick: y
			}, I(U(r)("close")), 1)]),
			Q("p", null, I(U(r)("sharedIntro")), 1),
			Q("a", {
				id: "shared-bank",
				hidden: !c.value,
				href: c.value || void 0,
				target: "_blank",
				rel: "noopener"
			}, I(U(r)("openBank")), 9, fc),
			Q("form", {
				id: "shared-search-form",
				onSubmit: t[1] ||= Wa((e) => g(() => _()), ["prevent"])
			}, [K(Q("input", {
				id: "shared-search",
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				type: "search",
				maxlength: "200",
				"aria-label": U(r)("searchBooksLabel")
			}, null, 8, pc), [[Na, o.value]]), Q("button", null, I(U(r)("searchBooks")), 1)], 32),
			Q("p", mc, I(U(r)(f.value)), 1),
			Q("div", hc, [(X(!0), Z(J, null, nr(s.value, (e) => (X(), Z("article", {
				key: e.external_id,
				class: "book-card"
			}, [
				Q("img", {
					src: `/api/llibres/public/${e.external_id}/cover.png`,
					alt: "",
					loading: "lazy"
				}, null, 8, gc),
				Q("button", {
					class: "book-open",
					onClick: (t) => b(e)
				}, I(e.title), 9, _c),
				Q("p", null, I(e.author), 1)
			]))), 128))]),
			Q("button", {
				id: "shared-more",
				hidden: !d.value,
				onClick: t[2] ||= (e) => g(() => _(!0))
			}, I(U(r)("moreBooks")), 9, vc)
		], 544), Q("dialog", {
			id: "published-reader",
			ref_key: "reader",
			ref: a,
			"aria-labelledby": "published-title",
			onCancel: t[4] ||= (e) => p.value = null
		}, [Q("div", yc, [Q("h2", bc, I(p.value?.title), 1), Q("button", {
			id: "close-published-reader",
			onClick: x
		}, I(U(r)("close")), 1)]), Q("iframe", {
			id: "published-frame",
			src: p.value ? `/api/llibres/public/${p.value.external_id}/index.html` : void 0,
			title: U(r)("publishedBook"),
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
		let t = e, n = Bi(() => "/examples/" + (t.comic ? "la-granota" : "la-papallona")), r = Bi(() => t.comic ? "La granota i la idea brillant" : "La papallona i els colors del bosc"), i = Bi(() => t.comic ? "comic-demo" : "demo");
		return (t, o) => (X(), Z("section", {
			id: e.comic ? "demo-comic" : "demo-book",
			class: "demo-book",
			"aria-labelledby": i.value + "-heading"
		}, [Q("a", {
			href: n.value + "/",
			"aria-label": U(a)[e.locale].demoRead,
			onClick: o[0] ||= Wa((e) => t.$emit("read"), ["prevent"])
		}, [Q("img", {
			src: n.value + "/cover.png",
			alt: r.value,
			width: "320",
			height: "180",
			loading: "lazy"
		}, null, 8, Tc)], 8, wc), Q("div", null, [
			Q("p", Ec, I(U(a)[e.locale][e.comic ? "demoComicLabel" : "demoLabel"]), 1),
			Q("h2", { id: i.value + "-heading" }, I(r.value), 9, Dc),
			Q("p", null, I(U(a)[e.locale].demoDescription), 1),
			Q("div", Oc, [
				Q("a", {
					id: e.comic ? "read-comic-demo" : "read-demo",
					class: "demo-link",
					href: n.value + "/",
					onClick: o[1] ||= Wa((e) => t.$emit("read"), ["prevent"])
				}, I(U(a)[e.locale].demoRead), 9, kc),
				Q("button", {
					id: e.comic ? "edit-comic-demo" : "edit-demo",
					disabled: e.busy,
					onClick: o[2] ||= (e) => t.$emit("edit")
				}, I(U(a)[e.locale].demoEdit), 9, Ac),
				Q("a", {
					id: e.comic ? "download-comic-demo" : "download-demo",
					class: "demo-link",
					href: n.value + "/" + (e.comic ? "la-granota" : "la-papallona") + ".elpx",
					download: ""
				}, I(U(a)[e.locale].demoDownload), 9, jc)
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
		let n = e, r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(null), a = /* @__PURE__ */ H(""), o = /* @__PURE__ */ H("speech"), s = null, c;
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
		return t({ open: l }), (t, n) => (X(), Z("dialog", {
			id: "bubble-dialog",
			ref_key: "dialog",
			ref: r,
			"aria-labelledby": "bubble-heading"
		}, [Q("form", { onSubmit: Wa(u, ["prevent"]) }, [
			Q("div", Nc, [Q("h2", Pc, I(e.core.t("comicBubble")), 1), Q("button", {
				id: "close-bubble",
				type: "button",
				"aria-label": e.core.t("close"),
				onClick: n[0] ||= (e) => r.value.close()
			}, "×", 8, Fc)]),
			Q("label", Ic, I(e.core.t("comicBubbleKind")), 1),
			K(Q("select", {
				id: "bubble-kind",
				"onUpdate:modelValue": n[1] ||= (e) => o.value = e
			}, [
				Q("option", Lc, I(e.core.t("comicSpeech")), 1),
				Q("option", Rc, I(e.core.t("comicThought")), 1),
				Q("option", zc, I(e.core.t("comicNarration")), 1)
			], 512), [[La, o.value]]),
			Q("label", Bc, I(e.core.t("comicBubbleText")), 1),
			K(Q("textarea", {
				id: "bubble-text",
				ref_key: "input",
				ref: i,
				"onUpdate:modelValue": n[2] ||= (e) => a.value = e,
				maxlength: "300",
				rows: "5",
				required: ""
			}, null, 512), [[Na, a.value]]),
			Q("p", null, I(e.core.t("comicBubbleHint")), 1),
			Q("button", Vc, I(e.core.t("save")), 1)
		], 32)], 512));
	}
}, Uc = { class: "masthead" }, Wc = ["disabled"], Gc = ["hidden"], Kc = { class: "hero" }, qc = { class: "eyebrow" }, Jc = { class: "intro" }, Yc = { class: "actions" }, Xc = ["hidden"], Zc = ["hidden"], Qc = { class: "storage-note" }, $c = {
	class: "hero-art",
	"aria-hidden": "true"
}, el = { class: "book-cover" }, tl = { href: "/about.html" }, nl = ["hidden"], rl = ["hidden"], il = { id: "busy-text" }, al = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ H(null), n = /* @__PURE__ */ H(null), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(null), a = /* @__PURE__ */ H(null), o = /* @__PURE__ */ H(null), s = /* @__PURE__ */ H(null), c = /* @__PURE__ */ H(null), l = /* @__PURE__ */ H(null), u = /* @__PURE__ */ H(null), d = /* @__PURE__ */ H(null), f = Za({
			host: () => i.value.host(),
			refreshShelf: () => t.value.refresh(),
			read: (e, t) => a.value.open(e, t),
			pick: () => o.value.open(),
			deviceImage: () => u.value.click()
		}), p = f.state, m = f.t;
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
				let t = await g(e);
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
		return $n(async () => {
			await f.start();
			let e = new URL(location.href).searchParams.get("example");
			h.includes(e) && await b(e);
		}), er(f.dispose), (e, h) => (X(), Z(J, null, [
			Q("header", Uc, [h[14] ||= Q("a", {
				class: "brand",
				href: "/"
			}, [mi("◧ EduTicTac "), Q("b", null, "Llibres")], -1), K(Q("select", {
				id: "language",
				"onUpdate:modelValue": h[0] ||= (e) => U(p).locale = e,
				disabled: U(p).active,
				onChange: h[1] ||= (e) => U(f).language(U(p).locale),
				"aria-label": "Idioma"
			}, [...h[13] ||= [
				Q("option", { value: "es" }, "Castellano", -1),
				Q("option", { value: "ca" }, "Català", -1),
				Q("option", { value: "va" }, "Valencià", -1),
				Q("option", { value: "en" }, "English", -1)
			]], 40, Wc), [[La, U(p).locale]])]),
			Q("main", {
				id: "home",
				hidden: U(p).active
			}, [
				Q("section", Kc, [Q("div", null, [
					Q("p", qc, I(U(m)("eyebrow")), 1),
					Q("h1", null, I(U(m)("headline")), 1),
					Q("p", Jc, I(U(m)("intro")), 1),
					Q("div", Yc, [
						Q("button", {
							id: "new-book",
							onClick: h[2] ||= (e) => r.value.open(),
							class: "primary"
						}, I(U(m)("new")), 1),
						Q("button", {
							id: "open-book",
							onClick: h[3] ||= (e) => d.value.click()
						}, I(U(m)("open")), 1),
						Q("button", {
							id: "open-shared",
							onClick: h[4] ||= (e) => c.value.open(),
							hidden: !U(p).publicationEnabled
						}, I(U(m)("sharedStories")), 9, Xc),
						Q("button", {
							id: "open-reviews",
							onClick: h[5] ||= (e) => n.value.open(),
							hidden: !U(p).publicationEnabled
						}, I(U(m)("reviewBooks")), 9, Zc)
					]),
					Q("p", Qc, I(U(m)("local")), 1)
				]), Q("div", $c, [Q("div", el, [
					Q("span", null, [
						mi(I(U(m)("coverTop")), 1),
						h[15] ||= Q("br", null, null, -1),
						mi(I(U(m)("coverBottom")), 1)
					]),
					h[16] ||= Q("div", { class: "sun" }, null, -1),
					h[17] ||= Q("div", { class: "hill" }, null, -1),
					Q("i", null, I(U(m)("storySubtitle")), 1)
				]), h[18] ||= Q("span", { class: "star" }, "✳", -1)])]),
				$(Mc, {
					locale: U(p).locale,
					busy: U(p).busy,
					onEdit: h[6] ||= (e) => y(!1),
					onRead: h[7] ||= (e) => b("la-papallona")
				}, null, 8, ["locale", "busy"]),
				$(Mc, {
					comic: "",
					locale: U(p).locale,
					busy: U(p).busy,
					onEdit: h[8] ||= (e) => y(!0),
					onRead: h[9] ||= (e) => b("la-granota")
				}, null, 8, ["locale", "busy"]),
				$(so, {
					ref_key: "shelf",
					ref: t,
					locale: U(p).locale,
					action: U(f).action,
					"open-book": U(f).openStored
				}, null, 8, [
					"locale",
					"action",
					"open-book"
				]),
				Q("footer", null, [Q("span", null, I(U(m)("footer")), 1), Q("a", tl, I(U(m)("about")), 1)])
			], 8, Gc),
			$(Os, {
				ref_key: "workshop",
				ref: i,
				core: U(f),
				onPublish: h[10] ||= (e) => s.value.open(),
				onBubble: h[11] ||= (e) => l.value.open(e)
			}, null, 8, ["core"]),
			$(Hc, {
				ref_key: "bubble",
				ref: l,
				core: U(f)
			}, null, 8, ["core"]),
			$(Jo, {
				ref_key: "createDialog",
				ref: r,
				locale: U(p).locale,
				core: U(f)
			}, null, 8, ["locale", "core"]),
			$(Ls, {
				ref_key: "reader",
				ref: a,
				core: U(f),
				onExampleClose: x
			}, null, 8, ["core"]),
			$(Vs, {
				ref_key: "picker",
				ref: o,
				core: U(f),
				onDevice: h[12] ||= (e) => u.value.click()
			}, null, 8, ["core"]),
			$(lc, {
				ref_key: "publication",
				ref: s,
				core: U(f)
			}, null, 8, ["core"]),
			$(Sc, {
				ref_key: "shared",
				ref: c,
				core: U(f)
			}, null, 8, ["core"]),
			$(Po, {
				ref_key: "reviews",
				ref: n,
				locale: U(p).locale,
				action: U(f).action,
				notice: U(f).notice
			}, null, 8, [
				"locale",
				"action",
				"notice"
			]),
			Q("input", {
				id: "image-input",
				ref_key: "imageInput",
				ref: u,
				type: "file",
				accept: "image/png,image/jpeg,image/webp",
				hidden: "",
				onChange: v
			}, null, 544),
			Q("input", {
				id: "file-input",
				ref_key: "fileInput",
				ref: d,
				type: "file",
				accept: ".elpx",
				hidden: "",
				onChange: _
			}, null, 544),
			Q("div", {
				id: "notice",
				role: "status",
				"aria-live": "polite",
				class: Te({ error: U(p).noticeError }),
				hidden: !U(p).notice
			}, I(U(p).notice), 11, nl),
			Q("div", {
				id: "busy",
				hidden: !U(p).busy,
				role: "status"
			}, [h[19] ||= Q("span", { class: "spinner" }, null, -1), Q("span", il, I(U(m)(U(p).busyKey)), 1)], 8, rl)
		], 64));
	}
};
// src/ui.js
function ol() {
	return Ja(al).mount("#app");
}
export { ol as mountLlibres };
