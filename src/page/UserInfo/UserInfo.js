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
      </ChatRoom>
    </ContainerStyle>
  );
}

export default UserInfo;
