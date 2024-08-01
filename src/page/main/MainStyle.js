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
export const HeaderGreeting = styled.p({
  height: 30,
});

// 헤더 내 장독대 관리하기 버튼
export const GoMyPageBtn = styled.button({
  height: 30,
});

// 하나의 채팅 뭉치 wrap
export const OneChatWrap = styled.div({
  flexDirection: "column",
  // justifyContent: "flex-start",
  alignItems: "center",
  gap: 15,
  display: "flex",
});

// 메인 내 고지서 분석 버튼
export const BillAnalysisBtn = styled.button({});

// 구글 로그인 이미지
export const GoogleLoginImg = styled.img({
  width: 200,
});
