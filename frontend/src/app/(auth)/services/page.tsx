"use client";

import { SERVICES } from "../tableData";
import styles from "./styles.module.scss";
import { NavButton, Table } from "@/components/server";
import { Filter } from "@/components/client";
import { FilterProps } from "@/components/client/Filter/types";
import { useState } from "react";

const columns = [
  { header: "Name", type: "text" },
  { header: "Category", type: "badge" },
  { header: "Cost", type: "text" },
] as const;

const serviceData = SERVICES.map((service) => [
  service.name,
  service.category,
  service.cost === -1 ? "Variable" : `$${service.cost}`,
]);

const Services = () => {
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
      label: "Category",
      property: "category",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(1, operator, value),
    },
    {
      label: "Cost",
      property: "cost",
      type: "number",
      value: null,
      operator: null,
      onChange: (operator, value) => updateValue(2, operator, value),
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
      <h1>Your Services</h1>
      <p>Create, modify, and keep track of your current services.</p>
      <section className={styles.tableHeader}>
        <Filter filters={filters} />
      </section>
      <Table columns={columns} data={serviceData} />
      <NavButton href="/services/new" text="Add Service" />
    </section>
  );
};

export default Services;
