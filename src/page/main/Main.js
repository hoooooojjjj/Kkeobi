import React, { useContext, useEffect, useState } from "react";
import { ContainerStyle, Iphone } from "../../containerStyle";
import {
  CanAnswerText1,
  CanAnswerText2,
  CanAnswerTextTitle,
  CanAnswerTextWrap,
  CanAnswerWrap,
  ChevronRight,
  Header,
  HeaderLogoText,
  Icon,
  MainBackground,
  MainLogo,
  Mainwrap,
  Question,
  SelectBillBtn,
  SelectBillBtnImg,
  SelectBillBtnText,
  SelectBillBtnTextWrap,
  SelectBillBtnWrap,
  SelectBillText,
  SelectBillTextWrap,
  SelectBillWrap,
} from "./MainStyle";
import { userObjContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import BeforeLoginMain from "./BeforeLoginMain";
import Chat from "../../component/Chat/Chat";

function Main() {
  const nav = useNavigate();

  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  // 각 고지서 선택 시 채팅방으로 이동
  const [ChatNavigation, setChatNavigation] = useState(null);

  if (isPending) {
    return <Loading />;
  }
  return data ? (
    !ChatNavigation ? (
      <ContainerStyle
        style={{
          background:
            "linear-gradient(180deg, #FFF4E1 0%, rgba(70.50, 190.33, 127.35, 0.21) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Header
          style={{
            width: "100%",
            margin: "10px 30px 10px 30px",
            height: 50,
            Direction: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <img
            style={{ marginLeft: 5, marginTop: 5 }}
            src={process.env.PUBLIC_URL + "/assets/LogoText.svg"}
          />
          {/* <HeaderLogoText>꺼비</HeaderLogoText> */}
        </Header>
        <MainBackground>
          <MainLogo
            src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.svg`}
          />
          <Mainwrap>
            <SelectBillWrap>
              <SelectBillTextWrap>
                <SelectBillText>
                  안녕하세요, {data?.displayName}님! 원하는 서비스를 선택하시면
                  채팅을 시작하실 수 있어요. 무엇을 도와드릴까요?
                </SelectBillText>
              </SelectBillTextWrap>
              <SelectBillBtnWrap>
                <SelectBillBtn onClick={() => setChatNavigation("electricity")}>
                  <SelectBillBtnTextWrap>
                    <SelectBillBtnText>전기</SelectBillBtnText>
                    <SelectBillBtnImg
                      src={process.env.PUBLIC_URL + `/assets/elecImg.svg`}
                    />
                  </SelectBillBtnTextWrap>
                </SelectBillBtn>
                <SelectBillBtn onClick={() => setChatNavigation("gas")}>
                  <SelectBillBtnTextWrap>
                    <SelectBillBtnText>가스</SelectBillBtnText>
                    <SelectBillBtnImg
                      src={process.env.PUBLIC_URL + `/assets/gasImg.svg`}
                    />
                  </SelectBillBtnTextWrap>
                </SelectBillBtn>
                <SelectBillBtn onClick={() => setChatNavigation("water")}>
                  <SelectBillBtnTextWrap>
                    <SelectBillBtnText>수도</SelectBillBtnText>
                    <SelectBillBtnImg
                      src={process.env.PUBLIC_URL + `/assets/waterImg.svg`}
                    />
                  </SelectBillBtnTextWrap>
                </SelectBillBtn>
              </SelectBillBtnWrap>
            </SelectBillWrap>
            <CanAnswerWrap>
              <CanAnswerTextWrap>
                <CanAnswerTextTitle>
                  꺼비는 이런 것도 대답할 수 있어요
                </CanAnswerTextTitle>
                <CanAnswerText1>
                  <CanAnswerText2>
                    <ChevronRight>
                      <Icon
                        src={
                          process.env.PUBLIC_URL + `/assets/chevron-right.svg`
                        }
                      ></Icon>
                    </ChevronRight>
                    <Question>
                      “내가 보낸 고지서 이미지 분석해서 좀 봐줘!”
                    </Question>
                  </CanAnswerText2>
                </CanAnswerText1>
                <CanAnswerText1>
                  <CanAnswerText2>
                    <ChevronRight>
                      <Icon
                        src={
                          process.env.PUBLIC_URL + `/assets/chevron-right.svg`
                        }
                      ></Icon>
                    </ChevronRight>
                    <Question>“내가 놓치고 있는 할인혜택이 뭐야?”</Question>
                  </CanAnswerText2>
                </CanAnswerText1>
                <CanAnswerText1>
                  <CanAnswerText2>
                    <ChevronRight>
                      <Icon
                        src={
                          process.env.PUBLIC_URL + `/assets/chevron-right.svg`
                        }
                      ></Icon>
                    </ChevronRight>
                    <Question>“이번 달은 왜 이렇게 많이 나온 거지?”</Question>
                  </CanAnswerText2>
                </CanAnswerText1>
                <CanAnswerText1>
                  <CanAnswerText2>
                    <ChevronRight>
                      <Icon
                        src={
                          process.env.PUBLIC_URL + `/assets/chevron-right.svg`
                        }
                      ></Icon>
                    </ChevronRight>
                    <Question>“기후환경요금이 뭐야?”</Question>
                  </CanAnswerText2>
                </CanAnswerText1>
              </CanAnswerTextWrap>
            </CanAnswerWrap>
          </Mainwrap>
        </MainBackground>
        <div
          className="Frame63"
          onClick={() => nav("/mypage")}
          style={{
            cursor: "pointer",
            boxSizing: "border-box",
            width: "90%",
            marginTop: 20,
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 25,
            paddingBottom: 25,
            background: "white",
            boxShadow: "0px 0px 10.199999809265137px rgba(0, 0, 0, 0.25)",
            borderRadius: 26,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 10,
            display: "inline-flex",
          }}
        >
          <div
            className="Frame62"
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 26,
              display: "inline-flex",
            }}
          >
            <div
              className="Frame60"
              style={{
                width: 202,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  height: 20,
                  color: "black",
                  fontSize: 20,
                  fontFamily: "NEXON Lv1 Gothic OTF",
                  fontWeight: "700",
                  fontFamily: "Inter",
                  marginBottom: 10,
                  wordWrap: "break-word",
                }}
              >
                내 장독대 관리하기 <br />
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  height: 16,
                  color: "#626262",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "300",
                  wordWrap: "break-word",
                }}
              >
                전기, 가스, 수도요금 데이터 통합관리
              </div>
            </div>
            <div
              className="Frame61"
              style={{
                flex: "1 1 0",
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <img
                className="Subtract"
                style={{ width: 80, height: 40, borderRadius: 0.25 }}
                src={process.env.PUBLIC_URL + `/assets/goMy.svg`}
              />
            </div>
          </div>
        </div>
      </ContainerStyle>
    ) : (
      <Chat
        ChatNavigation={ChatNavigation}
        setChatNavigation={setChatNavigation}
      />
    )
  ) : (
    <BeforeLoginMain />
  );
}

export default Main;
