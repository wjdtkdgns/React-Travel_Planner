import styled from "styled-components";

import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

interface NavMenuType {
  sidebar: boolean;
}

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log("asdas");
  };

  return (
    <Layout>
      <Navbar onClick={showSidebar}>
        <img src="/img/MenuIcon.png" alt="menu" />
      </Navbar>
      <NavMenu sidebar={sidebar}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <NavbarToggle>
            <img src="/img/CloseIcon.png" alt="menu" />
          </NavbarToggle>
          {SidebarData.map((item, index) => {
            return (
              <NavText key={index}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </NavText>
            );
          })}
        </ul>
      </NavMenu>
      <p>Planning with Kakao Map</p>
    </Layout>
  );
};

export default Header;

const Layout = styled.div`
  width: 100%;
  height: 60px;

  background-color: #f9e000;
  box-sizing: border-box;
  padding: 0px 20px;

  display: flex;
  align-items: center;

  & p {
    padding-left: calc(50% - 40px - 161.5px);

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
  background-color: rgb(255, 255, 255);
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

const NavText = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  & span {
    margin-left: 16px;
  }
`;
