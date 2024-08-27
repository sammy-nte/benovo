import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { store } from "../redux/store";

export async function getNgoInfo(userId) {
  try {
    const data = [];
    const postsRef = collection(db, "NGOs");
    const q = query(postsRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
