import React, { useContext } from "react";
import { ContainerStyle } from "../../containerStyle";
import { userObjContext } from "../../App";
import { Spin } from "antd";
import {
  MyProfileImg,
  MyProfileWrap,
  MyProfileNameWrap,
  MyProfileName,
  Header,
  SeeAllBill,
  SeeAllBillTextWrap,
  SeeAllBillText,
  AllBillWrap,
  AllBill,
  OneBillWrap,
  OneBillBackground,
  OneBillContentWrap,
  OneBillName,
  OneBillImg,
  OneBillPrice,
  MonthBillWrap,
  GraphWrap,
  GraphBackground,
  GraphTitleWrap,
  GraphTitle,
  GraphContentWrap,
  GraphBarsWrap,
  OneGraphWrap,
  OneGraphBar,
  OneGraphBarPercent,
  OneGraphBarText,
  GraphExpainWrap,
  GraphExpain,
  GraphExpainText,
  GraphExpainDetailBtn,
  GraphExpainDetailBtnText,
  MyPageWrap,
} from "./MyPageStyle";
import { useNavigate } from "react-router-dom";

function MyPage() {
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

  return (
    <ContainerStyle>
      {" "}
      <MyPageWrap>
        <Header>
          <button onClick={() => nav("/")}>뒤로가기</button>
        </Header>

        <MyProfileWrap>
          <MyProfileImg src={data.photoURL} />
          <MyProfileNameWrap>
            <MyProfileName Weight={600}>
              {data.displayName}님의 장독대
            </MyProfileName>
          </MyProfileNameWrap>
        </MyProfileWrap>
        <SeeAllBill>
          <SeeAllBillTextWrap>
            <SeeAllBillText>이번 달 생활요금 한 눈에 보기 </SeeAllBillText>
          </SeeAllBillTextWrap>
          <AllBillWrap>
            <AllBill>
              <OneBillWrap>
                <OneBillBackground>
                  <OneBillContentWrap>
                    <OneBillName>전기</OneBillName>
                    <OneBillImg src="https://via.placeholder.com/29x29" />
                    <OneBillPrice>33,472원</OneBillPrice>
                  </OneBillContentWrap>
                </OneBillBackground>
              </OneBillWrap>
              <OneBillWrap>
                <OneBillBackground>
                  <OneBillContentWrap>
                    <OneBillName>가스</OneBillName>
                    <OneBillImg src="https://via.placeholder.com/29x29" />
                    <OneBillPrice>33,472원</OneBillPrice>
                  </OneBillContentWrap>
                </OneBillBackground>
              </OneBillWrap>
              <OneBillWrap>
                <OneBillBackground>
                  <OneBillContentWrap>
                    <OneBillName>수도</OneBillName>
                    <OneBillImg src="https://via.placeholder.com/29x29" />
                    <OneBillPrice>33,472원</OneBillPrice>
                  </OneBillContentWrap>
                </OneBillBackground>
              </OneBillWrap>
            </AllBill>
          </AllBillWrap>
        </SeeAllBill>
        <MonthBillWrap>
          <SeeAllBillTextWrap>
            <SeeAllBillText>내 전기/가스/수도 요금 추이 </SeeAllBillText>
          </SeeAllBillTextWrap>
          <GraphWrap>
            <GraphBackground>
              <GraphTitleWrap>
                <GraphTitle>월별 총 공과금 통계</GraphTitle>
              </GraphTitleWrap>
              <GraphContentWrap>
                <GraphBarsWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"30%"} />
                    </OneGraphBar>
                    <OneGraphBarText>1월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"40%"} />
                    </OneGraphBar>
                    <OneGraphBarText>2월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"70%"} />
                    </OneGraphBar>
                    <OneGraphBarText>3월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"10%"} />
                    </OneGraphBar>
                    <OneGraphBarText>4월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"40%"} />
                    </OneGraphBar>
                    <OneGraphBarText>5월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"80%"} />
                    </OneGraphBar>
                    <OneGraphBarText>6월</OneGraphBarText>
                  </OneGraphWrap>
                  <OneGraphWrap>
                    <OneGraphBar>
                      <OneGraphBarPercent percent={"20%"} />
                    </OneGraphBar>
                    <OneGraphBarText>7월</OneGraphBarText>
                  </OneGraphWrap>
                </GraphBarsWrap>
                <GraphExpainWrap>
                  <GraphExpain>
                    {/* <div
                    style={{
                      color: "#2E2E30",
                      fontSize: 20,
                      fontFamily: "Inter",
                      fontWeight: "700",
                      wordWrap: "break-word",
                    }}
                  >
                    11%
                  </div> */}
                    <GraphExpainText>
                      {data.displayName}님은 전년 동월보다 공과금을{" "}
                      <strong>11%</strong> 더 많이 내고 있어요.
                    </GraphExpainText>
                  </GraphExpain>
                  <GraphExpainDetailBtn>
                    <GraphExpainDetailBtnText>
                      자세히 보기
                    </GraphExpainDetailBtnText>
                  </GraphExpainDetailBtn>
                </GraphExpainWrap>
              </GraphContentWrap>
            </GraphBackground>
          </GraphWrap>
        </MonthBillWrap>
      </MyPageWrap>
    </ContainerStyle>
  );
}

export default MyPage;
