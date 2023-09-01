import { db } from "../../../config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const writeCommentToFirestore = async (userId, postId, commentsItem) => {
  try {
    const snapshot = await getDocs(collection(db, "users", userId, "posts"));
    const post = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      .filter((docData) => docData.id === postId);

    const docRef = doc(collection(db, "users", userId, "posts"), postId);

    const array = post[0].data.comments;
    array.push(commentsItem);

    await updateDoc(docRef, {
      comments: array,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
