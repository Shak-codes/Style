import BaseInput from "./BaseInput";
import styles from "./styles.module.scss";

export type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

const TextInput = ({ id, label, value, onChange }: TextInputProps) => {
  return (
    <BaseInput id={id} label={label} active={!!value}>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={styles.roundedInput}
      />
    </BaseInput>
  );
};

export default TextInput;
