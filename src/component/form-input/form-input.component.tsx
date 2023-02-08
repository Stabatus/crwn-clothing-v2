import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, } from "react";

import './form-input.styles.scss'

interface FormInputProps {
  displayName: string;
  inputOptions: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const FormInput = forwardRef(
  (
    { displayName, inputOptions }: FormInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {

    return (
      <label className="group">
        {displayName.length ?
          <span
            className={`
            form-input-label
          `}
          >
            {displayName}
          </span>
          : null}
        <br />
        <input className="form-input" {...inputOptions} ref={ref} />
      </label>
    )

  }
);
