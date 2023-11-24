import { useEffect } from "react";
import { apiKey } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const useCheckIsLogin = () => {
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(`${session_key}`) ? true : false;

  const navigate = useNavigate();
  useEffect(() => {
    if (!isSession) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSession]);
};

export default useCheckIsLogin;
