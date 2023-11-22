import { addDoc, collection } from "firebase/firestore/lite";
import { useMutation } from "react-query";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const useAddPostHook = (title: string, md: string) => {
  const navigate = useNavigate();
  const now = dayjs();

  const mutation = useMutation(
    (newMd: {
      content: string;
      uid: string | undefined;
      displayName: string | undefined | null;
      title: string;
      createdAt: number;
    }) => {
      const postsCollection = collection(db, "Posts");
      return addDoc(postsCollection, newMd);
    },
    {
      onSuccess: () => {
        alert("게시물이 성공적으로 저장되었습니다.");
        navigate("/");
      },
    }
  );

  const handleSave = async () => {
    if (md === "" || title === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    mutation.mutate({
      title: title,
      content: md,
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      createdAt: now.valueOf(),
    });
  };
  return { handleSave, mutation };
};

export default useAddPostHook;
