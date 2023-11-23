import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useMutation } from "react-query";

interface LoginState {
  email: string;
  password: string;
  setLoginModal: (isOpen: boolean) => void;
  setErrorMsg: (value: React.SetStateAction<string>) => void;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

const useLogin = ({
  email,
  password,
  setLoginModal,
  setErrorMsg,
  emailRef,
  passwordRef,
}: LoginState) => {
  const LoginMutation = useMutation(
    (loginInput: { email: string; password: string }) => {
      return signInWithEmailAndPassword(
        auth,
        loginInput.email,
        loginInput.password
      );
    },
    {
      onSuccess: () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
          console.log("로그인 성공");
          setLoginModal(false);
        });
      },
      onError: (error) => {
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
      },
    }
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginMutation.mutate({
      email: email,
      password: password,
    });
  };

  return { handleLogin };
};
export default useLogin;
