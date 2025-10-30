"use client";

import styles from "./styles.module.scss";
import { CLIENTS } from "../tableData";
import Table from "@/components/server/Table/Table";
import { Filter } from "@/components/client";
import { useState } from "react";
import { FilterProps } from "@/components/client/Filter/types";

const columns = [
  { header: "Name", type: "text" },
  { header: "Hair Profile", type: "choice" },
  { header: "Notes", type: "text" },
  { header: "Visits", type: "text" },
  { header: "Total Expenditure", type: "text" },
  { header: "Average Expenditure", type: "text" },
] as const;

const clientele = CLIENTS.map((client) => [
  client.name,
  client.hair_profile,
  client.notes,
  client.visits,
  `$${client.spending.total}`,
  `$${client.spending.avg}`,
]);

const Clients = () => {
  const [filters, setFilters] = useState<FilterProps>([
    {
      label: "Name",
      property: "name",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(0, operator, value),
    },
    {
      label: "Hair Profile",
      property: "hair_profile",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(1, operator, value),
    },
    {
      label: "Notes",
      property: "notes",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(2, operator, value),
    },
    {
      label: "Visits",
      property: "visits",
      type: "number",
      value: null,
      operator: null,
      onChange: (operator, value) => updateValue(3, operator, value),
    },
    {
      label: "Total Expenditure",
      property: "spending_total",
      type: "number",
      value: null,
      operator: null,
      onChange: (operator, value) => updateValue(4, operator, value),
    },
    {
      label: "Average Expenditure",
      property: "spending_avg",
      type: "number",
      value: null,
      operator: null,
      onChange: (operator, value) => updateValue(5, operator, value),
    },
  ]);

  const updateValue = (
    index: number,
    operator: string | null,
    value: string | number | number[] | null
  ) => {
    setFilters((prev) => {
      const updatedFilters = [...prev];
      updatedFilters[index] = {
        ...updatedFilters[index],
        operator,
        value,
      };
      return updatedFilters;
    });
  };

  return (
    <section className={styles.container}>
      <h1>Your Clients</h1>
      <p>All your clientele in one place</p>
      <Filter filters={filters} />
      <Table columns={columns} data={clientele} />
    </section>
  );
};

export default Clients;
