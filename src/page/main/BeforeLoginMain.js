import React from "react";
import Login from "../../component/Login";
import { ContainerStyle } from "../../containerStyle";
import {
  LoginText,
  LoginTextWrap,
  LoginWrap,
  MainBackground,
  MainHello,
  MainHelloText,
  MainLogo,
  MainWrap,
} from "./MainStyle";

function BeforeLoginMain() {
  return (
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
          src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.svg`}
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

export default BeforeLoginMain;
