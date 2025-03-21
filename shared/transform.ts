import { User } from "@/types/user";

export const mapGenderToText = (gender?: User["gender"]) => {
  if (gender === "MALE") {
    return "Nam";
  }
  if (gender === "FEMALE") {
    return "Nữ";
  }
  return "Không xác định";
};
