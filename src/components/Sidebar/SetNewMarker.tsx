import { Fragment, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { markerList, tempPosition } from "../../store/recoil";
import { markerData } from "../Map/ShowMap";

const SetNewMarker = () => {
  const position = useRecoilValue(tempPosition);
  const [markers, setMarkerList] = useRecoilState(markerList);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (
      !markers.some(
        (marker) => marker.lat === position.lat && marker.lng === position.lng
      )
    ) {
      setMarkerList((prev: markerData[]) => [
        ...prev,
        {
          title: titleRef.current!.value,
          body: bodyRef.current!.value,
          lat: position.lat,
          lng: position.lng,
        },
      ]);
    } else {
      alert("같은 위치가 이미 추가되어 있습니다.");
    }
    titleRef.current!.value = "";
    bodyRef.current!.value = "";
  };

  return (
    <Fragment>
      <Container>
        <label htmlFor="title">
          <p>이름</p>
        </label>
        <input id="title" ref={titleRef} />
        <label htmlFor="body">
          <p>설명</p>
        </label>
        <textarea id="body" ref={bodyRef} />
        <button onClick={submitHandler}>일정 추가</button>
      </Container>
    </Fragment>
  );
};

export default SetNewMarker;

const Container = styled.li`
  display: flex;
  justify-content: start;
  flex-direction: column;
  background-color: #696969;
  padding: 8px 16px 12px 16px;
  margin-bottom: 30px;
  list-style: none;
  border-radius: 15px;
  & p {
    font-size: 20px !important;
    margin: 0px 5px;
  }
  & input {
    border-radius: 5px;
    height: 25px;
    padding: 0px 10px;
    border: 0;
    margin: 5px;
    width: 278px;
  }
  & textarea {
    border-radius: 5px;
    min-height: 60px;
    padding: 5px 10px;
    border: 0;
    margin: 5px;
    width: 278px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }

  & button {
    width: 70px;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    margin: 8px 5px 0px 233px;
  }
`;
