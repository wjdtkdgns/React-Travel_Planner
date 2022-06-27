import { atom } from "recoil";
import { markerDataType } from "../components/Map/ShowMap";
import { dataType } from "../components/Search/Search";

export const tempPosition = atom<{ lat: number; lng: number }>({
  key: "tempPosition",
  default: { lat: 0, lng: 0 },
});

export const markerList = atom<markerDataType[]>({
  key: "markerList",
  default: [
    { title: "1", body: "111", lat: 33.44975, lng: 126.56967 },
    { title: "2", body: "222", lat: 33.450579, lng: 126.56956 },
    { title: "3", body: "333", lat: 33.4506468, lng: 126.5707 },
  ],
});

export const searchedMarker = atom<dataType[]>({
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
