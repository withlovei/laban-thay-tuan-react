import { isNumberInRange } from "@/shared/validation";
import { CompassMapping, CompassSpecialDirection, CompassStar } from "@/types/compass";
import { User } from "@/types/user";

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

export const getSpecialDirectionByCompassHeading = (heading: number): CompassSpecialDirection => {
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

const getCompassTypeFromUserInfo = (user: User) => {
  if (user.birthYear === null || user.gender === null) return null
  const sum = user.birthYear
  .toString()
  .split("")
  .reduce((acc, digit) => acc + parseInt(digit), 0);
  const remainder = sum % 9;
  const compassType: CompassMapping = {
    MALE: {
        0: "Khon",
        1: "Kham",
        2: "Ly",
        3: "Cans",
        4: "Doai",
        5: "Canf",
        6: "Khon",
        7: "Ton",
        8: "Chan",
    },
    FEMALE: {
        0: "Ton",
        1: "Cans",
        2: "Canf",
        3: "Doai",
        4: "Cans",
        5: "Ly",
        6: "Kham",
        7: "Khon",
        8: "Chan",
    }
  }
  return compassType[user.gender][remainder]
}

export const getHeadingForStar = (heading: number, user: User) => {
  const compassType = getCompassTypeFromUserInfo(user)
  if (compassType === null) return null
  switch (compassType) {
    case "Kham":
      return normalizeHeading(heading)
    case "Cans":
      return normalizeHeading(heading - 15)
    case "Chan":
      return normalizeHeading(heading - 90)
    case "Ton":
      return normalizeHeading(heading - 90)
    case "Ly":
      return normalizeHeading(heading - 180)
    case "Khon":
      return normalizeHeading(heading - 270)
    case "Doai":
      return normalizeHeading(heading - 270)
    case "Canf":
      return normalizeHeading(heading - 180)
  }
}

export const getStar = (heading: number, user: User): CompassStar | null => {
  const headingForStar = getHeadingForStar(heading, user)
  if (headingForStar === null) return null
  const specialDirection = getSpecialDirectionByCompassHeading(headingForStar)
  switch (specialDirection) {
    case "Tý":
      return "Thân Hôn"
    case "Quý":
      return "Hoan Lạc"
    case "Sửu":
      return "Bại Tuyệt"
    case "Cấn":
      return "Vượng Tài"
    case "Dần":
      return "Phúc Đức"
    case "Giáp":
      return "Ôn Hoàng"
    case "Mão":
      return "Tấn Tài"
    case "Ất":
      return "Trường Bệnh"
    case "Thìn":
      return "Tố Tụng"
    case "Tốn":
      return "Quan Lộc"
    case "Tỵ":
      return "Quan Quý"
    case "Bính":
      return "Tự Ải"
    case "Ngọ":
      return "Vượng Trang"
    case "Đinh":
      return "Hưng Phúc"
    case "Mùi":
      return "Pháp Trường"
    case "Khôn":
      return "Điên Cuồng"
    case "Thân":
      return "Khẩu Thiệt"
    case "Canh":
      return "Vượng Tân"
    case "Dậu":
      return "Tấn Điền"
    case "Tân":
      return "Khốc Khấp"
    case "Tuất":
      return "Cô Quả"
    case "Càn":
      return "Vinh Phú"
    case "Hợi":
      return "Thiếu Vong"
    case "Nhâm":
      return "Xương Dâm"
  }
}

export const getStarMeaning = (star: CompassStar) => {
  switch (star) {
    case "Thân Hôn":
      return "Gia đình hạnh phúc, an vui"
    case "Hoan Lạc":
      return "Gia đình vui vẻ, hay có tiếng cười"
    case "Bại Tuyệt":
      return "Kinh tế suy bại sau 1 đến 3 năm"
    case "Vượng Tài":
      return "Tốt về tài lộc, kinh doanh buôn bán"
    case "Phúc Đức":
      return "Gia đình có trật tự trên dưới"
    case "Ôn Hoàng":
      return "Chủ về bệnh tật, đặc biệt là các bệnh về da"
    case "Tấn Tài":
      return "Tốt về tài lộc, kinh doanh buôn bán"
    case "Trường Bệnh":
      return "Người trong nhà ốm lâu ngày không khỏi"
    case "Tố Tụng":
      return "Liên quan đến kiện cáo, tranh chấp"
    case "Quan Lộc":
      return "Tốt về quan vận, hay được quý nhân giúp đỡ"
    case "Quan Quý":
      return "Tốt về quan vận, đặc biệt có người làm công chức"
    case "Tự Ải":
      return "Trong nhà có người khổ tâm, uất ức hay nghĩ quẩn"
    case "Vượng Trang":
      return "Tốt về đát đai nhà, cửa"
    case "Hưng Phúc":
      return "Gia đình hòa thuận, êm ấm"
    case "Pháp Trường":
      return "Dễ liên quan đến pháp luật"
    case "Điên Cuồng":
      return "Người trong nhà nóng tính, hay mất bình tĩnh"
    case "Khẩu Thiệt":
      return "Người trong nhà ăn nói thua thiệt, hay chịu thiệt về mình"
    case "Vượng Tân":
      return "Tốt về đất đai, nhà cửa"
    case "Tấn Điền":
      return "Sau khi ở đây mua được thêm đất cát, gia tăng điền sản"
    case "Khốc Khấp":
      return "Trong nhà hay có người ốm vặt"
    case "Cô Quả":
      return "Vợ chồng dễ chia ly, quả phụ hoặc kết hôn muộn"
    case "Vinh Phú":
      return "Chủ về tài vận, làm ăn kinh doanh thuận lợi"
    case "Thiếu Vong":
      return "Trong nhà dễ có người liên quan đến cờ bạc, rượu chè"
    case "Xương Dâm":
      return "Trong nhà dễ có người ngoại tình"
  }
}
