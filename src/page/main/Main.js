import React, { useContext } from "react";
import { ContainerStyle } from "../../containerStyle";
import {
  GoMyPageBtn,
  Header,
  HeaderGreeting,
  Mains,
  ChatRoom,
  FirstChatWrap,
  FirstChat,
  BillAnalysisBtn,
  QuestionBtn,
  MyChatWrap,
  MyChat,
  KkeobiChatWrap,
  KkeobiChat,
  MainLogo,
} from "./MainStyle";
import Login from "../../component/Login";
import { userObjContext } from "../../App";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

function Main() {
  const nav = useNavigate();
  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  if (isPending) {
    return (
      <ContainerStyle>
        <Spin />
      </ContainerStyle>
    );
  }
  return data ? (
    <ContainerStyle>
      <Header>
        <HeaderGreeting>{data.displayName}</HeaderGreeting>
        <GoMyPageBtn>내 장독대 관리하기</GoMyPageBtn>
      </Header>
      <Mains>
        <MainLogo src={process.env.PUBLIC_URL + `/assets/Logo.png`} />
        <ChatRoom>
          <FirstChatWrap>
            <FirstChat>안녕하세요, 꺼비입니다! 무엇을 도와드릴까요?</FirstChat>
          </FirstChatWrap>
          <div>
            <BillAnalysisBtn>내 고지서 분석</BillAnalysisBtn>
            <QuestionBtn>질문하기</QuestionBtn>
          </div>
          <MyChatWrap>
            <MyChat>기후환경요금이 무슨 뜻이야?</MyChat>
          </MyChatWrap>
          <KkeobiChatWrap>
            <KkeobiChat>
              기후환경요금에 대해 설명해드릴게요!☺️ 깨끗하고 안전한 에너지
              제공에 소요되는 비용으로, "기후환경요금 단가*사용전력량"로
              계산해요. 2024년 0월 00일 기준 기후환경요금 단가는 9원입니다.더
              자세한 정보를 알고 싶다면 말해주세요!☺️
            </KkeobiChat>
          </KkeobiChatWrap>
        </ChatRoom>
      </Mains>
      <Login />
    </ContainerStyle>
  ) : (
    <ContainerStyle>
      <Header></Header>
      {/* <Mains>
        <MainGreeting>
          안녕하세요, 꺼비입니다! 무엇을 도와드릴까요?
        </MainGreeting>
        <MainBtnWrap>
          <BillAnalysisBtn onClick={() => nav("/chat")}>
            고지서 분석하기
          </BillAnalysisBtn>
          <QuestionBtn onClick={() => nav("/chat")}>질문하기</QuestionBtn>
        </MainBtnWrap>
      </Mains> */}
      <Login />
    </ContainerStyle>
  );
}

export default Main;
