import Button from "../Button/Button";
import Input from "../Input/Input";

type FormField<Id extends string = string> = {
  id: Id;
  label: string;
  value: string;
};

type FormProps<Id extends string = string> = {
  title: string;
  fields: FormField<Id>[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (id: Id, value: string) => void;
};

const Form = <Id extends string>({
  title,
  fields,
  onSubmit,
  onChange,
}: FormProps<Id>) => {
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        {fields.map(({ id, label, value }) => {
          return (
            <Input
              key={id}
              id={id}
              label={label}
              value={value}
              onChange={(e) => onChange(id, e.target.value)}
            />
          );
        })}
        <Button text="Submit" />
      </form>
    </>
  );
};

export default Form;
