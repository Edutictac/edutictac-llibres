let connection;
async function database() {
  if (connection) return connection;
  connection = await new Promise((resolve, reject) => {
    const r = indexedDB.open("edutictac-llibres-v1", 1);
    r.onupgradeneeded = () =>
      r.result.createObjectStore("books", { keyPath: "id" });
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
  return connection;
}
export async function operate(mode, action) {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("books", mode),
      r = action(tx.objectStore("books"));
    tx.oncomplete = () => resolve(r.result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("storage_failed"));
  });
}
export const allBooks = () => operate("readonly", (s) => s.getAll());
export const saveBook = (book) => operate("readwrite", (s) => s.put(book));
export const removeBook = (id) => operate("readwrite", (s) => s.delete(id));
export function uid() {
  return (
    globalThis.crypto.randomUUID?.() ||
    Array.from(crypto.getRandomValues(new Uint8Array(16)), (n) =>
      n.toString(16).padStart(2, "0"),
    ).join("")
  );
}
