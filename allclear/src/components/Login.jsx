import { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom, loggedInUserAtom } from "../recoil/login/login";
import { useNavigate } from "react-router-dom";
import allclear from "../assets/allclear.png";
import { login } from "../apis/auth/login";

function Login() {
  const [loginData, setLoginData] = useState({
    id: "",
    pw: "",
  });

  const handleIdChange = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, id: e.target.value };
    });
  };
  const handlePasswordChange = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, pw: e.target.value };
    });
  };

  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const setLoggedInUserAtom = useSetRecoilState(loggedInUserAtom);
  const setIsLoggedIn = () => setIsLoggedInAtom((prev) => !prev);
  const setLoggedInUser = (name) => setLoggedInUserAtom(name);
  const navigate = useNavigate();

  const doLogin = (e) => {
    login(
      loginData,
      ({ data }) => {
        setIsLoggedIn();
        setLoggedInUser(data.name);
        navigate("/dashboard");
      },
      (error) => {}
    );

    // setIsLoggedIn();
    // setLoggedInUser(loginData.id);
    // navigate("/dashboard");
    e.preventDefault();
  };

  const moveToJoin = (e) => {
    navigate("/join");
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo src={allclear} />
        <InputForm onSubmit={login}>
          <IdInput
            type="text"
            value={loginData.id}
            onChange={handleIdChange}
            placeholder="아이디"
          />
          <PasswordInput
            type="password"
            value={loginData.pw}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <LoginButton onClick={doLogin}>로그인</LoginButton>
            <JoinButton onClick={moveToJoin}>회원가입</JoinButton>
          </div>
        </InputForm>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  background-color: #384351;
  border-radius: 10px;
  padding: 20px 0;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 80%;
  object-fit: contain;
  margin-bottom: 20px;
`;

const IdInput = styled.input`
  width: 80%;
  height: 35px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 8px;
  font-size: 14px;
  color: #121212;
  margin-bottom: 10px;
`;

const PasswordInput = styled.input`
  width: 80%;
  height: 35px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 8px;
  font-size: 14px;
  color: #121212;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  width: 25%;
  background-color: #20ade4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  margin-bottom: 10px;
  color: #e6e5ea;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

const JoinButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  width: 25%;
  background-color: #20ade4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

export default Login;
