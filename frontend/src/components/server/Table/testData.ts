import { Appointment, Categories, Clients, Services } from "./types";

export const CLIENTS: Clients = [
  {
    id: 1,
    name: "Shakir Rahman",
    notes: "Fluffy hair",
    hair_profile: [],
    visits: 5,
    spending: { total: 812, avg: 162.4 },
    products: [
      { name: "Shampoo", cost: 20, appointmentId: 1 },
      { name: "Mattifying Gel", cost: 20, appointmentId: 5 },
    ],
    appointments: [1, 5, 6, 9, 11],
  },
  {
    id: 2,
    name: "Jasmine Lam",
    notes: "Sensitive scalp, prefers warm tones.",
    hair_profile: ["Medium length", "Layered"],
    visits: 2,
    spending: { total: 625, avg: 312.5 },
    products: [{ name: "Conditioner", cost: 18, appointmentId: 3 }],
    appointments: [3, 10],
  },
  {
    id: 3,
    name: "Aiden Chen",
    notes: "Prefers low-maintenance styles. Uses matte finish products.",
    hair_profile: ["Thick straight hair."],
    visits: 2,
    spending: { total: 240, avg: 120 },
    products: [
      { name: "Pomade", cost: 22, appointmentId: 2 },
      { name: "Texturizing Spray", cost: 18, appointmentId: 7 },
    ],
    appointments: [2, 7],
  },
  {
    id: 4,
    name: "Maria Santos",
    notes: "Highlights every 3 months. Likes soft curls.",
    hair_profile: ["Curly hair", "Shoulder length"],
    visits: 2,
    spending: { total: 520, avg: 260 },
    products: [
      { name: "Curl Cream", cost: 24, appointmentId: 4 },
      { name: "Leave-in Conditioner", cost: 19, appointmentId: 4 },
    ],
    appointments: [4, 8],
  },
];

export const CATEGORIES: Categories = [
  { name: "Cutting", color: "#28a745" },
  { name: "Styling", color: "#007bff" },
  { name: "Color", color: "#dc3545" },
  { name: "Treament", color: "#ffc107" },
];

export const SERVICES: Services = [
  {
    id: 1,
    name: "Men's cut and style",
    category: ["Cutting", "Styling"],
    cost: 35,
  },
  { id: 2, name: "Base Color", category: ["Color"], cost: -1 },
  { id: 3, name: "Beard Trim", category: ["Cutting"], cost: 15 },
  { id: 4, name: "Full Foils", category: ["Color"], cost: -1 },
];

export const APPOINTMENTS: Appointment[] = [
  // --- Shakir (5 total) ---
  {
    id: 1,
    client: 1,
    service: { id: 1 }, // fixed cost
    status: "completed",
    start: "2025-06-15T14:00:00-04:00",
    length_min: 45,
    ends_at: "2025-06-15T14:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Shampoo", cost: 20 }],
  },
  {
    id: 5,
    client: 1,
    service: { id: 3, cost: 85 }, // variable cost (custom)
    status: "completed",
    start: "2025-08-10T16:30:00-04:00",
    length_min: 15,
    ends_at: "2025-08-10T16:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Mattifying Gel", cost: 20 }],
  },
  {
    id: 6,
    client: 1,
    service: { id: 1 }, // fixed cost
    status: "cancelled",
    start: "2025-09-05T13:00:00-04:00",
    length_min: 45,
    ends_at: "2025-09-05T13:45:00-04:00",
    isPrebook: true,
    history: [
      {
        type: "reschedule",
        from: "2025-09-03T13:00:00-04:00",
        to: "2025-09-05T13:00:00-04:00",
        by: "client",
      },
      {
        type: "cancelled",
        at: "2025-09-04T18:00:00-04:00",
        by: "client",
      },
    ],
    products: [],
  },
  {
    id: 9,
    client: 1,
    service: { id: 1 },
    status: "upcoming",
    start: "2025-11-02T15:00:00-05:00",
    length_min: 45,
    ends_at: "2025-11-02T15:45:00-05:00",
    isPrebook: true,
    history: [
      {
        type: "reschedule",
        from: "2025-10-30T15:00:00-04:00",
        to: "2025-11-02T15:00:00-05:00",
        by: "stylist",
      },
    ],
    products: [],
  },
  {
    id: 11,
    client: 1,
    service: { id: 3, cost: 90 }, // variable cost example
    status: "no-show",
    start: "2025-09-20T17:00:00-04:00",
    length_min: 15,
    ends_at: "2025-09-20T17:15:00-04:00",
    isPrebook: false,
    history: [],
    products: [],
  },

  // --- Aiden (2 total) ---
  {
    id: 2,
    client: 3,
    service: { id: 1 },
    status: "completed",
    start: "2025-08-01T09:30:00-04:00",
    length_min: 45,
    ends_at: "2025-08-01T10:15:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Pomade", cost: 22 }],
  },
  {
    id: 7,
    client: 3,
    service: { id: 3, cost: 80 },
    status: "completed",
    start: "2025-09-12T18:00:00-04:00",
    length_min: 15,
    ends_at: "2025-09-12T18:15:00-04:00",
    isPrebook: true,
    history: [
      {
        type: "reschedule",
        from: "2025-09-10T18:00:00-04:00",
        to: "2025-09-12T18:00:00-04:00",
        by: "client",
      },
    ],
    products: [{ name: "Texturizing Spray", cost: 18 }],
  },

  // --- Maria (2 total) ---
  {
    id: 4,
    client: 4,
    service: { id: 4, cost: 120 },
    status: "completed",
    start: "2025-08-25T10:30:00-04:00",
    length_min: 180,
    ends_at: "2025-08-25T13:30:00-04:00",
    isPrebook: true,
    history: [],
    products: [
      { name: "Curl Cream", cost: 24 },
      { name: "Leave-in Conditioner", cost: 19 },
    ],
  },
  {
    id: 8,
    client: 4,
    service: { id: 1 },
    status: "no-show",
    start: "2025-10-01T12:00:00-04:00",
    length_min: 45,
    ends_at: "2025-10-01T12:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [],
  },

  // --- Jasmine (2 total) ---
  {
    id: 3,
    client: 2,
    service: { id: 2 },
    status: "completed",
    start: "2025-07-22T11:00:00-04:00",
    length_min: 120,
    ends_at: "2025-07-22T13:00:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Conditioner", cost: 18 }],
  },
  {
    id: 10,
    client: 2,
    service: { id: 4, cost: 110 },
    status: "upcoming",
    start: "2025-12-05T10:00:00-05:00",
    length_min: 180,
    ends_at: "2025-12-05T13:00:00-05:00",
    isPrebook: true,
    history: [
      {
        type: "reschedule",
        from: "2025-11-26T10:00:00-05:00",
        to: "2025-12-05T10:00:00-05:00",
        by: "stylist",
      },
    ],
    products: [],
  },
];
