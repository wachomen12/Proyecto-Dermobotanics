import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const SERVICES_COLLECTION = "services";

export async function addService(service: any) {
  const docRef = await addDoc(collection(db, SERVICES_COLLECTION), service);
  return { ...service, id: docRef.id };
}

export async function getAllServices() {
  const querySnapshot = await getDocs(collection(db, SERVICES_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteService(id: string) {
  await deleteDoc(doc(db, SERVICES_COLLECTION, id));
}

export async function updateService(id: string, data: any) {
  await updateDoc(doc(db, SERVICES_COLLECTION, id), data);
}
