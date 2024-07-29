import React, { useContext, useEffect, useState } from "react";
import { ContainerStyle } from "../../containerStyle";
import {
  GoMyPageBtn,
  Header,
  HeaderGreeting,
  Mains,
  ChatRoom,
  FirstChatWrap,
  FirstChat,
  BillAnalysisBtn,
  QuestionBtn,
  MyChatWrap,
  MyChat,
  KkeobiChatWrap,
  KkeobiChat,
  MainLogo,
} from "./MainStyle";
import Login from "../../component/Login";
import { userObjContext } from "../../App";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../../component/OpenAI";

function Main() {
  const nav = useNavigate();

  // 유저 정보
  const { data, isPending } = useContext(userObjContext);

  // 채팅방 확대 여부
  const [isChatRoomExpanded, setIsChatRoomExpanded] = useState(false);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isChatRoomExpanded) {
      // 트랜지션 후 display: none 설정
      const timeout = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timeout);
    } else {
      // 트랜지션 전에 display: flex 설정
      setHidden(false);
    }
  }, [isChatRoomExpanded]);

  if (isPending) {
    return (
      <ContainerStyle>
        <Spin />
      </ContainerStyle>
    );
  }
  return data ? (
    <ContainerStyle>
      <Header isChatRoomExpanded={isChatRoomExpanded} hidden={hidden}>
        <HeaderGreeting>{data.displayName}</HeaderGreeting>
        <GoMyPageBtn>내 장독대 관리하기</GoMyPageBtn>
      </Header>
      <ChatComponent
        isChatRoomExpanded={isChatRoomExpanded}
        setIsChatRoomExpanded={setIsChatRoomExpanded}
      />
      <Login isChatRoomExpanded={isChatRoomExpanded} />
    </ContainerStyle>
  ) : (
    <ContainerStyle>
      <Header></Header>
      {/* <ChatComponent /> */}
      <Login />
    </ContainerStyle>
  );
}

export default Main;
