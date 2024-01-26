import dayjs from "dayjs";

export const m2 = (val: number) => {
  return (
    <span className="whitespace-nowrap">
      {val.toLocaleString("ID")} m<sup>2</sup>
    </span>
  );
};
export const ribu = (val: number) => {
  return val.toLocaleString("ID");
};
export const rp = (val: number) => `Rp ${ribu(val)}`;

export const unRibu = (val: string) => {
  return Number(val.replace(/[^\d,-]+/g, ""));
};
export const capitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const IDR = (val: number) => `${val / 1000}K`

export const localDate = (val: string | undefined) => {
  return dayjs(val).format("D MMMM YYYY");
}

export const localTime = (val: string | undefined) => {
  return dayjs(val).format("HH:mm:ss");
}

export const localTimeHM = (val: string | undefined) => {
  return dayjs(val).format("HH:mm");
}

export const localDateWithTime = (val: string | undefined) => {
  return dayjs(val).format("DD-MMMM-YYYY HH:mm:ss");
}

export const formatCurrency = (val: number | null | undefined) => {
  if (val === undefined || val === null) {
    return '0 Ribu';
  }

  if (Number(val) >= 1000000) {
    const formatted = (Number(val) / 1000000).toFixed(1);
    return formatted.endsWith('.0') ? formatted.slice(0, -2) + ' Juta' : formatted + ' Juta';
  } else if (Number(val) >= 1000) {
    const formatted = (Number(val) / 1000).toFixed(1);
    return formatted.endsWith('.0') ? formatted.slice(0, -2) + ' Ribu' : formatted + ' Ribu';
  } else {
    const formatted = (Number(val) / 1000).toFixed(1);
    return formatted.endsWith('.0') ? '0' + formatted.slice(1, -2) + ' Ribu' : formatted + ' Ribu';
  }
}

export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + '...';
  }
};