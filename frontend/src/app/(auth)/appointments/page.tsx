"use client";
import { NavButton, Table } from "@/components/server";
import { APPOINTMENTS } from "../tableData";
import { useState } from "react";
import { FilterProps } from "@/components/client/Filter/types";
import styles from "./styles.module.scss";
import { Filter, StaticButton } from "@/components/client";

const columns = [
  { header: "Client", type: "text" },
  { header: "Service", type: "text" },
  { header: "Price", type: "text" },
  { header: "Status", type: "status" },
  { header: "Date", type: "date" },
  { header: "Duration", type: "text" },
  { header: "Prebook?", type: "bool" },
] as const;

const appointmentData = APPOINTMENTS.map((appointment) => [
  appointment.client,
  appointment.service.name,
  appointment.service.cost,
  appointment.status,
  appointment.start,
  appointment.length,
  appointment.isPrebook,
]);

const Appointments = () => {
  const [filters, setFilters] = useState<FilterProps>([
    {
      label: "Client",
      property: "client",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(0, operator, value),
    },
    {
      label: "Service",
      property: "service",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(1, operator, value),
    },
    {
      label: "Price",
      property: "price",
      type: "number",
      value: null,
      operator: null,
      onChange: (operator, value) => updateValue(2, operator, value),
    },
    {
      label: "Status",
      property: "status",
      type: "text",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(3, operator, value),
    },
    {
      label: "Date",
      property: "date",
      type: "date",
      value: "",
      operator: null,
      onChange: (operator, value) => updateValue(4, operator, value),
    },
    {
      label: "Duration",
      property: "duration",
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
      <h1>Your Appointments</h1>
      <p>See every past and future appointment</p>
      <section className={styles.filterHeader}>
        <Filter filters={filters} />
      </section>
      <section className={styles.tableHeader}>
        <NavButton href="/appointments/calendar" text="Calendar View" />
        <NavButton href="/appointments/new" text="Add Appointment" />
      </section>
      <Table columns={columns} data={appointmentData} />
    </section>
  );
};

export default Appointments;
