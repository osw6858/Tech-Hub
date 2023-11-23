import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "react-query";
import { auth } from "../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

interface LoginState {
  email: string;
  password: string;
  setErrorMsg: (value: React.SetStateAction<string>) => void;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

const useSingUp = ({
  email,
  password,
  setErrorMsg,
  emailRef,
  passwordRef,
}: LoginState) => {
  const [isSingUp, setIsSingUp] = useState(false);

  const SingUpMutation = useMutation(
    (singupInput: { email: string; password: string }) => {
      return createUserWithEmailAndPassword(
        auth,
        singupInput.email,
        singupInput.password
      );
    },
    {
      onSuccess: async () => {
        setIsSingUp(true);
      },
      onError: (error) => {
        if (error instanceof FirebaseError) {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/weak-password":
              setErrorMsg("비밀번호는 최소 6자리 이상이여야 합니다.");
              emailRef.current?.focus();
              break;
            case "auth/email-already-in-use":
              setErrorMsg("이미 사용중인 이메일입니다.");
              passwordRef.current?.focus();
              break;
            case "auth/missing-email":
              setErrorMsg("이메일을 입력해 주세요.");
              emailRef.current?.focus();
              break;
            case "auth/missing-password":
              setErrorMsg("비밀번호를 입력해 주세요.");
              passwordRef.current?.focus();
              break;
            case "auth/invalid-email":
              setErrorMsg("이메일 형식이 올바르지 않습니다.");
              emailRef.current?.focus();
              break;
          }
        }
      },
    }
  );

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    SingUpMutation.mutate({
      email: email,
      password: password,
    });
  };

  return { handleSingUp, isSingUp };
};

export default useSingUp;
