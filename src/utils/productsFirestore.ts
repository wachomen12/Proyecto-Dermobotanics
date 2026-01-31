import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const PRODUCTS_COLLECTION = "products";

export async function addProduct(product: any) {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
  return { ...product, id: docRef.id };
}

export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

// Reordena productos actualizando el campo 'orden' en Firestore
import { writeBatch } from "firebase/firestore";
export async function reorderProducts(updates: { id: string; orden: number }[]) {
  const batch = writeBatch(db);
  updates.forEach(update => {
    const productRef = doc(db, PRODUCTS_COLLECTION, update.id);
    batch.update(productRef, { orden: update.orden });
  });
  await batch.commit();
  // Retornar productos actualizados
  return await getAllProducts();
}
