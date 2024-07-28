import React from "react";
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
} from "./UserInfoStyle";

function UserInfo() {
  return (
    <ContainerStyle>
      <Header></Header>
      <ChatRoom>
        <ChatWrap>
          <ChatContentWrap>
            안녕하세요, 홍길동님. 회원 가입을 축하합니다!🥳 맞춤형 관리를 위해
            우선 몇 가지 질문을 하겠습니다.
          </ChatContentWrap>
        </ChatWrap>
        <ChatBox>
          <ChatWrap>
            <ChatContentWrap>
              <ChatContentText>
                다음 중 000님이 해당되는 사항을 모두 선택해주세요.
                (대가족요금/생명유지장치)
              </ChatContentText>
              <InfoSelectBtnWrap>
                <InfoSelectBtn>
                  <InfoSelectBtnText>5인 이상 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>출산 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>3자녀 이상 가구</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>생명 유지 장치</InfoSelectBtnText>
                </InfoSelectBtn>
                <NoneSelectBtn>
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
                다음 중 000님이 해당되는 사항을 모두 선택해주세요.
                (복지할인요금)
              </ChatContentText>
              <InfoSelectBtnWrap>
                <InfoSelectBtn>
                  <InfoSelectBtnText>장애인</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>국가 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>상이 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>독립 유공자</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>기초생활 (생계, 의료)</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>기초생활 (주거, 교육)</InfoSelectBtnText>
                </InfoSelectBtn>
                <InfoSelectBtn>
                  <InfoSelectBtnText>차상위계층</InfoSelectBtnText>
                </InfoSelectBtn>
                <NoneSelectBtn>
                  <NoneSelectBtnText>해당 없음</NoneSelectBtnText>
                </NoneSelectBtn>
              </InfoSelectBtnWrap>
            </ChatContentWrap>
          </ChatWrap>
          <DetailStandard>자세한 기준 보기</DetailStandard>
        </ChatBox>
        <SubmitBtn>
          <SubmitBtnText>제출하기</SubmitBtnText>
        </SubmitBtn>
      </ChatRoom>
    </ContainerStyle>
  );
}

export default UserInfo;
