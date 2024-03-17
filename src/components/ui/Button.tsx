import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  spicialStyles?: string;
}

const Button = ({ children, spicialStyles, ...rest }: IProps) => {
  return (
    <button className={`${spicialStyles} w-full rounded-md text-white p-2`} {...rest}>
      {children}
    </button>
  );
};

export default Button;