import { Appointment, Categories, Clients, Services } from "./types";

export const CLIENTS: Clients = [
  {
    id: 1,
    name: "Shakir Rahmadingdong",
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
    category: [
      { name: "Cutting", color: "#28a745" },
      { name: "Styling", color: "#007bff" },
    ],
    cost: 35,
  },
  {
    id: 2,
    name: "Base Color",
    category: [{ name: "Color", color: "#dc3545" }],
    cost: -1,
  },
  {
    id: 3,
    name: "Beard Trim",
    category: [{ name: "Cutting", color: "#28a745" }],
    cost: 15,
  },
  {
    id: 4,
    name: "Full Foils",
    category: [{ name: "Color", color: "#dc3545" }],
    cost: -1,
  },
];

export const APPOINTMENTS: Appointment[] = [
  // --- Shakir (5 total) ---
  {
    id: 1,
    client: "Shakir Rahman",
    service: { name: "Men's cut and style", cost: 35 }, // fixed cost
    status: "Completed",
    start: "2025-06-15T14:00:00-04:00",
    length: 45,
    ends_at: "2025-06-15T14:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Shampoo", cost: 20 }],
  },
  {
    id: 5,
    client: "Shakir Rahman",
    service: { name: "Beard Trim", cost: 15 }, // variable cost (custom)
    status: "Completed",
    start: "2025-08-10T16:30:00-04:00",
    length: 15,
    ends_at: "2025-08-10T16:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Mattifying Gel", cost: 20 }],
  },
  {
    id: 6,
    client: "Shakir Rahman",
    service: { name: "Men's cut and style", cost: 35 }, // fixed cost
    status: "Cancelled",
    start: "2025-09-05T13:00:00-04:00",
    length: 45,
    ends_at: "2025-09-05T13:45:00-04:00",
    isPrebook: true,
    history: [
      {
        type: "Rescheduled",
        from: "2025-09-03T13:00:00-04:00",
        to: "2025-09-05T13:00:00-04:00",
        by: "client",
      },
      {
        type: "Cancelled",
        at: "2025-09-04T18:00:00-04:00",
        by: "client",
      },
    ],
    products: [],
  },
  {
    id: 9,
    client: "Shakir Rahman",
    service: { name: "Men's cut and style", cost: 35 },
    status: "Upcoming",
    start: "2025-11-02T15:00:00-05:00",
    length: 45,
    ends_at: "2025-11-02T15:45:00-05:00",
    isPrebook: true,
    history: [
      {
        type: "Rescheduled",
        from: "2025-10-30T15:00:00-04:00",
        to: "2025-11-02T15:00:00-05:00",
        by: "stylist",
      },
    ],
    products: [],
  },
  {
    id: 11,
    client: "Shakir Rahman",
    service: { name: "Beard Trim", cost: 15 }, // variable cost example
    status: "No-show",
    start: "2025-09-20T17:00:00-04:00",
    length: 15,
    ends_at: "2025-09-20T17:15:00-04:00",
    isPrebook: false,
    history: [],
    products: [],
  },

  // --- Aiden (2 total) ---
  {
    id: 2,
    client: "Aiden Chen",
    service: { name: "Men's cut and style", cost: 35 },
    status: "Completed",
    start: "2025-08-01T09:30:00-04:00",
    length: 45,
    ends_at: "2025-08-01T10:15:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Pomade", cost: 22 }],
  },
  {
    id: 7,
    client: "Aiden Chen",
    service: { name: "Beard Trim", cost: 15 },
    status: "Completed",
    start: "2025-09-12T18:00:00-04:00",
    length: 15,
    ends_at: "2025-09-12T18:15:00-04:00",
    isPrebook: true,
    history: [
      {
        type: "Rescheduled",
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
    client: "Maria Santos",
    service: { name: "Full Foils", cost: 120 },
    status: "Completed",
    start: "2025-08-25T10:30:00-04:00",
    length: 180,
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
    client: "Maria Santos",
    service: { name: "Men's cut and style", cost: 15 },
    status: "No-show",
    start: "2025-10-01T12:00:00-04:00",
    length: 45,
    ends_at: "2025-10-01T12:45:00-04:00",
    isPrebook: false,
    history: [],
    products: [],
  },

  // --- Jasmine (2 total) ---
  {
    id: 3,
    client: "Jasmine Lam",
    service: { name: "Base Color", cost: 120 },
    status: "Completed",
    start: "2025-07-22T11:00:00-04:00",
    length: 120,
    ends_at: "2025-07-22T13:00:00-04:00",
    isPrebook: false,
    history: [],
    products: [{ name: "Conditioner", cost: 18 }],
  },
  {
    id: 10,
    client: "Jasmine Lam",
    service: { name: "Full Foils", cost: 110 },
    status: "Upcoming",
    start: "2025-12-05T10:00:00-05:00",
    length: 180,
    ends_at: "2025-12-05T13:00:00-05:00",
    isPrebook: true,
    history: [
      {
        type: "Rescheduled",
        from: "2025-11-26T10:00:00-05:00",
        to: "2025-12-05T10:00:00-05:00",
        by: "stylist",
      },
    ],
    products: [],
  },
];
