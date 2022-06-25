import { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { markerList } from "../../store/recoil";
import { markerData } from "../Map/ShowMap";
import CorrectMarkerInfo from "./CorrectMarkerInfo";

const ShowMarkerList = () => {
  const markers = useRecoilValue(markerList);
  const [correction, setCorrection] = useState<number>(-1);

  return (
    <Fragment>
      {markers.map((marker: markerData, index: number) => (
        <Fragment key={index}>
          <Container>
            <p>
              <span>{marker.title}</span>
            </p>
            <p>{marker.body}</p>
            <button
              onClick={() => {
                setCorrection(index);
              }}
            >
              수정
            </button>
          </Container>
          {correction === index && (
            <CorrectMarkerInfo
              index={index}
              onClose={() => {
                setCorrection(-1);
              }}
            />
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ShowMarkerList;

const Container = styled.li`
  display: flex;
  justify-content: start;
  flex-direction: column;
  background-color: #696969;
  padding: 8px 16px;
  margin-bottom: 10px;
  list-style: none;
  border-radius: 15px;

  & p {
    font-size: 20px !important;
    width: 308px;
    overflow: auto;
  }

  & span {
    font-size: 30px;
    margin-bottom: 8px;
  }

  & button {
    width: 50px;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    margin: 8px 5px 0px 253px;
  }
`;
