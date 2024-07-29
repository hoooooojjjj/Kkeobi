import styled from "@emotion/styled";

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
  position: "relative",
  transition: "height 0.5s ease-in-out", // Add transition property for smooth animation
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

// 구글 로그인 이미지
export const GoogleLoginImg = styled.img({
  width: 200,
});
