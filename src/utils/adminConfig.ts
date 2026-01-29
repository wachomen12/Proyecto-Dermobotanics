import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CONFIG_COLLECTION = "config";
const ADMIN_DOC = "admin";

export async function getAdminCredentials() {
  const ref = doc(db, CONFIG_COLLECTION, ADMIN_DOC);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data(); // { user, pass }
  }
  // Si no existe, retorna valores por defecto
  return { user: "admin", pass: "admin123" };
}

export async function setAdminCredentials({ user, pass }: { user: string; pass: string }) {
  const ref = doc(db, CONFIG_COLLECTION, ADMIN_DOC);
  await setDoc(ref, { user, pass });
}
