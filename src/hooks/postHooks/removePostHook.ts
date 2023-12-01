import {
  DocumentData,
  DocumentReference,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

const useRemovePost = (docId: string | undefined, session: string | null) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //TODO: 게시물 삭제전 확인/취소 모달창 만들기
  const deleteMutation = useMutation(
    (removePost: DocumentReference<DocumentData, DocumentData>) => {
      return deleteDoc(removePost);
    },
    {
      onSuccess: () => {
        if (session) {
          const uid = JSON.parse(session).uid;
          queryClient.invalidateQueries({ queryKey: ["getMyPosts", uid] });
        }
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        navigate(`/`);
      },
      onError: (error): never => {
        alert("게시물 삭제중 문제가 발생했습니다. 관리자에게 문의해 주세요.");
        navigate("/");
        throw new Error(`게시물 삭제중 에러 발생 : ${error}`);
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
