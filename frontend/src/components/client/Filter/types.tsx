export type FilterTypes = "radio" | "text" | "number" | "date" | "password";

export type FilterDetails = {
  label: string;
  property: string;
  type: FilterTypes;
  value: string | number | number[] | null;
  operator: string | null;
  onChange?: (
    operator: string | null,
    newValue: string | number | number[] | null
  ) => void;
  onClick?: () => void;
};

export type FilterProps = FilterDetails[];
