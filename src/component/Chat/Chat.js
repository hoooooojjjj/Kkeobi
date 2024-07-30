import React, { useContext, useEffect, useRef, useState } from "react";
import { userObjContext } from "../../App";
import { db } from "../../firebase";
import {
  Mains,
  ChatRoom,
  FirstChatWrap,
  FirstChat,
  MyChatWrap,
  MyChat,
  KkeobiChatWrap,
  KkeobiChat,
  MainLogo,
  BackBtn,
  PendingAnswer,
  OneChatWrap,
} from "../../page/main/MainStyle";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import SendMessage from "./Chating/SendMessage";
import CreateThread from "./Chating/CreateThread";

// 채팅 기록 가져오는 함수
const getChatLog = async (userObj) => {
  const docRef = doc(db, "chatLog", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// 채팅 기록 추가하는 함수
const insertChatLog = async ({ userObj, contents }) => {
  const chatLogRef = doc(db, "chatLog", userObj.uid);

  try {
    // 문서가 존재하는지 확인
    const docSnap = await getDoc(chatLogRef);
    if (docSnap.exists()) {
      // 문서가 존재하면 업데이트하여 content를 배열에 추가
      await updateDoc(chatLogRef, {
        content: arrayUnion(contents),
      });
    } else {
      // 문서가 존재하지 않으면 새로운 문서를 생성하고 content를 배열로 저장
      await setDoc(chatLogRef, { content: [contents] });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const Chat = ({ isChatRoomExpanded, setIsChatRoomExpanded, hidden }) => {
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);

  // 사용자가 업로드한 이미지 파일
  const [imgFile, setimgFile] = useState();

  // 답변 왔는지 여부
  const [isAnswerPending, setIsAnswerPending] = useState(false);

  // 현재 질문
  const [curContent, setCurContent] = useState("");

  // 마지막 채팅 ref
  const chatEndRef = useRef(null);

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  // 채팅 기록 가져오는 Query
  const { isPending, isError, data, error } = useQuery({
    queryKey: [userObj.uid + "'s chatLog"],
    queryFn: () => getChatLog(userObj),
  });

  // 채팅 추가 시 채팅 기록 업데이트하는 Mutation
  const mutation = useMutation({
    mutationFn: (variables) => insertChatLog(variables),
    onSuccess: () => {
      // 채팅 기록 다시 fetch
      queryClient.invalidateQueries(userObj.uid + "'s chatLog");
    },
    onError: (error) => {
      console.error("Error adding chat", error.message);
    },
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatRoomExpanded) {
      scrollToBottom();
    }
  }, [data, curContent, isChatRoomExpanded]);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Mains isChatRoomExpanded={isChatRoomExpanded}>
        <MainLogo src={process.env.PUBLIC_URL + `/assets/Logo.png`} />
        <BackBtn hidden={hidden} onClick={() => setIsChatRoomExpanded(false)}>
          뒤로가기
        </BackBtn>
        <ChatRoom>
          <FirstChatWrap>
            <FirstChat>안녕하세요, 꺼비입니다! 무엇을 도와드릴까요?</FirstChat>
          </FirstChatWrap>
          <CreateThread
            setIsAnswerPending={setIsAnswerPending}
            mutation={mutation}
            setimgFile={setimgFile}
            setIsChatRoomExpanded={setIsChatRoomExpanded}
          />
          {isPending ? (
            <Spin />
          ) : (
            data &&
            data.content.map((Chat, index) => (
              <OneChatWrap key={Chat.answer}>
                <MyChatWrap>
                  {Chat.question.startsWith("https://firebasestorage") ? (
                    <img
                      src={Chat.question}
                      alt="img"
                      style={{ width: "200px" }}
                    />
                  ) : (
                    <MyChat>{Chat.question}</MyChat>
                  )}
                </MyChatWrap>
                <KkeobiChatWrap ref={chatEndRef}>
                  <KkeobiChat>{Chat.answer}</KkeobiChat>
                </KkeobiChatWrap>
              </OneChatWrap>
            ))
          )}
          {isAnswerPending ? (
            <>
              <MyChatWrap>
                {curContent ? (
                  <MyChat>{curContent}</MyChat>
                ) : (
                  <img
                    src={imgFile}
                    alt="고지서 이미지"
                    style={{ width: "200px" }}
                  />
                )}
              </MyChatWrap>
              <KkeobiChatWrap ref={chatEndRef}>
                <PendingAnswer answerLoaded={!isAnswerPending}>
                  <span></span>
                  <span></span>
                  <span></span>
                </PendingAnswer>
              </KkeobiChatWrap>
            </>
          ) : (
            <></>
          )}
        </ChatRoom>
      </Mains>
      {isChatRoomExpanded ? (
        <SendMessage
          setCurContent={setCurContent}
          setIsAnswerPending={setIsAnswerPending}
          mutation={mutation}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Chat;
