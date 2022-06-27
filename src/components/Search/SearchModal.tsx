import { Fragment, useRef } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  markerList,
  paginationValue,
  searchedMarker,
  searchKeyword,
} from "../../store/recoil";
import styled from "styled-components";
import { dataType } from "./Search";
import { markerDataType } from "../Map/ShowMap";

interface MarkerbgType {
  index: number;
}

const SearchModal = () => {
  const loadedData = useRecoilValue(searchedMarker);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSearchKeyword = useSetRecoilState(searchKeyword);
  const pagination = useRecoilValue(paginationValue);
  const [markers, setMarkerList] = useRecoilState(markerList);

  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchKeyword(inputRef.current!.value);
  };

  const addMarkerListHandler = (
    el: dataType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!markers.some((marker) => marker.lat === el.y && marker.lng === el.x)) {
      setMarkerList((prev: markerDataType[]) => [
        ...prev,
        { title: el.place_name, body: "내용 없음", lat: el.y, lng: el.x },
      ]);
    }
  };

  const moveAnotherPageHandler = (
    i: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    pagination.gotoPage(i);
  };

  let paginationContent: any[] = [];
  for (let i = 1; i <= pagination.last; i++) {
    paginationContent.push(
      <a
        href="#!"
        onClick={moveAnotherPageHandler.bind(null, i)}
        style={{ color: `${pagination.current === i ? "#000" : "#777"}` }}
      >
        {i}
      </a>
    );
  }

  return (
    <MapWrap>
      <MenuWrap>
        <Option>
          <div>
            <form>
              <span>키워드 : </span>
              <input type="text" id="keyword" size={15} ref={inputRef} />
              <button onClick={searchHandler}>검색하기</button>
            </form>
          </div>
        </Option>
        <hr />
        <ul>
          {loadedData.map((el: any, index: number) => (
            <Item key={index}>
              <Markerbg index={index} />
              <Info>
                <h5>{el.place_name}</h5>
                {el.road_address_name ? (
                  <Fragment>
                    <span>{el.road_address_name}</span>
                    <Jibun
                      style={{
                        color: "#8a8a8a",
                      }}
                    >
                      {el.address_name}
                    </Jibun>
                  </Fragment>
                ) : (
                  <span>{el.address_name}</span>
                )}
                <span
                  style={{
                    color: "#009900",
                  }}
                >
                  {el.phone}
                </span>
                <button onClick={addMarkerListHandler.bind(null, el)}>
                  일정 추가
                </button>
              </Info>
            </Item>
          ))}
        </ul>
        <Pagination>
          {paginationContent.map((page: any, index: number) => (
            <Fragment key={index}>{page}</Fragment>
          ))}
        </Pagination>
      </MenuWrap>
    </MapWrap>
  );
};
export default SearchModal;

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  * {
    margin: 0;
    padding: 0;
    font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
    font-size: 12px;
  }

  overflow: overlay;

  & ::-webkit-scrollbar {
    display: none;
  }
`;

const MenuWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;

  & hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #5f5f5f;
    margin: 3px 0;
  }
`;

const Option = styled.div`
  text-align: center;
  & p {
    margin: 10px 0;
  }
  & button {
    margin-left: 5px;
  }
`;

const Item = styled.li`
  list-style: none;
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;

  & span {
    display: block;
    margin-top: 4px;
  }

  & h5 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Markerbg = styled.span<MarkerbgType>`
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
  background-position: 0 ${(props) => props.index * -46 - 10}px;
`;

const Info = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0 10px 55px;

  & button {
    margin-left: 130px;
    width: 50px;
    height: 20px;
  }
`;

const Jibun = styled.span`
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
`;

const Pagination = styled.div`
  margin: 10px auto;
  text-align: center;

  & a {
    display: inline-block;
    margin-right: 10px;
    font-weight: bold;
    color: #777;
    text-decoration-line: none;
  }

  & a:hover {
    color: #000;
    text-decoration: none;
  }
`;
