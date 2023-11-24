import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const useName = (nickName: string) => {
  const navigate = useNavigate();
  const setUserNickName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user != null) {
      updateProfile(user, {
        displayName: nickName,
      })
        .then(() => {
          navigate("/");
          alert(`${nickName}님 환영합니다!`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return { setUserNickName };
};

export default useName;
