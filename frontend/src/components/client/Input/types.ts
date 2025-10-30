export interface BaseProps {
  id: string;
  label: string;
}

export interface RadioProps extends BaseProps {
  type: "radio";
  onClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  checked: boolean;
}

export interface TextProps extends BaseProps {
  type: "text";
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface PasswordProps extends BaseProps {
  type: "password";
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface NumberProps extends BaseProps {
  type: "number";
  value: number | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface DateProps extends BaseProps {
  type: "date";
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export type InputProps =
  | RadioProps
  | TextProps
  | PasswordProps
  | NumberProps
  | DateProps;
