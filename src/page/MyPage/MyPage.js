import React, { useContext, useEffect, useState } from "react";
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
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../../component/Loading";
import Login from "../../component/Login";
import { BackBtn } from "../../component/Chat/ChatStyle";

// 고지서 텍스트 추출한 거 가져오기
const getBillImgToJson = async (userObj, setBillPrice) => {
  const docRef = doc(db, "billImgToJson", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setBillPrice(docSnap.data());
  } else {
    return null;
  }
};

function MyPage() {
  const nav = useNavigate();

  // 유저 정보
  const { data: userObj, isPending } = useContext(userObjContext);

  // 이번 생활요금 state
  const [billPrice, setBillPrice] = useState(null);

  useEffect(() => {
    if (userObj) {
      getBillImgToJson(userObj, setBillPrice);
    }
  }, [userObj]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <ContainerStyle
      style={{
        background:
          "linear-gradient(180deg, #FFF4E1 0%, rgba(70.50, 190.33, 127.35, 0.21) 100%)",
      }}
    >
      <BackBtn
        style={{ marginTop: 10 }}
        src={process.env.PUBLIC_URL + `/assets/backBtn.svg`}
        onClick={() => nav("/")}
      ></BackBtn>
      <MyPageWrap>
        <Header></Header>
        <MyProfileWrap>
          <MyProfileImg src={userObj?.photoURL} />
          <MyProfileNameWrap>
            <MyProfileName Weight={600}>
              {userObj?.displayName}님의 장독대
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
                    <OneBillImg
                      src={process.env.PUBLIC_URL + "/assets/elecImg.svg"}
                    />
                    <OneBillPrice>33,472원</OneBillPrice>
                  </OneBillContentWrap>
                </OneBillBackground>
              </OneBillWrap>
              <OneBillWrap>
                <OneBillBackground>
                  <OneBillContentWrap>
                    <OneBillName>가스</OneBillName>
                    <OneBillImg
                      src={process.env.PUBLIC_URL + "/assets/gasImg.svg"}
                    />
                    <OneBillPrice>33,472원</OneBillPrice>
                  </OneBillContentWrap>
                </OneBillBackground>
              </OneBillWrap>
              <OneBillWrap>
                <OneBillBackground>
                  <OneBillContentWrap>
                    <OneBillName>수도</OneBillName>
                    <OneBillImg
                      src={process.env.PUBLIC_URL + "/assets/waterImg.svg"}
                    />
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
                      {userObj?.displayName}님은 전년 동월보다 공과금을{" "}
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
        <Login onClick={() => nav("/")} />
      </MyPageWrap>
    </ContainerStyle>
  );
}

export default MyPage;
