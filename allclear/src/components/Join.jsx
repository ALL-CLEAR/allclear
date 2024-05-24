import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import allclear from "../assets/allclear.png";
import { join } from "../apis/auth/join";

function Login() {
  const [joinData, setJoinData] = useState({
    id: "",
    pw: "",
    name: "",
  });

  const handleIdChange = (e) => {
    setJoinData((prevState) => {
      return { ...prevState, id: e.target.value };
    });
  };
  const handlePasswordChange = (e) => {
    setJoinData((prevState) => {
      return { ...prevState, pw: e.target.value };
    });
  };

  const handleFarmNameChange = (e) => {
    setJoinData((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  const navigate = useNavigate();

  const doJoin = (e) => {
    console.log(joinData);
    join(
      joinData,
      () => {
        navigate("/login");
      },
      (error) => {}
    );
    e.preventDefault();
  };

  return (
    <JoinContainer>
      <JoinBox>
        <Logo
          onClick={() => {
            navigate("/login");
          }}
          src={allclear}
        />
        <InputForm onSubmit={doJoin}>
          <Input
            type="text"
            value={joinData.id}
            onChange={handleIdChange}
            placeholder="아이디"
          />
          <Input
            type="password"
            value={joinData.pw}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <Input
            type="text"
            value={joinData.name}
            onChange={handleFarmNameChange}
            placeholder="농장이름"
          />
          <JoinButton onClick={doJoin}>회원가입</JoinButton>
        </InputForm>
      </JoinBox>
    </JoinContainer>
  );
}

const JoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const JoinBox = styled.div`
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
  cursor: pointer;
`;

const Input = styled.input`
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
  margin-top: 10px;
  padding: 5px;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

export default Login;
