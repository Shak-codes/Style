import { ChangeEvent, useState } from "react";
import { FilterTypes, FilterDetails } from "./types";
import styles from "./styles.module.scss";
import Input from "../Input/Input";
import { SEArrow } from "@/icons";

const getFilters = (type: FilterTypes): any[] => {
  switch (type) {
    case "text":
      return [
        { key: "is", label: "is" },
        { key: "is_not", label: "is not" },
        { key: "contains", label: "contains" },
      ];
    case "number":
      return [
        { key: "gte", label: "is greater than" },
        { key: "lte", label: "is less than" },
        { key: "range", label: "is between" },
      ];
    case "date":
      return [
        { key: "is", label: "is" },
        { key: "before", label: "before" },
        { key: "after", label: "after" },
        { key: "range", label: "is between" },
        { key: "past_x_days", label: "past X days" },
        { key: "next_x_days", label: "next X days" },
      ];
    case "radio":
      return [
        { key: "true", label: "is true" },
        { key: "false", label: "is false" },
      ];
    default:
      return [];
  }
};

const RenderFilters: React.FC<FilterDetails> = (props) => {
  const { type, property, value, onChange, onClick } = props;
  const filters = getFilters(type);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <form className={styles.filterForm}>
      {filters.map(({ key, label: opLabel }) => {
        const isSelected = selected === key;

        return (
          <div className={styles.operatorRow} key={key}>
            <div className={styles.operatorContainer}>
              <Input
                type="radio"
                id={`${property}-${key}-radio`}
                checked={isSelected}
                onClick={() => setSelected(isSelected ? null : key)}
                label={opLabel}
              />
            </div>

            {isSelected && type !== "radio" && (
              <section className={styles.dropdownContainer}>
                <SEArrow width={32} height={32} />

                {type === "text" && (
                  <Input
                    id={`${property}-${key}-text`}
                    type="text"
                    value={String(value ?? "")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChange?.(opLabel, e.target.value)
                    }
                    label=""
                  />
                )}

                {type === "number" && (
                  <Input
                    id={`${property}-${key}-number`}
                    type="number"
                    value={typeof value === "number" ? value : null}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const raw = e.target.value;
                      const parsed = raw === "" ? null : Number(raw);
                      onChange?.(opLabel, Number.isNaN(parsed) ? null : parsed);
                    }}
                    label=""
                  />
                )}

                {type === "date" && (
                  <Input
                    id={`${property}-${key}-date`}
                    type="date"
                    value={String(value ?? "")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChange?.(opLabel, e.target.value)
                    }
                    label=""
                  />
                )}
              </section>
            )}
          </div>
        );
      })}
    </form>
  );
};

export default RenderFilters;
