import { collection, doc, updateDoc } from "firebase/firestore/lite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

const useUpdatePost = (
  docId: string | undefined,
  title: string,
  md: string,
  category: string
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const UpdateMutation = useMutation(
    async (updateMd: { title: string; content: string; category: string }) => {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      return await updateDoc(documentRef, updateMd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
        alert("게시물이 성공적으로 수정되었습니다.");
        navigate(`/post/${docId}`);
      },
      onError: (error): never => {
        alert("게시물 수정중 문제가 발생했습니다. 관리자에게 문의해 주세요.");
        navigate("/");
        throw new Error(`게시물 수정중 에러 발생 : ${error}`);
      },
    }
  );

  const handleUpdatePost = async () => {
    UpdateMutation.mutate({
      title: title,
      content: md,
      category,
    });
  };

  return { handleUpdatePost };
};

export default useUpdatePost;
