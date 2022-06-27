import { useState, useEffect, Fragment } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  paginationValue,
  searchedMarker,
  searchKeyword,
} from "../../store/recoil";

export interface dataType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: number;
  phone: number;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

const Search = () => {
  const bounds = new window.kakao.maps.LatLngBounds();
  const map = useMap();
  const keyword = useRecoilValue(searchKeyword);
  const setPaginationValue = useSetRecoilState(paginationValue);
  const [markers, setMarkers] = useRecoilState(searchedMarker);
  const [infoGrid, setInfoGrid] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  function placesSearchCB({
    data,
    status,
    pagination,
  }: {
    data: any;
    status: any;
    pagination: any;
  }) {
    if (status === window.kakao.maps.services.Status.OK) {
      setPaginationValue(pagination);
      setMarkers([]);
      data.map((marker: dataType) => {
        setMarkers((prev) => [...prev, marker]);
        bounds.extend(new window.window.kakao.maps.LatLng(marker.y, marker.x));
      });
      map.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places(map);

    if (keyword !== "") {
      ps.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
        placesSearchCB({ data, status, pagination });
      });
    }
  }, [keyword]);

  console.log(markers);

  return (
    <Fragment>
      {markers.map((marker: dataType, index: number) => {
        return (
          <MapMarker
            key={index}
            position={{ lat: marker.y, lng: marker.x }}
            clickable={true}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
              size: { width: 36, height: 37 },
              options: {
                spriteSize: { width: 36, height: 691 },
                spriteOrigin: { x: 0, y: index * 46 + 10 },
                offset: { x: 13, y: 37 },
              },
            }}
            onMouseOver={() => setInfoGrid({ x: marker.x, y: marker.y })}
            onMouseOut={() =>
              setInfoGrid({
                x: -1,
                y: -1,
              })
            }
          >
            {infoGrid && infoGrid.x === marker.x && infoGrid.y === marker.y && (
              <div style={{ color: "#000", padding: "5px", zIndex: "1" }}>
                {marker.place_name}
              </div>
            )}
          </MapMarker>
        );
      })}
    </Fragment>
  );
};

export default Search;
