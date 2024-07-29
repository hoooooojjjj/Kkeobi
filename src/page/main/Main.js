import React, { useContext } from "react";
import { ContainerStyle } from "../../containerStyle";
import {
  GoMyPageBtn,
  Header,
  HeaderGreeting,
  MainGreeting,
  Mains,
  MainBtnWrap,
  BillAnalysisBtn,
  QuestionBtn,
} from "./MainStyle";
import Login from "../../component/Login";
import { userObjContext } from "../../App";
import { Spin } from "antd";

function Main() {
  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  if (isPending) {
    return (
      <ContainerStyle>
        <Spin />
      </ContainerStyle>
    );
  }
  return (
    <ContainerStyle>
      <Header>
        <HeaderGreeting>{data && data.displayName}</HeaderGreeting>
        <GoMyPageBtn>내 장독대 관리하기</GoMyPageBtn>
      </Header>
      <Mains>
        <MainGreeting>
          안녕하세요, 꺼비입니다! 무엇을 도와드릴까요?
        </MainGreeting>
        <MainBtnWrap>
          <BillAnalysisBtn>고지서 분석하기</BillAnalysisBtn>
          <QuestionBtn>질문하기</QuestionBtn>
        </MainBtnWrap>
      </Mains>
      <Login />
    </ContainerStyle>
  );
}

export default Main;
