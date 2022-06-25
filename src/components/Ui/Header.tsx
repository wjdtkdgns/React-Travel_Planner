import styled from "styled-components";

import { useState } from "react";
import SetNewMarker from "../Sidebar/SetNewMarker";
import ShowMarkerList from "../Sidebar/ShowMarkerList";
import SearchModal from "../Search/SearchModal";

interface NavMenuType {
  sidebar: boolean;
}

interface SearchModalType {
  searchModal: boolean;
}

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showSearchModal = () => {
    setSearchModal(!searchModal);
  };

  return (
    <Layout>
      <Navbar>
        <img onClick={showSidebar} src="/img/MenuIcon.png" alt="menu" />
      </Navbar>
      <NavMenu sidebar={sidebar}>
        <ul>
          <NavbarToggle onClick={showSidebar}>
            <img src="/img/CloseIcon.png" alt="menu" />
          </NavbarToggle>
          <SetNewMarker />
          <ShowMarkerList />
        </ul>
      </NavMenu>
      <p>Kakao Map</p>
      <img
        src="/img/SearchIconBlack.png"
        alt="menu"
        onClick={showSearchModal}
      />
      <SearchLayout searchModal={searchModal}>
        <SearchModal />
      </SearchLayout>
    </Layout>
  );
};

export default Header;

const SearchLayout = styled.div<SearchModalType>`
  overflow: auto;
  width: 500px;
  height: 70vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 12vh;
  right: ${(props) => (props.searchModal ? "-10%" : "-110%")};
  transition: ${(props) => (!props.searchModal ? "750ms" : "450ms")};
  z-index: 500;
`;

const Layout = styled.div`
  width: 100%;
  height: 8vh;
  min-height: 40px;

  background-color: #f9e000;
  box-sizing: border-box;
  padding: 0px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    color: #371d1e;
    margin: 0px;
    font-size: 30px;
  }

  & img {
    height: 40px;
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const NavMenu = styled.nav<NavMenuType>`
  overflow: auto;
  background-color: rgba(235, 235, 235, 0.8);
  width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${(props) => (!props.sidebar ? "-100%" : "0")};
  transition: ${(props) => (!props.sidebar ? "850ms" : "350ms")};
  z-index: 500;

  & ul {
    width: 100%;
    padding: 0px 30px;
  }
`;

const NavbarToggle = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
`;
