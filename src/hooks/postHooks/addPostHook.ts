import { addDoc, collection } from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { auth, db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export type Reply = {
  reply: string;
  replyBy: string;
};

export interface CommentsState {
  uid: string;
  docId: string;
  comment: string;
  commentBy: string;
  commentedAt: number;
  reply: Reply[];
}

export type CommentList = CommentsState[];

const useAddPostHook = (
  title: string,
  md: string,
  uid: string | undefined,
  category: string
) => {
  const navigate = useNavigate();
  const now = dayjs();

  const queryClient = useQueryClient();

  const addPostMutation = useMutation(
    (newMd: {
      content: string;
      uid: string;
      displayName: string | undefined | null;
      title: string;
      createdAt: number;
      comments: CommentList;
      category: string;
    }) => {
      const postsCollection = collection(db, "Posts");
      return addDoc(postsCollection, newMd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getMyPosts", uid] });
        alert("게시물이 성공적으로 저장되었습니다.");
        navigate("/");
      },
      onError: () => {
        //TODO: 에러처리 보강

        console.error("에러발생");
        navigate(`/error`);
      },
    }
  );

  const handleSave = () => {
    const uid = auth.currentUser?.uid;
    if (md === "" || title === "") {
      alert("내용을 입력해 주세요");
      return;
    } else if (typeof uid === "undefined") {
      alert("권한이 없습니다. 관리자에게 문의해 주세요.");
      return;
    }
    addPostMutation.mutate({
      title: title,
      content: md,
      uid: uid,
      displayName: auth.currentUser?.displayName,
      createdAt: now.valueOf(),
      comments: [],
      category: category,
    });
  };
  return { handleSave, addPostMutation };
};

export default useAddPostHook;
