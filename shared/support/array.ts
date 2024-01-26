export const range = (from: number, to: number, increment = 1) => {
  let result: number[] = [];
  for (let i = from; i <= to; i += increment) {
    result.push(i);
  }
  return result;
};

export const generateOptions = <T = any>(
  data?: T[],
  labelKey: keyof T | ((val: T) => string) = "name" as keyof T,
  valueKey = "id" as keyof T
) => {
  return (
    data?.map((x) => ({
      label:
        typeof labelKey == "function"
          ? labelKey(x)
          : x[labelKey as keyof T]?.toString() || "",
      value: x[valueKey as keyof T]?.toString() || "",
    })) || []
  );
};

export const entriesToOptions = (entries: Record<string, string>) =>
  Object.entries(entries)?.map(([value, label]) => ({
    label,
    value,
  })) || [];
