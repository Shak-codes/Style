"use client";
import styles from "./styles.module.scss";

type StaticButtonProps = {
  text: string;
  onClick: () => void;
  onSuccess?: () => void;
  variant?: "normal" | "radio";
  size?: "small" | "medium" | "large";
  selected?: boolean;
  disabled?: boolean;
};

const StaticButton = ({
  variant = "normal",
  size = "medium",
  selected = false,
  text,
  onClick,
  disabled = false,
}: StaticButtonProps) => {
  const style =
    variant === "radio" && selected
      ? `${styles.button} ${styles.selected} ${styles[size]}`
      : `${styles.button} ${styles[size]}`;

  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      <div className={styles.buttonContent}>{text}</div>
    </button>
  );
};

export default StaticButton;
