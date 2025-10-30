import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  InputProps,
  DateProps,
  TextProps,
  NumberProps,
  PasswordProps,
} from "./types";

const Input: React.FC<InputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  if (props.type === "radio") {
    const { id, label, checked, onClick } = props;
    return (
      <div
        className={`${styles.radioContainer} ${checked ? styles.checked : ""}`}
        role="radio"
        aria-checked={checked}
        onClick={onClick}
      >
        <label htmlFor={id} className={styles.radioLabel}>
          <span className={styles.radioText}>{label}</span>
          <div
            className={`${styles.radioSelect} ${checked ? styles.checked : ""}`}
          />
        </label>
      </div>
    );
  }
  const { id, label, value, onChange } = props as
    | TextProps
    | PasswordProps
    | NumberProps
    | DateProps;

  const renderType =
    props.type === "password"
      ? showPassword
        ? "text"
        : "password"
      : props.type;

  const activeClass = value ? styles.active : "";

  return (
    <div className={styles.inputContainer}>
      <input
        id={id}
        type={renderType}
        className={`${styles.roundedInput} ${activeClass}`}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className={`${styles.inputLabel} ${activeClass}`}>
        {label}
      </label>

      {props.type === "password" && (
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;
