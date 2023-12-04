import styled from "styled-components";

type Button = {
  children: string;
  clickFn?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
};

const CardButtonComponent = ({
  className,
  type,
  clickFn,
  children,
}: Button) => {
  return (
    <Button className={className} type={type} onClick={clickFn}>
      {children}
    </Button>
  );
};

export default CardButtonComponent;

const Button = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1px solid gray;
  font-weight: 600;
  outline: none;
  padding: 1.2rem;
  width: auto;
  min-width: 8rem;
  margin: 1.5rem 1rem 0 0;
  transition: all 0.3s;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;
