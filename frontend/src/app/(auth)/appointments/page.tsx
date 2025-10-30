import { NavButton, Table } from "@/components/server";
import { APPOINTMENTS } from "../tableData";
import styles from "./styles.module.scss";

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
  return (
    <section className={styles.container}>
      <h1>Your Appointments</h1>
      <p>See every past and future appointment</p>
      <section className={styles.tableHeader}>
        <NavButton href="/appointments/new" text="Add Appointment" />
      </section>
      <Table columns={columns} data={appointmentData} />
    </section>
  );
};

export default Appointments;
