import {
  DocumentData,
  DocumentReference,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

const useRemovePost = (docId: string | undefined) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (removePost: DocumentReference<DocumentData, DocumentData>) => {
      return deleteDoc(removePost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllPost");
        navigate(`/`);
        alert("게시물이 성공적으로 삭제되었습니다.");
      },
      onError: (error) => {
        console.error("게시물 삭제 중 오류 발생:", error);
        navigate(`/error`);
      },
    }
  );
  const handleRemovePost = () => {
    const docRef = collection(db, "Posts");
    const documentRef = doc(docRef, docId);
    deleteMutation.mutate(documentRef);
  };
  return { handleRemovePost };
};

export default useRemovePost;
