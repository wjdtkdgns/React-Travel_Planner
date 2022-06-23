import { atom } from "recoil";

export const tempLatlng = atom({
  key: "tempLatlng",
  default: { lat: 0, lng: 0 },
});
