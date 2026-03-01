import { useState } from "react";
import BaseInput from "./BaseInput";
import styles from "./styles.module.scss";
import ShowPassword from "@/icons/ShowPassword";

export type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder = "",
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <BaseInput
      id={id}
      label={label}
      active={value !== ""}
      disabled={disabled}
      required={required}
    >
      <div className={styles.passwordWrapper}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.roundedInput}
        />
        <button
          type="button"
          role="button"
          tabIndex={-1}
          className={styles.show}
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          <ShowPassword />
        </button>
      </div>
    </BaseInput>
  );
};

export default PasswordInput;
