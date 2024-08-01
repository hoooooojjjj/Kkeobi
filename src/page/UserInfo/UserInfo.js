import React, { useContext, useState } from "react";
import { ContainerStyle } from "../../containerStyle";
import {
  ChatWrap,
  ChatRoom,
  ChatContentWrap,
  Header,
  ChatContentText,
  InfoSelectBtnWrap,
  InfoSelectBtn,
  InfoSelectBtnText,
  NoneSelectBtn,
  NoneSelectBtnText,
  DetailStandard,
  ChatBox,
  SubmitBtn,
  SubmitBtnText,
  HeaderLogoWrap,
  HeaderLogo,
} from "./UserInfoStyle";
import { userObjContext } from "../../App";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import Loading from "../../component/Loading";

function UserInfo() {
  const nav = useNavigate();

  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    family: [],
    welfare: [],
  });

  // 대가족요금/생명유지장치 정보 선택 시
  const handleFamilyInfoSelect = (text) => {
    let newFamilyUserInfo;
    // 이미 선택된 정보일 경우 선택 해제
    if (userInfo.family.includes(text)) {
      newFamilyUserInfo = {
        ...userInfo,
        family: userInfo.family.filter((item) => item !== text),
      };
      // 선택되지 않은 정보일 경우 선택
    } else {
      newFamilyUserInfo = {
        ...userInfo,
        family: [...userInfo.family, text],
      };
    }
    setUserInfo(newFamilyUserInfo);
  };

  // 복지할인요금 정보 선택 시
  const handleWelfareInfoSelect = (text) => {
    let newWelfareUserInfo;
    // 이미 선택된 정보일 경우 선택 해제
    if (userInfo.welfare.includes(text)) {
      newWelfareUserInfo = {
        ...userInfo,
        welfare: userInfo.welfare.filter((item) => item !== text),
      };
      // 선택되지 않은 정보일 경우 선택
    } else {
      newWelfareUserInfo = {
        ...userInfo,
        welfare: [...userInfo.welfare, text],
      };
    }
    setUserInfo(newWelfareUserInfo);
  };

  // 사용자 정보 제출 시
  const handleSubmitUserInfo = async () => {
    const isConfirm = window.confirm("입력하신 정보로 제출하시겠습니까?");
    if (isConfirm) {
      // 사용자 정보 Firestore에 저장
      await setDoc(doc(db, "userInfo", data.uid), userInfo);
      nav("/");
    }
  };

  if (isPending) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header>
        <HeaderLogoWrap>
          <HeaderLogo
            src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.png`}
          />
        </HeaderLogoWrap>
      </Header>
      <ChatRoom>
        <ChatWrap>
          <ChatContentWrap>
            안녕하세요, {data.displayName}님. 회원 가입을 축하합니다!🥳 맞춤형
            관리를 위해 우선 몇 가지 질문을 하겠습니다.
          </ChatContentWrap>
        </ChatWrap>
        <ChatBox>
          <ChatWrap>
            <ChatContentWrap>
              <ChatContentText>
                다음 중 {data.displayName}님이 해당되는 사항을 모두
                선택해주세요. (대가족요금/생명유지장치)
              </ChatContentText>
              <InfoSelectBtnWrap>
                <InfoSelectBtn
                  onClick={() => handleFamilyInfoSelect("5인 이상 가구")}
                  style={{
                    backgroundColor: userInfo.family.includes("5인 이상 가구")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.family.includes("5인 이상 가구")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>5인 이상 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleFamilyInfoSelect("출산 가구")}
                  style={{
                    backgroundColor: userInfo.family.includes("출산 가구")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.family.includes("출산 가구") ? "white" : "",
                  }}
                >
                  <InfoSelectBtnText>출산 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleFamilyInfoSelect("3자녀 이상 가구")}
                  style={{
                    backgroundColor: userInfo.family.includes("3자녀 이상 가구")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.family.includes("3자녀 이상 가구")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>3자녀 이상 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleFamilyInfoSelect("생명 유지 장치")}
                  style={{
                    backgroundColor: userInfo.family.includes("생명 유지 장치")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.family.includes("생명 유지 장치")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>생명 유지 장치</InfoSelectBtnText>
                </InfoSelectBtn>
                <NoneSelectBtn
                  onClick={() => handleFamilyInfoSelect("해당 없음")}
                  style={{
                    backgroundColor: userInfo.family.includes("해당 없음")
                      ? "#787878"
                      : "",
                    color: userInfo.family.includes("해당 없음") ? "white" : "",
                  }}
                >
                  <NoneSelectBtnText>해당 없음</NoneSelectBtnText>
                </NoneSelectBtn>
              </InfoSelectBtnWrap>
            </ChatContentWrap>
          </ChatWrap>
          <DetailStandard>자세한 기준 보기</DetailStandard>
        </ChatBox>
        <ChatBox>
          <ChatWrap>
            <ChatContentWrap>
              <ChatContentText>
                다음 중 {data.displayName}님이 해당되는 사항을 모두
                선택해주세요. (복지할인요금)
              </ChatContentText>
              <InfoSelectBtnWrap>
                <InfoSelectBtn
                  onClick={() => handleWelfareInfoSelect("장애인")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("장애인")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("장애인") ? "white" : "",
                  }}
                >
                  <InfoSelectBtnText>장애인</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleWelfareInfoSelect("국가 유공자")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("국가 유공자")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("국가 유공자")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>국가 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleWelfareInfoSelect("상이 유공자")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("상이 유공자")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("상이 유공자")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>상이 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleWelfareInfoSelect("독립 유공자")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("독립 유공자")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("독립 유공자")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>독립 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() =>
                    handleWelfareInfoSelect("기초생활 (생계, 의료)")
                  }
                  style={{
                    backgroundColor: userInfo.welfare.includes(
                      "기초생활 (생계, 의료)"
                    )
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("기초생활 (생계, 의료)")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>기초생활 (생계, 의료)</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() =>
                    handleWelfareInfoSelect("기초생활 (주거, 교육)")
                  }
                  style={{
                    backgroundColor: userInfo.welfare.includes(
                      "기초생활 (주거, 교육)"
                    )
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("기초생활 (주거, 교육)")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>기초생활 (주거, 교육)</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn
                  onClick={() => handleWelfareInfoSelect("차상위계층")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("차상위계층")
                      ? "#FEC9B9"
                      : "",
                    color: userInfo.welfare.includes("차상위계층")
                      ? "white"
                      : "",
                  }}
                >
                  <InfoSelectBtnText>차상위계층</InfoSelectBtnText>
                </InfoSelectBtn>
                <NoneSelectBtn
                  onClick={() => handleWelfareInfoSelect("해당 없음")}
                  style={{
                    backgroundColor: userInfo.welfare.includes("해당 없음")
                      ? "#787878"
                      : "",
                    color: userInfo.welfare.includes("해당 없음")
                      ? "white"
                      : "",
                  }}
                >
                  <NoneSelectBtnText>해당 없음</NoneSelectBtnText>
                </NoneSelectBtn>
              </InfoSelectBtnWrap>
            </ChatContentWrap>
          </ChatWrap>
          <DetailStandard>자세한 기준 보기</DetailStandard>
        </ChatBox>
        <SubmitBtn onClick={handleSubmitUserInfo}>
          <SubmitBtnText>제출하기</SubmitBtnText>
        </SubmitBtn>
      </ChatRoom>
    </ContainerStyle>
  );
}

export default UserInfo;
