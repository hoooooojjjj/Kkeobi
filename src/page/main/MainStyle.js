import styled from "@emotion/styled";

// 헤더
export const Header = styled.header`
  display: flex;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  height: ${(props) => (props.isChatRoomExpanded ? 0 : 180)}px;
  justify-content: space-evenly;
  transition: height 0.5s ease-in-out;
`;

// MainBackground
export const MainBackground = styled.main({
  width: "85%",
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 50,
  paddingBottom: 13,
  background: "white",
  borderRadius: 31,
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
  position: "relative",
  boxShadow: "0px 0px 10.199999809265137px rgba(0, 0, 0, 0.25)",
});

// 메인 로고 이미지
export const MainLogo = styled.img({
  width: 150,
  position: "absolute",
  top: -40,
});

// main wrap
export const MainWrap = styled.div({
  alignSelf: "stretch",
  flex: "1 1 0",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 18,
  display: "flex",
});

// main 인사
export const MainHello = styled.div({
  alignSelf: "stretch",
  paddingLeft: 11,
  paddingRight: 11,
  paddingTop: 9,
  paddingBottom: 9,
  background: "#FEC9B9",
  boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.25)",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// main 인사 텍스트
export const MainHelloText = styled.div({
  color: "black",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

// Main 내 로그인 wrap
export const LoginWrap = styled.div({
  alignSelf: "stretch",
  // height: 120,
  paddingLeft: 35,
  paddingRight: 35,
  paddingTop: 34,
  paddingBottom: 34,
  background: "#FEFAE4",
  borderRadius: 27,
  border: "1px #4D956D solid",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "flex",
});

// 로그인/회원가입 텍스트 wrap
export const LoginTextWrap = styled.div({
  height: 80,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 6,
  display: "flex",
});

// 로그인/회원가입 텍스트
export const LoginText = styled.div({
  alignSelf: "stretch",
  height: 19,
  textAlign: "center",
  color: "black",
  fontSize: 16,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 헤더 내 장독대 관리하기 버튼
export const GoMyPageBtn = styled.button({
  height: 30,
});

// 메인 내 고지서 분석 버튼
export const BillAnalysisBtn = styled.button({});

// 구글 로그인 이미지
export const GoogleLoginImg = styled.img({
  width: 200,
  "&:hover": {
    transform: "scale(1.01)",
  },
});
