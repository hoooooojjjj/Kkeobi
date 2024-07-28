import styled from "@emotion/styled";

// 헤더
export const Header = styled.header({
  display: "flex",
  justifyContent: "space-evenly",
});

// 헤더 인사
export const HeaderGreeting = styled.p({});

// 헤더 내 장독대 관리하기 버튼
export const GoMyPageBtn = styled.div({});

// 메인
export const Mains = styled.main({
  display: "flex",
  flexDirection: "column",
});

// 메인 인사
export const MainGreeting = styled.div({});

// 메인 버튼 wrap
export const MainBtnWrap = styled.div({
  display: "flex",
});

// 메인 내 고지서 분석 버튼
export const BillAnalysisBtn = styled.button({});

// 메인 질문하기 버튼
export const QuestionBtn = styled.button({});

// 구글 로그인 이미지
export const GoogleLoginImg = styled.img({
  width: 200,
});
