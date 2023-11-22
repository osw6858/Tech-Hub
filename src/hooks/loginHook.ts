import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

interface LoginState {
  email: string;
  password: string;
  setLoginModal: (isOpen: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
  setErrorMsg: (value: React.SetStateAction<string>) => void;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

const useLogin = ({
  email,
  password,
  setLoginModal,
  setIsLogin,
  setErrorMsg,
  emailRef,
  passwordRef,
}: LoginState) => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPersistence(auth, browserSessionPersistence).then(() => {
        console.log("로그인 성공");
        setLoginModal(false);
        setIsLogin(true);
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/user-not-found":
            setErrorMsg("일치하는 이메일이 없습니다.");
            emailRef.current?.focus();
            break;
          case "auth/wrong-password":
            setErrorMsg("비밀번호가 일치하지 않습니다.");
            passwordRef.current?.focus();
            break;
        }
      }
    }
  };

  return { handleLogin };
};
export default useLogin;
