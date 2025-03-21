import { isNumberInRange } from "@/shared/validation";

export const getDirectionByCompassHeading = (heading: number) => {
  if (isNumberInRange(heading, 22.5, 67.5)) {
    return "Đông Bắc";
  }
  if (isNumberInRange(heading, 67.5, 112.5)) {
    return "Đông";
  }
  if (isNumberInRange(heading, 112.5, 157.5)) {
    return "Đông Nam";
  }
  if (isNumberInRange(heading, 157.5, 202.5)) {
    return "Nam";
  }
  if (isNumberInRange(heading, 202.5, 247.5)) {
    return "Tây Nam";
  }
  if (isNumberInRange(heading, 247.5, 292.5)) {
    return "Tây";
  }
  if (isNumberInRange(heading, 292.5, 337.5)) {
    return "Tây Bắc";
  }
  return "Bắc";
};

export const getSpecialDirectionByCompassHeading = (heading: number) => {
  if (isNumberInRange(heading, 7.5, 22.5)) {
    return "Quý";
  }
  if (isNumberInRange(heading, 22.5, 37.5)) {
    return "Sửu";
  }
  if (isNumberInRange(heading, 37.5, 52.5)) {
    return "Cấn";
  }
  if (isNumberInRange(heading, 52.5, 67.5)) {
    return "Dần";
  }
  if (isNumberInRange(heading, 67.5, 82.5)) {
    return "Giáp";
  }
  if (isNumberInRange(heading, 82.5, 97.5)) {
    return "Mão";
  }
  if (isNumberInRange(heading, 97.5, 112.5)) {
    return "Ất";
  }
  if (isNumberInRange(heading, 112.5, 127.5)) {
    return "Thìn";
  }
  if (isNumberInRange(heading, 127.5, 142.5)) {
    return "Tốn";
  }
  if (isNumberInRange(heading, 142.5, 157.5)) {
    return "Tỵ";
  }
  if (isNumberInRange(heading, 157.5, 172.5)) {
    return "Bính";
  }
  if (isNumberInRange(heading, 172.5, 187.5)) {
    return "Ngọ";
  }
  if (isNumberInRange(heading, 187.5, 202.5)) {
    return "Đinh";
  }
  if (isNumberInRange(heading, 202.5, 217.5)) {
    return "Mùi";
  }
  if (isNumberInRange(heading, 217.5, 232.5)) {
    return "Khôn";
  }
  if (isNumberInRange(heading, 232.5, 247.5)) {
    return "Thân";
  }
  if (isNumberInRange(heading, 247.5, 262.5)) {
    return "Canh";
  }
  if (isNumberInRange(heading, 262.5, 277.5)) {
    return "Dậu";
  }
  if (isNumberInRange(heading, 277.5, 292.5)) {
    return "Tân";
  }
  if (isNumberInRange(heading, 292.5, 307.5)) {
    return "Tuất";
  }
  if (isNumberInRange(heading, 307.5, 322.5)) {
    return "Càn";
  }
  if (isNumberInRange(heading, 322.5, 337.5)) {
    return "Hợi";
  }
  if (isNumberInRange(heading, 337.5, 352.5)) {
    return "Nhâm";
  }
  return "Tý";
};

export const normalizeHeading = (heading: number) => {
  return (heading + 360) % 360;
};
