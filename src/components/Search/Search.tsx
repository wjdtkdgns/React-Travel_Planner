export {};
// import "temp.css";
// import { useState, useEffect } from "react";

// const Search = (map: any) => {
//   const [info, setInfo] = useState<any>();
//   const [markers, setMarkers] = useState<any[]>([]);

//   var markers: any[] = [];

//   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

//   // 키워드로 장소를 검색합니다
//   searchPlaces();

//   // 키워드 검색을 요청하는 함수입니다
//   function searchPlaces() {
//     var keyword = (document.getElementById("keyword") as any).value;

//     if (!keyword.replace(/^\s+|\s+$/g, "")) {
//       alert("키워드를 입력해주세요!");
//       return false;
//     }

//     // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//     ps.keywordSearch(keyword, placesSearchCB);
//   }

//   // 검색 결과 목록과 마커를 표출하는 함수입니다
//   function displayPlaces(places: any) {
//     var listEl = document.getElementById("placesList") as any,
//       menuEl = document.getElementById("menu_wrap") as any,
//       fragment = document.createDocumentFragment(),
//       bounds = new kakao.maps.LatLngBounds(),
//       listStr = "";

//     for (var i = 0; i < places.length; i++) {
//       // 마커를 생성하고 지도에 표시합니다
//       var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//         marker = addMarker(placePosition, i),
//         itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//       // LatLngBounds 객체에 좌표를 추가합니다
//       bounds.extend(placePosition);

//       // 마커와 검색결과 항목에 mouseover 했을때
//       // 해당 장소에 인포윈도우에 장소명을 표시합니다
//       // mouseout 했을 때는 인포윈도우를 닫습니다
//       (function (marker, title) {
//         kakao.maps.event.addListener(marker, "mouseover", function () {
//           displayInfowindow(marker, title);
//         });

//         kakao.maps.event.addListener(marker, "mouseout", function () {
//           infowindow.close();
//         });

//         itemEl.onmouseover = function () {
//           displayInfowindow(marker, title);
//         };

//         itemEl.onmouseout = function () {
//           infowindow.close();
//         };
//       })(marker, places[i].place_name);

//       fragment.appendChild(itemEl);
//     }

//     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//     listEl.appendChild(fragment);
//     menuEl.scrollTop = 0;

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
//   }

//   // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
//   function displayPagination(pagination: any) {
//     var paginationEl = document.getElementById("pagination") as any,
//       fragment = document.createDocumentFragment(),
//       i;

//     // 기존에 추가된 페이지번호를 삭제합니다
//     while (paginationEl.hasChildNodes()) {
//       paginationEl.removeChild(paginationEl.lastChild);
//     }

//     for (i = 1; i <= pagination.last; i++) {
//       var el = document.createElement("a");
//       el.href = "#";
//       el.innerHTML = `${i}`;

//       if (i === pagination.current) {
//         el.className = "on";
//       } else {
//         el.onclick = (function (i) {
//           return function () {
//             pagination.gotoPage(i);
//           };
//         })(i);
//       }

//       fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
//   }

//   // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
//   // 인포윈도우에 장소명을 표시합니다
//   function displayInfowindow(marker: any, title: any) {
//     var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

//     infowindow.setContent(content);
//     infowindow.open(map, marker);
//   }
// };
// export default Search;
