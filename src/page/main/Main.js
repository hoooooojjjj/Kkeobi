import React, { useContext, useEffect, useState } from "react";
import { ContainerStyle } from "../../containerStyle";
import {
  GoMyPageBtn,
  Header,
  LoginText,
  LoginTextWrap,
  LoginWrap,
  MainBackground,
  MainHello,
  MainHelloText,
  MainLogo,
  MainWrap,
} from "./MainStyle";
import Login from "../../component/Login";
import { userObjContext } from "../../App";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

function Main() {
  const nav = useNavigate();

  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  // 채팅방 확대 여부
  const [isChatRoomExpanded, setIsChatRoomExpanded] = useState(false);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isChatRoomExpanded) {
      // isChatRoomExpanded가 true가 되면 height를 0으로 트랜지션하고, 트랜지션 후 display: none 설정
      const timeout = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timeout);
    } else {
      // isChatRoomExpanded가 false가 되면 display를 flex로 설정하고 height를 180으로 트랜지션
      setHidden(false);
    }
  }, [isChatRoomExpanded]);

  if (isPending) {
    return (
      <ContainerStyle>
        <Spin />
      </ContainerStyle>
    );
  }
  return data ? (
    <ContainerStyle
      style={{
        background:
          "linear-gradient(180deg, #FFF4E1 0%, rgba(70.50, 190.33, 127.35, 0.21) 100%)",
      }}
    >
      <Header isChatRoomExpanded={isChatRoomExpanded} hidden={hidden}>
        {/* <HeaderGreeting>{data.displayName}님, 반갑습니다.</HeaderGreeting> */}
        <GoMyPageBtn onClick={() => nav("/mypage")}>
          내 장독대 관리하기
        </GoMyPageBtn>
      </Header>

      <Login isChatRoomExpanded={isChatRoomExpanded} />
    </ContainerStyle>
  ) : (
    <ContainerStyle
      style={{
        background:
          "linear-gradient(180deg, #FFF4E1 0%, rgba(70.50, 190.33, 127.35, 0.21) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainBackground>
        <MainLogo
          src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.png`}
        />
        <MainWrap>
          <MainHello>
            <MainHelloText>
              안녕하세요, 당신 곁의 생활요금 매니저, 꺼비입니다! 만나서
              반가워요☺️
            </MainHelloText>
          </MainHello>
          <LoginWrap>
            <LoginTextWrap>
              <LoginText>로그인/ 회원가입</LoginText>
              <Login
                style={{
                  alignSelf: "stretch",
                  height: 56,
                  background: "white",
                  borderRadius: 31,
                }}
              />
            </LoginTextWrap>
          </LoginWrap>
        </MainWrap>
      </MainBackground>
    </ContainerStyle>
  );
}

export default Main;
