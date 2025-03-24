import { User } from "@/types/user";

export type CompassType =
  | "Cans"
  | "Canf"
  | "Ly"
  | "Kham"
  | "Doai"
  | "Khon"
  | "Ton"
  | "Chan";
export type CompassMapping = {
  [key in NonNullable<User["gender"]>]: {
    [key: number]: CompassType;
  };
};

export type CompassStar =
  | "Thân Hôn"
  | "Hoan Lạc"
  | "Bại Tuyệt"
  | "Vượng Tài"
  | "Phúc Đức"
  | "Ôn Hoàng"
  | "Tấn Tài"
  | "Trường Bệnh"
  | "Tố Tụng"
  | "Quan Lộc"
  | "Quan Quý"
  | "Tự Ải"
  | "Vượng Trang"
  | "Hưng Phúc"
  | "Pháp Trường"
  | "Điên Cuồng"
  | "Khẩu Thiệt"
  | "Vượng Tân"
  | "Tấn Điền"
  | "Khốc Khấp"
  | "Cô Quả"
  | "Vinh Phú"
  | "Thiếu Vong"
  | "Xương Dâm";

export type CompassSpecialDirection =
  | "Quý"
  | "Sửu"
  | "Cấn"
  | "Dần"
  | "Giáp"
  | "Mão"
  | "Ất"
  | "Thìn"
  | "Tốn"
  | "Tỵ"
  | "Bính"
  | "Ngọ"
  | "Đinh"
  | "Mùi"
  | "Khôn"
  | "Thân"
  | "Canh"
  | "Dậu"
  | "Tân"
  | "Tuất"
  | "Càn"
  | "Hợi"
  | "Nhâm"
  | "Tý";
