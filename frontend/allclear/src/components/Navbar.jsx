import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom, loggedInUserAtom } from "../recoil/login/login";
import allclear from "../assets/allclear.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const farmName = useRecoilValue(loggedInUserAtom);
  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const setLoggedInUserAtom = useSetRecoilState(loggedInUserAtom);
  const setIsLoggedIn = () => setIsLoggedInAtom((prev) => !prev);
  const setLoggedInUser = () => setLoggedInUserAtom("");
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn();
    setLoggedInUser();
    navigate("/");
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/dashboard"
          >
            <Logo src={allclear} />
          </Link>
        </LogoContainer>
        {isLoggedIn && (
          <NavbarContent>
            <div style={{ fontWeight: 600 }}>{farmName}</div>
            <LoginLogoutButton onClick={logout}>로그아웃</LoginLogoutButton>
          </NavbarContent>
        )}
      </NavbarContainer>
    </>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #384351;
  height: 80px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16%;
  height: 100%;
  background-color: #20ade4;
`;

const LoginLogoutButton = styled.div`
  cursor: pointer;
  margin: 0 30px;
`;

const NavbarContent = styled.div`
  display: flex;
  width: 18%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 70%;
`;

export default Navbar;
