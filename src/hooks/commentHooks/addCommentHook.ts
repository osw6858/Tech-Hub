import dayjs from "dayjs";
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { CommentsState } from "../postHooks/addPostHook";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";

const useAddComment = (
  docId: string | undefined,
  comment: string,
  setComment: (comment: string) => void
) => {
  const now = dayjs();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(
    async (newComment: CommentsState) => {
      const postsCollection = collection(db, "Posts");
      const postRef = doc(postsCollection, docId);
      return await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getPostComments"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
        setComment("");
        alert("게시물이 정상적으로 작성!");
      },
      onError: () => {
        //TODO: 에러처리 보강
        console.error("에러발생");
        navigate(`/post/${docId}`);
      },
    }
  );

  const handleComments = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment === "" || typeof comment === "undefined") {
      alert("댓글을 작성해 주세요.");
      return;
    } else if (!auth.currentUser) {
      alert("댓글을 작성하려면 로그인 하세요.");
      return;
    } else if (typeof docId === "undefined") {
      alert("존재하지 않는 게시물 입니다.");
      return;
    }

    addCommentMutation.mutate({
      uid: auth.currentUser.uid,
      docId,
      comment,
      commentBy: auth.currentUser?.displayName
        ? auth.currentUser?.displayName
        : "익명",
      commentedAt: now.valueOf(),
      reply: [],
    });
  };

  return { handleComments };
};

export default useAddComment;
