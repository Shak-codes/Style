"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { assignColumns, Assigned, sortByDate } from "./utils";

type ViewMode = "day" | "week" | "month";

type Appointment = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

type TimetableProps = {
  appointments: Appointment[];
  onMove?: (id: number, newStart: Date, newEnd: Date) => void;
};

const SLOTS_PER_HOUR = 1;
const HOURS = 12;
const SLOT_MINUTES = 60 / SLOTS_PER_HOUR;
const VISIBLE_ROWS = 6;

const Timetable = ({ appointments, onMove }: TimetableProps) => {
  const sortedAppointments = sortByDate(appointments, "start");
  const appointmentData = assignColumns(sortedAppointments);
  console.log(appointmentData);
  const [view, setView] = useState<ViewMode>("week");
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const days = Array.from(
    { length: view === "day" ? 1 : view === "week" ? 7 : 30 },
    (_, i) => i
  );

  const totalSlots = HOURS * SLOTS_PER_HOUR;

  const startDrag =
    (id: number) =>
    (e: React.PointerEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      setDraggingId(id);
    };

  const endDrag =
    (dayIndex: number, slotIndex: number) =>
    (e: React.PointerEvent<HTMLDivElement>): void => {
      if (!draggingId) return;
      const appt = appointments.find((a) => a.id === draggingId);
      if (!appt) {
        setDraggingId(null);
        return;
      }

      const durationMs = appt.end.getTime() - appt.start.getTime();
      const today = new Date();
      const baseDate = new Date(today);
      baseDate.setDate(today.getDate() - today.getDay() + dayIndex);
      baseDate.setHours(9, 0, 0, 0);

      const newStart = new Date(
        baseDate.getTime() + slotIndex * SLOT_MINUTES * 60000
      );
      const newEnd = new Date(newStart.getTime() + durationMs);

      onMove?.(appt.id, newStart, newEnd);
      setDraggingId(null);
    };

  // const slotFromDate = (d: Date) =>
  //   (d.getHours() - 9) * SLOTS_PER_HOUR +
  //   Math.floor(d.getMinutes() / SLOT_MINUTES);

  // const spanFromDates = (start: Date, end: Date) => {
  //   const minutes = Math.max(
  //     15,
  //     Math.round((end.getTime() - start.getTime()) / 60000)
  //   );
  //   return Math.max(1, Math.ceil(minutes / SLOT_MINUTES));
  // };

  if (view === "month") {
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);
    const monthGrid = Array.from({ length: 35 }).map((_, i) => {
      const d = new Date(startDay);
      d.setDate(startDay.getDate() + i);
      return d;
    });

    return (
      <div className={styles.timetableContainer}>
        <div className={styles.optionsContainer}>
          {(["day", "week", "month"] as ViewMode[]).map((m) => (
            <button
              className={styles.button}
              key={m}
              onClick={() => setView(m)}
              disabled={view === m}
            >
              {m}
            </button>
          ))}
        </div>

        <div className={styles.monthContainer}>
          {monthGrid.map((d) => (
            <div key={d.toISOString()} className={styles.dayInMonth}>
              <div style={{ fontSize: 12, marginBottom: 6 }}>{d.getDate()}</div>
              {appointments
                .filter((a) => {
                  const sa = new Date(a.start);
                  return (
                    sa.getFullYear() === d.getFullYear() &&
                    sa.getMonth() === d.getMonth() &&
                    sa.getDate() === d.getDate()
                  );
                })
                .map((a) => (
                  <div
                    key={a.id}
                    style={{
                      fontSize: 12,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {a.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.timetableContainer}>
      <div className={styles.optionsContainer}>
        {(["day", "week", "month"] as ViewMode[]).map((m) => (
          <button key={m} onClick={() => setView(m)} disabled={view === m}>
            {m}
          </button>
        ))}
      </div>

      <div
        className={styles.dwContainer}
        style={{
          gridTemplateColumns: `50px repeat(${days.length}, 1fr)`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${totalSlots}, calc(100% / ${VISIBLE_ROWS}))`,
          }}
        >
          {Array.from({ length: totalSlots }).map((_, slotIdx) => {
            const hourIndex = Math.floor(slotIdx / SLOTS_PER_HOUR);
            const hour = (9 + hourIndex) % 24;
            const minute = (slotIdx % SLOTS_PER_HOUR) * SLOT_MINUTES;
            return (
              <div key={slotIdx} className={styles.timeContainer}>
                {minute === 0 ? `${String(hour).padStart(2, "0")}:00` : ""}
              </div>
            );
          })}
        </div>

        {days.map((dayIdx) => (
          <div key={dayIdx} className={styles.slotContainer}>
            <div
              className={styles.slotContainer2}
              style={{
                gridTemplateRows: `repeat(${totalSlots}, calc(100% / ${VISIBLE_ROWS}))`,
              }}
            >
              {Array.from({ length: totalSlots }).map((_, slotIdx) => (
                <div
                  key={slotIdx}
                  className={styles.slot}
                  onPointerUp={(e) => endDrag(dayIdx, slotIdx)(e as any)}
                />
              ))}
            </div>

            {appointmentData
              .filter((a) => new Date(a.start).getDay() === dayIdx)
              .map((a) => {
                const s = new Date(a.start);
                const e = new Date(a.end);
                const totalMinutes = HOURS * 60;
                const minutesFromStart =
                  (s.getHours() - 9) * 60 + s.getMinutes();
                const durationMinutes = Math.max(
                  15,
                  Math.round((e.getTime() - s.getTime()) / 60000)
                );

                const clampedStartMinutes = Math.max(0, minutesFromStart);
                const clampedDurationMinutes = Math.min(
                  durationMinutes - Math.max(0, 0 - minutesFromStart),
                  totalMinutes - clampedStartMinutes
                );

                const totalSlots = HOURS * SLOTS_PER_HOUR;
                const scale = totalSlots / VISIBLE_ROWS;

                const topPercent =
                  (clampedStartMinutes / totalMinutes) * 100 * scale;
                const heightPercent =
                  (clampedDurationMinutes / totalMinutes) * 100 * scale;

                const dayCols = 2;
                const colWidthPercent = 100 / dayCols - 2;
                const leftPercent =
                  a.columns.length === 1 && a.columns[0] % 2 === 1
                    ? (a.columns[0] % dayCols) * colWidthPercent + 3
                    : (a.columns[0] % dayCols) * colWidthPercent + 1;
                const widthPercent =
                  a.columns.length === 2 ? 98 : colWidthPercent;
                return (
                  <div
                    key={a.id}
                    onPointerDown={startDrag(a.id)}
                    className={styles.appointment}
                    style={{
                      top: `${topPercent}%`,
                      height: `${heightPercent}%`,
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, opacity: 0.8 }}>
                      {s.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {e.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
