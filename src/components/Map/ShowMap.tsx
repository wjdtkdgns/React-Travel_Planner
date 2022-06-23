import { Fragment } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import Marker from "../MapEl/Marker";
import Overlay from "../MapEl/Overlay";

const positions = [
  { lat: 33.44975, lng: 126.56967 },
  { lat: 33.450579, lng: 126.56956 },
  { lat: 33.4506468, lng: 126.5707 },
];

const EventMarkerContainer = ({
  position,
  onClick,
}: {
  position: any;
  onClick: any;
}) => {
  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      onClick={onClick}
    ></MapMarker>
  );
};

const ShowMap = () => {
  const [position, setPosition] = useState<any>();
  const [clickedMarkerPosition, setClickedMarkerPosition] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

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
          height: "100vh",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_t: any, mouseEvent: any) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {positions.map((position, index) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${position.lat}-${position.lng}`}
            position={position}
            onClick={() => {
              setIsOpen(!isOpen);
              setClickedMarkerPosition(position);
            }}
          />
        ))}
        {isOpen && (
          <Overlay position={clickedMarkerPosition} setIsOpen={setIsOpen} />
        )}
        {position && <Marker lat={position.lat} lng={position.lng} />}
      </Map>
    </Fragment>
  );
};

export default ShowMap;
