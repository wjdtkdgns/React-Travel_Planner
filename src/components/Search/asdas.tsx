import { useState, useEffect, Fragment } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { searchedMarker } from "../../store/recoil";

const Search = () => {
  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  const bounds = new window.kakao.maps.LatLngBounds();
  const map = useMap();
  const [markers, setMarkers] = useRecoilState(searchedMarker);

  // // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // // 인포윈도우에 장소명을 표시합니다
  // function displayInfowindow(marker: any, title: any) {
  //   var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

  //   infowindow.setContent(content);
  //   infowindow.open(map, marker);
  // }

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
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      data.map((marker: any, index: number) => {
        setMarkers((prev: any[]) => [...prev, marker]);
        bounds.extend(new window.window.kakao.maps.LatLng(marker.y, marker.x));
      });
      map.setBounds(bounds);
      // 페이지 번호를 표출합니다
      // displayPagination(pagination);
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

    ps.keywordSearch(
      "kakao 제주",
      (data: any, status: any, pagination: any) => {
        placesSearchCB({ data, status, pagination });
      }
    );
  }, []);

  return (
    <Fragment>
      {markers.map((marker: any, index: number) => {
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
          />
        );
      })}
    </Fragment>
  );
};

export default Search;
