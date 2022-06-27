import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { markerDataType } from "../Map/ShowMap";
import styled from "styled-components";

interface overlayInterFace {
  marker: markerDataType;
  onClose: (marker: markerDataType) => void;
}

const Overlay = ({ marker, onClose }: overlayInterFace) => {
  return (
    <CustomOverlayMap
      position={{ lat: marker.lat, lng: marker.lng }}
      clickable={true}
    >
      <Wrap>
        <Info>
          <Title>
            {marker.title}
            <Close title="닫기" onClick={onClose.bind(null, marker)}></Close>
          </Title>
          <Body>
            <Content>{marker.body}</Content>
          </Body>
        </Info>
      </Wrap>
    </CustomOverlayMap>
  );
};
export default Overlay;

const Wrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
  & * {
    padding: 0;
    margin: 0;
  }
`;
const Info = styled.div`
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;

  & :nth-child(1) {
    border: 0;
  }

  &:after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
  }
`;

const Title = styled.div`
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");

  &:hover {
    cursor: pointer;
  }
`;
const Body = styled.div`
  position: relative;
  overflow: hidden;
`;
const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px 10px;
  border: 0;
`;
