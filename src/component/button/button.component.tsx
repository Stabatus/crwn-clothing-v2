import { ButtonHTMLAttributes } from "react";

import './button.styles.scss';

interface ButtonProps {
  children?: JSX.Element[] | JSX.Element | string | string[];
  buttonOptions: React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

export const Button = ({ children, buttonOptions }: ButtonProps) => {

  return <button className="button-container" {...buttonOptions}>{children}</button>
};
