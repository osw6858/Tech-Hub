import { collection, doc, updateDoc } from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

const useUpdatePost = (
  docId: string | undefined,
  title: string,
  md: string
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const UpdateMutation = useMutation(
    (updateMd: { title: string; content: string }) => {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      return updateDoc(documentRef, updateMd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
        alert("게시물이 성공적으로 수정되었습니다.");
        navigate(`/post/${docId}`);
      },
      onError: (error) => {
        console.error("게시물 수정 중 오류 발생:", error);
        navigate(`/error`);
      },
    }
  );

  const handleUpdatePost = async () => {
    UpdateMutation.mutate({
      title: title,
      content: md,
    });
  };

  return { handleUpdatePost };
};

export default useUpdatePost;
