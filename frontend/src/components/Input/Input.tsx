import React, { useState } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  id: string;
  value: string;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: "text" | "password";
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  onFocus,
  onChange,
  label,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputContainer}>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        id={id}
        className={`${styles.roundedInput} ${value ? styles.active : ""}`}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`${styles.inputLabel} ${value ? styles.active : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
