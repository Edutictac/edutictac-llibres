import { Editor as e } from "/adapter.js";
import { allBooks as t, removeBook as n, saveBook as r, uid as i } from "/store.js";
import { messages as a } from "/i18n.js";
import { inspectBook as o } from "/import.js";
import { coverImage as s, publicationPackage as c, publicationRequest as l, safeWebURL as u } from "/publication.js";
import { fetchImage as d, selection as f } from "/rebost.js";
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function p(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var m = {}, h = [], g = () => {}, _ = () => !1, v = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), y = (e) => e.startsWith("onUpdate:"), b = Object.assign, x = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, S = Object.prototype.hasOwnProperty, C = (e, t) => S.call(e, t), w = Array.isArray, T = (e) => ne(e) === "[object Map]", E = (e) => ne(e) === "[object Set]", D = (e) => ne(e) === "[object Date]", O = (e) => typeof e == "function", k = (e) => typeof e == "string", A = (e) => typeof e == "symbol", j = (e) => typeof e == "object" && !!e, ee = (e) => (j(e) || O(e)) && O(e.then) && O(e.catch), te = Object.prototype.toString, ne = (e) => te.call(e), re = (e) => ne(e).slice(8, -1), ie = (e) => ne(e) === "[object Object]", ae = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, oe = /* @__PURE__ */ p(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), se = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ce = /-\w/g, M = se((e) => e.replace(ce, (e) => e.slice(1).toUpperCase())), le = /\B([A-Z])/g, ue = se((e) => e.replace(le, "-$1").toLowerCase()), de = se((e) => e.charAt(0).toUpperCase() + e.slice(1)), fe = se((e) => e ? `on${de(e)}` : ""), N = (e, t) => !Object.is(e, t), pe = (e, ...t) => {
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
	if (w(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = k(r) ? Se(r) : ve(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (k(e) || j(e)) return e;
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
	if (k(e)) t = e;
	else if (w(e)) for (let n = 0; n < e.length; n++) {
		let r = Ce(e[n]);
		r && (t += r + " ");
	}
	else if (j(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var we = /* @__PURE__ */ p("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
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
	let r = T(e), i = T(t);
	if (r || i || (r = E(e), i = E(t), r || i)) return r && i ? De(e, t, n) : !1;
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
	let r = D(e), i = D(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = A(e), i = A(t), r || i ? e === t : (r = w(e), i = w(t), r || i ? r && i ? ke(e, t, n, Ee) : !1 : (r = j(e), i = j(t), r || i ? !r || !i ? !1 : ke(e, t, n, Oe) : String(e) === String(t))));
}
function je(e, t) {
	return e.findIndex((e) => Ae(e, t));
}
var Me = (e) => !!(e && e.__v_isRef === !0), P = (e) => k(e) ? e : e == null ? "" : w(e) || j(e) && (e.toString === te || !O(e.toString)) ? Me(e) ? P(e.value) : JSON.stringify(e, Ne, 2) : String(e), Ne = (e, t) => Me(t) ? Ne(e, t.value) : T(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Pe(t, r) + " =>"] = n, e), {}) } : E(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Pe(e)) } : A(t) ? Pe(t) : j(t) && !w(t) && !ie(t) ? String(t) : t, Pe = (e, t = "") => A(e) ? `Symbol(${e.description ?? t})` : e, F, Fe = class {
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
}, I, Ie = /* @__PURE__ */ new WeakSet(), Le = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, F && (F.active ? F.effects.push(this) : this.flags &= -2);
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
		let e = I, t = Xe;
		I = this, Xe = !0;
		try {
			return this.fn();
		} finally {
			Ge(this), I = e, Xe = t, this.flags &= -3;
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
	let t = e.dep, n = I, r = Xe;
	I = e, Xe = !0;
	try {
		We(e);
		let n = e.fn(e._value);
		(t.version === 0 || N(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		I = n, Xe = r, Ge(e), e.flags &= -3;
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
		let e = I;
		I = void 0;
		try {
			t();
		} finally {
			I = e;
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
		if (!I || !Xe || I === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== I) t = this.activeLink = new nt(I, this), I.deps ? (t.prevDep = I.depsTail, I.depsTail.nextDep = t, I.depsTail = t) : I.deps = I.depsTail = t, it(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = I.depsTail, t.nextDep = void 0, I.depsTail.nextDep = t, I.depsTail = t, I.deps === t && (I.deps = e);
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
function L(e, t, n) {
	if (Xe && I) {
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
		let i = w(e), a = i && ae(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ct || !A(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ct)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ot)), T(e) && s(o.get(st)));
				break;
			case "delete":
				i || (s(o.get(ot)), T(e) && s(o.get(st)));
				break;
			case "set": T(e) && s(o.get(ot));
		}
	}
	Ue();
}
function ut(e) {
	let t = /* @__PURE__ */ R(e);
	return t === e || (L(t, "iterate", ct), /* @__PURE__ */ Xt(e)) ? t : /* @__PURE__ */ Yt(e) ? /* @__PURE__ */ Jt(e) ? t.map((e) => $t(z(e))) : t.map($t) : t.map(z);
}
function dt(e) {
	return L(e = /* @__PURE__ */ R(e), "iterate", ct), e;
}
function ft(e, t) {
	return /* @__PURE__ */ Yt(e) ? $t(/* @__PURE__ */ Jt(e) ? z(t) : t) : z(t);
}
var pt = {
	__proto__: null,
	[Symbol.iterator]() {
		return mt(this, Symbol.iterator, (e) => ft(this, e));
	},
	concat(...e) {
		return ut(this).concat(...e.map((e) => w(e) ? ut(e) : e));
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
		return s ? z(t) : t;
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
	let r = /* @__PURE__ */ R(e);
	L(r, "iterate", ct);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Zt(n[0]) ? (n[0] = /* @__PURE__ */ R(n[0]), r[t](...n)) : i;
}
function bt(e, t, n = []) {
	Qe(), He();
	let r = (/* @__PURE__ */ R(e))[t].apply(e, n);
	return Ue(), $e(), r;
}
var xt = /* @__PURE__ */ p("__proto__,__v_isRef,__isVue"), St = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(A));
function Ct(e) {
	A(e) || (e = String(e));
	let t = /* @__PURE__ */ R(this);
	return L(t, "has", e), t.hasOwnProperty(e);
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
		let a = w(e);
		if (!r) {
			let e;
			if (a && (e = pt[t])) return e;
			if (t === "hasOwnProperty") return Ct;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ B(e) ? e : n);
		if ((A(t) ? St.has(t) : xt(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ B(o)) {
			let e = a && ae(t) ? o : o.value;
			return r && j(e) ? /* @__PURE__ */ Kt(e) : e;
		}
		return j(o) ? r ? /* @__PURE__ */ Kt(o) : /* @__PURE__ */ Wt(o) : o;
	}
}, Tt = class extends wt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = w(e) && ae(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Yt(i);
			if (!/* @__PURE__ */ Xt(n) && !/* @__PURE__ */ Yt(n) && (i = /* @__PURE__ */ R(i), n = /* @__PURE__ */ R(n)), !a && /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : C(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ B(e) ? e : r);
		return e === /* @__PURE__ */ R(r) && s && (o ? N(n, i) && lt(e, "set", t, n, i) : lt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = C(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && lt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return A(t) && St.has(t) || L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", w(e) ? "length" : ot), Reflect.ownKeys(e);
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
		let i = this.__v_raw, a = /* @__PURE__ */ R(i), o = T(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? At : t ? $t : z;
		return !t && L(a, "iterate", c ? st : ot), b(Object.create(l), { next() {
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
			let r = this.__v_raw, i = /* @__PURE__ */ R(r), a = /* @__PURE__ */ R(n);
			e || (N(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = jt(i), s = t ? At : e ? $t : z;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ R(t), "iterate", ot), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ R(n), i = /* @__PURE__ */ R(t);
			return e || (N(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ R(a), s = t ? At : e ? $t : z;
			return !e && L(o, "iterate", ot), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return b(n, e ? {
		add: Nt("add"),
		set: Nt("set"),
		delete: Nt("delete"),
		clear: Nt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ R(this), r = jt(n), i = /* @__PURE__ */ R(e), a = !t && !/* @__PURE__ */ Xt(e) && !/* @__PURE__ */ Yt(e) ? i : e;
			return r.has.call(n, a) || N(e, a) && r.has.call(n, e) || N(i, a) && r.has.call(n, i) || (n.add(a), lt(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ Xt(n) || /* @__PURE__ */ Yt(n) || (n = /* @__PURE__ */ R(n));
			let r = /* @__PURE__ */ R(this), { has: i, get: a } = jt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ R(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? N(n, s) && lt(r, "set", e, n, s) : lt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ R(this), { has: n, get: r } = jt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ R(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && lt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ R(this), t = e.size !== 0, n = e.clear();
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
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(C(n, i) && i in r ? n : r, i, a);
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
	if (!j(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Ut(re(e));
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
function R(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ R(t) : e;
}
function Qt(e) {
	return !C(e, "__v_skip") && Object.isExtensible(e) && me(e, "__v_skip", !0), e;
}
var z = (e) => j(e) ? /* @__PURE__ */ Wt(e) : e, $t = (e) => j(e) ? /* @__PURE__ */ Kt(e) : e;
// @__NO_SIDE_EFFECTS__
function B(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function V(e) {
	return tn(e, !1);
}
// @__NO_SIDE_EFFECTS__
function en(e) {
	return tn(e, !0);
}
function tn(e, t) {
	return /* @__PURE__ */ B(e) ? e : new nn(e, t);
}
var nn = class {
	constructor(e, t) {
		this.dep = new rt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ R(e), this._value = t ? e : z(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Xt(e) || /* @__PURE__ */ Yt(e);
		e = n ? e : /* @__PURE__ */ R(e), N(e, t) && (this._rawValue = e, this._value = n ? e : z(e), this.dep.trigger());
	}
};
function H(e) {
	return /* @__PURE__ */ B(e) ? e.value : e;
}
var rn = {
	get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function an(e) {
	return /* @__PURE__ */ Jt(e) ? e : new Proxy(e, rn);
}
var on = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new rt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && I !== this) return Ve(this, !0), !0;
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
function sn(e, t, n = !1) {
	let r, i;
	return O(e) ? r = e : (r = e.get, i = e.set), new on(r, i, n);
}
function cn(e, t = Infinity, n) {
	if (t <= 0 || !j(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ B(e)) cn(e.value, t, n);
	else if (w(e)) for (let r = 0; r < e.length; r++) cn(e[r], t, n);
	else if (E(e) || T(e)) e.forEach((e) => {
		cn(e, t, n);
	});
	else if (ie(e)) {
		for (let r in e) cn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && cn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function ln(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		dn(e, t, n);
	}
}
function un(e, t, n, r) {
	if (O(e)) {
		let i = ln(e, t, n, r);
		return i && ee(i) && i.catch((e) => {
			dn(e, t, n);
		}), i;
	}
	if (w(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(un(e[a], t, n, r));
		return i;
	}
}
function dn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || m;
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
			Qe(), ln(a, null, 10, [
				e,
				i,
				o
			]), $e();
			return;
		}
	}
	fn(e, n, i, r, o);
}
function fn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var U = [], pn = -1, mn = [], hn = null, gn = 0, _n = /* @__PURE__ */ Promise.resolve(), vn = null;
function W(e) {
	let t = vn || _n;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function yn(e) {
	let t = pn + 1, n = U.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = U[r], a = Dn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function bn(e) {
	if (!(e.flags & 1)) {
		let t = Dn(e), n = U[U.length - 1];
		!n || !(e.flags & 2) && t >= Dn(n) ? U.push(e) : U.splice(yn(t), 0, e), e.flags |= 1, xn();
	}
}
function xn() {
	vn ||= _n.then(On);
}
function Sn(e) {
	if (!w(e)) hn && e.id === -1 ? hn.splice(gn + 1, 0, e) : e.flags & 1 || (mn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) mn.push(e[t]);
	xn();
}
function Cn(e, t, n, r = pn + 1) {
	for (; r < U.length; r++) {
		let n = U[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			U.splice(r, 1), r = e ? r - 1 : pn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function wn(e, t, n = 0) {
	if (mn.length) {
		let e = mn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < mn.length; i++) {
				let a = mn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? mn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => Dn(e) - Dn(t));
		if (mn.length = r, hn) {
			for (let e = 0; e < i.length; e++) hn.push(i[e]);
			return;
		}
		for (hn = i, gn = 0; gn < hn.length; gn++) {
			let e = hn[gn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		hn = null, gn = 0;
	}
}
var Tn = !1;
function En(e, t) {
	if (Tn) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(mn);
	e(), Tn = !0;
	try {
		Cn(void 0, t), wn(void 0, n, t);
	} finally {
		Tn = !1;
	}
}
var Dn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function On(e) {
	try {
		for (pn = 0; pn < U.length; pn++) {
			let e = U[pn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), ln(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; pn < U.length; pn++) {
			let e = U[pn];
			e && (e.flags &= -2);
		}
		pn = -1, U.length = 0, wn(e), vn = null, (U.length || mn.length) && On(e);
	}
}
var kn = null, An = null;
function jn(e) {
	let t = kn;
	return kn = e, An = e && e.type.__scopeId || null, t;
}
function Mn(e, t = kn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ti(-1);
		let i = jn(t), a = Qr.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Qr.length; e > a; e--) $r();
			jn(i), r._d && ti(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function G(e, t) {
	if (kn === null) return e;
	let n = Fi(kn), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = m] = t[e];
		i && (O(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && cn(a), r.push({
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
function Nn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Qe(), un(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), $e());
	}
}
var Pn = /* @__PURE__ */ Symbol("_vte"), Fn = (e) => e.__isTeleport, In = /* @__PURE__ */ Symbol("_leaveCb");
function Ln(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Xr) {
			t = n;
			break;
		}
	}
	return t;
}
function Rn(e) {
	if (!qn(e)) return Fn(e.type) && e.children ? Ln(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && O(n.default)) return n.default();
	}
}
function zn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		zn(Fn(n.type) && Rn(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === q && w(e.children)) {
		let n = pr(e.children, !1);
		n && zn(n, t);
	}
}
function Bn(e) {
	if (e.component) return Bn(e.component.subTree);
	if (e.type === q) {
		let t = w(e.children) && pr(e.children, !1);
		return t ? Bn(t) : void 0;
	}
	if (e.type !== Xr) return e;
}
function Vn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Hn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Un = /* @__PURE__ */ new WeakMap();
function Wn(e, t, n, r, i = !1) {
	if (w(e)) {
		e.forEach((e, a) => Wn(e, t && (w(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Kn(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Wn(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Fi(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === m ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ R(d), p = d === m ? _ : (e) => !Hn(u, e) && C(f, e), h = (e, t) => !(t && Hn(u, t));
	if (l != null && l !== c) {
		if (Gn(t), k(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ B(l)) {
			let e = t;
			h(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (O(c)) ln(c, s, 12, [o, u]);
	else {
		let t = k(c), r = /* @__PURE__ */ B(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : h(c) || !e.k ? c.value : u[e.k];
					if (i) w(n) && x(n, a);
					else if (w(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						h(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (h(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Un.delete(e);
				};
				t.id = -1, Un.set(e, t), K(t, n);
			} else Gn(e), s();
		}
	}
}
function Gn(e) {
	let t = Un.get(e);
	t && (t.flags |= 8, Un.delete(e));
}
_e().requestIdleCallback, _e().cancelIdleCallback;
var Kn = (e) => !!e.type.__asyncLoader, qn = (e) => e.type.__isKeepAlive;
function Jn(e, t, n = Si, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Qe();
			let i = Ti(n), a = un(t, n, e, r);
			return i(), $e(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Yn = (e) => (t, n = Si) => {
	Oi && e !== "sp" || Jn(e, (...e) => t(...e), n);
}, Xn = Yn("m"), Zn = Yn("um"), Qn = /* @__PURE__ */ Symbol.for("v-ndc");
function $n(e, t, n, r) {
	let i, a = n && n[r], o = w(e);
	if (o || k(e)) {
		let n = o && /* @__PURE__ */ Jt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Xt(e), s = /* @__PURE__ */ Yt(e), e = dt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? $t(z(e[n])) : z(e[n]) : e[n], n, void 0, a && a[n]);
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
var er = (e) => e ? Di(e) ? Fi(e) : er(e.parent) : null, tr = /* @__PURE__ */ b(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => er(e.parent),
	$root: (e) => er(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		bn(e.update);
	},
	$nextTick: (e) => e.n ||= W.bind(e.proxy),
	$watch: (e) => g
}), nr = (e, t) => e !== m && !e.__isScriptSetup && C(e, t), rr = {
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
			else if (nr(r, t)) return o[t] = 1, r[t];
			else if (C(a, t)) return o[t] = 3, a[t];
			else if (n !== m && C(n, t)) return o[t] = 4, n[t];
			else o[t] = 0;
		}
		let l = tr[t], u, d;
		if (l) return t === "$attrs" && L(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== m && C(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, C(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return nr(i, t) ? (i[t] = n, !0) : C(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || nr(t, s) || C(a, s) || C(r, s) || C(tr, s) || C(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? C(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function ir() {
	return {
		app: null,
		config: {
			isNativeTag: _,
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
var ar = 0;
function or(e, t) {
	return function(n, r = null) {
		O(n) || (n = b({}, n)), r != null && !j(r) && (r = null);
		let i = ir(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: ar++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ri,
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
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Fi(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (un(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = sr;
				sr = c;
				try {
					return e();
				} finally {
					sr = t;
				}
			}
		};
		return c;
	};
}
var sr = null, cr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${M(t)}Modifiers`] || e[`${ue(t)}Modifiers`];
function lr(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || m, i = n, a = t.startsWith("update:"), o = a && cr(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => k(e) ? e.trim() : e)), o.number && (i = i.map(he)));
	let s, c = r[s = fe(t)] || r[s = fe(M(t))];
	!c && a && (c = r[s = fe(ue(t))]), c && un(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, un(l, e, 6, i);
	}
}
function ur(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (w(a) ? a.forEach((e) => o[e] = null) : b(o, a), j(e) && r.set(e, o), o) : (j(e) && r.set(e, null), null);
}
function dr(e, t) {
	return !e || !v(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), C(e, t[0].toLowerCase() + t.slice(1)) || C(e, ue(t)) || C(e, t));
}
function fr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = jn(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = pi(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = pi(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : mr(s);
		}
	} catch (t) {
		Qr.length = 0, dn(t, e, 1), _ = Q(Xr);
	}
	let b = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(y) && (v = hr(v, a)), b = ui(b, v, !1, !0));
	}
	return n.dirs && (b = ui(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && zn(Fn(b.type) && Rn(b) || b, n.transition), _ = b, jn(g), _;
}
function pr(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (ii(r)) {
			if (r.type !== Xr || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var mr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || v(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, hr = (e, t) => {
	let n = {};
	for (let r in e) y(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function gr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? _r(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (vr(o, r, n) && !dr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || _r(r, o, l) : !!o;
	return !1;
}
function _r(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!C(e, a) || vr(t, e, a) && !dr(n, a)) return !0;
	}
	return !1;
}
function vr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && j(r) && j(i) ? !Ae(r, i) : r !== i;
}
function yr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var br = {}, xr = () => Object.create(br), Sr = (e) => Object.getPrototypeOf(e) === br;
function Cr(e, t, n, r = !1) {
	let i = {}, a = xr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Tr(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Gt(i) : e.type.props ? i : a, e.attrs = a;
}
function wr(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ R(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (dr(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (C(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = M(o);
						i[t] = Er(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Tr(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (C(t, a) || (r = ue(a)) !== a && C(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Er(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && C(t, e) || (delete a[e], l = !0);
	}
	l && lt(e.attrs, "set", "");
}
function Tr(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (oe(c)) continue;
		let l = t[c], u;
		i && C(i, u = M(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : dr(e.emitsOptions, c) || c in r && l === r[c] || (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ R(n), r = s || m;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Er(i, t, s, r[s], e, !C(r, s));
		}
	}
	return o;
}
function Er(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = C(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && O(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ti(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ue(n)) && (r = !0));
	}
	return r;
}
function Dr(e, t, n = !1) {
	let r = t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [];
	if (!a) return j(e) && r.set(e, h), h;
	if (w(a)) for (let e = 0; e < a.length; e++) {
		let t = M(a[e]);
		Or(t) && (o[t] = m);
	}
	else if (a) for (let e in a) {
		let t = M(e);
		if (Or(t)) {
			let n = a[e], r = o[t] = w(n) || O(n) ? { type: n } : b({}, n), i = r.type, c = !1, l = !0;
			if (w(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = O(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = O(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || C(r, "default")) && s.push(t);
		}
	}
	let c = [o, s];
	return j(e) && r.set(e, c), c;
}
function Or(e) {
	return e[0] !== "$" && !oe(e);
}
var kr = (e) => e === "_" || e === "_ctx" || e === "$stable", Ar = (e) => w(e) ? e.map(pi) : [pi(e)], jr = (e, t, n) => {
	if (t._n) return t;
	let r = Mn((...e) => Ar(t(...e)), n);
	return r._c = !1, r;
}, Mr = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (kr(n)) continue;
		let i = e[n];
		if (O(i)) t[n] = jr(n, i, r);
		else if (i != null) {
			let e = Ar(i);
			t[n] = () => e;
		}
	}
}, Nr = (e, t) => {
	let n = Ar(t);
	e.slots.default = () => n;
}, Pr = (e, t, n) => {
	for (let r in t) (n || !kr(r)) && (e[r] = t[r]);
}, Fr = (e, t, n) => {
	let r = e.slots = xr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Pr(r, t, n), n && me(r, "_", e, !0)) : Mr(t, r);
	} else t && Nr(e, t);
}, Ir = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = m;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Pr(i, t, n) : (a = !t.$stable, Mr(t, i)), o = t;
	} else t && (Nr(e, t), o = { default: 1 });
	if (a) for (let e in i) !kr(e) && o[e] == null && delete i[e];
}, K = Jr;
function Lr(e) {
	return Rr(e);
}
function Rr(e, t) {
	let n = _e();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = g, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ai(e, t) && (r = me(e), le(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === h && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Yr:
				y(e, t, n, r);
				break;
			case Xr:
				b(e, t, n, r);
				break;
			case Zr:
				e ?? x(t, n, r, o);
				break;
			case q:
				j(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? ee(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ge);
		}
		u != null && i ? Wn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Wn(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), O(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && D(e.children, f, null, i, s, zr(e, c), l, d), _ && Nn(e, null, i, "created"), E(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !oe(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && _i(p, i, e);
		}
		_ && Nn(e, null, i, "beforeMount");
		let v = Vr(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && K(() => {
			try {
				p && _i(p, i, e), v && g.enter(f), _ && Nn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, E = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || qr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? mi(e[l]) : pi(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, O = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || m, h = t.props || m, g;
		if (n && Br(n, !1), (g = h.onVnodeBeforeUpdate) && _i(g, n, t, e), f && Nn(t, e, n, "beforeUpdate"), n && Br(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (p.innerHTML && h.innerHTML == null || p.textContent && h.textContent == null) && u(c, ""), d ? k(e.dynamicChildren, d, c, n, r, zr(t, i), o) : s || ae(e, t, c, null, n, r, zr(t, i), o, !1), l > 0) {
			if (l & 16) A(c, p, h, n, i);
			else if (l & 2 && p.class !== h.class && a(c, "class", null, h.class, i), l & 4 && a(c, "style", p.style, h.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = h[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && A(c, p, h, n, i);
		((g = h.onVnodeUpdated) || f) && K(() => {
			g && _i(g, n, t, e), f && Nn(t, e, n, "updated");
		}, r);
	}, k = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Kr(c), f = u && (c.type === q || !ai(c, l) || c.shapeFlag & 198) ? d(u) : n;
			v(c, l, f, null, r, i, a, o, !0);
		}
	}, A = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== m) for (let o in t) !oe(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (oe(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, j = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (k(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Hr(e, t, !0)) : ae(e, t, n, f, a, o, c, l, u);
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : te(t, n, r, i, a, o, c) : ne(e, t, c);
	}, te = (e, t, n, r, i, a, o) => {
		let s = e.component = xi(e, r, i);
		if (qn(e) && (s.ctx.renderer = ge), ki(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, re, o, a), !e.el) {
				let r = s.subTree = Q(Xr);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else re(s, e, t, n, i, a, o);
	}, ne = (e, t, n) => {
		let r = t.component = e.component;
		if (gr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, ie(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, re = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Wr(e);
					if (n) {
						t && (t.el = c.el, ie(e, t, o)), n.asyncDep.then(() => {
							K(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Br(e, !1), t ? (t.el = c.el, ie(e, t, o)) : t = c, n && pe(n), (f = t.props && t.props.onVnodeBeforeUpdate) && _i(f, s, t, c), Br(e, !0);
				let p = fr(e), m = e.subTree;
				e.subTree = p, v(m, p, d(m.el), me(m), e, i, a), t.el = p.el, u === null && yr(e, p.el), r && K(r, i), (f = t.props && t.props.onVnodeUpdated) && K(() => _i(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Kn(t);
				if (Br(e, !1), l && pe(l), !m && (o = c && c.onVnodeBeforeMount) && _i(o, d, t), Br(e, !0), s && ye) {
					let t = () => {
						e.subTree = fr(e), ye(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = fr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && K(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					K(() => _i(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Kn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && K(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Le(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => bn(u), Br(e, !0), l();
	}, ie = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, wr(e, t.props, r, n), Ir(e, t.children, n), Qe(), Cn(e), $e();
	}, ae = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				ce(l, f, n, r, i, a, o, s, c);
				return;
			}
			if (p & 256) {
				se(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && N(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? ce(l, f, n, r, i, a, o, s, c) : N(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && D(f, n, r, i, a, o, s, c));
	}, se = (e, t, n, r, i, a, o, s, c) => {
		e ||= h, t ||= h;
		let l = e.length, u = t.length, d = Math.min(l, u), f = 0;
		for (; f < d; f++) {
			let r = t[f] = c ? mi(t[f]) : pi(t[f]);
			v(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? N(e, i, a, !0, !1, d) : D(t, n, r, i, a, o, s, c, d);
	}, ce = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? mi(t[l]) : pi(t[l]);
			if (ai(r, u)) v(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? mi(t[f]) : pi(t[f]);
			if (ai(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) v(null, t[l] = c ? mi(t[l]) : pi(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) le(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? mi(t[l]) : pi(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = f - m + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (y >= b) {
					le(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (C[_ - m] === 0 && ai(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? le(r, i, a, !0) : (C[u - m] = l + 1, u >= S ? S = u : x = !0, v(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let w = x ? Ur(C) : h;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Kr(f) : r;
				C[l] === 0 ? v(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? M(d, n, p, 2) : _--);
			}
		}
	}, M = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) M(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, ge);
		else if (c === q) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) M(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === Zr) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[In] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), K(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[In];
					s._isLeaving && s[In](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, le = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Qe(), Wn(s, null, n, e, !0), $e()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Kn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && _i(_, t, e), u & 6) fe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Nn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ge, r) : l && !l.hasOnce && (a !== q || d > 0 && d & 64) ? N(l, t, n, !1, !0) : (a === q && d & 384 || !i && u & 16) && N(c, t, n), r && ue(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && K(() => {
			_ && _i(_, t, e), h && Nn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ue = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e, o = t === q;
		if (o && !a) {
			de(n, r);
			return;
		}
		if (t === Zr) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let s = o ? Bn(e) : e, c = () => {
			o ? d(n) && de(n, r) : i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (s && s.shapeFlag & 1 && a && !a.persisted) {
			let { leave: e, delayLeave: t } = a, n = s.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, de = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, fe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Gr(c), Gr(l), r && pe(r), i.stop(), a ? (a.flags |= 8, le(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, le(o, e, t, n)), s && K(s, t), K(() => {
			e.isUnmounted = !0;
		}, t);
	}, N = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) le(e[o], t, n, r, i);
	}, me = (e) => {
		if (e.shapeFlag & 6) return me(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[Pn];
		return n ? f(n) : t;
	}, he = (e, t, n) => {
		En(() => {
			e == null ? t._vnode && le(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : bi());
	}, ge = {
		p: v,
		um: le,
		m: M,
		r: ue,
		mt: te,
		mc: D,
		pc: ae,
		pbc: k,
		n: me,
		o: e
	}, ve, ye;
	return t && ([ve, ye] = t(ge)), {
		render: he,
		hydrate: ve,
		createApp: or(he, ve)
	};
}
function zr({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Br({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Vr(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Hr(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (w(r) && w(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = mi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Hr(t, a)), a.type === Yr && (a.patchFlag === -1 && (a = i[e] = mi(a)), a.el = t.el), a.type === Xr && !a.el && (a.el = t.el);
	}
}
function Ur(e) {
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
function Wr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Wr(t);
}
function Gr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Kr(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Kr(t.subTree) : null;
}
var qr = (e) => e.__isSuspense;
function Jr(e, t) {
	t && t.pendingBranch ? w(e) ? t.effects.push(...e) : t.effects.push(e) : Sn(e);
}
var q = /* @__PURE__ */ Symbol.for("v-fgt"), Yr = /* @__PURE__ */ Symbol.for("v-txt"), Xr = /* @__PURE__ */ Symbol.for("v-cmt"), Zr = /* @__PURE__ */ Symbol.for("v-stc"), Qr = [], J = null;
function Y(e = !1) {
	Qr.push(J = e ? null : []);
}
function $r() {
	Qr.pop(), J = Qr[Qr.length - 1] || null;
}
var ei = 1;
function ti(e, t = !1) {
	ei += e, e < 0 && J && t && (J.hasOnce = !0);
}
function ni(e) {
	return e.dynamicChildren = ei > 0 ? J || h : null, $r(), ei > 0 && J && J.push(e), e;
}
function X(e, t, n, r, i, a) {
	return ni(Z(e, t, n, r, i, a, !0));
}
function ri(e, t, n, r, i) {
	return ni(Q(e, t, n, r, i, !0));
}
function ii(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ai(e, t) {
	return e.type === t.type && e.key === t.key;
}
var oi = ({ key: e }) => e ?? null, si = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : k(e) || /* @__PURE__ */ B(e) || O(e) ? {
	i: kn,
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
		key: t && oi(t),
		ref: t && si(t),
		scopeId: An,
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
		ctx: kn
	};
	return s ? (hi(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= k(n) ? 8 : 16), ei > 0 && !o && J && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && J.push(c), c;
}
var Q = ci;
function ci(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== Qn || (e = Xr), ii(e)) {
		let r = ui(e, t, !0);
		return n && hi(r, n), ei > 0 && !a && J && (r.shapeFlag & 6 ? J[J.indexOf(e)] = r : J.push(r)), r.patchFlag = -2, r;
	}
	if (Ii(e) && (e = e.__vccOpts), t) {
		t = li(t);
		let { class: e, style: n } = t;
		e && !k(e) && (t.class = Ce(e)), j(n) && (/* @__PURE__ */ Zt(n) && !w(n) && (n = b({}, n)), t.style = ve(n));
	}
	let o = k(e) ? 1 : qr(e) ? 128 : Fn(e) ? 64 : j(e) ? 4 : O(e) ? 2 : 0;
	return Z(e, t, n, r, i, o, a, !0);
}
function li(e) {
	return e ? /* @__PURE__ */ Zt(e) || Sr(e) ? b({}, e) : e : null;
}
function ui(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? gi(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && oi(l),
		ref: t && t.ref ? n && a ? w(a) ? a.concat(si(t)) : [a, si(t)] : si(t) : a,
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
		ssContent: e.ssContent && ui(e.ssContent),
		ssFallback: e.ssFallback && ui(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && zn(u, c.clone(u)), u;
}
function di(e = " ", t = 0) {
	return Q(Yr, null, e, t);
}
function fi(e = "", t = !1) {
	return t ? (Y(), ri(Xr, null, e)) : Q(Xr, null, e);
}
function pi(e) {
	return e == null || typeof e == "boolean" ? Q(Xr) : w(e) ? Q(q, null, e.slice()) : ii(e) ? mi(e) : Q(Yr, null, String(e));
}
function mi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ui(e);
}
function hi(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (w(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), hi(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Sr(t) ? t._ctx = kn : r === 3 && kn && (kn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (O(t)) {
		if (r & 65) {
			hi(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: kn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [di(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function gi(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Ce([t.class, r.class]));
		else if (e === "style") t.style = ve([t.style, r.style]);
		else if (v(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(w(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !y(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function _i(e, t, n, r = null) {
	un(e, t, 7, [n, r]);
}
var vi = ir(), yi = 0;
function bi() {
	return yi;
}
function xi(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || vi, a = {
		uid: yi++,
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
		propsOptions: Dr(r, i),
		emitsOptions: ur(r, i),
		emit: null,
		emitted: null,
		propsDefaults: m,
		inheritAttrs: r.inheritAttrs,
		ctx: m,
		data: m,
		props: m,
		attrs: m,
		slots: m,
		refs: m,
		setupState: m,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = lr.bind(null, a), e.ce && e.ce(a), a;
}
var Si = null, Ci, wi;
{
	let e = _e(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ci = t("__VUE_INSTANCE_SETTERS__", (e) => Si = e), wi = t("__VUE_SSR_SETTERS__", (e) => Oi = e);
}
var Ti = (e) => {
	let t = Si;
	return Ci(e), e.scope.on(), () => {
		e.scope.off(), Ci(t);
	};
}, Ei = () => {
	Si && Si.scope.off(), Ci(null);
};
function Di(e) {
	return e.vnode.shapeFlag & 4;
}
var Oi = !1;
function ki(e, t = !1, n = !1) {
	t && wi(t);
	let { props: r, children: i } = e.vnode, a = Di(e);
	Cr(e, r, a, t), Fr(e, i, n || t);
	let o = a ? Ai(e, t) : void 0;
	return t && wi(!1), o;
}
function Ai(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, rr);
	let { setup: r } = n;
	if (r) {
		Qe();
		let n = e.setupContext = r.length > 1 ? Pi(e) : null, i = Ti(e), a = ln(r, e, 0, [e.props, n]), o = ee(a);
		if ($e(), i(), (o || e.sp) && !Kn(e) && Vn(e), o) {
			if (a.then(Ei, Ei), t) return a.then((n) => {
				wi(!0);
				try {
					ji(e, n, t);
				} finally {
					wi(!1);
				}
			}).catch((t) => {
				dn(t, e, 0);
			});
			e.asyncDep = a;
		} else ji(e, a, t);
	} else Mi(e, t);
}
function ji(e, t, n) {
	O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = an(t)), Mi(e, n);
}
function Mi(e, t, n) {
	let r = e.type;
	e.render ||= r.render || g;
}
var Ni = { get(e, t) {
	return L(e, "get", ""), e[t];
} };
function Pi(e) {
	return {
		attrs: new Proxy(e.attrs, Ni),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Fi(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(an(Qt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in tr) return tr[n](e);
		},
		has(e, t) {
			return t in e || t in tr;
		}
	}) : e.proxy;
}
function Ii(e) {
	return O(e) && "__vccOpts" in e;
}
var Li = (e, t) => /* @__PURE__ */ sn(e, t, Oi), Ri = "3.5.44", zi = void 0, Bi = typeof window < "u" && window.trustedTypes;
if (Bi) try {
	zi = /* @__PURE__ */ Bi.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Vi = zi ? (e) => zi.createHTML(e) : (e) => e, Hi = "http://www.w3.org/2000/svg", Ui = "http://www.w3.org/1998/Math/MathML", Wi = typeof document < "u" ? document : null, Gi = Wi && /* @__PURE__ */ Wi.createElement("template"), Ki = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Wi.createElementNS(Hi, e) : t === "mathml" ? Wi.createElementNS(Ui, e) : n ? Wi.createElement(e, { is: n }) : Wi.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Wi.createTextNode(e),
	createComment: (e) => Wi.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Wi.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Gi.innerHTML = Vi(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Gi.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, qi = /* @__PURE__ */ Symbol("_vtc");
function Ji(e, t, n) {
	let r = e[qi];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Yi = /* @__PURE__ */ Symbol("_vod"), Xi = /* @__PURE__ */ Symbol("_vsh"), Zi = /* @__PURE__ */ Symbol(""), Qi = /(?:^|;)\s*display\s*:/;
function $i(e, t, n) {
	let r = e.style, i = k(n), a = !1;
	if (n && !i) {
		if (t) {
			if (k(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? ta(r, t, "");
			}
			else for (let e in t) n[e] ?? ta(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ta(r, i, "") : aa(e, i, !k(t) && t ? t[i] : void 0, o) || ta(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Zi];
			e && (n += ";" + e), r.cssText = n, a = Qi.test(n);
		}
	} else t && e.removeAttribute("style");
	Yi in e && (i && t === n || (e[Yi] = a ? r.display : ""), e[Xi] && (r.display = "none"));
}
var ea = /\s*!important$/;
function ta(e, t, n) {
	if (w(n)) n.forEach((n) => ta(e, t, n));
	else if (n ??= "", t.startsWith("--")) ea.test(n) ? e.setProperty(t, n.replace(ea, ""), "important") : e.setProperty(t, n);
	else {
		let r = ia(e, t);
		ea.test(n) ? e.setProperty(ue(r), n.replace(ea, ""), "important") : e[r] = n;
	}
}
var na = [
	"Webkit",
	"Moz",
	"ms"
], ra = {};
function ia(e, t) {
	let n = ra[t];
	if (n) return n;
	let r = M(t);
	if (r !== "filter" && r in e) return ra[t] = r;
	r = de(r);
	for (let n = 0; n < na.length; n++) {
		let i = na[n] + r;
		if (i in e) return ra[t] = i;
	}
	return t;
}
function aa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && k(r) && n === r;
}
var oa = "http://www.w3.org/1999/xlink";
function sa(e, t, n, r, i, a = we(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(oa, t.slice(6, t.length)) : e.setAttributeNS(oa, t, n) : n == null || a && !Te(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : A(n) ? String(n) : n);
}
function ca(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Vi(n) : n);
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
function la(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ua(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var da = /* @__PURE__ */ Symbol("_vei");
function fa(e, t, n, r, i = null) {
	let a = e[da] || (e[da] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = ha(t);
		r ? la(e, n, a[t] = ya(r, i), s) : o && (ua(e, n, o, s), a[t] = void 0);
	}
}
var pa = /(Once|Passive|Capture)$/, ma = /^on:?(?:Once|Passive|Capture)$/;
function ha(e) {
	let t, n;
	for (; (n = e.match(pa)) && !ma.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : ue(e.slice(2)), t];
}
var ga = 0, _a = /* @__PURE__ */ Promise.resolve(), va = () => ga ||= (_a.then(() => ga = 0), Date.now());
function ya(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (w(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && un(e, t, 5, a);
			}
		} else un(r, t, 5, [e]);
	};
	return n.value = e, n.attached = va(), n;
}
var ba = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xa = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Ji(e, r, o) : t === "style" ? $i(e, n, r) : v(t) ? y(t) || fa(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Sa(e, t, r, o)) ? (ca(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || sa(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ca(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !k(r))) ? ca(e, M(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), sa(e, t, r, o));
};
function Sa(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ba(t) && O(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ba(t) && k(n) ? !1 : t in e;
}
function Ca(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = M(t);
	return Array.isArray(n) ? n.some((e) => M(e) === r) : Object.keys(n).some((e) => M(e) === r);
}
var wa = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return w(t) ? (e) => pe(t, e) : t;
};
function Ta(e) {
	e.target.composing = !0;
}
function Ea(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var $ = /* @__PURE__ */ Symbol("_assign"), Da = /* @__PURE__ */ Symbol("_initialValue");
function Oa(e, t, n) {
	return t && (e = e.trim()), n && (e = he(e)), e;
}
var ka = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Da] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Da] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[$] = wa(i);
		let a = r || i.props && i.props.type === "number";
		la(e, t ? "change" : "input", (t) => {
			t.target.composing || e[$](Oa(e.value, n, a));
		}), (n || a) && la(e, "change", () => {
			e.value = Oa(e.value, n, a);
		}), t || (la(e, "compositionstart", Ta), la(e, "compositionend", Ea), la(e, "change", Ea));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Da];
		delete e[Da], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[$](Oa(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[$] = wa(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? he(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Aa = {
	deep: !0,
	created(e, t, n) {
		e[$] = wa(n), la(e, "change", () => {
			let t = e._modelValue, n = Ia(e), r = e.checked, i = e[$];
			if (w(t)) {
				let e = je(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (E(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(La(e, r));
		});
	},
	mounted: ja,
	beforeUpdate(e, t, n) {
		e[$] = wa(n), ja(e, t, n);
	}
};
function ja(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (w(t)) i = je(t, r.props.value) > -1;
	else if (E(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Ae(t, La(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Ma = {
	created(e, { value: t }, n) {
		e.checked = Ae(t, n.props.value), e[$] = wa(n), la(e, "change", () => {
			e[$](Ia(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[$] = wa(r), t !== n && (e.checked = Ae(t, r.props.value));
	}
}, Na = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, la(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? he(Ia(e)) : Ia(e)), r = e.multiple, i = r ? E(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? w(i) ? t.slice() : t : i];
			try {
				e[$](i);
			} finally {
				W(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[$] = wa(r);
	},
	mounted(e, { value: t }) {
		Fa(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[$] = wa(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && Pa(t, n[1], n[0]) || Fa(e, t);
	}
};
function Pa(e, t, n) {
	if (!n || w(e)) return Ae(e, t);
	if (E(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function Fa(e, t) {
	let n = e.multiple, r = w(t);
	if (!n || r || E(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ia(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : je(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Ae(Ia(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ia(e) {
	return "_value" in e ? e._value : e.value;
}
function La(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ra = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], za = {
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
	exact: (e, t) => Ra.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ba = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = za[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Va = /* @__PURE__ */ b({ patchProp: xa }, Ki), Ha;
function Ua() {
	return Ha ||= Lr(Va);
}
var Wa = ((...e) => {
	let t = Ua().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ka(e);
		if (!r) return;
		let i = t._component;
		O(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Ga(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Ga(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ka(e) {
	return k(e) ? document.querySelector(e) : e;
}
// src/workshop.js
var qa = [
	"es",
	"ca",
	"va",
	"en"
];
function Ja(e = !1) {
	let t = e ? window.commonsLanguage?.stored() : window.commonsLanguage?.read();
	if (qa.includes(t)) return t;
	try {
		let e = localStorage.getItem("llibres-language");
		if (qa.includes(e)) return e;
	} catch {}
	return "es";
}
function Ya(t) {
	let n = /* @__PURE__ */ Wt({
		locale: Ja(),
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
					"rebostChanged"
				].includes(e.message) || /^(publication_|review_)/.test(e.message) || e.message === "invalid_publication" ? e.message : e.name === "QuotaExceededError" ? "storageError" : "error"), !0), !1;
			} finally {
				if (m && n.active && u) {
					m = !1;
					try {
						await O();
					} catch {
						g(h("error"), !0);
					}
				}
				n.busy = !1, await W();
			}
		}
	}
	function v(e, t = !0) {
		if (qa.includes(e)) {
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
		n.selected = d, n.contentCount = e.length, n.contentIndex = e.findIndex((e) => e.id === d), n.automatic = n.contentIndex < 0, l.window.document.body.classList.toggle("llibres-credits", n.automatic), l.window.frameElement.inert = n.automatic;
	}
	async function x() {
		n.active = !0, n.advanced = !1, await W();
		let r = JSON.parse(localStorage.getItem("exe_user_preferences") || "{}");
		r.userPreferences ||= {}, r.userPreferences.locale = { value: n.locale === "va" ? "ca-valencia" : n.locale }, localStorage.setItem("exe_user_preferences", JSON.stringify(r));
		let i = document.createElement("iframe");
		i.id = "engine", i.title = h("edit"), i.src = "/engine/index.html", t.host().replaceChildren(i), l = new e(i), await l.ready(), l.changed = y, l.connectImagePicker(M);
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
	async function C({ title: e, template: t }) {
		u = null, await x(), u = {
			id: i(),
			template: t,
			language: n.locale,
			title: e,
			createdAt: Date.now()
		}, d = await l.create(e, t, n.locale), n.title = e, b(), await S();
	}
	async function w(e) {
		u = null, await x(), u = e, d = await l.open(e.bytes), n.title = l.title(), b(), f = !1, n.statusKey = "saved";
	}
	async function T(e) {
		if (!e) return;
		let t = await o(await e.arrayBuffer());
		u = null, await x(), u = {
			id: i(),
			language: n.locale,
			template: "import",
			title: e.name,
			createdAt: Date.now()
		}, d = await l.open(t), n.title = l.title(), b(), await S();
	}
	function E() {
		let e = n.title.trim();
		e && (l.title(e), u.title = e, y());
	}
	async function D() {
		await S(!1), u = null, f = !1, n.active = !1, he(), t.host().replaceChildren(), await t.refreshShelf();
	}
	async function O(e = d) {
		await l.select(e), d = e, b();
	}
	async function k() {
		d = await l.addPage(h("page") + " " + l.contentPages().length), y(), b();
	}
	async function A(e) {
		await l.move(d, e), y(), b();
	}
	async function j() {
		let e = l.pages().find((e) => e.id === d)?.pageName, t = prompt(h("renamePrompt"), e);
		t?.trim() && (await l.rename(d, t.trim().slice(0, 120)), y(), b());
	}
	async function ee() {
		if (l.contentPages().length <= 1) return g(h("onePage"));
		confirm(h("deletePage")) && (d = await l.delete(d), y(), b());
	}
	async function te(e) {
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
	let ie = (e) => (u.title || "llibre").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 70) + e;
	async function ae() {
		await S(), re(u.bytes, ie(".elpx"), "application/zip"), g(h("downloaded"));
	}
	async function oe(e, t) {
		let n = await l.export(e);
		re(n.bytes, ie(t), n.mimeType);
	}
	async function se() {
		await S(!1), t.read(u.title, await l.slides());
	}
	function ce() {
		n.busy ? m = !0 : _(() => O());
	}
	function M() {
		!n.busy && u && (n.rebostEnabled ? t.pick() : t.deviceImage());
	}
	let le = () => ({
		bookId: u?.id,
		pageId: d,
		editor: l
	}), ue = (e) => e.bookId === u?.id && e.pageId === d && e.editor === l;
	async function de(e, t) {
		e && (await l.image(e, t), t && await l.select(d), b());
	}
	async function fe() {
		return await S(!1), {
			id: u.id,
			title: u.title,
			cover: await s((await l.slides())[0].svg)
		};
	}
	let N = (e) => c(l, u, {
		...e,
		language: u.language || n.locale
	});
	function pe(e) {
		f && (e.preventDefault(), e.returnValue = "");
	}
	async function me() {
		v(n.locale), window.addEventListener("pageshow", he), window.addEventListener("focus", he), window.addEventListener("beforeunload", pe);
		for (let [e, t] of [["publication", "publicationEnabled"], ["rebost", "rebostEnabled"]]) fetch("/" + e + "-status", { cache: "no-store" }).then(async (e) => {
			e.ok && (n[t] = (await e.json()).enabled === !0);
		}).catch(() => {});
		try {
			await t.refreshShelf();
		} catch {
			g(h("storageError"), !0);
		}
	}
	function he() {
		n.active || v(Ja(!0));
	}
	function ge() {
		window.removeEventListener("pageshow", he), window.removeEventListener("focus", he), clearTimeout(p), window.removeEventListener("beforeunload", pe);
	}
	return {
		state: n,
		t: h,
		notice: g,
		action: _,
		language: v,
		start: me,
		dispose: ge,
		create: C,
		openStored: w,
		importFile: T,
		renameTitle: E,
		persist: S,
		back: D,
		select: O,
		addPage: k,
		move: A,
		renamePage: j,
		deletePage: ee,
		drawing: te,
		advanced: ne,
		downloadBook: ae,
		exportBook: oe,
		read: se,
		pickImage: M,
		image: de,
		context: le,
		matches: ue,
		publicationData: fe,
		packageBook: N,
		resume: ce
	};
}
// src/shelf/BookCard.vue
var Xa = { class: "book-card" }, Za = ["disabled"], Qa = ["disabled", "aria-label"], $a = {
	__name: "BookCard",
	props: {
		book: Object,
		locale: String,
		busy: Boolean
	},
	emits: ["open", "remove"],
	setup(e) {
		let t = e, n = (e) => a[t.locale][e] || e, r = Li(() => new Date(t.book.updatedAt).toLocaleDateString(t.locale === "va" ? "ca-ES-valencia" : t.locale));
		return (t, i) => (Y(), X("article", Xa, [
			Z("button", {
				class: "book-open",
				disabled: e.busy,
				onClick: i[0] ||= (n) => t.$emit("open", e.book)
			}, P(e.book.title), 9, Za),
			Z("p", null, P(r.value) + " · " + P(e.book.pageCount) + " " + P(n("pages").toLowerCase()), 1),
			Z("button", {
				class: "delete-book",
				disabled: e.busy,
				"aria-label": n("deleteLabel") + ": " + e.book.title,
				onClick: i[1] ||= (n) => t.$emit("remove", e.book)
			}, " × ", 8, Qa)
		]));
	}
}, eo = {
	class: "shelf",
	"aria-labelledby": "shelf-heading"
}, to = { class: "section-heading" }, no = { id: "shelf-heading" }, ro = {
	id: "book-count",
	role: "status"
}, io = {
	key: 0,
	class: "empty"
}, ao = {
	__name: "Bookshelf",
	props: {
		locale: String,
		action: Function,
		openBook: Function
	},
	setup(e, { expose: r }) {
		let i = e, o = (e) => a[i.locale][e] || e, s = /* @__PURE__ */ en([]), c = /* @__PURE__ */ V(!1), l = /* @__PURE__ */ V(null), u = 0;
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
		return r({ refresh: d }), (t, n) => (Y(), X("section", eo, [Z("div", to, [Z("h2", no, P(o("myBooks")), 1), Z("span", ro, P(s.value.length), 1)]), Z("div", {
			id: "books",
			ref_key: "list",
			ref: l,
			class: "books"
		}, [s.value.length ? fi("", !0) : (Y(), X("div", io, P(o("empty")), 1)), (Y(!0), X(q, null, $n(s.value, (t) => (Y(), ri($a, {
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
}, oo = { class: "book-card" }, so = ["src"], co = {
	__name: "ReviewCard",
	props: {
		item: Object,
		status: String
	},
	emits: ["open"],
	setup(e) {
		return (t, n) => (Y(), X("article", oo, [
			e.item.status === "pending" || e.item.status === "returned" || e.item.published ? (Y(), X("img", {
				key: 0,
				src: e.item.status === "pending" || e.item.status === "returned" ? `/api/llibres/reviews/${e.item.id}/files/cover.png` : `/api/llibres/public/${e.item.id}/cover.png`,
				alt: "",
				loading: "lazy",
				style: { width: "100%" }
			}, null, 8, so)) : fi("", !0),
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
}, lo = { class: "dialog-heading" }, uo = { id: "reviews-heading" }, fo = ["hidden"], po = ["href"], mo = { class: "actions" }, ho = ["disabled"], go = ["disabled"], _o = {
	id: "reviews-list",
	class: "books"
}, vo = ["hidden", "disabled"], yo = { class: "dialog-heading" }, bo = { id: "review-title" }, xo = ["disabled"], So = { id: "review-details" }, Co = {
	id: "review-feedback",
	role: "alert"
}, wo = ["src", "title"], To = { class: "check" }, Eo = ["disabled"], Do = ["disabled"], Oo = { class: "actions" }, ko = ["disabled"], Ao = ["disabled"], jo = ["hidden", "disabled"], Mo = {
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
		}, o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(null), c = /* @__PURE__ */ V(null), u = /* @__PURE__ */ V([]), d = /* @__PURE__ */ V(null), f = /* @__PURE__ */ V(!1), p = /* @__PURE__ */ V(!1), m = /* @__PURE__ */ V(!1), h = /* @__PURE__ */ V(!1), g = /* @__PURE__ */ V(""), _ = /* @__PURE__ */ V(""), v = /* @__PURE__ */ V(""), y = /* @__PURE__ */ V(!1), b = 0, x = 0, S = Li(() => "/api/auth/oidc/login?next=" + encodeURIComponent("/llibres-login.html?lang=" + n.locale)), C = Li(() => d.value?.status === "pending"), w = Li(() => {
			let e = d.value;
			if (e) {
				if (["pending", "returned"].includes(e.status)) return `/api/llibres/reviews/${e.id}/files/index.html`;
				if (e.published) return `/api/llibres/public/${e.id}/index.html`;
			}
		}), T = (e) => r(e.message) === e.message ? "publication_unavailable" : e.message;
		function E(e) {
			if (!h.value) return n.action(async () => {
				h.value = !0;
				try {
					return await e();
				} catch (e) {
					throw s.value.open ? _.value = T(e) : o.value.open && (g.value = T(e)), e;
				} finally {
					h.value = !1, await W();
				}
			});
		}
		async function D(e = !1) {
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
		function O(e) {
			d.value = e, v.value = e.feedback || "", _.value = "", y.value = !1, !["pending", "returned"].includes(e.status) && !e.published && (_.value = "reviewNoPreview"), s.value.showModal();
		}
		function k() {
			d.value = null, y.value = !1, v.value = "", _.value = "";
		}
		function A() {
			s.value.close(), k();
		}
		function j() {
			x++, o.value.close(), u.value = [];
		}
		async function ee(e) {
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
				}), A(), await D(), o.value.open && (g.value = e === "approve" ? "reviewApprovedDone" : e === "return" ? "reviewReturnedDone" : "reviewWithdrawn", await W(), c.value.focus({ preventScroll: !0 }), o.value.scrollTop = 0, n.notice(r(g.value))));
			}
		}
		function te() {
			o.value.showModal(), E(() => D());
		}
		function ne() {
			document.visibilityState !== "hidden" && o.value.open && p.value && E(() => D());
		}
		return Xn(() => {
			window.addEventListener("focus", ne), document.addEventListener("visibilitychange", ne);
		}), Zn(() => {
			x++, window.removeEventListener("focus", ne), document.removeEventListener("visibilitychange", ne);
		}), t({ open: te }), (e, t) => (Y(), X(q, null, [Z("dialog", {
			id: "reviews-dialog",
			ref_key: "queue",
			ref: o,
			"aria-labelledby": "reviews-heading",
			onCancel: t[4] ||= (e) => {
				/* @__PURE__ */ B(x) ? x.value++ : x++, u.value = [];
			}
		}, [
			Z("div", lo, [Z("h2", uo, P(r("reviewBooks")), 1), Z("button", {
				id: "close-reviews",
				onClick: j
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
			}, P(r("publicationSignIn")), 9, po)], 8, fo),
			Z("div", mo, [Z("button", {
				id: "refresh-reviews",
				disabled: h.value,
				onClick: t[0] ||= (e) => E(() => D())
			}, P(r("refreshReviews")), 9, ho), Z("label", null, [G(Z("input", {
				id: "reviews-all",
				"onUpdate:modelValue": t[1] ||= (e) => f.value = e,
				disabled: h.value,
				type: "checkbox",
				onChange: t[2] ||= (e) => E(() => D())
			}, null, 40, go), [[Aa, f.value]]), Z("span", null, P(r("reviewedToo")), 1)])]),
			Z("p", {
				id: "reviews-status",
				ref_key: "statusElement",
				ref: c,
				role: "status",
				tabindex: "-1"
			}, P(r(g.value)), 513),
			Z("div", _o, [(Y(!0), X(q, null, $n(u.value, (e) => (Y(), ri(co, {
				key: e.id,
				item: e,
				status: r(i[e.status]),
				onOpen: O
			}, null, 8, ["item", "status"]))), 128))]),
			Z("button", {
				id: "reviews-more",
				hidden: !m.value,
				disabled: h.value,
				onClick: t[3] ||= (e) => E(() => D(!0))
			}, P(r("moreBooks")), 9, vo)
		], 544), Z("dialog", {
			id: "review-dialog",
			ref_key: "detail",
			ref: s,
			"aria-labelledby": "review-title",
			onCancel: k
		}, [
			Z("div", yo, [Z("h2", bo, P(d.value?.title), 1), Z("button", {
				id: "close-review",
				disabled: h.value,
				onClick: A
			}, P(r("close")), 9, xo)]),
			Z("p", So, P(d.value ? [
				d.value.author,
				d.value.class_name,
				d.value.license,
				r(i[d.value.status])
			].join(" · ") : ""), 1),
			Z("p", Co, P(r(_.value)), 1),
			Z("iframe", {
				id: "review-frame",
				src: w.value,
				title: r("reviewOpen"),
				sandbox: "allow-same-origin allow-downloads"
			}, null, 8, wo),
			Z("label", To, [G(Z("input", {
				id: "review-confirm",
				"onUpdate:modelValue": t[5] ||= (e) => y.value = e,
				type: "checkbox",
				disabled: !C.value || h.value
			}, null, 8, Eo), [[Aa, y.value]]), Z("span", null, P(r("reviewConfirm")), 1)]),
			Z("label", null, [Z("span", null, P(r("reviewComment")), 1), G(Z("textarea", {
				id: "review-comment",
				"onUpdate:modelValue": t[6] ||= (e) => v.value = e,
				disabled: h.value,
				maxlength: "1000",
				rows: "3"
			}, null, 8, Do), [[ka, v.value]])]),
			Z("div", Oo, [
				Z("button", {
					id: "approve-review",
					class: "primary",
					disabled: !C.value || !y.value || h.value,
					onClick: t[7] ||= (e) => E(() => ee("approve"))
				}, P(r("approveReview")), 9, ko),
				Z("button", {
					id: "return-review",
					disabled: !C.value || h.value,
					onClick: t[8] ||= (e) => E(() => ee("return"))
				}, P(r("returnReview")), 9, Ao),
				Z("button", {
					id: "withdraw-review",
					hidden: !d.value?.published,
					disabled: h.value,
					onClick: t[9] ||= (e) => E(() => ee("withdraw"))
				}, P(r("withdrawPublication")), 9, jo)
			])
		], 544)], 64));
	}
}, No = { class: "dialog-heading" }, Po = { id: "create-heading" }, Fo = ["aria-label"], Io = { for: "title" }, Lo = ["placeholder"], Ro = { class: "templates" }, zo = { class: "template-card peach" }, Bo = { class: "template-card sage" }, Vo = { class: "template-card cream" }, Ho = {
	class: "primary",
	type: "submit"
}, Uo = {
	__name: "CreateDialog",
	props: {
		locale: String,
		core: Object
	},
	setup(e, { expose: t }) {
		let n = e, r = (e) => a[n.locale][e] || e, i = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(""), c = /* @__PURE__ */ V("story");
		function l() {
			i.value.showModal(), o.value.focus();
		}
		function u() {
			let e = s.value.trim();
			e && [
				"story",
				"album",
				"blank"
			].includes(c.value) && (i.value.close(), n.core.action(() => n.core.create({
				title: e,
				template: c.value
			}), "loading"));
		}
		return t({ open: l }), (e, t) => (Y(), X("dialog", {
			id: "create-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "create-heading"
		}, [Z("form", {
			id: "create-form",
			onSubmit: Ba(u, ["prevent"])
		}, [
			Z("div", No, [Z("h2", Po, P(r("createTitle")), 1), Z("button", {
				type: "button",
				class: "icon-button",
				id: "close-create",
				"aria-label": r("close"),
				onClick: t[0] ||= (e) => i.value.close()
			}, " × ", 8, Fo)]),
			Z("label", Io, P(r("title")), 1),
			G(Z("input", {
				id: "title",
				ref_key: "input",
				ref: o,
				"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
				placeholder: r("firstBook"),
				required: "",
				maxlength: "120",
				autocomplete: "off"
			}, null, 8, Lo), [[ka, s.value]]),
			Z("fieldset", null, [Z("legend", null, P(r("template")), 1), Z("div", Ro, [
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					name: "template",
					value: "story"
				}, null, 512), [[Ma, c.value]]), Z("span", zo, [Z("b", null, P(r("story")), 1), Z("small", null, P(r("storyHelp")), 1)])]),
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					name: "template",
					value: "album"
				}, null, 512), [[Ma, c.value]]), Z("span", Bo, [Z("b", null, P(r("album")), 1), Z("small", null, P(r("albumHelp")), 1)])]),
				Z("label", null, [G(Z("input", {
					type: "radio",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					name: "template",
					value: "blank"
				}, null, 512), [[Ma, c.value]]), Z("span", Vo, [Z("b", null, P(r("blank")), 1), Z("small", null, P(r("blankHelp")), 1)])])
			])]),
			Z("button", Ho, P(r("start")), 1)
		], 32)], 512));
	}
}, Wo = ["hidden", "aria-label"], Go = { class: "book-toolbar" }, Ko = ["aria-label"], qo = {
	id: "save-status",
	role: "status"
}, Jo = ["hidden"], Yo = { class: "workspace-body" }, Xo = { class: "pages-panel" }, Zo = { class: "section-heading" }, Qo = { id: "page-count" }, $o = { id: "pages" }, es = [
	"data-id",
	"aria-current",
	"onClick"
], ts = ["disabled"], ns = { class: "page-actions" }, rs = ["disabled"], is = ["disabled"], as = ["disabled"], os = ["disabled"], ss = { class: "tip" }, cs = { class: "editor-panel" }, ls = { class: "editor-toolbar" }, us = { id: "page-name" }, ds = ["disabled"], fs = ["disabled"], ps = ["disabled"], ms = ["disabled"], hs = ["disabled"], gs = {
	__name: "WorkshopView",
	props: { core: Object },
	emits: ["publish"],
	setup(e, { expose: t }) {
		let n = e, r = n.core.state, i = n.core.t, a = /* @__PURE__ */ V(null), o = Li(() => r.automatic ? i("automaticCredits") : r.pages.find((e) => e.id === r.selected)?.pageName || "");
		return t({ host: () => a.value }), (t, n) => (Y(), X("section", {
			id: "workspace",
			hidden: !H(r).active,
			"aria-label": H(i)("workshop")
		}, [Z("div", Go, [
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
			}, null, 40, Ko), [[ka, H(r).title]]),
			Z("span", qo, P(H(i)(H(r).statusKey)), 1),
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
			}, P(H(i)("publishBook")), 9, Jo)
		]), Z("div", Yo, [Z("aside", Xo, [
			Z("div", Zo, [Z("h2", null, P(H(i)("pages")), 1), Z("span", Qo, P(H(r).pages.length), 1)]),
			Z("ol", $o, [(Y(!0), X(q, null, $n(H(r).pages, (t, n) => (Y(), X("li", { key: t.id }, [Z("button", {
				class: "page-tab",
				"data-id": t.id,
				"aria-current": String(t.id === H(r).selected),
				onClick: (n) => e.core.action(() => e.core.select(t.id))
			}, [Z("small", null, P(H(i)("page")) + " " + P(n + 1), 1), di(P(t.pageName), 1)], 8, es)]))), 128))]),
			Z("button", {
				id: "add-page",
				disabled: H(r).contentCount >= 50,
				onClick: n[7] ||= (t) => e.core.action(e.core.addPage),
				class: "add-page"
			}, P(H(i)("addPage")), 9, ts),
			Z("div", ns, [
				Z("button", {
					id: "move-up",
					disabled: H(r).automatic || H(r).contentIndex <= 0,
					onClick: n[8] ||= (t) => e.core.action(() => e.core.move(-1))
				}, P(H(i)("up")), 9, rs),
				Z("button", {
					id: "move-down",
					disabled: H(r).automatic || H(r).contentIndex >= H(r).contentCount - 1,
					onClick: n[9] ||= (t) => e.core.action(() => e.core.move(1))
				}, P(H(i)("down")), 9, is),
				Z("button", {
					id: "rename-page",
					disabled: H(r).automatic,
					onClick: n[10] ||= (t) => e.core.action(e.core.renamePage)
				}, P(H(i)("rename")), 9, as),
				Z("button", {
					id: "delete-page",
					disabled: H(r).automatic || H(r).contentCount <= 1,
					onClick: n[11] ||= (t) => e.core.action(e.core.deletePage)
				}, P(H(i)("delete")), 9, os)
			]),
			Z("p", ss, P(H(i)(H(r).automatic ? "creditsHint" : "tip")), 1)
		]), Z("div", cs, [Z("div", ls, [
			Z("span", us, P(o.value), 1),
			Z("button", {
				id: "edit-page",
				disabled: H(r).automatic,
				onClick: n[12] ||= (t) => e.core.action(() => e.core.select())
			}, P(H(i)("edit")), 9, ds),
			Z("button", {
				id: "add-image",
				disabled: H(r).automatic,
				onClick: n[13] ||= (t) => e.core.pickImage()
			}, P(H(i)("image")), 9, fs),
			Z("button", {
				id: "draw",
				disabled: H(r).automatic,
				onClick: n[14] ||= (t) => e.core.action(() => e.core.drawing(!0))
			}, P(H(i)("draw")), 9, ps),
			Z("button", {
				id: "select",
				disabled: H(r).automatic,
				onClick: n[15] ||= (t) => e.core.action(() => e.core.drawing(!1))
			}, P(H(i)("select")), 9, ms),
			Z("button", {
				id: "advanced",
				disabled: H(r).automatic,
				onClick: n[16] ||= (t) => e.core.advanced()
			}, P(H(i)(H(r).advanced ? "editSimple" : "advanced")), 9, hs)
		]), Z("div", {
			id: "engine-host",
			ref_key: "engineHost",
			ref: a
		}, null, 512)])])], 8, Wo));
	}
}, _s = { class: "reader-toolbar" }, vs = { id: "reader-title" }, ys = {
	id: "reader-page",
	class: "reader-page"
}, bs = { class: "reader-navigation" }, xs = ["disabled"], Ss = { id: "reader-position" }, Cs = ["disabled"], ws = {
	__name: "ReaderDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(""), o = /* @__PURE__ */ en([]), s = /* @__PURE__ */ V(0);
		function c(e, { value: t }) {
			if (e.replaceChildren(), !t?.svg) {
				e.textContent = r("readEmpty");
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
			}), i = new DOMParser().parseFromString(n, "image/svg+xml");
			i.documentElement.localName === "svg" && (i.documentElement.setAttribute("role", "img"), i.documentElement.setAttribute("aria-label", t.title), e.append(document.importNode(i.documentElement, !0)));
		}
		let l = {
			mounted: c,
			updated: c
		};
		function u(e, t) {
			a.value = e, o.value = t, s.value = 0, i.value.showModal();
		}
		function d() {
			n.core.resume();
		}
		function f() {
			i.value.close(), d();
		}
		return t({ open: u }), (t, n) => (Y(), X("dialog", {
			id: "reader",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "reader-title",
			onCancel: d
		}, [
			Z("div", _s, [
				Z("button", {
					id: "close-reader",
					onClick: f
				}, P(H(r)("returnEdit")), 1),
				Z("strong", vs, P(a.value), 1),
				Z("button", {
					id: "export-html",
					onClick: n[0] ||= (t) => e.core.action(() => e.core.exportBook("html5", ".zip"), "exporting")
				}, P(H(r)("html")), 1),
				Z("button", {
					id: "export-epub",
					onClick: n[1] ||= (t) => e.core.action(() => e.core.exportBook("epub3", ".epub"), "exporting")
				}, " EPUB ")
			]),
			G(Z("div", ys, null, 512), [[l, o.value[s.value]]]),
			Z("div", bs, [
				Z("button", {
					id: "prev",
					disabled: s.value <= 0,
					onClick: n[2] ||= (e) => s.value--
				}, P(H(r)("prev")), 9, xs),
				Z("span", Ss, P(s.value + 1) + " / " + P(o.value.length), 1),
				Z("button", {
					id: "next",
					disabled: s.value >= o.value.length - 1,
					onClick: n[3] ||= (e) => s.value++
				}, P(H(r)("next")), 9, Cs)
			])
		], 544));
	}
}, Ts = { class: "dialog-heading" }, Es = { id: "image-picker-title" }, Ds = { class: "image-sources" }, Os = {
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
		return Xn(() => window.addEventListener("message", _)), Zn(() => {
			u?.controller.abort(), window.removeEventListener("message", _);
		}), t({ open: h }), (e, t) => (Y(), X("dialog", {
			id: "image-picker",
			ref_key: "dialog",
			ref: s,
			onCancel: p,
			"aria-labelledby": "image-picker-title"
		}, [
			Z("div", Ts, [Z("h2", Es, P(H(o)("chooseImage")), 1), Z("button", {
				id: "close-image-picker",
				onClick: p
			}, P(H(o)("close")), 1)]),
			Z("div", Ds, [
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
}, ks = { class: "dialog-heading" }, As = { id: "publish-heading" }, js = ["hidden"], Ms = ["hidden"], Ns = ["href"], Ps = ["data-status", "hidden"], Fs = { id: "submission-message" }, Is = { id: "submission-feedback" }, Ls = ["hidden"], Rs = {
	id: "publication-feedback",
	role: "alert"
}, zs = ["hidden"], Bs = ["href"], Vs = ["href"], Hs = ["hidden"], Us = ["hidden"], Ws = { id: "publish-title" }, Gs = ["src"], Ks = { class: "check" }, qs = { class: "check" }, Js = { id: "publication-consent-label" }, Ys = {
	id: "confirm-publish",
	type: "submit",
	class: "primary"
}, Xs = {
	__name: "PublicationDialog",
	props: { core: Object },
	setup(e, { expose: t }) {
		let n = e, r = n.core.t, i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ en(null), c = /* @__PURE__ */ V(!1), d = /* @__PURE__ */ V(!1), f = /* @__PURE__ */ V(!1), p = /* @__PURE__ */ V(""), m = /* @__PURE__ */ V(""), h = /* @__PURE__ */ V(""), g = /* @__PURE__ */ V(""), _ = /* @__PURE__ */ V("publicationDone"), v = /* @__PURE__ */ V(""), y = /* @__PURE__ */ Wt({
			author: "",
			description: "",
			license: "CC-BY-SA-4.0",
			editable: !1,
			confirmed: !1
		}), b = "", x = 0, S = Li(() => encodeURIComponent("/llibres-login.html?lang=" + n.core.state.locale)), C = {
			pending: "reviewPending",
			returned: "reviewReturned",
			approved: "reviewApproved",
			cancelled: "reviewCancelled",
			draft: "reviewDraft"
		}, w = Li(() => s.value?.status || "draft"), T = Li(() => v.value || C[w.value] || "reviewDraft"), E = Li(() => w.value === "pending" ? s.value?.published ? "reviewPendingPublished" : "reviewPendingHelp" : w.value === "returned" ? "reviewReturnedHelp" : w.value === "cancelled" ? s.value?.published ? "reviewCancelledPublished" : "reviewCancelledHelp" : "submissionIntro");
		function D(e) {
			g.value = e.url ? u(e.url) : "", s.value = e, _.value = "publicationDone", v.value = "";
		}
		function O(e, t = "working") {
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
		async function k() {
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
			e === x && i.value.open && (D(a), p.value = r.title, Object.assign(y, {
				author: a.author || "",
				description: a.description || "",
				license: a.license || "CC-BY-SA-4.0",
				editable: !!a.editable,
				confirmed: !1
			}), URL.revokeObjectURL(m.value), m.value = URL.createObjectURL(r.cover), f.value = !0);
		}
		function A() {
			i.value.showModal(), O(k);
		}
		function j() {
			x++, i.value.close(), URL.revokeObjectURL(m.value), m.value = "", n.core.resume();
		}
		async function ee() {
			if (!s.value || !y.confirmed) return;
			let e = s.value.published;
			h.value = "";
			let t = await n.core.packageBook({
				author: y.author.trim(),
				description: y.description.trim(),
				license: y.license,
				editable: y.editable
			});
			D(await l(b, {
				method: "POST",
				headers: {
					"Content-Type": "application/zip",
					"If-Match": `"${s.value.revision}"`
				},
				body: t
			})), y.confirmed = !1, c.value ? v.value = w.value === "approved" ? "reviewApproved" : "submissionDone" : _.value = e ? "publicationUpdated" : "publicationDone", await W(), i.value.open && ((c.value ? o.value : a.value).focus({ preventScroll: !0 }), i.value.scrollTop = 0), n.core.notice(r(c.value ? "submissionDone" : _.value));
		}
		function te() {
			s.value?.published && confirm(r("withdrawConfirm")) && O(async () => {
				D(await l(b + (c.value ? "?publication=1" : ""), {
					method: "DELETE",
					headers: { "If-Match": `"${s.value.revision}"` }
				})), n.core.notice(r("publicationWithdrawn"));
			});
		}
		function ne() {
			c.value && s.value && confirm(r("cancelSubmissionConfirm")) && O(async () => {
				D(await l(b, {
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
		function ie() {
			!n.core.state.busy && document.visibilityState !== "hidden" && i.value.open && d.value && O(k);
		}
		return Xn(() => {
			window.addEventListener("focus", ie), document.addEventListener("visibilitychange", ie);
		}), Zn(() => {
			x++, URL.revokeObjectURL(m.value), window.removeEventListener("focus", ie), document.removeEventListener("visibilitychange", ie);
		}), t({ open: A }), (e, t) => (Y(), X("dialog", {
			id: "publish-dialog",
			ref_key: "dialog",
			ref: i,
			tabindex: "-1",
			"aria-labelledby": "publish-heading",
			onCancel: j
		}, [
			Z("div", ks, [Z("h2", As, P(H(r)(c.value ? "submitReview" : "publishBook")), 1), Z("button", {
				id: "close-publish",
				onClick: j
			}, P(H(r)("close")), 1)]),
			Z("p", {
				id: "publish-intro",
				hidden: c.value
			}, P(H(r)("publishIntro")), 9, js),
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
				}, P(H(r)("openPublication")), 9, Ns),
				Z("button", {
					id: "copy-publication",
					onClick: t[0] ||= (e) => O(re)
				}, P(H(r)("copyPublication")), 1),
				Z("button", {
					id: "withdraw-publication",
					onClick: te
				}, P(H(r)("withdrawPublication")), 1)
			], 8, Ms),
			Z("section", {
				id: "submission-state",
				role: "status",
				"data-status": w.value,
				hidden: !c.value || !s.value || w.value === "draft"
			}, [
				Z("h3", {
					id: "submission-heading",
					ref_key: "submissionHeading",
					ref: o,
					tabindex: "-1"
				}, P(H(r)(T.value)), 513),
				Z("p", Fs, P(H(r)(E.value)), 1),
				Z("p", Is, P(s.value?.feedback), 1),
				Z("button", {
					id: "refresh-submission",
					onClick: t[1] ||= (e) => O(k)
				}, P(H(r)("refreshReviewStatus")), 1),
				Z("button", {
					id: "cancel-submission",
					hidden: !["pending", "returned"].includes(w.value),
					onClick: ne
				}, P(H(r)("cancelSubmission")), 9, Ls)
			], 8, Ps),
			Z("p", Rs, P(H(r)(h.value)), 1),
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
				}, P(H(r)("publicationSignIn")), 9, Bs),
				Z("a", {
					id: "publication-student-sign-in",
					class: "button",
					href: "/student.html?next=" + S.value,
					target: "_blank",
					rel: "noopener"
				}, P(H(r)("studentSignIn")), 9, Vs),
				Z("button", {
					id: "check-publication-login",
					onClick: t[2] ||= (e) => O(k)
				}, P(H(r)("refreshRebost")), 1)
			], 8, zs),
			Z("p", {
				id: "submission-intro",
				hidden: !c.value
			}, P(H(r)("submissionIntro")), 9, Hs),
			Z("form", {
				id: "publish-form",
				hidden: !f.value,
				onSubmit: t[8] ||= Ba((e) => O(ee, "publishing"), ["prevent"])
			}, [
				Z("h3", Ws, P(p.value), 1),
				Z("img", {
					id: "publish-cover",
					src: m.value || void 0,
					width: "320",
					height: "180",
					alt: ""
				}, null, 8, Gs),
				Z("label", null, [Z("span", null, P(H(r)("publishAuthor")), 1), G(Z("input", {
					id: "publish-author",
					"onUpdate:modelValue": t[3] ||= (e) => y.author = e,
					required: "",
					maxlength: "120",
					autocomplete: "off"
				}, null, 512), [[ka, y.author]])]),
				Z("label", null, [Z("span", null, P(H(r)("publishDescription")), 1), G(Z("textarea", {
					id: "publish-description",
					"onUpdate:modelValue": t[4] ||= (e) => y.description = e,
					maxlength: "2000",
					rows: "3"
				}, null, 512), [[ka, y.description]])]),
				Z("label", null, [Z("span", null, P(H(r)("publishLicense")), 1), G(Z("select", {
					id: "publish-license",
					"onUpdate:modelValue": t[5] ||= (e) => y.license = e
				}, [...t[9] ||= [
					Z("option", { value: "CC-BY-SA-4.0" }, "CC BY-SA 4.0", -1),
					Z("option", { value: "CC-BY-4.0" }, "CC BY 4.0", -1),
					Z("option", { value: "CC0-1.0" }, "CC0 1.0", -1)
				]], 512), [[Na, y.license]])]),
				Z("label", Ks, [G(Z("input", {
					id: "publish-editable",
					"onUpdate:modelValue": t[6] ||= (e) => y.editable = e,
					type: "checkbox"
				}, null, 512), [[Aa, y.editable]]), Z("span", null, P(H(r)("publishEditable")), 1)]),
				Z("label", qs, [G(Z("input", {
					id: "publish-confirm",
					"onUpdate:modelValue": t[7] ||= (e) => y.confirmed = e,
					type: "checkbox",
					required: ""
				}, null, 512), [[Aa, y.confirmed]]), Z("span", Js, P(H(r)(c.value ? "submissionConfirm" : "publishConfirm")), 1)]),
				Z("button", Ys, P(H(r)(c.value ? "submitReview" : s.value?.published ? "updatePublication" : "publishBook")), 1)
			], 40, Us)
		], 544));
	}
}, Zs = { class: "dialog-heading" }, Qs = { id: "shared-heading" }, $s = ["hidden", "href"], ec = ["aria-label"], tc = {
	id: "shared-status",
	role: "status"
}, nc = {
	id: "shared-books",
	class: "books"
}, rc = ["src"], ic = ["onClick"], ac = ["hidden"], oc = { class: "dialog-heading" }, sc = { id: "published-title" }, cc = ["src", "title"], lc = {
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
		return Zn(() => h++), t({ open: v }), (e, t) => (Y(), X(q, null, [Z("dialog", {
			id: "shared-dialog",
			ref_key: "dialog",
			ref: i,
			"aria-labelledby": "shared-heading",
			onCancel: t[3] ||= (e) => /* @__PURE__ */ B(h) ? h.value++ : h++
		}, [
			Z("div", Zs, [Z("h2", Qs, P(H(r)("sharedStories")), 1), Z("button", {
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
			}, P(H(r)("openBank")), 9, $s),
			Z("form", {
				id: "shared-search-form",
				onSubmit: t[1] ||= Ba((e) => g(() => _()), ["prevent"])
			}, [G(Z("input", {
				id: "shared-search",
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				type: "search",
				maxlength: "200",
				"aria-label": H(r)("searchBooksLabel")
			}, null, 8, ec), [[ka, o.value]]), Z("button", null, P(H(r)("searchBooks")), 1)], 32),
			Z("p", tc, P(H(r)(f.value)), 1),
			Z("div", nc, [(Y(!0), X(q, null, $n(s.value, (e) => (Y(), X("article", {
				key: e.external_id,
				class: "book-card"
			}, [
				Z("img", {
					src: `/api/llibres/public/${e.external_id}/cover.png`,
					alt: "",
					loading: "lazy"
				}, null, 8, rc),
				Z("button", {
					class: "book-open",
					onClick: (t) => b(e)
				}, P(e.title), 9, ic),
				Z("p", null, P(e.author), 1)
			]))), 128))]),
			Z("button", {
				id: "shared-more",
				hidden: !d.value,
				onClick: t[2] ||= (e) => g(() => _(!0))
			}, P(H(r)("moreBooks")), 9, ac)
		], 544), Z("dialog", {
			id: "published-reader",
			ref_key: "reader",
			ref: a,
			"aria-labelledby": "published-title",
			onCancel: t[4] ||= (e) => p.value = null
		}, [Z("div", oc, [Z("h2", sc, P(p.value?.title), 1), Z("button", {
			id: "close-published-reader",
			onClick: x
		}, P(H(r)("close")), 1)]), Z("iframe", {
			id: "published-frame",
			src: p.value ? `/api/llibres/public/${p.value.external_id}/index.html` : void 0,
			title: H(r)("publishedBook"),
			sandbox: "allow-downloads"
		}, null, 8, cc)], 544)], 64));
	}
}, uc = {
	id: "demo-book",
	class: "demo-book",
	"aria-labelledby": "demo-heading"
}, dc = ["aria-label"], fc = { class: "eyebrow" }, pc = { class: "actions" }, mc = {
	id: "read-demo",
	class: "demo-link",
	href: "/examples/la-papallona/"
}, hc = ["disabled"], gc = {
	id: "download-demo",
	class: "demo-link",
	href: "/examples/la-papallona/la-papallona.elpx",
	download: ""
}, _c = {
	__name: "DemoBook",
	props: {
		locale: String,
		busy: Boolean
	},
	emits: ["edit"],
	setup(e) {
		return (t, n) => (Y(), X("section", uc, [Z("a", {
			href: "/examples/la-papallona/",
			"aria-label": H(a)[e.locale].demoRead
		}, [...n[1] ||= [Z("img", {
			src: "/examples/la-papallona/cover.png",
			alt: "La papallona i els colors del bosc",
			width: "320",
			height: "180",
			loading: "lazy"
		}, null, -1)]], 8, dc), Z("div", null, [
			Z("p", fc, P(H(a)[e.locale].demoLabel), 1),
			n[2] ||= Z("h2", { id: "demo-heading" }, "La papallona i els colors del bosc", -1),
			Z("p", null, P(H(a)[e.locale].demoDescription), 1),
			Z("div", pc, [
				Z("a", mc, P(H(a)[e.locale].demoRead), 1),
				Z("button", {
					id: "edit-demo",
					disabled: e.busy,
					onClick: n[0] ||= (e) => t.$emit("edit")
				}, P(H(a)[e.locale].demoEdit), 9, hc),
				Z("a", gc, P(H(a)[e.locale].demoDownload), 1)
			])
		])]));
	}
}, vc = { class: "masthead" }, yc = ["disabled"], bc = ["hidden"], xc = { class: "hero" }, Sc = { class: "eyebrow" }, Cc = { class: "intro" }, wc = { class: "actions" }, Tc = ["hidden"], Ec = ["hidden"], Dc = { class: "storage-note" }, Oc = {
	class: "hero-art",
	"aria-hidden": "true"
}, kc = { class: "book-cover" }, Ac = { href: "/about.html" }, jc = ["hidden"], Mc = ["hidden"], Nc = { id: "busy-text" }, Pc = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ V(null), n = /* @__PURE__ */ V(null), r = /* @__PURE__ */ V(null), i = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), o = /* @__PURE__ */ V(null), s = /* @__PURE__ */ V(null), c = /* @__PURE__ */ V(null), l = /* @__PURE__ */ V(null), u = /* @__PURE__ */ V(null), d = Ya({
			host: () => i.value.host(),
			refreshShelf: () => t.value.refresh(),
			read: (e, t) => a.value.open(e, t),
			pick: () => o.value.open(),
			deviceImage: () => l.value.click()
		}), f = d.state, p = d.t;
		function m(e) {
			let t = e.target.files[0];
			e.target.value = "", d.action(() => d.importFile(t), "loading");
		}
		function h(e) {
			let t = e.target.files[0];
			e.target.value = "", t && d.action(() => d.image(t));
		}
		function g() {
			d.action(async () => {
				let e = await fetch("/examples/la-papallona/la-papallona.elpx");
				if (!e.ok) throw Error("invalid");
				let t = await e.arrayBuffer();
				if (t.byteLength > 26214400) throw Error("invalid");
				d.language("va", !1), await d.importFile(new File([t], "La papallona i els colors del bosc.elpx", { type: "application/zip" }));
			}, "loading");
		}
		return Xn(d.start), Zn(d.dispose), (e, _) => (Y(), X(q, null, [
			Z("header", vc, [_[9] ||= Z("a", {
				class: "brand",
				href: "/"
			}, [di("◧ EduTicTac "), Z("b", null, "Llibres")], -1), G(Z("select", {
				id: "language",
				"onUpdate:modelValue": _[0] ||= (e) => H(f).locale = e,
				disabled: H(f).active,
				onChange: _[1] ||= (e) => H(d).language(H(f).locale),
				"aria-label": "Idioma"
			}, [..._[8] ||= [
				Z("option", { value: "es" }, "Castellano", -1),
				Z("option", { value: "ca" }, "Català", -1),
				Z("option", { value: "va" }, "Valencià", -1),
				Z("option", { value: "en" }, "English", -1)
			]], 40, yc), [[Na, H(f).locale]])]),
			Z("main", {
				id: "home",
				hidden: H(f).active
			}, [
				Z("section", xc, [Z("div", null, [
					Z("p", Sc, P(H(p)("eyebrow")), 1),
					Z("h1", null, P(H(p)("headline")), 1),
					Z("p", Cc, P(H(p)("intro")), 1),
					Z("div", wc, [
						Z("button", {
							id: "new-book",
							onClick: _[2] ||= (e) => r.value.open(),
							class: "primary"
						}, P(H(p)("new")), 1),
						Z("button", {
							id: "open-book",
							onClick: _[3] ||= (e) => u.value.click()
						}, P(H(p)("open")), 1),
						Z("button", {
							id: "open-shared",
							onClick: _[4] ||= (e) => c.value.open(),
							hidden: !H(f).publicationEnabled
						}, P(H(p)("sharedStories")), 9, Tc),
						Z("button", {
							id: "open-reviews",
							onClick: _[5] ||= (e) => n.value.open(),
							hidden: !H(f).publicationEnabled
						}, P(H(p)("reviewBooks")), 9, Ec)
					]),
					Z("p", Dc, P(H(p)("local")), 1)
				]), Z("div", Oc, [Z("div", kc, [
					Z("span", null, [
						di(P(H(p)("coverTop")), 1),
						_[10] ||= Z("br", null, null, -1),
						di(P(H(p)("coverBottom")), 1)
					]),
					_[11] ||= Z("div", { class: "sun" }, null, -1),
					_[12] ||= Z("div", { class: "hill" }, null, -1),
					Z("i", null, P(H(p)("storySubtitle")), 1)
				]), _[13] ||= Z("span", { class: "star" }, "✳", -1)])]),
				Q(_c, {
					locale: H(f).locale,
					busy: H(f).busy,
					onEdit: g
				}, null, 8, ["locale", "busy"]),
				Q(ao, {
					ref_key: "shelf",
					ref: t,
					locale: H(f).locale,
					action: H(d).action,
					"open-book": H(d).openStored
				}, null, 8, [
					"locale",
					"action",
					"open-book"
				]),
				Z("footer", null, [Z("span", null, P(H(p)("footer")), 1), Z("a", Ac, P(H(p)("about")), 1)])
			], 8, bc),
			Q(gs, {
				ref_key: "workshop",
				ref: i,
				core: H(d),
				onPublish: _[6] ||= (e) => s.value.open()
			}, null, 8, ["core"]),
			Q(Uo, {
				ref_key: "createDialog",
				ref: r,
				locale: H(f).locale,
				core: H(d)
			}, null, 8, ["locale", "core"]),
			Q(ws, {
				ref_key: "reader",
				ref: a,
				core: H(d)
			}, null, 8, ["core"]),
			Q(Os, {
				ref_key: "picker",
				ref: o,
				core: H(d),
				onDevice: _[7] ||= (e) => l.value.click()
			}, null, 8, ["core"]),
			Q(Xs, {
				ref_key: "publication",
				ref: s,
				core: H(d)
			}, null, 8, ["core"]),
			Q(lc, {
				ref_key: "shared",
				ref: c,
				core: H(d)
			}, null, 8, ["core"]),
			Q(Mo, {
				ref_key: "reviews",
				ref: n,
				locale: H(f).locale,
				action: H(d).action,
				notice: H(d).notice
			}, null, 8, [
				"locale",
				"action",
				"notice"
			]),
			Z("input", {
				id: "image-input",
				ref_key: "imageInput",
				ref: l,
				type: "file",
				accept: "image/png,image/jpeg,image/webp",
				hidden: "",
				onChange: h
			}, null, 544),
			Z("input", {
				id: "file-input",
				ref_key: "fileInput",
				ref: u,
				type: "file",
				accept: ".elpx",
				hidden: "",
				onChange: m
			}, null, 544),
			Z("div", {
				id: "notice",
				role: "status",
				"aria-live": "polite",
				class: Ce({ error: H(f).noticeError }),
				hidden: !H(f).notice
			}, P(H(f).notice), 11, jc),
			Z("div", {
				id: "busy",
				hidden: !H(f).busy,
				role: "status"
			}, [_[14] ||= Z("span", { class: "spinner" }, null, -1), Z("span", Nc, P(H(p)(H(f).busyKey)), 1)], 8, Mc)
		], 64));
	}
};
// src/ui.js
function Fc() {
	return Wa(Pc).mount("#app");
}
export { Fc as mountLlibres };
