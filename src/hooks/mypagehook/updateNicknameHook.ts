import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useMutation, useQueryClient } from "react-query";

const useUpdateNickName = (
  newName: string,
  setUpdate: (value: React.SetStateAction<boolean>) => void,
  setNickName: (value: React.SetStateAction<string>) => void
) => {
  const queryClient = useQueryClient();

  const UpdateMutation = useMutation(
    async (updateName: { displayName: string }) => {
      const user = auth.currentUser;
      if (user) {
        return await updateProfile(user, updateName);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        setUpdate(false);
        setNickName("");
      },
      onError: (error) => {
        alert(`오류 발생 ${error}`);
      },
    }
  );

  const handleUpdateNickName = () => {
    UpdateMutation.mutate({
      displayName: newName,
    });
  };

  return { handleUpdateNickName };
};
export default useUpdateNickName;
