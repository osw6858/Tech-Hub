import { useMutation, useQueryClient } from "react-query";
import { CommentsState } from "../postHooks/addPostHook";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseConfig";

const useDeleteComment = (docId: string | undefined) => {
  const queryClient = useQueryClient();

  //TODO: 댓글 삭제전 확인/취소 모달창 추가
  const removeMutation = useMutation(
    (removeComment: CommentsState) => {
      const collectionRef = collection(db, "Posts");
      const documentRef = doc(collectionRef, docId);
      return updateDoc(documentRef, {
        comments: removeComment,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getPostComments"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
      },
      onError: (error) => {
        //TODO: 에러처리 보강
        console.error(`삭제중 문제 발생 오류내용 : ${error}`);
      },
    }
  );

  const handleRemoveComment = async (
    uid: string,
    userComment: string,
    commentedAt: number
  ) => {
    if (docId === "" || typeof docId === "undefined") {
      alert("존재하지 않는 게시물 입니다.");
      return;
    }

    const collectionRef = collection(db, "Posts");
    const documentRef = doc(collectionRef, docId);
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      const comments = docSnap.data().comments;
      const updatedComments = comments.filter(
        (comment: CommentsState) =>
          comment.uid !== uid ||
          comment.comment !== userComment ||
          comment.commentedAt !== commentedAt
      );
      removeMutation.mutate(updatedComments);
    } else {
      console.log("No such document!");
    }
  };

  return { handleRemoveComment };
};

export default useDeleteComment;
