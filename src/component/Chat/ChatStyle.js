import styled from "@emotion/styled";

// 헤더
export const Header = styled.header({
  width: 371,
  height: 43,
  background: "#4D956D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const HeaderTitle = styled.div({
  display: "flex",
});

export const HeaderTitleImg = styled.img({
  width: 18,
  height: 18,
});

// 뒤로가기 버튼
export const BackBtn = styled.img({
  cursor: "pointer",
  position: "absolute",
  left: 10,
  background: "transparent",
  border: "none",
  outline: "none",
});
// 메인
export const Mains = styled.main(() => ({
  width: 371,
  height: 555,
  padding: 10,
  overflowY: "auto",
  boxSizing: "border-box",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  msOverflowStyle: "none" /* Internet Explorer */,
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

// 메인 내 채팅방
export const ChatRoom = styled.div({
  width: "100%",
  flexDirection: "column",
  gap: 14,
  display: "inline-flex",
});

// 메인 첫 채팅창 wrap
export const FirstChatWrap = styled.div({
  width: "85%",
  padding: 11,
  background: "#FEC9B9",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
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
  // color: "white",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// 내 채팅 wrap
export const MyChatWrap = styled.div({
  alignSelf: "flex-end",
  padding: 11,
  background: "#F3F3F3",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
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
  background: "#FEC9B9",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
});

// 꺼비 채팅
export const KkeobiChat = styled.div({
  maxWidth: 250,
  color: "black",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// 메인 로고 wrap
export const MainLogoWrap = styled.div({
  width: 40,
  height: 40,
  background: "#F3F3F3",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
  borderRadius: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px 0 0 0",
});
// 메인 로고
export const MainLogo = styled.img({
  width: 41,
  height: 41,
});

export const PendingAnswer = styled.div`
  z-index: 100;
  opacity: ${(props) => (props.answerLoaded ? 0 : 1)};
  inset: 0;

  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: gray;
    border-radius: 50%;
    animation: loading 1s infinite linear;
  }
  & > span:nth-of-type(0) {
    margin: 5px;
    animation-delay: 0s;
    background-color: black;
  }
  & > span:nth-of-type(1) {
    margin: 5px;
    animation-delay: 0.2s;
    background-color: black;
  }
  & > span:nth-of-type(2) {
    margin: 5px;
    animation-delay: 0.4s;
    background-color: black;
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

// 하나의 채팅 뭉치 wrap
export const OneChatWrap = styled.div({
  flexDirection: "column",
  // justifyContent: "flex-start",
  alignItems: "center",
  gap: 15,
  display: "flex",
});

// 메인 질문하기 버튼
export const QuestionBtn = styled.button({});

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

// 메시지 input wrap
export const MessageInputWrap = styled.form({
  borderBottomLeftRadius: 49,
  borderBottomRightRadius: 49,
  height: 78,
  position: "absolute",
  left: 0,
  bottom: 0,
  backgroundColor: "#F3F3F3",
  padding: 5,
  width: "97%",
  justifyContent: "center",
  alignItems: "center",
  display: "inline-flex",
  zIndex: 9999, // Add a higher z-index value to make sure it stays on top
});

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
  width: "20%",
  marginLeft: 10,
  background: "#4D956D",
  color: "white",
  borderRadius: 20,
  padding: 10,
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  border: "none",
  outline: "none",
});

export const OpenBillAnalBtn = styled.div({
  marginRight: 10,
  width: 132,
  paddingLeft: 35,
  paddingRight: 0,
  paddingTop: 11,
  paddingBottom: 11,
  background: "#FEFEE4",
  borderRadius: 15,
  border: "1px #4D956D solid",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
});

export const OpenBillAnalTextWrap = styled.div({
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  display: "inline-flex",
});

export const OpenBillAnalText = styled.label({
  paddingTop: 2,
  textAlign: "center",
  color: "#303030",
  fontSize: 13,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});
