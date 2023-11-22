import { useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const useCheckIsLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);
};

export default useCheckIsLogin;
