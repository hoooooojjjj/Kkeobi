import styled from "@emotion/styled";

export const Header = styled.header({
  height: 20,
});

export const MyPageWrap = styled.div({
  width: 375,
  height: 600,
  overflowY: "auto",
});

export const MyProfileWrap = styled.section({
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

export const MyProfileImg = styled.img({
  width: 58,
  height: 58,
  background: "#F3F3F3",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
  borderRadius: 9999,
});

export const MyProfileNameWrap = styled.div({
  height: 30,
});

export const MyProfileName = styled.span((props) => ({
  color: "black",
  fontSize: 17,
  fontFamily: "Inter",
  fontWeight: props.Weight,

  wordWrap: "break-word",
}));

export const SeeAllBill = styled.section({
  height: 158,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  display: "flex",
});

export const SeeAllBillTextWrap = styled.div({
  alignSelf: "flex-start",
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
});

export const SeeAllBillText = styled.div({
  color: "#3D3D3D",
  fontSize: 12,
  fontFamily: "Inter",
  fontWeight: "300",
  wordWrap: "break-word",
});

export const AllBillWrap = styled.div({
  width: 300,
  height: 123,
  position: "relative",
});

export const AllBill = styled.div({
  width: 375,
  height: 123,
  left: 0,
  top: 0,
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  display: "inline-flex",
});

export const OneBillWrap = styled.div({
  justifyContent: "flex-start",
  alignItems: "center",
  margin: 3,
  display: "flex",
});

export const OneBillBackground = styled.div({
  width: 80,
  height: 90,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 13,
  paddingBottom: 13,
  background: "white",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: 17,
  justifyContent: "flex-start",
  alignItems: "center",
  display: "flex",
});

export const OneBillContentWrap = styled.div({
  width: 71,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 14,
  display: "inline-flex",
});

export const OneBillName = styled.div({
  alignSelf: "stretch",
  height: 18,
  textAlign: "center",
  color: "black",
  fontSize: 14,
  fontFamily: "Inter",
  fontWeight: "500",
  wordWrap: "break-word",
});

export const OneBillImg = styled.img({
  width: 29,
  height: 29,
});

export const OneBillPrice = styled.div({
  alignSelf: "stretch",
  height: 18,
  textAlign: "center",
  color: "black",
  fontSize: 15,
  fontFamily: "Inter",
  fontWeight: "600",
  wordWrap: "break-word",
});

// 월별 총 공과금 통계
export const MonthBillWrap = styled.section({
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  display: "inline-flex",
});

// 그래프 wrap
export const GraphWrap = styled.div({
  width: 300,
  height: 304,
  position: "relative",
});

export const GraphBackground = styled.div({
  width: 271.56,
  height: 276.74,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 5,
  display: "inline-flex",
  background: "white",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: 16,
  padding: 10,
});

export const GraphTitleWrap = styled.div({
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  display: "inline-flex",
});

export const GraphTitle = styled.div({
  color: "#2E2E30",
  fontSize: 14,
  fontFamily: "Inter",
  fontWeight: "700",
  wordWrap: "break-word",
});

export const GraphContentWrap = styled.div({
  alignSelf: "stretch",
  height: 246.34,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 27,
  display: "flex",
});

export const GraphBarsWrap = styled.div({
  alignSelf: "stretch",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 14,
  display: "inline-flex",
});

export const OneGraphWrap = styled.div({
  width: 27.08,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 4,
  display: "inline-flex",
});

export const OneGraphBar = styled.div({
  alignSelf: "stretch",
  height: 137,
  background: "#E9ECF1",
  borderRadius: 2.76,
  justifyContent: "flex-start",
  alignItems: "flex-end",
  gap: 10,
  display: "inline-flex",
});

export const OneGraphBarPercent = styled.div((props) => ({
  width: 27.08,
  height: props.percent,
  background: "#4753FF",
  borderRadius: 2.76,
}));

export const OneGraphBarText = styled.div({
  textAlign: "center",
  color: "#2E2E30",
  fontSize: 10,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

export const GraphExpainWrap = styled.div({
  height: 66.34,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 10,
  display: "flex",
});

export const GraphExpain = styled.div({
  alignSelf: "stretch",
  height: 25,
  justifyContent: "center",
  alignItems: "flex-end",
  gap: 5,
  display: "inline-flex",
});

export const GraphExpainText = styled.div({
  width: 180,
  height: 27,
  color: "#767676",
  fontSize: 12,
  fontFamily: "Inter",
  fontWeight: "400",
  wordWrap: "break-word",
});

export const GraphExpainDetailBtn = styled.button({
  width: 183.32,
  height: 31.34,
  padding: 10,
  background: "#D5E5FF",
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  display: "inline-flex",
  border: "none",
});

export const GraphExpainDetailBtnText = styled.div({
  color: "#4753FF",
  fontSize: 14,
  fontFamily: "Inter",
  fontWeight: "700",
  wordWrap: "break-word",
});
