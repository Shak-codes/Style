"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { Filter as FilterIcon, ArrowRight } from "@/icons";
import { FilterDetails } from "./types";
import RenderFilters from "./utils";

type FilterProps = { filters: FilterDetails[] };

const Filter = ({ filters }: FilterProps) => {
  console.log("filters", filters);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        setOpen(false);
        setSelectedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.filtersHeader}>
        <FilterIcon width={32} height={32} className={styles.filterIcon} />
        <h3>Filters</h3>
      </section>

      <section className={styles.parameterContainer}>
        <button className={styles.addFilter} onClick={() => setOpen(!open)}>
          Add +
        </button>

        {filters.map(({ operator, label, property, value }) => {
          if (operator && value)
            return (
              <div key={property} className={styles.filterDisplay}>
                <span>{label} </span>
                <span>{operator} </span>
                <span>{String(value).toLowerCase()}</span>
              </div>
            );
        })}

        <section className={styles.filterContainer} ref={ref}>
          {open && (
            <section className={styles.parameterSelect}>
              {filters.map(({ label, property }, idx) => {
                return (
                  <div
                    key={property}
                    role="option"
                    className={`${styles.parameterOption} ${
                      selectedIndex === idx ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <p className={styles.parameter}>{label}</p>
                    <ArrowRight width={24} height={24} />
                  </div>
                );
              })}
            </section>
          )}

          {selectedIndex !== null && filters[selectedIndex] && (
            <RenderFilters {...filters[selectedIndex]} />
          )}
        </section>
      </section>
    </section>
  );
};

export default Filter;
