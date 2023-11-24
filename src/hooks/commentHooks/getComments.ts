import { collection, doc, getDoc } from "firebase/firestore/lite";
import { useCallback } from "react";
import { db } from "../../firebase/firebaseConfig";

const useGetComments = (docId: string | undefined) => {
  const getPostComments = useCallback(async () => {
    const docRef = collection(db, "Posts");
    const postRef = doc(docRef, docId);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const data = postSnapshot.data();
      const comment = data.comments;
      return comment;
    } else {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { getPostComments };
};

export default useGetComments;
