import { collection, doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebaseConfig";
import { useCallback } from "react";

const useGetPost = (docId: string | undefined) => {
  const getPost = useCallback(async () => {
    try {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        return documentData;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("문서를 가져오는 도중 오류 발생:", error);
    }
  }, [docId]);

  return { getPost };
};

export default useGetPost;
