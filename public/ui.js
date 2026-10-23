import { Editor as e } from "/adapter.js";
import { allBooks as t, removeBook as n, saveBook as r, uid as i } from "/store.js";
import { messages as a } from "/i18n.js";
import { inspectBook as o } from "/import.js";
import { coverImage as s, publicationPackage as c, publicationRequest as l, safeWebURL as u } from "/publication.js";
import { preferredLocale as d } from "/locale.js";
import { fetchImage as f, selection as p } from "/rebost.js";
import { exampleSlugs as m, loadExample as h } from "/examples.js";
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function g(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var _ = {}, v = [], y = () => {}, b = () => !1, x = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), S = (e) => e.startsWith("onUpdate:"), C = Object.assign, w = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, ee = Object.prototype.hasOwnProperty, T = (e, t) => ee.call(e, t), E = Array.isArray, D = (e) => ie(e) === "[object Map]", O = (e) => ie(e) === "[object Set]", te = (e) => ie(e) === "[object Date]", k = (e) => typeof e == "function", A = (e) => typeof e == "string", j = (e) => typeof e == "symbol", M = (e) => typeof e == "object" && !!e, ne = (e) => (M(e) || k(e)) && k(e.then) && k(e.catch), re = Object.prototype.toString, ie = (e) => re.call(e), ae = (e) => ie(e).slice(8, -1), oe = (e) => ie(e) === "[object Object]", se = (e) => A(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ce = /* @__PURE__ */ g(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), N = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, le = /-\w/g, P = N((e) => e.replace(le, (e) => e.slice(1).toUpperCase())), ue = /\B([A-Z])/g, F = N((e) => e.replace(ue, "-$1").toLowerCase()), de = N((e) => e.charAt(0).toUpperCase() + e.slice(1)), fe = N((e) => e ? `on${de(e)}` : ""), I = (e, t) => !Object.is(e, t), pe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, me = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, he = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ge, _e = () => ge ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ve(e) {
	if (E(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = A(r) ? Se(r) : ve(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (A(e) || M(e)) return e;
}
var ye = /;(?![^(]*\))/g, be = /:([^]+)/, xe = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Se(e) {
	let t = {};
	return e.replace(xe, (e) => e.startsWith("/*") ? "" : e).split(ye).forEach((e) => {
		if (e) {
			let n = e.split(be);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Ce(e) {
	let t = "";
	if (A(e)) t = e;
	else if (E(e)) for (let n = 0; n < e.length; n++) {
		let r = Ce(e[n]);
		r && (t += r + " ");
	}
	else if (M(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var we = /* @__PURE__ */ g("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function Te(e) {
	return !!e || e === "";
}
function Ee(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Ae(e[i], t[i], n);
	return r;
}
function De(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Ae(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function Oe(e, t, n) {
	let r = D(e), i = D(t);
	if (r || i || (r = O(e), i = O(t), r || i)) return r && i ? De(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Ae(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function ke(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Ae(e, t, n) {
	if (e === t) return !0;
	let r = te(e), i = te(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = j(e), i = j(t), r || i ? e === t : (r = E(e), i = E(t), r || i ? r && i ? ke(e, t, n, Ee) : !1 : (r = M(e), i = M(t), r || i ? !r || !i ? !1 : ke(e, t, n, Oe) : String(e) === String(t))));
}
function je(e, t) {
	return e.findIndex((e) => Ae(e, t));
}
var Me = (e) => !!(e && e.__v_isRef === !0), L = (e) => A(e) ? e : e == null ? "" : E(e) || M(e) && (e.toString === re || !k(e.toString)) ? Me(e) ? L(e.value) : JSON.stringify(e, Ne, 2) : String(e), Ne = (e, t) => Me(t) ? Ne(e, t.value) : D(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Pe(t, r) + " =>"] = n, e), {}) } : O(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Pe(e)) } : j(t) ? Pe(t) : M(t) && !E(t) && !oe(t) ? String(t) : t, Pe = (e, t = "") => j(e) ? `Symbol(${e.description ?? t})` : e, R, Fe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && R && (R.active ? (this.parent = R, this.index = (R.scopes || (R.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = R;
			try {
				return R = this, e();
			} finally {
				R = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = R, R = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (R === this) R = this.prevScope;
			else {
				let e = R;
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
}, z, Ie = /* @__PURE__ */ new WeakSet(), Le = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, R && (R.active ? R.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Ie.has(this) && (Ie.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ve(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, et(this), We(this);
		let e = z, t = Xe;
		z = this, Xe = !0;
		try {
			return this.fn();
		} finally {
			Ge(this), z = e, Xe = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Je(e);
			this.deps = this.depsTail = void 0, et(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Ie.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ke(this) && this.run();
	}
	get dirty() {
		return Ke(this);
	}
}, Re = 0, ze, Be;
function Ve(e, t = !1) {
	e.flags |= 8, t ? (e.next = Be, Be = e) : (e.next = ze, ze = e);
}
function He() {
	Re++;
}
function Ue() {
	if (--Re > 0) return;
	if (Be) {
		let e = Be;
		for (Be = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ze;) {
		let t = ze;
		for (ze = void 0; t;) {
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
function We(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ge(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Je(r), Ye(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ke(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (qe(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function qe(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tt) || (e.globalVersion = tt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ke(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = z, r = Xe;
	z = e, Xe = !0;
	try {
		We(e);
		let n = e.fn(e._value);
		(t.version === 0 || I(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		z = n, Xe = r, Ge(e), e.flags &= -3;
	}
}
function Je(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Je(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ye(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Xe = !0, Ze = [];
function Qe() {
	Ze.push(Xe), Xe = !1;
}
function $e() {
	let e = Ze.pop();
	Xe = e === void 0 || e;
}
function et(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = z;
		z = void 0;
		try {
			t();
		} finally {
			z = e;
		}
	}
}
var tt = 0, nt = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, rt = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!z || !Xe || z === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== z) t = this.activeLink = new nt(z, this), z.deps ? (t.prevDep = z.depsTail, z.depsTail.nextDep = t, z.depsTail = t) : z.deps = z.depsTail = t, it(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = z.depsTail, t.nextDep = void 0, z.depsTail.nextDep = t, z.depsTail = t, z.deps === t && (z.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, tt++, this.notify(e);
	}
	notify(e) {
		He();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ue();
		}
	}
};
function it(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) it(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var at = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ Symbol(""), st = /* @__PURE__ */ Symbol(""), ct = /* @__PURE__ */ Symbol("");
function B(e, t, n) {
	if (Xe && z) {
		let t = at.get(e);
		t || at.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new rt()), r.map = t, r.key = n), r.track();
	}
}
function lt(e, t, n, r, i, a) {
	let o = at.get(e);
	if (!o) {
		tt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (He(), t === "clear") o.forEach(s);
	else {
		let i = E(e), a = i && se(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ct || !j(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ct)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ot)), D(e) && s(o.get(st)));
				break;
			case "delete":
				i || (s(o.get(ot)), D(e) && s(o.get(st)));
				break;
			case "set": D(e) && s(o.get(ot));
		}
	}
	Ue();
}
function ut(e) {
	let t = /* @__PURE__ */ V(e);
	return t === e || (B(t, "iterate", ct), /* @__PURE__ */ Xt(e)) ? t : /* @__PURE__ */ Yt(e) ? /* @__PURE__ */ Jt(e) ? t.map((e) => en($t(e))) : t.map(en) : t.map($t);
}
function dt(e) {
	return B(e = /* @__PURE__ */ V(e), "iterate", ct), e;
}
function ft(e, t) {
	return /* @__PURE__ */ Yt(e) ? en(/* @__PURE__ */ Jt(e) ? $t(t) : t) : $t(t);
}
var pt = {
	__proto__: null,
	[Symbol.iterator]() {
		return mt(this, Symbol.iterator, (e) => ft(this, e));
	},
	concat(...e) {
		return ut(this).concat(...e.map((e) => E(e) ? ut(e) : e));
	},
	entries() {
		return mt(this, "entries", (e) => (e[1] = ft(this, e[1]), e));
	},
	every(e, t) {
		return _t(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return _t(this, "filter", e, t, (e) => e.map((e) => ft(this, e)), arguments);
	},
	find(e, t) {
		return _t(this, "find", e, t, (e) => ft(this, e), arguments);
	},
	findIndex(e, t) {
		return _t(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return _t(this, "findLast", e, t, (e) => ft(this, e), arguments);
	},
	findLastIndex(e, t) {
		return _t(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return _t(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return yt(this, "includes", e);
	},
	indexOf(...e) {
		return yt(this, "indexOf", e);
	},
	join(e) {
		return ut(this).join(e);
	},
	lastIndexOf(...e) {
		return yt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return _t(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return bt(this, "pop");
	},
	push(...e) {
		return bt(this, "push", e);
	},
	reduce(e, ...t) {
		return vt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return vt(this, "reduceRight", e, t);
	},
	shift() {
		return bt(this, "shift");
	},
	some(e, t) {
		return _t(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return bt(this, "splice", e);
	},
	toReversed() {
		return ut(this).toReversed();
	},
	toSorted(e) {
		return ut(this).toSorted(e);
	},
	toSpliced(...e) {
		return ut(this).toSpliced(...e);
	},
	unshift(...e) {
		return bt(this, "unshift", e);
	},
	values() {
		return mt(this, "values", (e) => ft(this, e));
	}
};
function mt(e, t, n) {
	let r = dt(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ Xt(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => ht(a.next(), n), i !== gt[t] && Object.defineProperties(e, {
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
		a._next = a.next, a.next = () => ht(a._next(), n);
	}
	return a;
}
function ht(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var gt = Array.prototype;
function _t(e, t, n, r, i, a) {
	let o = dt(e), s = o !== e && !/* @__PURE__ */ Xt(e), c = o[t];
	if (c !== gt[t]) {
		let t = c.apply(e, a);
		return s ? $t(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, ft(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function vt(e, t, n, r) {
	let i = dt(e), a = i !== e && !/* @__PURE__ */ Xt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = ft(e, t)), n.call(this, t, ft(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? ft(e, c) : c;
}
function yt(e, t, n) {
	let r = /* @__PURE__ */ V(e);
	B(r, "iterate", ct);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Zt(n[0]) ? (n[0] = /* @__PURE__ */ V(n[0]), r[t](...n)) : i;
}
function bt(e, t, n = []) {
	Qe(), He();
	let r = (/* @__PURE__ */ V(e))[t].apply(e, n);
	return Ue(), $e(), r;
}
var xt = /* @__PURE__ */ g("__proto__,__v_isRef,__isVue"), St = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(j));
function Ct(e) {
	j(e) || (e = String(e));
	let t = /* @__PURE__ */ V(this);
	return B(t, "has", e), t.hasOwnProperty(e);
}
var wt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Ht : Vt : i ? Bt : zt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = E(e);
		if (!r) {
			let e;
			if (a && (e = pt[t])) return e;
			if (t === "hasOwnProperty") return Ct;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ H(e) ? e : n);
		if ((j(t) ? St.has(t) : xt(t)) || (r || B(e, "get", t), i)) return o;
		if (/* @__PURE__ */ H(o)) {
			let e = a && se(t) ? o : o.value;
			return r && M(e) ? /* @__PURE__ */ Kt(e) : e;
		}
		return M(o) ? r ? /* @__PURE__ */ Kt(o) : /* @__PURE__ */ Wt(o) : o;
	}
}, Tt = class extends wt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = E(e) && se(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Yt(i);
			if (!/* @__PURE__ */ Xt(n) && !/* @__PURE__ */ Yt(n) && (i = /* @__PURE__ */ V(i), n = /* @__PURE__ */ V(n)), !a && /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : T(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ H(e) ? e : r);
		return e === /* @__PURE__ */ V(r) && s && (o ? I(n, i) && lt(e, "set", t, n, i) : lt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = T(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && lt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return j(t) && St.has(t) || B(e, "has", t), n;
	}
	ownKeys(e) {
		return B(e, "iterate", E(e) ? "length" : ot), Reflect.ownKeys(e);
	}
}, Et = class extends wt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Dt = /* @__PURE__ */ new Tt(), Ot = /* @__PURE__ */ new Et(), kt = /* @__PURE__ */ new Tt(!0), At = (e) => e, jt = (e) => Reflect.getPrototypeOf(e);
function Mt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ V(i), o = D(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? At : t ? en : $t;
		return !t && B(a, "iterate", c ? st : ot), C(Object.create(l), { next() {
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
function Nt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Pt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ V(r), a = /* @__PURE__ */ V(n);
			e || (I(n, a) && B(i, "get", n), B(i, "get", a));
			let { has: o } = jt(i), s = t ? At : e ? en : $t;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && B(/* @__PURE__ */ V(t), "iterate", ot), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ V(n), i = /* @__PURE__ */ V(t);
			return e || (I(t, i) && B(r, "has", t), B(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ V(a), s = t ? At : e ? en : $t;
			return !e && B(o, "iterate", ot), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return C(n, e ? {
		add: Nt("add"),
		set: Nt("set"),
		delete: Nt("delete"),
		clear: Nt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ V(this), r = jt(n), i = /* @__PURE__ */ V(e), a = !t && !/* @__PURE__ */ Xt(e) && !/* @__PURE__ */ Yt(e) ? i : e;
			return r.has.call(n, a) || I(e, a) && r.has.call(n, e) || I(i, a) && r.has.call(n, i) || (n.add(a), lt(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ Xt(n) || /* @__PURE__ */ Yt(n) || (n = /* @__PURE__ */ V(n));
			let r = /* @__PURE__ */ V(this), { has: i, get: a } = jt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ V(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? I(n, s) && lt(r, "set", e, n, s) : lt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ V(this), { has: n, get: r } = jt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ V(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && lt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ V(this), t = e.size !== 0, n = e.clear();
			return t && lt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Mt(r, e, t);
	}), n;
}
function Ft(e, t) {
	let n = Pt(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(T(n, i) && i in r ? n : r, i, a);
}
var It = { get: /* @__PURE__ */ Ft(!1, !1) }, Lt = { get: /* @__PURE__ */ Ft(!1, !0) }, Rt = { get: /* @__PURE__ */ Ft(!0, !1) }, zt = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap();
function Ut(e) {
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
function Wt(e) {
	return /* @__PURE__ */ Yt(e) ? e : qt(e, !1, Dt, It, zt);
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return qt(e, !1, kt, Lt, Bt);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return qt(e, !0, Ot, Rt, Vt);
}
function qt(e, t, n, r, i) {
	if (!M(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Ut(ae(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return /* @__PURE__ */ Yt(e) ? /* @__PURE__ */ Jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Yt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function V(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ V(t) : e;
}
function Qt(e) {
	return !T(e, "__v_skip") && Object.isExtensible(e) && me(e, "__v_skip", !0), e;
}
var $t = (e) => M(e) ? /* @__PURE__ */ Wt(e) : e, en = (e) => M(e) ? /* @__PURE__ */ Kt(e) : e;
// @__NO_SIDE_EFFECTS__
function H(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function U(e) {
	return nn(e, !1);
}
// @__NO_SIDE_EFFECTS__
function tn(e) {
	return nn(e, !0);
}
function nn(e, t) {
	return /* @__PURE__ */ H(e) ? e : new rn(e, t);
}
var rn = class {
	constructor(e, t) {
		this.dep = new rt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ V(e), this._value = t ? e : $t(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Xt(e) || /* @__PURE__ */ Yt(e);
		e = n ? e : /* @__PURE__ */ V(e), I(e, t) && (this._rawValue = e, this._value = n ? e : $t(e), this.dep.trigger());
	}
};
function W(e) {
	return /* @__PURE__ */ H(e) ? e.value : e;
}
var an = {
	get: (e, t, n) => t === "__v_raw" ? e : W(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function on(e) {
	return /* @__PURE__ */ Jt(e) ? e : new Proxy(e, an);
}
var sn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new rt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && z !== this) return Ve(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return qe(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function cn(e, t, n = !1) {
	let r, i;
	return k(e) ? r = e : (r = e.get, i = e.set), new sn(r, i, n);
}
function ln(e, t = Infinity, n) {
	if (t <= 0 || !M(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ H(e)) ln(e.value, t, n);
	else if (E(e)) for (let r = 0; r < e.length; r++) ln(e[r], t, n);
	else if (O(e) || D(e)) e.forEach((e) => {
		ln(e, t, n);
	});
	else if (oe(e)) {
		for (let r in e) ln(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && ln(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function un(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		fn(e, t, n);
	}
}
function dn(e, t, n, r) {
	if (k(e)) {
		let i = un(e, t, n, r);
		return i && ne(i) && i.catch((e) => {
			fn(e, t, n);
		}), i;
	}
	if (E(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(dn(e[a], t, n, r));
		return i;
	}
}
function fn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || _;
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
			Qe(), un(a, null, 10, [
				e,
				i,
				o
			]), $e();
			return;
		}
	}
	pn(e, n, i, r, o);
}
function pn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var G = [], mn = -1, hn = [], gn = null, _n = 0, vn = /* @__PURE__ */ Promise.resolve(), yn = null;
function K(e) {
	let t = yn || vn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function bn(e) {
	let t = mn + 1, n = G.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = G[r], a = On(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function xn(e) {
	if (!(e.flags & 1)) {
		let t = On(e), n = G[G.length - 1];
		!n || !(e.flags & 2) && t >= On(n) ? G.push(e) : G.splice(bn(t), 0, e), e.flags |= 1, Sn();
	}
}
function Sn() {
	yn ||= vn.then(kn);
}
function Cn(e) {
	if (!E(e)) gn && e.id === -1 ? gn.splice(_n + 1, 0, e) : e.flags & 1 || (hn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) hn.push(e[t]);
	Sn();
}
function wn(e, t, n, r = mn + 1) {
	for (; r < G.length; r++) {
		let n = G[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			G.splice(r, 1), r = e ? r - 1 : mn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function Tn(e, t, n = 0) {
	if (hn.length) {
		let e = hn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < hn.length; i++) {
				let a = hn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? hn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => On(e) - On(t));
		if (hn.length = r, gn) {
			for (let e = 0; e < i.length; e++) gn.push(i[e]);
			return;
		}
		for (gn = i, _n = 0; _n < gn.length; _n++) {
			let e = gn[_n];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		gn = null, _n = 0;
	}
}
var En = !1;
function Dn(e, t) {
	if (En) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(hn);
	e(), En = !0;
	try {
		wn(void 0, t), Tn(void 0, n, t);
	} finally {
		En = !1;
	}
}
var On = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function kn(e) {
	try {
		for (mn = 0; mn < G.length; mn++) {
			let e = G[mn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), un(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; mn < G.length; mn++) {
			let e = G[mn];
			e && (e.flags &= -2);
		}
		mn = -1, G.length = 0, Tn(e), yn = null, (G.length || hn.length) && kn(e);
	}
}
var An = null, jn = null;
function Mn(e) {
	let t = An;
	return An = e, jn = e && e.type.__scopeId || null, t;
}
function Nn(e, t = An, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ri(-1);
		let i = Mn(t), a = $r.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = $r.length; e > a; e--) ti();
			Mn(i), r._d && ri(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function q(e, t) {
	if (An === null) return e;
	let n = Li(An), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = _] = t[e];
		i && (k(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && ln(a), r.push({
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
function Pn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Qe(), dn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), $e());
	}
}
var Fn = /* @__PURE__ */ Symbol("_vte"), In = (e) => e.__isTeleport, Ln = /* @__PURE__ */ Symbol("_leaveCb");
function Rn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Zr) {
			t = n;
			break;
		}
	}
	return t;
}
function zn(e) {
	if (!Jn(e)) return In(e.type) && e.children ? Rn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && k(n.default)) return n.default();
	}
}
function Bn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Bn(In(n.type) && zn(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === Y && E(e.children)) {
		let n = mr(e.children, !1);
		n && Bn(n, t);
	}
}
function Vn(e) {
	if (e.component) return Vn(e.component.subTree);
	if (e.type === Y) {
		let t = E(e.children) && mr(e.children, !1);
		return t ? Vn(t) : void 0;
	}
	if (e.type !== Zr) return e;
}
function Hn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Un(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Wn = /* @__PURE__ */ new WeakMap();
function Gn(e, t, n, r, i = !1) {
	if (E(e)) {
		e.forEach((e, a) => Gn(e, t && (E(t) ? t[a] : t), n, r, i));
		return;
	}
	if (qn(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Gn(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Li(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === _ ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ V(d), p = d === _ ? b : (e) => !Un(u, e) && T(f, e), m = (e, t) => !(t && Un(u, t));
	if (l != null && l !== c) {
		if (Kn(t), A(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ H(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (k(c)) un(c, s, 12, [o, u]);
	else {
		let t = A(c), r = /* @__PURE__ */ H(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) E(n) && w(n, a);
					else if (E(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Wn.delete(e);
				};
				t.id = -1, Wn.set(e, t), J(t, n);
			} else Kn(e), s();
		}
	}
}
function Kn(e) {
	let t = Wn.get(e);
	t && (t.flags |= 8, Wn.delete(e));
}
_e().requestIdleCallback, _e().cancelIdleCallback;
var qn = (e) => !!e.type.__asyncLoader, Jn = (e) => e.type.__isKeepAlive;
function Yn(e, t, n = wi, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Qe();
			let i = Di(n), a = dn(t, n, e, r);
			return i(), $e(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Xn = (e) => (t, n = wi) => {
	Ai && e !== "sp" || Yn(e, (...e) => t(...e), n);
}, Zn = Xn("m"), Qn = Xn("um"), $n = /* @__PURE__ */ Symbol.for("v-ndc");
function er(e, t, n, r) {
	let i, a = n && n[r], o = E(e);
	if (o || A(e)) {
		let n = o && /* @__PURE__ */ Jt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Xt(e), s = /* @__PURE__ */ Yt(e), e = dt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? en($t(e[n])) : $t(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (M(e)) {
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
var tr = (e) => e ? ki(e) ? Li(e) : tr(e.parent) : null, nr = /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => tr(e.parent),
	$root: (e) => tr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		xn(e.update);
	},
	$nextTick: (e) => e.n ||= K.bind(e.proxy),
	$watch: (e) => y
}), rr = (e, t) => e !== _ && !e.__isScriptSetup && T(e, t), ir = {
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
			else if (rr(r, t)) return o[t] = 1, r[t];
			else if (T(a, t)) return o[t] = 3, a[t];
			else if (n !== _ && T(n, t)) return o[t] = 4, n[t];
			else o[t] = 0;
		}
		let l = nr[t], u, d;
		if (l) return t === "$attrs" && B(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== _ && T(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, T(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return rr(i, t) ? (i[t] = n, !0) : T(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || rr(t, s) || T(a, s) || T(r, s) || T(nr, s) || T(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? T(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function ar() {
	return {
		app: null,
		config: {
			isNativeTag: b,
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
var or = 0;
function sr(e, t) {
	return function(n, r = null) {
		k(n) || (n = C({}, n)), r != null && !M(r) && (r = null);
		let i = ar(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: or++,
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
				return a.has(e) || (e && k(e.install) ? (a.add(e), e.install(c, ...t)) : k(e) && (a.add(e), e(c, ...t))), c;
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
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Li(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (dn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = cr;
				cr = c;
				try {
					return e();
				} finally {
					cr = t;
				}
			}
		};
		return c;
	};
}
var cr = null, lr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${P(t)}Modifiers`] || e[`${F(t)}Modifiers`];
function ur(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || _, i = n, a = t.startsWith("update:"), o = a && lr(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => A(e) ? e.trim() : e)), o.number && (i = i.map(he)));
	let s, c = r[s = fe(t)] || r[s = fe(P(t))];
	!c && a && (c = r[s = fe(F(t))]), c && dn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, dn(l, e, 6, i);
	}
}
function dr(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (E(a) ? a.forEach((e) => o[e] = null) : C(o, a), M(e) && r.set(e, o), o) : (M(e) && r.set(e, null), null);
}
function fr(e, t) {
	return !e || !x(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), T(e, t[0].toLowerCase() + t.slice(1)) || T(e, F(t)) || T(e, t));
}
function pr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Mn(e), _, v;
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
			}) : e(d, null)), v = t.props ? s : hr(s);
		}
	} catch (t) {
		$r.length = 0, fn(t, e, 1), _ = $(Zr);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(S) && (v = gr(v, a)), y = fi(y, v, !1, !0));
	}
	return n.dirs && (y = fi(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && Bn(In(y.type) && zn(y) || y, n.transition), _ = y, Mn(g), _;
}
function mr(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (oi(r)) {
			if (r.type !== Zr || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var hr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || x(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, gr = (e, t) => {
	let n = {};
	for (let r in e) S(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function _r(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? vr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (yr(o, r, n) && !fr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || vr(r, o, l) : !!o;
	return !1;
}
function vr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!T(e, a) || yr(t, e, a) && !fr(n, a)) return !0;
	}
	return !1;
}
function yr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && M(r) && M(i) ? !Ae(r, i) : r !== i;
}
function br({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var xr = {}, Sr = () => Object.create(xr), Cr = (e) => Object.getPrototypeOf(e) === xr;
function wr(e, t, n, r = !1) {
	let i = {}, a = Sr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Er(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Gt(i) : e.type.props ? i : a, e.attrs = a;
}
function Tr(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ V(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (fr(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (T(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = P(o);
						i[t] = Dr(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Er(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (T(t, a) || (r = F(a)) !== a && T(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Dr(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && T(t, e) || (delete a[e], l = !0);
	}
	l && lt(e.attrs, "set", "");
}
function Er(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (ce(c)) continue;
		let l = t[c], u;
		i && T(i, u = P(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : fr(e.emitsOptions, c) || c in r && l === r[c] || (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ V(n), r = s || _;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Dr(i, t, s, r[s], e, !T(r, s));
		}
	}
	return o;
}
function Dr(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = T(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && k(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Di(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === F(n)) && (r = !0));
	}
	return r;
}
function Or(e, t, n = !1) {
	let r = t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [];
	if (!a) return M(e) && r.set(e, v), v;
	if (E(a)) for (let e = 0; e < a.length; e++) {
		let t = P(a[e]);
		kr(t) && (o[t] = _);
	}
	else if (a) for (let e in a) {
		let t = P(e);
		if (kr(t)) {
			let n = a[e], r = o[t] = E(n) || k(n) ? { type: n } : C({}, n), i = r.type, c = !1, l = !0;
			if (E(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = k(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = k(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || T(r, "default")) && s.push(t);
		}
	}
	let c = [o, s];
	return M(e) && r.set(e, c), c;
}
function kr(e) {
	return e[0] !== "$" && !ce(e);
}
var Ar = (e) => e === "_" || e === "_ctx" || e === "$stable", jr = (e) => E(e) ? e.map(hi) : [hi(e)], Mr = (e, t, n) => {
	if (t._n) return t;
	let r = Nn((...e) => jr(t(...e)), n);
	return r._c = !1, r;
}, Nr = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ar(n)) continue;
		let i = e[n];
		if (k(i)) t[n] = Mr(n, i, r);
		else if (i != null) {
			let e = jr(i);
			t[n] = () => e;
		}
	}
}, Pr = (e, t) => {
	let n = jr(t);
	e.slots.default = () => n;
}, Fr = (e, t, n) => {
	for (let r in t) (n || !Ar(r)) && (e[r] = t[r]);
}, Ir = (e, t, n) => {
	let r = e.slots = Sr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Fr(r, t, n), n && me(r, "_", e, !0)) : Nr(t, r);
	} else t && Pr(e, t);
}, Lr = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = _;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Fr(i, t, n) : (a = !t.$stable, Nr(t, i)), o = t;
	} else t && (Pr(e, t), o = { default: 1 });
	if (a) for (let e in i) !Ar(e) && o[e] == null && delete i[e];
}, J = Yr;
function Rr(e) {
	return zr(e);
}
function zr(e, t) {
	let n = _e();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = y, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !si(e, t) && (r = de(e), N(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === v && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Xr:
				g(e, t, n, r);
				break;
			case Zr:
				b(e, t, n, r);
				break;
			case Qr:
				e ?? x(t, n, r, o);
				break;
			case Y:
				k(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? A(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, I);
		}
		u != null && i ? Gn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Gn(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
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
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && E(e.children, f, null, i, s, Br(e, c), l, d), _ && Pn(e, null, i, "created"), T(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !ce(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && yi(p, i, e);
		}
		_ && Pn(e, null, i, "beforeMount");
		let v = Hr(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && J(() => {
			try {
				p && yi(p, i, e), v && g.enter(f), _ && Pn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, T = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Jr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
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
		let p = e.props || _, m = t.props || _, h;
		if (n && Vr(n, !1), (h = m.onVnodeBeforeUpdate) && yi(h, n, t, e), f && Pn(t, e, n, "beforeUpdate"), n && Vr(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? O(e.dynamicChildren, d, c, n, r, Br(t, i), o) : s || ie(e, t, c, null, n, r, Br(t, i), o, !1), l > 0) {
			if (l & 16) te(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && te(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && J(() => {
			h && yi(h, n, t, e), f && Pn(t, e, n, "updated");
		}, r);
	}, O = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || qr(c), f = u && (c.type === Y || !si(c, l) || c.shapeFlag & 198) ? d(u) : n;
			h(c, l, f, null, r, i, a, o, !0);
		}
	}, te = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== _) for (let o in t) !ce(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (ce(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, k = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), E(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (O(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Ur(e, t, !0)) : ie(e, t, n, f, a, o, c, l, u);
	}, A = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : j(t, n, r, i, a, o, c) : M(e, t, c);
	}, j = (e, t, n, r, i, a, o) => {
		let s = e.component = Ci(e, r, i);
		if (Jn(e) && (s.ctx.renderer = I), ji(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ne, o, a), !e.el) {
				let r = s.subTree = $(Zr);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ne(s, e, t, n, i, a, o);
	}, M = (e, t, n) => {
		let r = t.component = e.component;
		if (_r(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, re(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, ne = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Gr(e);
					if (n) {
						t && (t.el = c.el, re(e, t, o)), n.asyncDep.then(() => {
							J(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Vr(e, !1), t ? (t.el = c.el, re(e, t, o)) : t = c, n && pe(n), (f = t.props && t.props.onVnodeBeforeUpdate) && yi(f, s, t, c), Vr(e, !0);
				let p = pr(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), de(m), e, i, a), t.el = p.el, u === null && br(e, p.el), r && J(r, i), (f = t.props && t.props.onVnodeUpdated) && J(() => yi(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = qn(t);
				if (Vr(e, !1), l && pe(l), !m && (o = c && c.onVnodeBeforeMount) && yi(o, d, t), Vr(e, !0), s && he) {
					let t = () => {
						e.subTree = pr(e), he(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = pr(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && J(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					J(() => yi(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && qn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && J(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Le(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => xn(u), Vr(e, !0), l();
	}, re = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Tr(e, t.props, r, n), Lr(e, t.children, n), Qe(), wn(e), $e();
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
		m & 8 ? (d & 16 && F(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? oe(l, f, n, r, i, a, o, s, c) : F(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && E(f, n, r, i, a, o, s, c));
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		e ||= v, t ||= v;
		let l = e.length, u = t.length, d = Math.min(l, u), f = 0;
		for (; f < d; f++) {
			let r = t[f] = c ? gi(t[f]) : hi(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? F(e, i, a, !0, !1, d) : E(t, n, r, i, a, o, s, c, d);
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
		} else if (l > f) for (; l <= d;) N(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? gi(t[l]) : hi(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = f - m + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (y >= b) {
					N(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (C[_ - m] === 0 && si(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? N(r, i, a, !0) : (C[u - m] = l + 1, u >= S ? S = u : x = !0, h(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let w = x ? Wr(C) : v;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || qr(f) : r;
				C[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? se(d, n, p, 2) : _--);
			}
		}
	}, se = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) se(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, I);
		else if (c === Y) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) se(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === Qr) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[Ln] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), J(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[Ln];
					s._isLeaving && s[Ln](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, N = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Qe(), Gn(s, null, n, e, !0), $e()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !qn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && yi(_, t, e), u & 6) ue(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, I, r) : l && !l.hasOnce && (a !== Y || d > 0 && d & 64) ? F(l, t, n, !1, !0) : (a === Y && d & 384 || !i && u & 16) && F(c, t, n), r && le(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && J(() => {
			_ && yi(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, le = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e, o = t === Y;
		if (o && !a) {
			P(n, r);
			return;
		}
		if (t === Qr) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let s = o ? Vn(e) : e, c = () => {
			o ? d(n) && P(n, r) : i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (s && s.shapeFlag & 1 && a && !a.persisted) {
			let { leave: e, delayLeave: t } = a, n = s.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, P = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ue = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Kr(c), Kr(l), r && pe(r), i.stop(), a ? (a.flags |= 8, N(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, N(o, e, t, n)), s && J(s, t), J(() => {
			e.isUnmounted = !0;
		}, t);
	}, F = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) N(e[o], t, n, r, i);
	}, de = (e) => {
		if (e.shapeFlag & 6) return de(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[Fn];
		return n ? f(n) : t;
	}, fe = (e, t, n) => {
		Dn(() => {
			e == null ? t._vnode && N(t._vnode, null, null, !0) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : Si());
	}, I = {
		p: h,
		um: N,
		m: se,
		r: le,
		mt: j,
		mc: E,
		pc: ie,
		pbc: O,
		n: de,
		o: e
	}, me, he;
	return t && ([me, he] = t(I)), {
		render: fe,
		hydrate: me,
		createApp: sr(fe, me)
	};
}
function Br({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Vr({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hr(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ur(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (E(r) && E(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = gi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ur(t, a)), a.type === Xr && (a.patchFlag === -1 && (a = i[e] = gi(a)), a.el = t.el), a.type === Zr && !a.el && (a.el = t.el);
	}
}
function Wr(e) {
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
function Gr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Gr(t);
}
function Kr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function qr(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? qr(t.subTree) : null;
}
var Jr = (e) => e.__isSuspense;
function Yr(e, t) {
	t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : Cn(e);
}
var Y = /* @__PURE__ */ Symbol.for("v-fgt"), Xr = /* @__PURE__ */ Symbol.for("v-txt"), Zr = /* @__PURE__ */ Symbol.for("v-cmt"), Qr = /* @__PURE__ */ Symbol.for("v-stc"), $r = [], ei = null;
function X(e = !1) {
	$r.push(ei = e ? null : []);
}
function ti() {
	$r.pop(), ei = $r[$r.length - 1] || null;
}
var ni = 1;
function ri(e, t = !1) {
	ni += e, e < 0 && ei && t && (ei.hasOnce = !0);
}
function ii(e) {
	return e.dynamicChildren = ni > 0 ? ei || v : null, ti(), ni > 0 && ei && ei.push(e), e;
}
function Z(e, t, n, r, i, a) {
	return ii(Q(e, t, n, r, i, a, !0));
}
function ai(e, t, n, r, i) {
	return ii($(e, t, n, r, i, !0));
}
function oi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function si(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ci = ({ key: e }) => e ?? null, li = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : A(e) || /* @__PURE__ */ H(e) || k(e) ? {
	i: An,
	r: e,
	k: t,
	f: !!n
} : e);
function Q(e, t = null, n = null, r = 0, i = null, a = e === Y ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ci(t),
		ref: t && li(t),
		scopeId: jn,
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
		ctx: An
	};
	return s ? (_i(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= A(n) ? 8 : 16), ni > 0 && !o && ei && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && ei.push(c), c;
}
var $ = ui;
function ui(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== $n || (e = Zr), oi(e)) {
		let r = fi(e, t, !0);
		return n && _i(r, n), ni > 0 && !a && ei && (r.shapeFlag & 6 ? ei[ei.indexOf(e)] = r : ei.push(r)), r.patchFlag = -2, r;
	}
	if (Ri(e) && (e = e.__vccOpts), t) {
		t = di(t);
		let { class: e, style: n } = t;
		e && !A(e) && (t.class = Ce(e)), M(n) && (/* @__PURE__ */ Zt(n) && !E(n) && (n = C({}, n)), t.style = ve(n));
	}
	let o = A(e) ? 1 : Jr(e) ? 128 : In(e) ? 64 : M(e) ? 4 : k(e) ? 2 : 0;
	return Q(e, t, n, r, i, o, a, !0);
}
function di(e) {
	return e ? /* @__PURE__ */ Zt(e) || Cr(e) ? C({}, e) : e : null;
}
function fi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? vi(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ci(l),
		ref: t && t.ref ? n && a ? E(a) ? a.concat(li(t)) : [a, li(t)] : li(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Y ? o === -1 ? 16 : o | 16 : o,
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
	return c && r && Bn(u, c.clone(u)), u;
}
function pi(e = " ", t = 0) {
	return $(Xr, null, e, t);
}
function mi(e = "", t = !1) {
	return t ? (X(), ai(Zr, null, e)) : $(Zr, null, e);
}
function hi(e) {
	return e == null || typeof e == "boolean" ? $(Zr) : E(e) ? $(Y, null, e.slice()) : oi(e) ? gi(e) : $(Xr, null, String(e));
}
function gi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : fi(e);
}
function _i(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (E(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), _i(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Cr(t) ? t._ctx = An : r === 3 && An && (An.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (k(t)) {
		if (r & 65) {
			_i(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: An
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [pi(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function vi(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Ce([t.class, r.class]));
		else if (e === "style") t.style = ve([t.style, r.style]);
		else if (x(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(E(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !S(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function yi(e, t, n, r = null) {
	dn(e, t, 7, [n, r]);
}
var bi = ar(), xi = 0;
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
		scope: new Fe(!0),
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
		propsOptions: Or(r, i),
		emitsOptions: dr(r, i),
		emit: null,
		emitted: null,
		propsDefaults: _,
		inheritAttrs: r.inheritAttrs,
		ctx: _,
		data: _,
		props: _,
		attrs: _,
		slots: _,
		refs: _,
		setupState: _,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ur.bind(null, a), e.ce && e.ce(a), a;
}
var wi = null, Ti, Ei;
{
	let e = _e(), t = (t, n) => {
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
	wr(e, r, a, t), Ir(e, i, n || t);
	let o = a ? Mi(e, t) : void 0;
	return t && Ei(!1), o;
}
function Mi(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ir);
	let { setup: r } = n;
	if (r) {
		Qe();
		let n = e.setupContext = r.length > 1 ? Ii(e) : null, i = Di(e), a = un(r, e, 0, [e.props, n]), o = ne(a);
		if ($e(), i(), (o || e.sp) && !qn(e) && Hn(e), o) {
			if (a.then(Oi, Oi), t) return a.then((n) => {
				Ei(!0);
				try {
					Ni(e, n, t);
				} finally {
					Ei(!1);
				}
			}).catch((t) => {
				fn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ni(e, a, t);
	} else Pi(e, t);
}
function Ni(e, t, n) {
	k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : M(t) && (e.setupState = on(t)), Pi(e, n);
}
function Pi(e, t, n) {
	let r = e.type;
	e.render ||= r.render || y;
}
var Fi = { get(e, t) {
	return B(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(on(Qt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in nr) return nr[n](e);
		},
		has(e, t) {
			return t in e || t in nr;
		}
	}) : e.proxy;
}
function Ri(e) {
	return k(e) && "__vccOpts" in e;
}
var zi = (e, t) => /* @__PURE__ */ cn(e, t, Ai), Bi = "3.5.44", Vi = void 0, Hi = typeof window < "u" && window.trustedTypes;
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
	let r = e.style, i = A(n), a = !1;
	if (n && !i) {
		if (t) {
			if (A(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? ra(r, t, "");
			}
			else for (let e in t) n[e] ?? ra(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ra(r, i, "") : sa(e, i, !A(t) && t ? t[i] : void 0, o) || ra(r, i, o);
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
	if (E(n)) n.forEach((n) => ra(e, t, n));
	else if (n ??= "", t.startsWith("--")) na.test(n) ? e.setProperty(t, n.replace(na, ""), "important") : e.setProperty(t, n);
	else {
		let r = oa(e, t);
		na.test(n) ? e.setProperty(F(r), n.replace(na, ""), "important") : e[r] = n;
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
	let r = P(t);
	if (r !== "filter" && r in e) return aa[t] = r;
	r = de(r);
	for (let n = 0; n < ia.length; n++) {
		let i = ia[n] + r;
		if (i in e) return aa[t] = i;
	}
	return t;
}
function sa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && A(r) && n === r;
}
var ca = "http://www.w3.org/1999/xlink";
function la(e, t, n, r, i, a = we(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ca, t.slice(6, t.length)) : e.setAttributeNS(ca, t, n) : n == null || a && !Te(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : j(n) ? String(n) : n);
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
		r === "boolean" ? n = Te(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
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
	return [e[2] === ":" ? e.slice(3) : F(e.slice(2)), t];
}
var va = 0, ya = /* @__PURE__ */ Promise.resolve(), ba = () => va ||= (ya.then(() => va = 0), Date.now());
function xa(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (E(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && dn(e, t, 5, a);
			}
		} else dn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ba(), n;
}
var Sa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Xi(e, r, o) : t === "style" ? ta(e, n, r) : x(t) ? S(t) || ma(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : wa(e, t, r, o)) ? (ua(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || la(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ta(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !A(r))) ? ua(e, P(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), la(e, t, r, o));
};
function wa(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Sa(t) && k(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Sa(t) && A(n) ? !1 : t in e;
}
function Ta(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = P(t);
	return Array.isArray(n) ? n.some((e) => P(e) === r) : Object.keys(n).some((e) => P(e) === r);
}
var Ea = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return E(t) ? (e) => pe(t, e) : t;
};
function Da(e) {
	e.target.composing = !0;
}
function Oa(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var ka = /* @__PURE__ */ Symbol("_assign"), Aa = /* @__PURE__ */ Symbol("_initialValue");
function ja(e, t, n) {
	return t && (e = e.trim()), n && (e = he(e)), e;
}
var Ma = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Aa] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Aa] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[ka] = Ea(i);
		let a = r || i.props && i.props.type === "number";
		da(e, t ? "change" : "input", (t) => {
			t.target.composing || e[ka](ja(e.value, n, a));
		}), (n || a) && da(e, "change", () => {
			e.value = ja(e.value, n, a);
		}), t || (da(e, "compositionstart", Da), da(e, "compositionend", Oa), da(e, "change", Oa));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Aa];
		delete e[Aa], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[ka](ja(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[ka] = Ea(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? he(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Na = {
	deep: !0,
	created(e, t, n) {
		e[ka] = Ea(n), da(e, "change", () => {
			let t = e._modelValue, n = za(e), r = e.checked, i = e[ka];
			if (E(t)) {
				let e = je(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (O(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Ba(e, r));
		});
	},
	mounted: Pa,
	beforeUpdate(e, t, n) {
		e[ka] = Ea(n), Pa(e, t, n);
	}
};
function Pa(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (E(t)) i = je(t, r.props.value) > -1;
	else if (O(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Ae(t, Ba(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Fa = {
	created(e, { value: t }, n) {
		e.checked = Ae(t, n.props.value), e[ka] = Ea(n), da(e, "change", () => {
			e[ka](za(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[ka] = Ea(r), t !== n && (e.checked = Ae(t, r.props.value));
	}
}, Ia = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, da(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? he(za(e)) : za(e)), r = e.multiple, i = r ? O(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? E(i) ? t.slice() : t : i];
			try {
				e[ka](i);
			} finally {
				K(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[ka] = Ea(r);
	},
	mounted(e, { value: t }) {
		Ra(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[ka] = Ea(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && La(t, n[1], n[0]) || Ra(e, t);
	}
};
function La(e, t, n) {
	if (!n || E(e)) return Ae(e, t);
	if (O(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function Ra(e, t) {
	let n = e.multiple, r = E(t);
	if (!n || r || O(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = za(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : je(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Ae(za(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function za(e) {
	return "_value" in e ? e._value : e.value;
}
function Ba(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Va = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ha = {
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
	exact: (e, t) => Va.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ua = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ha[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Wa = /* @__PURE__ */ C({ patchProp: Ca }, Ji), Ga;
function Ka() {
	return Ga ||= Rr(Wa);
}
var qa = ((...e) => {
	let t = Ka().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ya(e);
		if (!r) return;
		let i = t._component;
		k(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Ja(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Ja(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ya(e) {
	return A(e) ? document.querySelector(e) : e;
}
// src/workshop.js
function Xa(t) {
	let n = /* @__PURE__ */ Wt({
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
	}), l, u, f, p = !1, m, h = !1, g = (e) => a[n.locale][e] || e;
	function _(e, t = !1) {
		n.notice = e, n.noticeError = t, clearTimeout(m), m = setTimeout(() => {
			n.notice = "";
		}, t ? 12e3 : 4500);
	}
	async function v(e, t = "working") {
		if (!n.busy) {
			n.busy = !0, n.busyKey = t;
			try {
				return await e();
			} catch (e) {
				return console.error("Llibres:", e), _(g([
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
				if (h && n.active && u) {
					h = !1;
					try {
						await O();
					} catch {
						_(g("error"), !0);
					}
				}
				n.busy = !1, await K();
			}
		}
	}
	function y(e, t = !0) {
		if (supportedLanguages.includes(e)) {
			n.locale = e;
			try {
				localStorage.setItem("llibres-language", n.locale);
			} catch {}
			t && window.commonsLanguage?.remember(n.locale), document.documentElement.lang = n.locale === "va" ? "ca-valencia" : n.locale;
		}
	}
	function b() {
		u && (p = !0, n.statusKey = "pending");
	}
	function x() {
		n.pages = l.pages().map(({ id: e, pageName: t }) => ({
			id: e,
			pageName: t
		}));
		let e = l.contentPages();
		n.selected = f, n.contentCount = e.length, n.contentIndex = e.findIndex((e) => e.id === f), n.automatic = n.contentIndex < 0;
		let t = l.comicInfo();
		n.comic = t.enabled, n.comicPanels = n.automatic ? 0 : t.layout, n.comicPanelIndex = Math.min(n.comicPanelIndex, Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex, n.bubbleSelected = !n.automatic && !!l.selectedBubble(), l.window.document.body.classList.toggle("llibres-credits", n.automatic), l.window.frameElement.inert = n.automatic;
	}
	async function S() {
		n.active = !0, n.advanced = !1, await K();
		let r = JSON.parse(localStorage.getItem("exe_user_preferences") || "{}");
		r.userPreferences ||= {}, r.userPreferences.locale = { value: n.locale === "va" ? "ca-valencia" : n.locale }, localStorage.setItem("exe_user_preferences", JSON.stringify(r));
		let i = document.createElement("iframe");
		i.id = "engine", i.title = g("edit"), i.src = "/engine/index.html", t.host().replaceChildren(i), l = new e(i), l.comicSelectionChanged = () => {
			n.bubbleSelected = !!l.selectedBubble();
		}, await l.ready(), l.changed = b, l.connectImagePicker(N);
	}
	async function C(e = !0) {
		if (!u) return;
		n.statusKey = "saving";
		let t = await l.save(), i = {
			...u,
			title: l.title() || g("title"),
			bytes: t,
			pageCount: l.pages().length,
			updatedAt: Date.now()
		};
		await r(i), u = i, p = !1, n.statusKey = "saved", l.pages().some((e) => e.id === f) || (f = l.contentPages()[0].id), e && await l.select(f), x(), p = !1, n.statusKey = "saved";
	}
	async function w({ title: e, template: t, layout: r = 2 }) {
		u = null, await S(), u = {
			id: i(),
			template: t,
			language: n.locale,
			title: e,
			createdAt: Date.now()
		}, n.newComicLayout = [
			2,
			3,
			4
		].includes(r) ? r : 2, f = await l.create(e, t, n.locale, n.newComicLayout), n.title = e, x(), await C();
	}
	async function ee(e) {
		u = null, await S(), u = e, f = await l.open(e.bytes), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), x(), p = !1, n.statusKey = "saved";
	}
	async function T(e) {
		if (!e) return;
		let t = await o(await e.arrayBuffer());
		u = null, await S(), u = {
			id: i(),
			language: n.locale,
			template: "import",
			title: e.name,
			createdAt: Date.now()
		}, f = await l.open(t), n.newComicLayout = l.comicInfo().defaultLayout, n.title = l.title(), x(), await C();
	}
	function E() {
		let e = n.title.trim();
		e && (l.title(e), u.title = e, b());
	}
	async function D() {
		await C(!1), u = null, p = !1, n.active = !1, ge(), t.host().replaceChildren(), await t.refreshShelf();
	}
	async function O(e = f) {
		await l.select(e), f = e, x();
	}
	async function te() {
		f = await l.addPage(g("page") + " " + l.contentPages().length, n.comic ? Number(n.newComicLayout) : 0), b(), x();
	}
	async function k(e) {
		await l.move(f, e), b(), x();
	}
	async function A() {
		let e = l.pages().find((e) => e.id === f)?.pageName, t = prompt(g("renamePrompt"), e);
		t?.trim() && (await l.rename(f, t.trim().slice(0, 120)), b(), x());
	}
	async function j() {
		if (l.contentPages().length <= 1) return _(g("onePage"));
		confirm(g("deletePage")) && (f = await l.delete(f), b(), x());
	}
	async function M(e) {
		await l.drawing(e), e && b();
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
		await C(), re(u.bytes, ie(".elpx"), "application/zip"), _(g("downloaded"));
	}
	async function oe(e, t) {
		let n = await l.export(e);
		re(n.bytes, ie(t), n.mimeType);
	}
	async function se() {
		await C(!1), t.read(u.title, await l.slides());
	}
	function ce() {
		n.busy ? h = !0 : v(() => O());
	}
	function N() {
		!n.busy && u && (n.rebostEnabled ? t.pick() : t.deviceImage());
	}
	let le = () => ({
		bookId: u?.id,
		pageId: f,
		editor: l
	}), P = (e) => e.bookId === u?.id && e.pageId === f && e.editor === l;
	async function ue(e, t) {
		e && (await l.image(e, t), t && await l.select(f), x());
	}
	function F(e = n.comicPanelIndex) {
		n.comicPanelIndex = Math.min(Math.max(0, Number(e) || 0), Math.max(0, n.comicPanels - 1)), l.comicPanelIndex = n.comicPanelIndex;
	}
	function de() {
		return l.bubbleDraft();
	}
	async function fe(e) {
		await l.writeBubble(e), b(), _("");
	}
	async function I() {
		return await C(!1), {
			id: u.id,
			title: u.title,
			cover: await s((await l.slides())[0].svg)
		};
	}
	let pe = (e) => c(l, u, {
		...e,
		language: u.language || n.locale
	});
	function me(e) {
		p && (e.preventDefault(), e.returnValue = "");
	}
	async function he() {
		y(n.locale), window.addEventListener("pageshow", ge), window.addEventListener("focus", ge), window.addEventListener("beforeunload", me);
		for (let [e, t] of [["publication", "publicationEnabled"], ["rebost", "rebostEnabled"]]) fetch("/" + e + "-status", { cache: "no-store" }).then(async (e) => {
			e.ok && (n[t] = (await e.json()).enabled === !0);
		}).catch(() => {});
		try {
			await t.refreshShelf();
		} catch {
			_(g("storageError"), !0);
		}
	}
	function ge() {
		n.active || y(d(!0));
	}
	function _e() {
		window.removeEventListener("pageshow", ge), window.removeEventListener("focus", ge), clearTimeout(m), window.removeEventListener("beforeunload", me);
	}
	return {
		state: n,
		t: g,
		notice: _,
		action: v,
		language: y,
		start: he,
		dispose: _e,
		create: w,
		openStored: ee,
		importFile: T,
		renameTitle: E,
		persist: C,
		back: D,
		select: O,
		addPage: te,
		move: k,
		renamePage: A,
		deletePage: j,
		drawing: M,
		advanced: ne,
		downloadBook: ae,
		exportBook: oe,
		read: se,
		pickImage: N,
		image: ue,
		chooseComicPanel: F,
		bubbleDraft: de,
		writeBubble: fe,
		context: le,
		matches: P,
		publicationData: I,
		packageBook: pe,
		resume: ce
	};
}
// src/shelf/BookCard.vue
var Za = { class: "book-card" }, Qa = ["disabled"], $a = ["disabled", "aria-label"], eo = {
	__name: "BookCard",
	props: {
		book: Object,
		locale: String,
		busy: Boolean
	},
	emits: ["open", "remove"],
	setup(e) {
		let t = e, n = (e) => a[t.locale][e] || e, r = zi(() => new Date(t.book.updatedAt).toLocaleDateString(t.locale === "va" ? "ca-ES-valencia" : t.locale));
		return (t, i) => (X(), Z("article", Za, [
			Q("button", {
				class: "book-open",
				disabled: e.busy,
				onClick: i[0] ||= (n) => t.$emit("open", e.book)
			}, L(e.book.title), 9, Qa),
			Q("p", null, L(r.value) + " · " + L(e.book.pageCount) + " " + L(n("pages").toLowerCase()), 1),
			Q("button", {
				class: "delete-book",
				disabled: e.busy,
				"aria-label": n("deleteLabel") + ": " + e.book.title,
				onClick: i[1] ||= (n) => t.$emit("remove", e.book)
			}, " × ", 8, $a)
		]));
	}
}, to = {
	class: "shelf",
	"aria-labelledby": "shelf-heading"
}, no = { class: "section-heading" }, ro = { id: "shelf-heading" }, io = {
	id: "book-count",
	role: "status"
}, ao = {
	key: 0,
	class: "empty"
}, oo = {
	__name: "Bookshelf",
	props: {
		locale: String,
		action: Function,
		openBook: Function
	},
	setup(e, { expose: r }) {
		let i = e, o = (e) => a[i.locale][e] || e, s = /* @__PURE__ */ tn([]), c = /* @__PURE__ */ U(!1), l = /* @__PURE__ */ U(null), u = 0;
		async function d() {
			let e = ++u, n = await t();
			e === u && (s.value = n.sort((e, t) => t.updatedAt - e.updatedAt), await K());
		}
		function f(e, t = "working") {
			if (!c.value) return i.action(async () => {
				c.value = !0;
				try {
					return await e();
				} finally {
					c.value = !1, await K();
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
				c.value = !1, await K(), i.focus();
			});
		}
		return r({ refresh: d }), (t, n) => (X(), Z("section", to, [Q("div", no, [Q("h2", ro, L(o("myBooks")), 1), Q("span", io, L(s.value.length), 1)]), Q("div", {
			id: "books",
			ref_key: "list",
			ref: l,
			class: "books"
		}, [s.value.length ? mi("", !0) : (X(), Z("div", ao, L(o("empty")), 1)), (X(!0), Z(Y, null, er(s.value, (t) => (X(), ai(eo, {
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
}, so = { class: "book-card" }, co = ["src"], lo = {
	__name: "ReviewCard",
	props: {
		item: Object,
		status: String
	},
	emits: ["open"],
	setup(e) {
		return (t, n) => (X(), Z("article", so, [
			e.item.status === "pending" || e.item.status === "returned" || e.item.published ? (X(), Z("img", {
				key: 0,
				src: e.item.status === "pending" || e.item.status === "returned" ? `/api/llibres/reviews/${e.item.id}/files/cover.png` : `/api/llibres/public/${e.item.id}/cover.png`,
				alt: "",
				loading: "lazy",
				style: { width: "100%" }
			}, null, 8, co)) : mi("", !0),
			Q("button", {
				class: "review-open",
				onClick: n[0] ||= (n) => t.$emit("open", e.item)
			}, L(e.item.title), 1),
			Q("p", null, L([
				e.item.author,
				e.item.class_name,
				e.status
			].join(" · ")), 1)
		]));
	}
}, uo = { class: "dialog-heading" }, fo = { id: "reviews-heading" }, po = ["hidden"], mo = ["href"], ho = { class: "actions" }, go = ["disabled"], _o = ["disabled"], vo = {
	id: "reviews-list",
	class: "books"
}, yo = ["hidden", "disabled"], bo = { class: "dialog-heading" }, xo = { id: "review-title" }, So = ["disabled"], Co = { id: "review-details" }, wo = {
	id: "review-feedback",
	role: "alert"
}, To = ["src", "title"], Eo = { class: "check" }, Do = ["disabled"], Oo = ["disabled"], ko = { class: "actions" }, Ao = ["disabled"], jo = ["disabled"], Mo = ["hidden", "disabled"], No = {
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
		}, o = /* @__PURE__ */ U(null), s = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U(null), u = /* @__PURE__ */ U([]), d = /* @__PURE__ */ U(null), f = /* @__PURE__ */ U(!1), p = /* @__PURE__ */ U(!1), m = /* @__PURE__ */ U(!1), h = /* @__PURE__ */ U(!1), g = /* @__PURE__ */ U(""), _ = /* @__PURE__ */ U(""), v = /* @__PURE__ */ U(""), y = /* @__PURE__ */ U(!1), b = 0, x = 0, S = zi(() => "/api/auth/oidc/login?next=" + encodeURIComponent("/llibres-login.html?lang=" + n.locale)), C = zi(() => d.value?.status === "pending"), w = zi(() => {
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
					h.value = !1, await K();
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
		function te() {
			s.value.close(), O();
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
				}), te(), await E(), o.value.open && (g.value = e === "approve" ? "reviewApprovedDone" : e === "return" ? "reviewReturnedDone" : "reviewWithdrawn", await K(), c.value.focus({ preventScroll: !0 }), o.value.scrollTop = 0, n.notice(r(g.value))));
			}
		}
		function j() {
			o.value.showModal(), T(() => E());
		}
		function M() {
			document.visibilityState !== "hidden" && o.value.open && p.value && T(() => E());
		}
		return Zn(() => {
			window.addEventListener("focus", M), document.addEventListener("visibilitychange", M);
		}), Qn(() => {
			x++, window.removeEventListener("focus", M), document.removeEventListener("visibilitychange", M);
		}), t({ open: j }), (e, t) => (X(), Z(Y, null, [Q("dialog", {
			id: "reviews-dialog",
			ref_key: "queue",
			ref: o,
			"aria-labelledby": "reviews-heading",
			onCancel: t[4] ||= (e) => {
				/* @__PURE__ */ H(x) ? x.value++ : x++, u.value = [];
			}
		}, [
			Q("div", uo, [Q("h2", fo, L(r("reviewBooks")), 1), Q("button", {
				id: "close-reviews",
				onClick: k
			}, L(r("close")), 1)]),
			Q("p", null, L(r("reviewsIntro")), 1),
			Q("section", {
				id: "reviews-login",
				hidden: !p.value
			}, [Q("p", null, L(r("reviewsLogin")), 1), Q("a", {
				id: "reviews-sign-in",
				class: "button",
				href: S.value,
				target: "_blank",
				rel: "noopener"
			}, L(r("publicationSignIn")), 9, mo)], 8, po),
			Q("div", ho, [Q("button", {
				id: "refresh-reviews",
				disabled: h.value,
				onClick: t[0] ||= (e) => T(() => E())
			}, L(r("refreshReviews")), 9, go), Q("label", null, [q(Q("input", {
				id: "reviews-all",
				"onUpdate:modelValue": t[1] ||= (e) => f.value = e,
				disabled: h.value,
				type: "checkbox",
				onChange: t[2] ||= (e) => T(() => E())
			}, null, 40, _o), [[Na, f.value]]), Q("span", null, L(r("reviewedToo")), 1)])]),
			Q("p", {
				id: "reviews-status",
				ref_key: "statusElement",
				ref: c,
				role: "status",
				tabindex: "-1"
			}, L(r(g.value)), 513),
			Q("div", vo, [(X(!0), Z(Y, null, er(u.value, (e) => (X(), ai(lo, {
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
			}, L(r("moreBooks")), 9, yo)
		], 544), Q("dialog", {
			id: "review-dialog",
			ref_key: "detail",
			ref: s,
			"aria-labelledby": "review-title",
			onCancel: O
		}, [
			Q("div", bo, [Q("h2", xo, L(d.value?.title), 1), Q("button", {
				id: "close-review",
				disabled: h.value,
				onClick: te
			}, L(r("close")), 9, So)]),
			Q("p", Co, L(d.value ? [
				d.value.author,
				d.value.class_name,
				d.value.license,
				r(i[d.value.status])
			].join(" · ") : ""), 1),
			Q("p", wo, L(r(_.value)), 1),
			Q("iframe", {
				id: "review-frame",
				src: w.value,
				title: r("reviewOpen"),
				sandbox: "allow-same-origin allow-downloads"
			}, null, 8, To),
			Q("label", Eo, [q(Q("input", {
				id: "review-confirm",
				"onUpdate:modelValue": t[5] ||= (e) => y.value = e,
				type: "checkbox",
				disabled: !C.value || h.value
			}, null, 8, Do), [[Na, y.value]]), Q("span", null, L(r("reviewConfirm")), 1)]),
			Q("label", null, [Q("span", null, L(r("reviewComment")), 1), q(Q("textarea", {
				id: "review-comment",
				"onUpdate:modelValue": t[6] ||= (e) => v.value = e,
				disabled: h.value,
				maxlength: "1000",
				rows: "3"
			}, null, 8, Oo), [[Ma, v.value]])]),
			Q("div", ko, [
				Q("button", {
					id: "approve-review",
					class: "primary",
					disabled: !C.value || !y.value || h.value,
					onClick: t[7] ||= (e) => T(() => A("approve"))
				}, L(r("approveReview")), 9, Ao),
				Q("button", {
					id: "return-review",
					disabled: !C.value || h.value,
					onClick: t[8] ||= (e) => T(() => A("return"))
				}, L(r("returnReview")), 9, jo),
				Q("button", {
					id: "withdraw-review",
					hidden: !d.value?.published,
					disabled: h.value,
					onClick: t[9] ||= (e) => T(() => A("withdraw"))
				}, L(r("withdrawPublication")), 9, Mo)
			])
		], 544)], 64));
	}
}, Po = { class: "dialog-heading" }, Fo = { id: "create-heading" }, Io = ["aria-label"], Lo = { for: "title" }, Ro = ["placeholder"], zo = { class: "templates" }, Bo = { class: "template-card sage" }, Vo = { class: "template-card peach" }, Ho = { class: "template-card sage" }, Uo = { class: "template-card cream" }, Wo = {
	key: 0,
	for: "comic-layout"
}, Go = ["value"], Ko = {
	class: "primary",
	type: "submit"
}, qo = {
	__name: "CreateDialog",
	props: {
		locale: String,
		core: Object
	},
	setup(e, { expose: t }) {
		let n = e, r = (e) => a[n.locale][e] || e, i = /* @__PURE__ */ U(null), o = /* @__PURE__ */ U(null), s = /* @__PURE__ */ U(""), c = /* @__PURE__ */ U("story"), l = /* @__PURE__ */ U(2);
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
			onSubmit: Ua(d, ["prevent"])
		}, [
			Q("div", Po, [Q("h2", Fo, L(r("createTitle")), 1), Q("button", {
				type: "button",
				class: "icon-button",
				id: "close-create",
				"aria-label": r("close"),
				onClick: t[0] ||= (e) => i.value.close()
			}, " × ", 8, Io)]),
			Q("label", Lo, L(r("title")), 1),
			q(Q("input", {
				id: "title",
				ref_key: "input",
				ref: o,
				"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
				placeholder: r("firstBook"),
				required: "",
				maxlength: "120",
				autocomplete: "off"
			}, null, 8, Ro), [[Ma, s.value]]),
			Q("fieldset", null, [Q("legend", null, L(r("template")), 1), Q("div", zo, [
				Q("label", null, [q(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					name: "template",
					value: "comic"
				}, null, 512), [[Fa, c.value]]), Q("span", Bo, [Q("b", null, L(r("comic")), 1), Q("small", null, L(r("comicHelp")), 1)])]),
				Q("label", null, [q(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					name: "template",
					value: "story"
				}, null, 512), [[Fa, c.value]]), Q("span", Vo, [Q("b", null, L(r("story")), 1), Q("small", null, L(r("storyHelp")), 1)])]),
				Q("label", null, [q(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					name: "template",
					value: "album"
				}, null, 512), [[Fa, c.value]]), Q("span", Ho, [Q("b", null, L(r("album")), 1), Q("small", null, L(r("albumHelp")), 1)])]),
				Q("label", null, [q(Q("input", {
					type: "radio",
					"onUpdate:modelValue": t[5] ||= (e) => c.value = e,
					name: "template",
					value: "blank"
				}, null, 512), [[Fa, c.value]]), Q("span", Uo, [Q("b", null, L(r("blank")), 1), Q("small", null, L(r("blankHelp")), 1)])])
			])]),
			c.value === "comic" ? (X(), Z("label", Wo, [pi(L(r("comicLayout")) + " ", 1), q(Q("select", {
				id: "comic-layout",
				"onUpdate:modelValue": t[6] ||= (e) => l.value = e
			}, [(X(), Z(Y, null, er([
				2,
				3,
				4
			], (e) => Q("option", {
				key: e,
				value: e
			}, L(e) + " " + L(r("comicPanels")), 9, Go)), 64))], 512), [[
				Ia,
				l.value,
				void 0,
				{ number: !0 }
			]])])) : mi("", !0),
			Q("button", Ko, L(r("start")), 1)
		], 32)], 512));
	}
}, Jo = ["hidden", "aria-label"], Yo = { class: "book-toolbar" }, Xo = ["aria-label"], Zo = {
	id: "save-status",
	role: "status"
}, Qo = ["hidden"], $o = { class: "workspace-body" }, es = { class: "pages-panel" }, ts = { class: "section-heading" }, ns = { id: "page-count" }, rs = { id: "pages" }, is = [
	"data-id",
	"aria-current",
	"onClick"
], as = ["disabled"], os = {
	key: 0,
	for: "new-comic-layout"
}, ss = ["value"], cs = { class: "page-actions" }, ls = ["disabled"], us = ["disabled"], ds = ["disabled"], fs = ["disabled"], ps = { class: "tip" }, ms = { class: "editor-panel" }, hs = { class: "editor-toolbar" }, gs = { id: "page-name" }, _s = ["disabled"], vs = ["disabled"], ys = ["disabled"], bs = ["disabled"], xs = ["disabled"], Ss = ["aria-label"], Cs = { for: "comic-panel" }, ws = ["value"], Ts = ["value"], Es = ["disabled"], Ds = {
	__name: "WorkshopView",
	props: { core: Object },
	emits: ["publish", "bubble"],
	setup(e, { expose: t }) {
		let n = e, r = n.core.state, i = n.core.t, a = /* @__PURE__ */ U(null), o = zi(() => r.automatic ? i("automaticCredits") : r.pages.find((e) => e.id === r.selected)?.pageName || "");
		return t({ host: () => a.value }), (t, n) => (X(), Z("section", {
			id: "workspace",
			hidden: !W(r).active,
			"aria-label": W(i)("workshop")
		}, [Q("div", Yo, [
			Q("button", {
				id: "back",
				onClick: n[0] ||= (t) => e.core.action(e.core.back, "saving")
			}, L(W(i)("back")), 1),
			q(Q("input", {
				id: "book-title",
				"onUpdate:modelValue": n[1] ||= (e) => W(r).title = e,
				"aria-label": W(i)("title"),
				onChange: n[2] ||= (t) => e.core.renameTitle(),
				maxlength: "120"
			}, null, 40, Xo), [[Ma, W(r).title]]),
			Q("span", Zo, L(W(i)(W(r).statusKey)), 1),
			Q("button", {
				id: "save-book",
				onClick: n[3] ||= (t) => e.core.action(e.core.persist, "saving")
			}, L(W(i)("save")), 1),
			Q("button", {
				id: "download",
				onClick: n[4] ||= (t) => e.core.action(e.core.downloadBook, "saving")
			}, L(W(i)("download")), 1),
			Q("button", {
				id: "read",
				onClick: n[5] ||= (t) => e.core.action(e.core.read),
				class: "primary"
			}, L(W(i)("read")), 1),
			Q("button", {
				id: "publish-book",
				onClick: n[6] ||= (e) => t.$emit("publish"),
				hidden: !W(r).publicationEnabled
			}, L(W(i)("publishBook")), 9, Qo)
		]), Q("div", $o, [Q("aside", es, [
			Q("div", ts, [Q("h2", null, L(W(i)("pages")), 1), Q("span", ns, L(W(r).pages.length), 1)]),
			Q("ol", rs, [(X(!0), Z(Y, null, er(W(r).pages, (t, n) => (X(), Z("li", { key: t.id }, [Q("button", {
				class: "page-tab",
				"data-id": t.id,
				"aria-current": String(t.id === W(r).selected),
				onClick: (n) => e.core.action(() => e.core.select(t.id))
			}, [Q("small", null, L(W(i)("page")) + " " + L(n + 1), 1), pi(L(t.pageName), 1)], 8, is)]))), 128))]),
			Q("button", {
				id: "add-page",
				disabled: W(r).contentCount >= 50,
				onClick: n[7] ||= (t) => e.core.action(e.core.addPage),
				class: "add-page"
			}, L(W(i)("addPage")), 9, as),
			W(r).comic ? (X(), Z("label", os, [pi(L(W(i)("comicNewPage")) + " ", 1), q(Q("select", {
				id: "new-comic-layout",
				"onUpdate:modelValue": n[8] ||= (e) => W(r).newComicLayout = e
			}, [(X(), Z(Y, null, er([
				2,
				3,
				4
			], (e) => Q("option", {
				key: e,
				value: e
			}, L(e) + " " + L(W(i)("comicPanels")), 9, ss)), 64))], 512), [[
				Ia,
				W(r).newComicLayout,
				void 0,
				{ number: !0 }
			]])])) : mi("", !0),
			Q("div", cs, [
				Q("button", {
					id: "move-up",
					disabled: W(r).automatic || W(r).contentIndex <= 0,
					onClick: n[9] ||= (t) => e.core.action(() => e.core.move(-1))
				}, L(W(i)("up")), 9, ls),
				Q("button", {
					id: "move-down",
					disabled: W(r).automatic || W(r).contentIndex >= W(r).contentCount - 1,
					onClick: n[10] ||= (t) => e.core.action(() => e.core.move(1))
				}, L(W(i)("down")), 9, us),
				Q("button", {
					id: "rename-page",
					disabled: W(r).automatic,
					onClick: n[11] ||= (t) => e.core.action(e.core.renamePage)
				}, L(W(i)("rename")), 9, ds),
				Q("button", {
					id: "delete-page",
					disabled: W(r).automatic || W(r).contentCount <= 1,
					onClick: n[12] ||= (t) => e.core.action(e.core.deletePage)
				}, L(W(i)("delete")), 9, fs)
			]),
			Q("p", ps, L(W(i)(W(r).automatic ? "creditsHint" : W(r).comicPanels ? "comicTip" : "tip")), 1)
		]), Q("div", ms, [
			Q("div", hs, [
				Q("span", gs, L(o.value), 1),
				Q("button", {
					id: "edit-page",
					disabled: W(r).automatic,
					onClick: n[13] ||= (t) => e.core.action(() => e.core.select())
				}, L(W(i)("edit")), 9, _s),
				Q("button", {
					id: "add-image",
					disabled: W(r).automatic,
					onClick: n[14] ||= (t) => e.core.pickImage()
				}, L(W(i)("image")), 9, vs),
				Q("button", {
					id: "draw",
					disabled: W(r).automatic,
					onClick: n[15] ||= (t) => e.core.action(() => e.core.drawing(!0))
				}, L(W(i)("draw")), 9, ys),
				Q("button", {
					id: "select",
					disabled: W(r).automatic,
					onClick: n[16] ||= (t) => e.core.action(() => e.core.drawing(!1))
				}, L(W(i)("select")), 9, bs),
				Q("button", {
					id: "advanced",
					disabled: W(r).automatic,
					onClick: n[17] ||= (t) => e.core.advanced()
				}, L(W(i)(W(r).advanced ? "editSimple" : "advanced")), 9, xs)
			]),
			W(r).comicPanels ? (X(), Z("div", {
				key: 0,
				class: "comic-toolbar",
				"aria-label": W(i)("comic")
			}, [
				Q("label", Cs, [pi(L(W(i)("comicPanel")) + " ", 1), Q("select", {
					id: "comic-panel",
					value: W(r).comicPanelIndex,
					onChange: n[18] ||= (t) => e.core.chooseComicPanel(t.target.value)
				}, [(X(!0), Z(Y, null, er(W(r).comicPanels, (e) => (X(), Z("option", {
					key: e,
					value: e - 1
				}, L(e), 9, Ts))), 128))], 40, ws)]),
				Q("button", {
					id: "add-bubble",
					onClick: n[19] ||= (e) => t.$emit("bubble", !1)
				}, L(W(i)("comicAddBubble")), 1),
				Q("button", {
					id: "edit-bubble",
					disabled: !W(r).bubbleSelected,
					onClick: n[20] ||= (e) => t.$emit("bubble", !0)
				}, L(W(i)("comicEditBubble")), 9, Es),
				Q("span", null, L(W(i)("comicPlacementHint")), 1)
			], 8, Ss)) : mi("", !0),
			Q("div", {
				id: "engine-host",
				ref_key: "engineHost",
				ref: a
			}, null, 512)
		])])], 8, Jo));
	}
}, Os = { class: "reader-toolbar" }, ks = { id: "reader-title" }, As = ["href"], js = {
	id: "reader-page",
	class: "reader-page"
}, Ms = { class: "reader-navigation" }, Ns = ["disabled"], Ps = { id: "reader-position" }, Fs = ["disabled"], Is = {
	__name: "ReaderDialog",
	props: { core: Object },
	emits: ["example-close"],
	setup(e, { expose: t, emit: n }) {
		let r = n, i = e, a = i.core.t, o = /* @__PURE__ */ U(null), s = /* @__PURE__ */ U(""), c = /* @__PURE__ */ tn([]), l = /* @__PURE__ */ U(0), u = /* @__PURE__ */ U(!1), d = /* @__PURE__ */ U("");
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
			Q("div", Os, [
				Q("button", {
					id: "close-reader",
					onClick: g
				}, L(W(a)(u.value ? "close" : "returnEdit")), 1),
				Q("strong", ks, L(s.value), 1),
				u.value ? mi("", !0) : (X(), Z("button", {
					key: 0,
					id: "export-html",
					onClick: n[0] ||= (t) => e.core.action(() => e.core.exportBook("html5", ".zip"), "exporting")
				}, L(W(a)("html")), 1)),
				u.value ? mi("", !0) : (X(), Z("button", {
					key: 1,
					id: "export-epub",
					onClick: n[1] ||= (t) => e.core.action(() => e.core.exportBook("epub3", ".epub"), "exporting")
				}, " EPUB ")),
				u.value ? (X(), Z("a", {
					key: 2,
					id: "reader-download-example",
					href: d.value,
					download: ""
				}, L(W(a)("demoDownload")), 9, As)) : mi("", !0)
			]),
			q(Q("div", js, null, 512), [[p, c.value[l.value]]]),
			Q("div", Ms, [
				Q("button", {
					id: "prev",
					disabled: l.value <= 0,
					onClick: n[2] ||= (e) => l.value--
				}, L(W(a)("prev")), 9, Ns),
				Q("span", Ps, L(l.value + 1) + " / " + L(c.value.length), 1),
				Q("button", {
					id: "next",
					disabled: l.value >= c.value.length - 1,
					onClick: n[3] ||= (e) => l.value++
				}, L(W(a)("next")), 9, Fs)
			])
		], 544));
	}
}, Ls = { class: "dialog-heading" }, Rs = { id: "image-picker-title" }, zs = { class: "image-sources" }, Bs = {
	__name: "ImagePicker",
	props: { core: Object },
	emits: ["device"],
	setup(e, { expose: t, emit: n }) {
		let r = e, a = n, o = r.core.t, s = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U(null), l = /* @__PURE__ */ U("sprite"), u = null;
		function d() {
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
			d(), a("device");
		}
		function _(e) {
			let t = u;
			if (t && p(e, t.frame.contentWindow, t.request)) {
				if (e.data.cancel) return d();
				r.core.action(async () => {
					let n = setTimeout(() => t.controller.abort(), 3e4);
					try {
						let n = await f(e.data.id, r.core.state.locale, t.controller.signal);
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
		return Zn(() => window.addEventListener("message", _)), Qn(() => {
			u?.controller.abort(), window.removeEventListener("message", _);
		}), t({ open: h }), (e, t) => (X(), Z("dialog", {
			id: "image-picker",
			ref_key: "dialog",
			ref: s,
			onCancel: d,
			"aria-labelledby": "image-picker-title"
		}, [
			Q("div", Ls, [Q("h2", Rs, L(W(o)("chooseImage")), 1), Q("button", {
				id: "close-image-picker",
				onClick: d
			}, L(W(o)("close")), 1)]),
			Q("div", zs, [
				Q("button", {
					id: "device-image",
					onClick: g
				}, L(W(o)("deviceImage")), 1),
				Q("button", {
					id: "rebost-sprites",
					onClick: t[0] ||= (e) => m("sprite")
				}, L(W(o)("rebostSprites")), 1),
				Q("button", {
					id: "rebost-backgrounds",
					onClick: t[1] ||= (e) => m("background")
				}, L(W(o)("rebostBackgrounds")), 1),
				Q("button", {
					id: "refresh-rebost",
					onClick: t[2] ||= (e) => m(l.value)
				}, L(W(o)("refreshRebost")), 1)
			]),
			Q("p", null, L(W(o)("rebostHint")), 1),
			Q("div", {
				id: "rebost-host",
				ref_key: "host",
				ref: c
			}, null, 512)
		], 544));
	}
}, Vs = { class: "dialog-heading" }, Hs = { id: "publish-heading" }, Us = ["hidden"], Ws = ["hidden"], Gs = ["href"], Ks = ["data-status", "hidden"], qs = { id: "submission-message" }, Js = { id: "submission-feedback" }, Ys = ["hidden"], Xs = {
	id: "publication-feedback",
	role: "alert"
}, Zs = ["hidden"], Qs = ["href"], $s = ["href"], ec = ["hidden"], tc = ["hidden"], nc = { id: "publish-title" }, rc = ["src"], ic = { class: "check" }, ac = { class: "check" }, oc = { id: "publication-consent-label" }, sc = {
	id: "confirm-publish",
	type: "submit",
	class: "primary"
}, cc = {
	__name: "PublicationDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(null), o = /* @__PURE__ */ U(null), s = /* @__PURE__ */ tn(null), c = /* @__PURE__ */ U(!1), d = /* @__PURE__ */ U(!1), f = /* @__PURE__ */ U(!1), p = /* @__PURE__ */ U(""), m = /* @__PURE__ */ U(""), h = /* @__PURE__ */ U(""), g = /* @__PURE__ */ U(""), _ = /* @__PURE__ */ U("publicationDone"), v = /* @__PURE__ */ U(""), y = /* @__PURE__ */ Wt({
			author: "",
			description: "",
			license: "CC-BY-SA-4.0",
			editable: !1,
			confirmed: !1
		}), b = "", x = 0, S = zi(() => encodeURIComponent("/llibres-login.html?lang=" + n.core.state.locale)), C = {
			pending: "reviewPending",
			returned: "reviewReturned",
			approved: "reviewApproved",
			cancelled: "reviewCancelled",
			draft: "reviewDraft"
		}, w = zi(() => s.value?.status || "draft"), ee = zi(() => v.value || C[w.value] || "reviewDraft"), T = zi(() => w.value === "pending" ? s.value?.published ? "reviewPendingPublished" : "reviewPendingHelp" : w.value === "returned" ? "reviewReturnedHelp" : w.value === "cancelled" ? s.value?.published ? "reviewCancelledPublished" : "reviewCancelledHelp" : "submissionIntro");
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
					await K();
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
		function te() {
			i.value.showModal(), D(O);
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
			})), y.confirmed = !1, c.value ? v.value = w.value === "approved" ? "reviewApproved" : "submissionDone" : _.value = e ? "publicationUpdated" : "publicationDone", await K(), i.value.open && ((c.value ? o.value : a.value).focus({ preventScroll: !0 }), i.value.scrollTop = 0), n.core.notice(r(c.value ? "submissionDone" : _.value));
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
				})), await K(), i.value.open && (o.value.focus({ preventScroll: !0 }), i.value.scrollTop = 0);
			});
		}
		async function ne() {
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
		function re() {
			!n.core.state.busy && document.visibilityState !== "hidden" && i.value.open && d.value && D(O);
		}
		return Zn(() => {
			window.addEventListener("focus", re), document.addEventListener("visibilitychange", re);
		}), Qn(() => {
			x++, URL.revokeObjectURL(m.value), window.removeEventListener("focus", re), document.removeEventListener("visibilitychange", re);
		}), t({ open: te }), (e, t) => (X(), Z("dialog", {
			id: "publish-dialog",
			ref_key: "dialog",
			ref: i,
			tabindex: "-1",
			"aria-labelledby": "publish-heading",
			onCancel: k
		}, [
			Q("div", Vs, [Q("h2", Hs, L(W(r)(c.value ? "submitReview" : "publishBook")), 1), Q("button", {
				id: "close-publish",
				onClick: k
			}, L(W(r)("close")), 1)]),
			Q("p", {
				id: "publish-intro",
				hidden: c.value
			}, L(W(r)("publishIntro")), 9, Us),
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
				}, L(W(r)(_.value)), 513),
				Q("p", null, L(W(r)("publicationActive")), 1),
				Q("a", {
					id: "publication-link",
					href: g.value || void 0,
					target: "_blank",
					rel: "noopener"
				}, L(W(r)("openPublication")), 9, Gs),
				Q("button", {
					id: "copy-publication",
					onClick: t[0] ||= (e) => D(ne)
				}, L(W(r)("copyPublication")), 1),
				Q("button", {
					id: "withdraw-publication",
					onClick: j
				}, L(W(r)("withdrawPublication")), 1)
			], 8, Ws),
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
				}, L(W(r)(ee.value)), 513),
				Q("p", qs, L(W(r)(T.value)), 1),
				Q("p", Js, L(s.value?.feedback), 1),
				Q("button", {
					id: "refresh-submission",
					onClick: t[1] ||= (e) => D(O)
				}, L(W(r)("refreshReviewStatus")), 1),
				Q("button", {
					id: "cancel-submission",
					hidden: !["pending", "returned"].includes(w.value),
					onClick: M
				}, L(W(r)("cancelSubmission")), 9, Ys)
			], 8, Ks),
			Q("p", Xs, L(W(r)(h.value)), 1),
			Q("section", {
				id: "publication-login",
				hidden: !d.value
			}, [
				Q("p", null, L(W(r)("publicationLogin")), 1),
				Q("a", {
					id: "publication-sign-in",
					class: "button",
					href: "/api/auth/oidc/login?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, L(W(r)("publicationSignIn")), 9, Qs),
				Q("a", {
					id: "publication-student-sign-in",
					class: "button",
					href: "/student.html?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, L(W(r)("studentSignIn")), 9, $s),
				Q("button", {
					id: "check-publication-login",
					onClick: t[2] ||= (e) => D(O)
				}, L(W(r)("refreshRebost")), 1)
			], 8, Zs),
			Q("p", {
				id: "submission-intro",
				hidden: !c.value
			}, L(W(r)("submissionIntro")), 9, ec),
			Q("form", {
				id: "publish-form",
				hidden: !f.value,
				onSubmit: t[8] ||= Ua((e) => D(A, "publishing"), ["prevent"])
			}, [
				Q("h3", nc, L(p.value), 1),
				Q("img", {
					id: "publish-cover",
					src: m.value || void 0,
					width: "320",
					height: "180",
					alt: ""
				}, null, 8, rc),
				Q("label", null, [Q("span", null, L(W(r)("publishAuthor")), 1), q(Q("input", {
					id: "publish-author",
					"onUpdate:modelValue": t[3] ||= (e) => y.author = e,
					required: "",
					maxlength: "120",
					autocomplete: "off"
				}, null, 512), [[Ma, y.author]])]),
				Q("label", null, [Q("span", null, L(W(r)("publishDescription")), 1), q(Q("textarea", {
					id: "publish-description",
					"onUpdate:modelValue": t[4] ||= (e) => y.description = e,
					maxlength: "2000",
					rows: "3"
				}, null, 512), [[Ma, y.description]])]),
				Q("label", null, [Q("span", null, L(W(r)("publishLicense")), 1), q(Q("select", {
					id: "publish-license",
					"onUpdate:modelValue": t[5] ||= (e) => y.license = e
				}, [...t[9] ||= [
					Q("option", { value: "CC-BY-SA-4.0" }, "CC BY-SA 4.0", -1),
					Q("option", { value: "CC-BY-4.0" }, "CC BY 4.0", -1),
					Q("option", { value: "CC0-1.0" }, "CC0 1.0", -1)
				]], 512), [[Ia, y.license]])]),
				Q("label", ic, [q(Q("input", {
					id: "publish-editable",
					"onUpdate:modelValue": t[6] ||= (e) => y.editable = e,
					type: "checkbox"
				}, null, 512), [[Na, y.editable]]), Q("span", null, L(W(r)("publishEditable")), 1)]),
				Q("label", ac, [q(Q("input", {
					id: "publish-confirm",
					"onUpdate:modelValue": t[7] ||= (e) => y.confirmed = e,
					type: "checkbox",
					required: ""
				}, null, 512), [[Na, y.confirmed]]), Q("span", oc, L(W(r)(c.value ? "submissionConfirm" : "publishConfirm")), 1)]),
				Q("button", sc, L(W(r)(c.value ? "submitReview" : s.value?.published ? "updatePublication" : "publishBook")), 1)
			], 40, tc)
		], 544));
	}
}, lc = { class: "dialog-heading" }, uc = { id: "shared-heading" }, dc = ["hidden", "href"], fc = ["aria-label"], pc = {
	id: "shared-status",
	role: "status"
}, mc = {
	id: "shared-books",
	class: "books"
}, hc = ["src"], gc = ["onClick"], _c = ["hidden"], vc = { class: "dialog-heading" }, yc = { id: "published-title" }, bc = ["src", "title"], xc = {
	__name: "SharedStories",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(null), o = /* @__PURE__ */ U(""), s = /* @__PURE__ */ U([]), c = /* @__PURE__ */ U(""), d = /* @__PURE__ */ U(!1), f = /* @__PURE__ */ U(""), p = /* @__PURE__ */ U(null), m = 0, h = 0;
		function g(e) {
			return n.core.action(async () => {
				try {
					await e();
				} catch (e) {
					throw i.value.open && (f.value = "publication_unavailable"), e;
				} finally {
					await K();
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
		return Qn(() => h++), t({ open: v }), (e, t) => (X(), Z(Y, null, [Q("dialog", {
			id: "shared-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "shared-heading",
			onCancel: t[3] ||= (e) => /* @__PURE__ */ H(h) ? h.value++ : h++
		}, [
			Q("div", lc, [Q("h2", uc, L(W(r)("sharedStories")), 1), Q("button", {
				id: "close-shared",
				onClick: y
			}, L(W(r)("close")), 1)]),
			Q("p", null, L(W(r)("sharedIntro")), 1),
			Q("a", {
				id: "shared-bank",
				hidden: !c.value,
				href: c.value || void 0,
				target: "_blank",
				rel: "noopener"
			}, L(W(r)("openBank")), 9, dc),
			Q("form", {
				id: "shared-search-form",
				onSubmit: t[1] ||= Ua((e) => g(() => _()), ["prevent"])
			}, [q(Q("input", {
				id: "shared-search",
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				type: "search",
				maxlength: "200",
				"aria-label": W(r)("searchBooksLabel")
			}, null, 8, fc), [[Ma, o.value]]), Q("button", null, L(W(r)("searchBooks")), 1)], 32),
			Q("p", pc, L(W(r)(f.value)), 1),
			Q("div", mc, [(X(!0), Z(Y, null, er(s.value, (e) => (X(), Z("article", {
				key: e.external_id,
				class: "book-card"
			}, [
				Q("img", {
					src: `/api/llibres/public/${e.external_id}/cover.png`,
					alt: "",
					loading: "lazy"
				}, null, 8, hc),
				Q("button", {
					class: "book-open",
					onClick: (t) => b(e)
				}, L(e.title), 9, gc),
				Q("p", null, L(e.author), 1)
			]))), 128))]),
			Q("button", {
				id: "shared-more",
				hidden: !d.value,
				onClick: t[2] ||= (e) => g(() => _(!0))
			}, L(W(r)("moreBooks")), 9, _c)
		], 544), Q("dialog", {
			id: "published-reader",
			ref_key: "reader",
			ref: a,
			"aria-labelledby": "published-title",
			onCancel: t[4] ||= (e) => p.value = null
		}, [Q("div", vc, [Q("h2", yc, L(p.value?.title), 1), Q("button", {
			id: "close-published-reader",
			onClick: x
		}, L(W(r)("close")), 1)]), Q("iframe", {
			id: "published-frame",
			src: p.value ? `/api/llibres/public/${p.value.external_id}/index.html` : void 0,
			title: W(r)("publishedBook"),
			sandbox: "allow-downloads"
		}, null, 8, bc)], 544)], 64));
	}
}, Sc = ["id", "aria-labelledby"], Cc = ["href", "aria-label"], wc = ["src", "alt"], Tc = { class: "eyebrow" }, Ec = ["id"], Dc = { class: "actions" }, Oc = ["id", "href"], kc = ["id", "disabled"], Ac = ["id", "href"], jc = {
	__name: "DemoBook",
	props: {
		locale: String,
		busy: Boolean,
		comic: Boolean
	},
	emits: ["edit", "read"],
	setup(e) {
		let t = e, n = zi(() => "/examples/" + (t.comic ? "la-granota" : "la-papallona")), r = zi(() => t.comic ? "La granota i la idea brillant" : "La papallona i els colors del bosc"), i = zi(() => t.comic ? "comic-demo" : "demo");
		return (t, o) => (X(), Z("section", {
			id: e.comic ? "demo-comic" : "demo-book",
			class: "demo-book",
			"aria-labelledby": i.value + "-heading"
		}, [Q("a", {
			href: n.value + "/",
			"aria-label": W(a)[e.locale].demoRead,
			onClick: o[0] ||= Ua((e) => t.$emit("read"), ["prevent"])
		}, [Q("img", {
			src: n.value + "/cover.png",
			alt: r.value,
			width: "320",
			height: "180",
			loading: "lazy"
		}, null, 8, wc)], 8, Cc), Q("div", null, [
			Q("p", Tc, L(W(a)[e.locale][e.comic ? "demoComicLabel" : "demoLabel"]), 1),
			Q("h2", { id: i.value + "-heading" }, L(r.value), 9, Ec),
			Q("p", null, L(W(a)[e.locale].demoDescription), 1),
			Q("div", Dc, [
				Q("a", {
					id: e.comic ? "read-comic-demo" : "read-demo",
					class: "demo-link",
					href: n.value + "/",
					onClick: o[1] ||= Ua((e) => t.$emit("read"), ["prevent"])
				}, L(W(a)[e.locale].demoRead), 9, Oc),
				Q("button", {
					id: e.comic ? "edit-comic-demo" : "edit-demo",
					disabled: e.busy,
					onClick: o[2] ||= (e) => t.$emit("edit")
				}, L(W(a)[e.locale].demoEdit), 9, kc),
				Q("a", {
					id: e.comic ? "download-comic-demo" : "download-demo",
					class: "demo-link",
					href: n.value + "/" + (e.comic ? "la-granota" : "la-papallona") + ".elpx",
					download: ""
				}, L(W(a)[e.locale].demoDownload), 9, Ac)
			])
		])], 8, Sc));
	}
}, Mc = { class: "dialog-heading" }, Nc = { id: "bubble-heading" }, Pc = ["aria-label"], Fc = { for: "bubble-kind" }, Ic = { value: "speech" }, Lc = { value: "thought" }, Rc = { value: "narration" }, zc = { for: "bubble-text" }, Bc = {
	id: "save-bubble",
	class: "primary",
	type: "submit"
}, Vc = {
	__name: "BubbleDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = /* @__PURE__ */ U(null), i = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(""), o = /* @__PURE__ */ U("speech"), s = null, c;
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
		}, [Q("form", { onSubmit: Ua(u, ["prevent"]) }, [
			Q("div", Mc, [Q("h2", Nc, L(e.core.t("comicBubble")), 1), Q("button", {
				id: "close-bubble",
				type: "button",
				"aria-label": e.core.t("close"),
				onClick: n[0] ||= (e) => r.value.close()
			}, "×", 8, Pc)]),
			Q("label", Fc, L(e.core.t("comicBubbleKind")), 1),
			q(Q("select", {
				id: "bubble-kind",
				"onUpdate:modelValue": n[1] ||= (e) => o.value = e
			}, [
				Q("option", Ic, L(e.core.t("comicSpeech")), 1),
				Q("option", Lc, L(e.core.t("comicThought")), 1),
				Q("option", Rc, L(e.core.t("comicNarration")), 1)
			], 512), [[Ia, o.value]]),
			Q("label", zc, L(e.core.t("comicBubbleText")), 1),
			q(Q("textarea", {
				id: "bubble-text",
				ref_key: "input",
				ref: i,
				"onUpdate:modelValue": n[2] ||= (e) => a.value = e,
				maxlength: "300",
				rows: "5",
				required: ""
			}, null, 512), [[Ma, a.value]]),
			Q("p", null, L(e.core.t("comicBubbleHint")), 1),
			Q("button", Bc, L(e.core.t("save")), 1)
		], 32)], 512));
	}
}, Hc = { class: "masthead" }, Uc = ["disabled"], Wc = ["hidden"], Gc = { class: "hero" }, Kc = { class: "eyebrow" }, qc = { class: "intro" }, Jc = { class: "actions" }, Yc = ["hidden"], Xc = ["hidden"], Zc = { class: "storage-note" }, Qc = {
	class: "hero-art",
	"aria-hidden": "true"
}, $c = { class: "book-cover" }, el = { href: "/about.html" }, tl = ["hidden"], nl = ["hidden"], rl = { id: "busy-text" }, il = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ U(null), n = /* @__PURE__ */ U(null), r = /* @__PURE__ */ U(null), i = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(null), o = /* @__PURE__ */ U(null), s = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U(null), l = /* @__PURE__ */ U(null), u = /* @__PURE__ */ U(null), d = /* @__PURE__ */ U(null), f = Xa({
			host: () => i.value.host(),
			refreshShelf: () => t.value.refresh(),
			read: (e, t) => a.value.open(e, t),
			pick: () => o.value.open(),
			deviceImage: () => u.value.click()
		}), p = f.state, g = f.t;
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
				let t = await h(e);
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
		return Zn(async () => {
			await f.start();
			let e = new URL(location.href).searchParams.get("example");
			m.includes(e) && await b(e);
		}), Qn(f.dispose), (e, m) => (X(), Z(Y, null, [
			Q("header", Hc, [m[14] ||= Q("a", {
				class: "brand",
				href: "/"
			}, [pi("◧ EduTicTac "), Q("b", null, "Llibres")], -1), q(Q("select", {
				id: "language",
				"onUpdate:modelValue": m[0] ||= (e) => W(p).locale = e,
				disabled: W(p).active,
				onChange: m[1] ||= (e) => W(f).language(W(p).locale),
				"aria-label": "Idioma"
			}, [...m[13] ||= [
				Q("option", { value: "es" }, "Castellano", -1),
				Q("option", { value: "ca" }, "Català", -1),
				Q("option", { value: "va" }, "Valencià", -1),
				Q("option", { value: "en" }, "English", -1)
			]], 40, Uc), [[Ia, W(p).locale]])]),
			Q("main", {
				id: "home",
				hidden: W(p).active
			}, [
				Q("section", Gc, [Q("div", null, [
					Q("p", Kc, L(W(g)("eyebrow")), 1),
					Q("h1", null, L(W(g)("headline")), 1),
					Q("p", qc, L(W(g)("intro")), 1),
					Q("div", Jc, [
						Q("button", {
							id: "new-book",
							onClick: m[2] ||= (e) => r.value.open(),
							class: "primary"
						}, L(W(g)("new")), 1),
						Q("button", {
							id: "open-book",
							onClick: m[3] ||= (e) => d.value.click()
						}, L(W(g)("open")), 1),
						Q("button", {
							id: "open-shared",
							onClick: m[4] ||= (e) => c.value.open(),
							hidden: !W(p).publicationEnabled
						}, L(W(g)("sharedStories")), 9, Yc),
						Q("button", {
							id: "open-reviews",
							onClick: m[5] ||= (e) => n.value.open(),
							hidden: !W(p).publicationEnabled
						}, L(W(g)("reviewBooks")), 9, Xc)
					]),
					Q("p", Zc, L(W(g)("local")), 1)
				]), Q("div", Qc, [Q("div", $c, [
					Q("span", null, [
						pi(L(W(g)("coverTop")), 1),
						m[15] ||= Q("br", null, null, -1),
						pi(L(W(g)("coverBottom")), 1)
					]),
					m[16] ||= Q("div", { class: "sun" }, null, -1),
					m[17] ||= Q("div", { class: "hill" }, null, -1),
					Q("i", null, L(W(g)("storySubtitle")), 1)
				]), m[18] ||= Q("span", { class: "star" }, "✳", -1)])]),
				$(jc, {
					locale: W(p).locale,
					busy: W(p).busy,
					onEdit: m[6] ||= (e) => y(!1),
					onRead: m[7] ||= (e) => b("la-papallona")
				}, null, 8, ["locale", "busy"]),
				$(jc, {
					comic: "",
					locale: W(p).locale,
					busy: W(p).busy,
					onEdit: m[8] ||= (e) => y(!0),
					onRead: m[9] ||= (e) => b("la-granota")
				}, null, 8, ["locale", "busy"]),
				$(oo, {
					ref_key: "shelf",
					ref: t,
					locale: W(p).locale,
					action: W(f).action,
					"open-book": W(f).openStored
				}, null, 8, [
					"locale",
					"action",
					"open-book"
				]),
				Q("footer", null, [Q("span", null, L(W(g)("footer")), 1), Q("a", el, L(W(g)("about")), 1)])
			], 8, Wc),
			$(Ds, {
				ref_key: "workshop",
				ref: i,
				core: W(f),
				onPublish: m[10] ||= (e) => s.value.open(),
				onBubble: m[11] ||= (e) => l.value.open(e)
			}, null, 8, ["core"]),
			$(Vc, {
				ref_key: "bubble",
				ref: l,
				core: W(f)
			}, null, 8, ["core"]),
			$(qo, {
				ref_key: "createDialog",
				ref: r,
				locale: W(p).locale,
				core: W(f)
			}, null, 8, ["locale", "core"]),
			$(Is, {
				ref_key: "reader",
				ref: a,
				core: W(f),
				onExampleClose: x
			}, null, 8, ["core"]),
			$(Bs, {
				ref_key: "picker",
				ref: o,
				core: W(f),
				onDevice: m[12] ||= (e) => u.value.click()
			}, null, 8, ["core"]),
			$(cc, {
				ref_key: "publication",
				ref: s,
				core: W(f)
			}, null, 8, ["core"]),
			$(xc, {
				ref_key: "shared",
				ref: c,
				core: W(f)
			}, null, 8, ["core"]),
			$(No, {
				ref_key: "reviews",
				ref: n,
				locale: W(p).locale,
				action: W(f).action,
				notice: W(f).notice
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
				class: Ce({ error: W(p).noticeError }),
				hidden: !W(p).notice
			}, L(W(p).notice), 11, tl),
			Q("div", {
				id: "busy",
				hidden: !W(p).busy,
				role: "status"
			}, [m[19] ||= Q("span", { class: "spinner" }, null, -1), Q("span", rl, L(W(g)(W(p).busyKey)), 1)], 8, nl)
		], 64));
	}
};
// src/ui.js
function al() {
	return qa(il).mount("#app");
}
export { al as mountLlibres };
