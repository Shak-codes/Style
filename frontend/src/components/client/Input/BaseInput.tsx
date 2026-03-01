import styles from "./styles.module.scss";

export type BaseInputProps = {
  id: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
};

const BaseInput = ({
  id,
  label,
  active,
  children,
  disabled = false,
  required = false,
}: BaseInputProps) => {
  return (
    <div
      className={`${styles.inputContainer} ${disabled ? styles.disabled : ""}`}
    >
      {children}

      <label
        htmlFor={id}
        className={`${styles.inputLabel} ${active ? styles.active : ""}`}
      >
        {label}
        {required && <span className={styles.requiredMarker}>*</span>}
      </label>
    </div>
  );
};

export default BaseInput;
