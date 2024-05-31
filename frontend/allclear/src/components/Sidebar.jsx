import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import monitoring from "../assets/monitoring.png";
import statistics from "../assets/statistics.png";
import styled from "styled-components";

function Sidebar() {
  return (
    <>
      <SidebarContainer>
        <MenuList>
          <Link to="/dashboard">
            <Menu>
              <MenuLogo src={dashboard} />
              대시보드
            </Menu>
          </Link>
          <Link to="/monitoring">
            <Menu>
              <MenuLogo src={monitoring} />
              모니터링
            </Menu>
          </Link>
          <Link to="/statistics">
            <Menu>
              <MenuLogo src={statistics} />
              통계
            </Menu>
          </Link>
        </MenuList>
      </SidebarContainer>
    </>
  );
}

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MenuList = styled.ul`
  width: 100%;
`;

const Menu = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #7a8692;
  height: 60px;
  padding-left: 25px;
`;

const MenuLogo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`;
export default Sidebar;
