import { useState } from "react";
import styles from "./styles.module.scss";

type ButtonState = "idle" | "loading" | "loadingFade" | "success" | "failure";

type ClickResult = {
  error?: boolean;
  [key: string]: any;
};

type ButtonProps = {
  variant?: "normal" | "radio";
  size?: "small" | "medium" | "large";
  selected?: boolean;
  text: string;
  onClick?: () => Promise<ClickResult>;
  onError?: (result: ClickResult) => Promise<void> | void;
  onSuccess?: (result: ClickResult) => Promise<void> | void;
  animated?: boolean;
  disabled?: boolean;
};

const Button = ({
  variant = "normal",
  size = "medium",
  selected = false,
  text,
  onClick,
  onError = async () => {},
  onSuccess = async () => {},
  animated = false,
  disabled = false,
}: ButtonProps) => {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (!onClick) return;

    if (!animated) {
      const result = await onClick();
      if (result.error && onError) {
        await onError(result);
        return;
      }
      if (onSuccess) await onSuccess(result);
      setState("idle");
      return;
    }

    setState("loading");
    const result = await onClick();

    setState("loadingFade");
    await new Promise((r) => setTimeout(r, 750));

    if (result.error) {
      setState("failure");
      if (onError) await onError(result);
      await new Promise((r) => setTimeout(r, 1500));
      setState("idle");
      return;
    }

    setState("success");
    await new Promise((r) => setTimeout(r, 1500));

    setState("idle");
    if (onSuccess) await onSuccess(result);
  };

  const ButtonClasses = (currentState: ButtonState) => {
    const baseClass =
      variant === "radio" && selected
        ? `${styles.button} ${styles.selected} ${styles[size]}`
        : `${styles.button} ${styles[size]}`;

    switch (currentState) {
      case "loading":
        return `${baseClass} ${styles.loading}`;
      case "loadingFade":
        return `${baseClass} ${styles.loading} ${styles.fadeOut}`;
      case "success":
        return `${baseClass} ${styles.success}`;
      case "failure":
        return `${baseClass} ${styles.failure}`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={ButtonClasses(state)}
      disabled={disabled || state !== "idle"}
    >
      <div className={styles.buttonContent}>{text}</div>
      {(state === "loading" || state === "loadingFade") && (
        <div className={styles.loadingIcon}></div>
      )}
      {state === "success" && <div className={styles.checkmark}>✓</div>}
      {state === "failure" && <div className={styles.cross}>X</div>}
    </button>
  );
};

export default Button;
