import Table from "@/components/server/Table/Table";
import { SERVICES } from "../tableData";
import styles from "./styles.module.scss";

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
  return (
    <section className={styles.container}>
      <h1>Your Services</h1>
      <p>Create, modify, and keep track of your current services.</p>
      <Table columns={columns} data={serviceData} />
    </section>
  );
};

export default Services;
