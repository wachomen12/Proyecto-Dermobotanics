import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
export async function updateResultado(id: string, data: any) {
  await updateDoc(doc(db, RESULTADOS_COLLECTION, id), data);
  return true;
}

const RESULTADOS_COLLECTION = "resultados";

export async function addResultado(resultado: any) {
  const docRef = await addDoc(collection(db, RESULTADOS_COLLECTION), resultado);
  return { ...resultado, id: docRef.id };
}

export async function getAllResultados() {
  const querySnapshot = await getDocs(collection(db, RESULTADOS_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteResultado(id: string) {
  await deleteDoc(doc(db, RESULTADOS_COLLECTION, id));
  return true;
}
