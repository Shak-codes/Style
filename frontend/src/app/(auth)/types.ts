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
  type: "reschedule";
  from: string;
  to: string;
  by: string;
}

export interface CancelledHistory {
  type: "cancelled";
  at: string;
  by: string;
}

export type AppointmentHistoryEntry = RescheduleHistory | CancelledHistory;

export interface AppointmentServiceRef {
  id: number;
  cost?: number;
}

export type AppointmentStatus =
  | "completed"
  | "cancelled"
  | "upcoming"
  | "no-show";

export interface Appointment {
  id: number;
  client: number;
  service: AppointmentServiceRef;
  status: AppointmentStatus;
  start: string;
  length_min: number;
  ends_at: string;
  isPrebook: boolean;
  history: AppointmentHistoryEntry[];
  products: AppointmentProduct[];
}

export type Clients = Client[];
export type Categories = Category[];
export type Services = Service[];
export type Appointments = Appointment[];
