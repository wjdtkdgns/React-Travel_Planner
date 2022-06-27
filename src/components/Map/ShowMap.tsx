import { Map } from "react-kakao-maps-sdk";
import { Fragment, useState } from "react";
import Marker from "../MapEl/Marker";
import Overlay from "../MapEl/Overlay";
import { useRecoilValue, useRecoilState } from "recoil";
import { markerList, tempPosition } from "../../store/recoil";
import Search from "../Search/Search";

export interface markerDataType {
  title: string;
  body: string;
  lat: number;
  lng: number;
}

const ShowMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<markerDataType[]>([]);
  const [temp, setTempPosition] = useRecoilState(tempPosition);
  const markers = useRecoilValue(markerList);

  const controlOverlayHandler = (marker: markerDataType) => {
    if (selectedMarker.includes(marker)) {
      const updatedSelectedMarker = selectedMarker.filter(
        (el) => el !== marker
      );
      setSelectedMarker(updatedSelectedMarker);
    } else {
      setSelectedMarker((prev) => [...prev, marker]);
    }
  };

  return (
    <Fragment>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "92vh",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(
          _t: kakao.maps.Map,
          mouseEvent: kakao.maps.event.MouseEvent
        ) =>
          setTempPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {markers.map((marker: markerDataType) => {
          return (
            <Marker
              key={`EventMarkerContainer-${marker.lat}-${marker.lng}`}
              lat={marker.lat}
              lng={marker.lng}
              onClick={controlOverlayHandler.bind(null, marker)}
            />
          );
        })}
        {selectedMarker.map((marker: markerDataType, index: number) => (
          <Overlay
            marker={marker}
            onClose={controlOverlayHandler}
            key={index}
          />
        ))}
        {temp && <Marker lat={temp.lat} lng={temp.lng} />}
        <Search />
      </Map>
    </Fragment>
  );
};

export default ShowMap;
