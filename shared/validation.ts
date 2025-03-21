export const isNumberFinite = (value: any): boolean => {
  const num = Number(value);
  return typeof num === "number" && Number.isFinite(num);
};

export const isNumberInRange = (
  num: number,
  min: number,
  max: number
): boolean => {
  return num >= min && num <= max;
};
