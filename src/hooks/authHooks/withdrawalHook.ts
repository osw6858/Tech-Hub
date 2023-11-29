import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../../firebase/firebaseConfig";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const useWithdrawal = () => {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const withdrawalUser = async () => {
    if (user) {
      const uid = user.uid;
      const q = query(collection(db, "Posts"), where("uid", "==", uid));
      const posts = await getDocs(q);
      posts.forEach((post) => {
        const postRef = doc(db, "Posts", post.id);
        deleteDoc(postRef);
      });

      user
        .delete()
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
          navigate("/");
          alert(`안녕히 가세요. 이용해 주셔서 감사합니다.`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return { withdrawalUser };
};

export default useWithdrawal;
