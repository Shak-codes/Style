type SimpleAppointment = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export const sortByDate = <K extends keyof SimpleAppointment>(
  arr: SimpleAppointment[],
  key: K
) =>
  [...arr].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue instanceof Date && bValue instanceof Date) {
      return aValue.getTime() - bValue.getTime();
    }
    return 0;
  });

export type Assigned = SimpleAppointment & { columns: number[] };

export const assignColumns = (sorted: SimpleAppointment[]): Assigned[] => {
  const result: Assigned[] = [];
  const count = sorted.length;

  for (let i = 0; i < count; i++) {
    const currStart = sorted[i].start;
    const currEnd = sorted[i].end;
    const dayBase = currStart.getDay() * 2;
    let cols: number[];

    if (
      i > 0 &&
      result[i - 1].columns.length < 2 &&
      currStart < sorted[i - 1].end
    ) {
      cols = result[i - 1].columns[0] === dayBase ? [dayBase + 1] : [dayBase];
    } else if (i + 1 < count && sorted[i + 1].start < currEnd) {
      cols = [dayBase];
    } else {
      cols = [dayBase, dayBase + 1];
    }

    result.push({ ...sorted[i], columns: cols });
  }

  return result;
};
