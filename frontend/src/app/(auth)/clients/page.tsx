import styles from "./styles.module.scss";
import { CLIENTS } from "../tableData";
import Table from "@/components/server/Table/Table";

const columns = [
  { header: "Name", type: "text" },
  { header: "Hair Profile", type: "choice" },
  { header: "Notes", type: "text" },
  { header: "Visits", type: "text" },
  { header: "Total Spend", type: "text" },
  { header: "Average Spend", type: "text" },
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
  return (
    <section className={styles.container}>
      <h1>Your Clients</h1>
      <p>All your clientele in one place</p>
      <Table columns={columns} data={clientele} />
    </section>
  );
};

export default Clients;
