import { forwardRef } from "react";
import styled from "styled-components";

interface InputState {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  type: string;
}

const AuthInputComponent = forwardRef(
  (
    { id, value, onChange, placeholder, type }: InputState,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <>
        <Input
          required
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        ></Input>
      </>
    );
  }
);

export default AuthInputComponent;

const Input = styled.input`
  background-color: ${({ theme }) => theme.body};
  min-height: 3rem;
  padding-left: 1.5rem;
  outline: none;
  border: none;
  border-bottom: ${({ theme }) => theme.border};
  margin: 1rem 0 1rem 0;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s;
  width: 92%;

  &:hover {
    background-color: ${({ theme }) => theme.input};
  }
`;
