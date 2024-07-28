import styled from "@emotion/styled";

// 헤더
export const Header = styled.header({
  height: 100,
});

// 채팅방
export const ChatRoom = styled.div({
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
  width: 320,
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
});

// 채팅 내용 텍스트
export const ChatContentText = styled.p({
  fontSize: 16,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 정보 선택 버튼 wrap
export const InfoSelectBtnWrap = styled.div({
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
  borderRadius: 10,
  border: "1.12px #4753FF solid",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 정보 선택 버튼 텍스트
export const InfoSelectBtnText = styled.div({
  color: "#4753FF",
  fontSize: 16,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

// 해당 없음 버튼
export const NoneSelectBtn = styled.div({
  alignSelf: "stretch",
  flex: "1 1 0",
  paddingLeft: 91,
  paddingRight: 91,
  paddingTop: 8,
  paddingBottom: 8,
  background: "white",
  borderRadius: 10,
  border: "1.12px #787878 solid",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

// 해당 없음 버튼 텍스트
export const NoneSelectBtnText = styled.div({
  color: "#787878",
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
