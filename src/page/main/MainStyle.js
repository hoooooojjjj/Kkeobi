import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

// 헤더

export const Header = styled.header`
  display: flex;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  height: ${(props) => (props.isChatRoomExpanded ? 0 : 180)}px;
  justify-content: space-evenly;
  transition: height 0.5s ease-in-out;
`;

// 헤더 인사
export const HeaderGreeting = styled.p({});

// 헤더 내 장독대 관리하기 버튼
export const GoMyPageBtn = styled.div({});

export const BackBtn = styled.button((props) => ({
  display: props.hidden ? "block" : "none",
  transition: "display 0.5s ease-in-out",
  position: "absolute",
  top: 10,
  left: 20,
}));

// 메인
export const Mains = styled.main((props) => ({
  width: 375,
  height: props.isChatRoomExpanded ? 600 : 380,
  overflowY: "auto",
  boxSizing: "border-box",
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 52,
  paddingBottom: 52,
  background: "white",
  boxShadow: "0px -1px 10.199999809265137px rgba(0, 0, 0, 0.25)",
  borderRadius: 31,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  transition: "height 0.5s ease-in-out", // Add transition property for smooth animation
  paddingBottom: props.isChatRoomExpanded ? 80 : 20,
}));

// 메인 로고
export const MainLogo = styled.img({
  width: 150,
  position: "absolute",
  top: -40,
  left: 110,
});

// 메인 내 채팅방
export const ChatRoom = styled.div({
  width: 313,
  flexDirection: "column",
  gap: 14,
  display: "inline-flex",
});

// 메인 첫 채팅창 wrap
export const FirstChatWrap = styled.div({
  padding: 11,
  background: "#4753FF",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 메인 첫 채팅창
export const FirstChat = styled.div({
  color: "white",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// 하나의 채팅 뭉치 wrap
export const OneChatWrap = styled.div({
  flexDirection: "column",
  // justifyContent: "flex-start",
  alignItems: "center",
  gap: 15,
  display: "flex",
});

// 내 채팅 wrap
export const MyChatWrap = styled.div({
  alignSelf: "flex-end",
  padding: 11,
  background: "#F3F3F3",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 내 채팅
export const MyChat = styled.div({
  color: "black",
  maxWidth: 250,
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// 꺼비 채팅 wrap
export const KkeobiChatWrap = styled.div({
  alignSelf: "flex-start",
  padding: 11,
  background: "#4753FF",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
});

// 꺼비 채팅
export const KkeobiChat = styled.div({
  maxWidth: 250,
  color: "white",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// 메인 내 고지서 분석 버튼
export const BillAnalysisBtn = styled.button({});

// 메인 질문하기 버튼
export const QuestionBtn = styled.button({});

// 메시지 input wrap
export const MessageInputWrap = styled.div({
  position: "absolute",
  left: 0,
  bottom: 0,
  backgroundColor: "lightGray",
  padding: 5,
  width: "97%",
  justifyContent: "center",
  alignItems: "center",
  display: "inline-flex",
  zIndex: 9999, // Add a higher z-index value to make sure it stays on top
});

export const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: #4753ff;
  color: white;
  border-radius: 20px;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b48cc;
  }

  &:active {
    background-color: #2f3a99;
  }
`;

// 메시지 input
export const MessageInput = styled.input({
  width: "70%",
  border: "1px solid #4753FF",
  borderRadius: 20,
  padding: 10,
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  outline: "none",
});
// 메시지 보내기 버튼
export const SendMessageBtn = styled.button({
  width: "30%",
  marginLeft: 10,
  background: "#4753FF",
  color: "white",
  borderRadius: 20,
  padding: 10,
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  border: "none",
  outline: "none",
});

// 구글 로그인 이미지
export const GoogleLoginImg = styled.img({
  width: 200,
});

export const PendingAnswer = styled.div`
  z-index: 100;
  opacity: ${(props) => (props.answerLoaded ? 0 : 1)};
  inset: 0;
  width: 100%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 50%;
    animation: loading 1s infinite linear;
  }
  & > span:nth-of-type(0) {
    margin: 5px;
    animation-delay: 0s;
    background-color: red;
  }
  & > span:nth-of-type(1) {
    margin: 5px;
    animation-delay: 0.2s;
    background-color: dodgerblue;
  }
  & > span:nth-of-type(2) {
    margin: 5px;
    animation-delay: 0.4s;
    background-color: greenyellow;
  }
  transition: opacity 0.1s ease-in-out;
  ${(props) =>
    !props.answerLoaded &&
    `
    opacity: 1;
  `}

  @keyframes loading {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;
