import { atom } from "recoil";

export const tempPosition = atom({
  key: "tempPosition",
  default: { lat: 0, lng: 0 },
});

export const markerList = atom({
  key: "markerList",
  default: [
    { title: "1", body: "111", lat: 33.44975, lng: 126.56967 },
    { title: "2", body: "222", lat: 33.450579, lng: 126.56956 },
    { title: "3", body: "333", lat: 33.4506468, lng: 126.5707 },
  ],
});

export const searchedMarker = atom<any[]>({
  key: "searchedMarker",
  default: [],
});

export const searchKeyword = atom<string>({
  key: "searchKeyword",
  default: "",
});

export const paginationValue = atom<any>({
  key: "paginationValue",
  default: "",
});
