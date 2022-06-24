import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { markerList } from "../../store/recoil";

const ShowMarkerList = () => {
  const markers = useRecoilValue(markerList);
  return (
    <Fragment>
      {markers.map((marker, index) => (
        <Container key={index}>
          <p>
            <span>{marker.title}</span>
          </p>
          <p>{marker.body}</p>
        </Container>
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
`;
