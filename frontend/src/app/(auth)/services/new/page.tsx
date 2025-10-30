"use client";

import { Form } from "@/components/client";
import styles from "./styles.module.scss";
import { useState } from "react";
import { FormField } from "@/components/client/Form/Form";
import { CATEGORIES } from "../../tableData";

type Fields = {
  name: string;
  category: string[];
  cost: number;
};

const NewClient = () => {
  const [fields, setFields] = useState<Fields>({
    name: "",
    category: [],
    cost: 0,
  });

  const handleChange = (
    id: keyof Fields,
    value: string | number | string[]
  ) => {
    setFields((prev) => ({
      ...prev,
      [id]: value as any,
    }));
  };

  const inputFields: FormField<keyof Fields>[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
      value: fields.name,
    },
    {
      id: "category",
      label: "Category",
      type: "tag",
      value: fields.category,
      suggestions: CATEGORIES,
    },
    {
      id: "cost",
      label: "Cost",
      type: "number",
      value: fields.cost,
    },
  ];

  const handleAddService = () => {
    return;
  };

  return (
    <section className={styles.container}>
      <Form
        title="Add a new service!"
        onChange={handleChange}
        fields={inputFields}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddService();
        }}
      />
    </section>
  );
};

export default NewClient;
