import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { searchedMarker } from "../../store/recoil";
import "./temp.css";
const SearchModal = () => {
  const loadedData = useRecoilValue(searchedMarker);
  return (
    <div className="map_wrap">
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form>
              키워드 :
              <input
                type="text"
                defaultValue="이태원 맛집"
                id="keyword"
                size={15}
              />
              <button>검색하기</button>
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
              </div>
            </li>
          ))}
        </ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};
export default SearchModal;
