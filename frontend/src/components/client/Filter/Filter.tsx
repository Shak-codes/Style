"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

type Filter = {
  property: string;
  type: "text" | "range" | "sort";
  placeholder: string;
};

type FilterProps = {
  data?: any;
  filters: Filter[];
};

const Filter = ({ data, filters }: FilterProps) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (property: string, newValue: string) => {
    setValues((prev) => ({ ...prev, [property]: newValue }));
  };

  return (
    <section className={styles.container}>
      {filters.map(({ property, type, placeholder }) => {
        const value = values[property] ?? "";

        switch (type) {
          case "text":
            return (
              <div
                key={property}
                className={`${styles.filterRow} ${value ? styles.active : ""}`}
              >
                <label htmlFor={property} className={styles.label}>
                  {placeholder}
                </label>
                <input
                  id={property}
                  type="text"
                  className={styles.textFilter}
                  value={value}
                  onChange={(e) => handleChange(property, e.target.value)}
                />
              </div>
            );

          case "range":
            return (
              <div key={property} className={styles.filterRow}>
                <label htmlFor={property}>{property}</label>
                <input id={property} type="range" min={0} max={100} />
              </div>
            );

          case "sort":
            return (
              <div
                key={property}
                className={`${styles.filterRow} ${value ? styles.active : ""}`}
              >
                <label htmlFor={property} className={styles.label}>
                  {placeholder}
                </label>
                <select
                  id={property}
                  defaultValue=""
                  className={styles.selectFilter}
                >
                  <option value="" disabled hidden></option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            );

          default:
            return null;
        }
      })}
    </section>
  );
};

export default Filter;
