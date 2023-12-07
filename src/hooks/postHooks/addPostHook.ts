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
  console.log(category);
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
      onError: (error): never => {
        alert("게시물 저장중 문제가 발생했습니다. 관리자에게 문의해 주세요.");
        navigate("/");
        throw new Error(`게시물 저장중 에러 발생 : ${error}`);
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
      category: category === "" ? "none" : category,
    });
  };
  return { handleSave, addPostMutation };
};

export default useAddPostHook;
