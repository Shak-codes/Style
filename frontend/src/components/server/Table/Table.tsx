import React from "react";
import styles from "./styles.module.scss";

type Column = {
  header: string;
  type: "badge" | "list" | "text" | "choice" | "status" | "date" | "bool";
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

  const renderStatus = (status: string) => {
    let color = "#28a745";
    switch (status) {
      case "Upcoming":
        color = "#007bff";
        break;
      case "No-show":
        color = "#dc3545";
        break;
      case "Cancelled":
        color = "#ffc107";
        break;
    }

    return (
      <div className={styles.statusContainer}>
        <div
          className={styles.status}
          style={{ backgroundColor: color, border: `1px solid ${color}` }}
        >
          <p className={styles.text}>{status}</p>
        </div>
      </div>
    );
  };

  const renderDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return <p className={styles.text}>{formatted}</p>;
  };

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

  const renderBool = (flag: boolean) => (
    <p className={styles.text}>{flag ? "True" : "False"}</p>
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
                      <td key={cIdx} className={styles.rowElement}>
                        {renderBadges(cellData)}
                      </td>
                    );

                  case "choice":
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {renderChoices(cellData)}
                      </td>
                    );

                  case "status":
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {renderStatus(cellData)}
                      </td>
                    );

                  case "list":
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {Array.isArray(cellData)
                          ? renderList(cellData)
                          : renderText(String(cellData))}
                      </td>
                    );

                  case "bool":
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {renderBool(cellData)}
                      </td>
                    );

                  case "date":
                    return (
                      <td key={cIdx} className={styles.rowElement}>
                        {renderDate(cellData)}
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
