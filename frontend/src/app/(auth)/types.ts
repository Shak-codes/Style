export type Category = {
  name: string;
  color: string;
};

export interface Spending {
  total: number;
  avg: number;
}

export interface ClientProduct {
  name: string;
  cost: number;
  appointmentId: number;
}

export interface Client {
  id: number;
  name: string;
  notes: string;
  hair_profile: string[];
  visits: number;
  spending: Spending;
  products: ClientProduct[];
  appointments: number[];
}

export interface Service {
  id: number;
  name: string;
  category: Category[];
  cost: number;
}

export interface AppointmentProduct {
  name: string;
  cost: number;
}

export interface RescheduleHistory {
  type: "Rescheduled";
  from: string;
  to: string;
  by: string;
}

export interface CancelledHistory {
  type: "Cancelled";
  at: string;
  by: string;
}

export type AppointmentHistoryEntry = RescheduleHistory | CancelledHistory;

export interface AppointmentServiceRef {
  name: string;
  cost: number;
}

export type AppointmentStatus =
  | "Completed"
  | "Cancelled"
  | "Upcoming"
  | "No-show";

export interface Appointment {
  id: number;
  client: string;
  service: AppointmentServiceRef;
  status: AppointmentStatus;
  start: string;
  length: number;
  ends_at: string;
  isPrebook: boolean;
  history: AppointmentHistoryEntry[];
  products: AppointmentProduct[];
}

export type Clients = Client[];
export type Categories = Category[];
export type Services = Service[];
export type Appointments = Appointment[];
