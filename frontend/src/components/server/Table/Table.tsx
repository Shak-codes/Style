import React from "react";
import styles from "./styles.module.scss";

type Column = {
  header: string;
  type: "badge" | "list" | "text" | "choice";
};

type TableProps<T> = {
  columns: Column[];
  data: T[];
  rowKey?: (row: T, idx: number) => string | number;
};

const Table = <T extends any[]>({ columns, data, rowKey }: TableProps<T>) => {
  const renderBadges = (badges: { name: string; color: string }[]) => (
    <div className={styles.badgeContainer}>
      {badges.map(({ name, color }, i) => (
        <div
          key={i}
          className={styles.badge}
          style={{ backgroundColor: color, border: `1px solid ${color}` }}
        >
          <p className={styles.text}>{name}</p>
        </div>
      ))}
    </div>
  );

  const renderChoices = (choices: string[]) => (
    <div className={styles.choiceContainer}>
      {choices.map((choice, i) => (
        <div key={i} className={styles.choice}>
          <p className={styles.text}>{choice.replace(/\./g, "")}</p>
        </div>
      ))}
    </div>
  );

  const renderText = (text: string) => (
    <div className={styles.badgeContainer}>
      <p className={styles.text}>{text}</p>
    </div>
  );

  const renderList = (items: string[]) => (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={i} className={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={styles.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rIdx) => (
            <tr
              key={rowKey ? rowKey(row, rIdx) : rIdx}
              className={styles.row}
              title="Click for detailed insights."
            >
              {columns.map((col, cIdx) => {
                const cellData = row[cIdx];

                switch (col.type) {
                  case "badge":
                    return (
                      <td key={cIdx} className={styles.row}>
                        {renderBadges(cellData)}
                      </td>
                    );

                  case "choice":
                    return (
                      <td key={cIdx} className={styles.row}>
                        {renderChoices(cellData)}
                      </td>
                    );

                  case "list":
                    return (
                      <td key={cIdx}>
                        {Array.isArray(cellData)
                          ? renderList(cellData)
                          : renderText(String(cellData))}
                      </td>
                    );

                  case "text":
                  default:
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {renderText(String(cellData ?? ""))}
                      </td>
                    );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
