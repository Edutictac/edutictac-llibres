/* Protocolo postMessage del selector (/assets/?mode=pick). Formato versionado: 'rebost-selection' v1. */
import {ITEM_ID} from './index.js';

export const SELECTION_FORMAT = 'rebost-selection';
export const SELECTION_VERSION = 1;

/** Nuevo identificador de petición (hay que guardarlo y pasarlo a isSelection). */
export function newRequestId() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16)).join('-');
}

/** URL del selector para un iframe. `base` por defecto: '/assets/'. */
export function pickerUrl({base = '/assets/', type, request, lang} = {}) {
  const url = new URL(base, globalThis.location?.href);
  url.searchParams.set('mode', 'pick');
  if (type) url.searchParams.set('type', type);
  url.searchParams.set('request', request);
  if (lang) url.searchParams.set('lang', lang);
  return url.pathname + url.search;
}

/**
 * Valida un MessageEvent del selector.
 * @returns {{cancel:true}|{id:string,family:boolean,familyRevision?:number}|null} null si no es válido.
 */
export function parseSelection(event, {source, request, origin = globalThis.location?.origin}) {
  const d = event?.data;
  if (!d || event.origin !== origin || event.source !== source) return null;
  if (d.format !== SELECTION_FORMAT || d.version !== SELECTION_VERSION || d.request !== request) return null;
  if (d.cancel === true) return {cancel: true};
  if (typeof d.id !== 'string' || !ITEM_ID.test(d.id)) return null;
  if (d.family === undefined) return {id: d.id, family: false};
  if (d.family === true && Number.isSafeInteger(d.familyRevision) && d.familyRevision > 0)
    return {id: d.id, family: true, familyRevision: d.familyRevision};
  return null;
}
