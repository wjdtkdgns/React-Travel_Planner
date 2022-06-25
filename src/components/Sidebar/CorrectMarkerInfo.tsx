import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { markerList } from "../../store/recoil";

const CorrectMarkerInfo = ({
  index,
  onClose,
}: {
  index: number;
  onClose: any;
}) => {
  const [markers, setMarkerList] = useRecoilState(markerList);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const correctHandler = () => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = {
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      lat: updatedMarkers[index].lat,
      lng: updatedMarkers[index].lng,
    };
    setMarkerList(updatedMarkers);
    onClose();
  };

  return (
    <Container>
      <label htmlFor="title">
        <p>이름</p>
      </label>
      <input id="title" ref={titleRef} />
      <label htmlFor="body">
        <p>설명</p>
      </label>
      <textarea id="body" ref={bodyRef} />
      <div>
        <button onClick={correctHandler}>변경 완료</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </Container>
  );
};

export default CorrectMarkerInfo;

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

  & div {
    display: flex;
    margin-left: 168px;
  }

  & button {
    width: 70px;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    margin: 8px 5px 0px 0px;
  }
  & button:last-child {
    margin-left: 10px;
    width: 50px;
  }
`;
