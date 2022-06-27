import { MapMarker } from "react-kakao-maps-sdk";

interface MarkerType {
  lat: number;
  lng: number;
  onClick?: (marker: kakao.maps.Marker) => void;
}

const Marker = (props: MarkerType) => {
  return (
    <MapMarker // 마커를 생성합니다
      onClick={props.onClick}
      position={{ lat: props.lat, lng: props.lng }}
      image={{
        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        size: {
          width: 64,
          height: 69,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 27,
            y: 69,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
    />
  );
};

export default Marker;
