import { Fragment, useRef } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  markerList,
  paginationValue,
  searchedMarker,
  searchKeyword,
} from "../../store/recoil";
import "./temp.css";

const SearchModal = () => {
  const loadedData = useRecoilValue(searchedMarker);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSearchKeyword = useSetRecoilState(searchKeyword);
  const pagination = useRecoilValue(paginationValue);
  const [markers, setMarkerList] = useRecoilState(markerList);

  const searchHandler = (e: any) => {
    e.preventDefault();
    setSearchKeyword(inputRef.current!.value);
  };

  const addMarkerListHandler = (el: any) => {
    if (!markers.some((marker) => marker.lat === el.y && marker.lng === el.x)) {
      setMarkerList((prev: any[]) => [
        ...prev,
        { title: el.place_name, body: "내용 없음", lat: el.y, lng: el.x },
      ]);
    }
  };

  let paginationContent: any[] = [];
  for (let i = 1; i <= pagination.last; i++) {
    paginationContent.push(
      <a
        href="#!"
        className="on"
        onClick={(e: any) => {
          e.preventDefault();
          pagination.gotoPage(i);
        }}
      >
        {i}
      </a>
    );
  }

  return (
    <div className="map_wrap">
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form>
              키워드 :
              <input type="text" id="keyword" size={15} ref={inputRef} />
              <button onClick={searchHandler}>검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul>
          {loadedData.map((el: any, index: number) => (
            <li className="item" key={index}>
              <span className={`markerbg marker_${index + 1}`}></span>
              <div className="info">
                <h5>{el.place_name}</h5>
                {el.road_address_name ? (
                  <Fragment>
                    <span>{el.road_address_name}</span>
                    <span className="jibun gray">{el.address_name}</span>
                  </Fragment>
                ) : (
                  <span>{el.address_name}</span>
                )}
                <span className="tel">{el.phone}</span>
                <button
                  style={{ marginLeft: "130px", width: "50px", height: "20px" }}
                  onClick={addMarkerListHandler.bind(null, el)}
                >
                  일정 추가
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div id="pagination">
          {paginationContent.map((page: any, index: number) => (
            <Fragment key={index}>{page}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
