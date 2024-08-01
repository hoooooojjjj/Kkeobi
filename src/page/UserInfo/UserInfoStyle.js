import styled from "@emotion/styled";

// 헤더
export const Header = styled.header({
  width: "100%",
  height: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// 헤더 로고 wrap
export const HeaderLogoWrap = styled.div({
  width: 68,
  height: 68,
  background: "#F3F3F3",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
  borderRadius: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// 헤더 로고
export const HeaderLogo = styled.img({
  width: 70,
  borderRadius: 9999,
});

// 채팅방
export const ChatRoom = styled.div({
  height: 630,
  padding: 10,
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
});

// 채팅창 wrap
export const ChatBox = styled.div({
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  flexDirection: "column",
});

// 채팅방 내 채팅창
export const ChatWrap = styled.div({
  width: 302,
  marginTop: 10,
  padding: 10,
  background: "#F3F3F3",
  boxShadow: "0px 4px 5px -2px rgba(0, 0, 0, 0.12)",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
});
// 채팅 내용 wrap
export const ChatContentWrap = styled.div({
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 8,
  display: "flex",
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 채팅 내용 텍스트
export const ChatContentText = styled.p({
  fontSize: 16,
  margin: 0,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 정보 선택 버튼 wrap
export const InfoSelectBtnWrap = styled.div({
  cursor: "pointer",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 8,
  display: "flex",
});

// 정보 선택 버튼
export const InfoSelectBtn = styled.div({
  alignSelf: "stretch",
  flex: "1 1 0",
  paddingLeft: 78,
  paddingRight: 78,
  paddingTop: 8,
  paddingBottom: 8,
  background: "white",
  color: "#4753FF",
  "&:hover": {
    background: "#D7D7D7",
  },
  borderRadius: 10,
  border: "1.12px #FEC9B9 solid",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 정보 선택 버튼 텍스트
export const InfoSelectBtnText = styled.div({
  fontSize: 16,
  color: "#1E1E1E",
  fontFamily: "Inter",
  wordWrap: "break-word",
});

// 해당 없음 버튼
export const NoneSelectBtn = styled.div({
  cursor: "pointer",
  alignSelf: "stretch",
  flex: "1 1 0",
  paddingLeft: 91,
  paddingRight: 91,
  paddingTop: 8,
  paddingBottom: 8,
  background: "white",
  color: "#787878",
  "&:hover": {
    background: "#D7D7D7",
  },
  borderRadius: 10,
  border: "1.12px #787878 solid",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 해당 없음 버튼 텍스트
export const NoneSelectBtnText = styled.div({
  fontSize: 16,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 자세한 기준 보기
export const DetailStandard = styled.div({
  fontSize: 12,
  color: "#787878",
  marginTop: 10,
});

// sumbit 버튼
export const SubmitBtn = styled.button({
  cursor: "pointer",
  width: 340,
  alignSelf: "stretch",
  flex: "1 1 0",
  paddingLeft: 91,
  paddingRight: 91,
  paddingTop: 8,
  paddingBottom: 8,
  background: "#4D956D",
  borderRadius: 10,
  border: "1.12px #787878 solid",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// sumbit 버튼 텍스트
export const SubmitBtnText = styled.div({
  color: "white",
  fontSize: 16,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});
