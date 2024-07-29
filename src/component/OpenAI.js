import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { userObjContext } from "../App";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  Mains,
  ChatRoom,
  FirstChatWrap,
  FirstChat,
  QuestionBtn,
  MyChatWrap,
  MyChat,
  KkeobiChatWrap,
  KkeobiChat,
  MainLogo,
  BackBtn,
  MessageInput,
  SendMessageBtn,
  MessageInputWrap,
  StyledLabel,
  PendingAnswer,
  OneChatWrap,
} from "../page/main/MainStyle";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";

// 채팅 기록 가져오기
const getChatLog = async (userObj) => {
  const docRef = doc(db, "chatLog", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// 채팅 기록 추가
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

// 이전 thread id 가져오기
const getThreadID = async (userObj) => {
  const docRef = doc(db, "threadID", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// thread id 업데이트
const updateThreadID = async (userObj, threadID) => {
  const threadIDRef = doc(db, "threadID", userObj.uid);

  try {
    // 문서가 존재하는지 확인
    const docSnap = await getDoc(threadIDRef);
    if (docSnap.exists()) {
      // 문서가 존재하면 업데이트하여 threadID를 업데이트
      await updateDoc(threadIDRef, {
        threadID: threadID,
      });
    } else {
      // 문서가 존재하지 않으면 새로운 문서를 생성하고 threadID를 저장
      await setDoc(threadIDRef, { threadID: threadID });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// 사용자 정보 가져오기
const getUserInfo = async (userObj) => {
  const docRef = doc(db, "userInfo", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

const ChatComponent = ({
  isChatRoomExpanded,
  setIsChatRoomExpanded,
  hidden,
}) => {
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);
  getUserInfo(userObj);

  // 사용자가 업로드한 이미지 파일
  const [imgFile, setimgFile] = useState();

  // 답변 왔는지 여부
  const [isAnswerPending, setIsAnswerPending] = useState(false);

  // 사용자가 입력한 메세지
  const [content, setContent] = useState("");

  // 현재 질문
  const [curContent, setCurContent] = useState("");

  // // 이미지 업로드
  // const handleImageUpload = (e) => {
  //   // 사용자가 업로드한 파일 가져오기
  //   console.log(e.target.files[0]);
  //   setimgFile(e.target.files[0]);
  // };

  const queryClient = useQueryClient();

  // 채팅 기록 가져오기
  const { isPending, isError, data, error } = useQuery({
    queryKey: [userObj.uid + "'s chatLog"],
    queryFn: () => getChatLog(userObj),
  });

  // 채팅 추가 시 채팅 기록 업데이트
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

  // 대화 스레드 생성 시
  const handleCreateThread = async (e) => {
    setIsAnswerPending(true);

    // 사용자 정보 가져오기
    const userInfo = await getUserInfo(userObj);

    // 참조 만들기
    const storageRef = ref(
      storage,
      `billImg/${userObj.uid}/${e.target.files[0].name}`
    );

    // 파일 업로드
    await uploadBytes(storageRef, e.target.files[0]);

    // 파일 URL 가져오기
    const url = await getDownloadURL(storageRef);

    try {
      // '/chat' 엔드포인트로 POST 요청(이미지 URL 전송 후 대화 스레드 생성)
      const response = await axios.post(
        "https://grumpy-tara-kkeobi-d212fa6d.koyeb.app/chat",
        {
          imageUrl: url,
          userInfo: userInfo,
        }
      );

      // '/chat' 요청에서 응답으로 받은 thread id 값을 파이어스토어에 저장
      updateThreadID(userObj, response.data.thread);

      const contents = {
        question: url,
        answer: response.data.response.answer,
      };
      mutation.mutate({ userObj, contents });

      setIsAnswerPending(false);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to create thread : ", error);
    }
  };

  // 메세지 전송 시
  const handleSendMessage = async () => {
    const curContent = content;
    setCurContent(content);
    setContent("");
    setIsAnswerPending(true);

    // 파이어스토어에 저장된 thread id 가져오기
    const thread = await getThreadID(userObj);

    // 스레드가 없을 경우 콘솔에 출력
    if (!thread.threadID) {
      console.log("No thread available. Create a thread first.");
      return null;
    }

    try {
      // '/chat/message' 엔드포인트로 POST 요청(이미지 URL, 메세지 내용, 스레드 id 전송 후 메세지 전송)
      const response = await axios.post(
        "https://grumpy-tara-kkeobi-d212fa6d.koyeb.app/chat/message",
        {
          // imageUrl,
          content: curContent,
          threadID: thread.threadID,
        }
      );

      // '/chat/message' 요청에서 받은 질문, 답변을 상태에 저장
      const contents = {
        question: content,
        answer: response.data.response.answer,
      };

      mutation.mutate({ userObj, contents });

      setIsAnswerPending(false);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to send response : ", error);
    }
  };

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatRoomExpanded) {
      scrollToBottom();
    }
  }, [data, curContent, isChatRoomExpanded]);

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
          <div>
            <input
              type="file"
              id="billFile"
              style={{ display: "none" }}
              onChange={(e) => {
                setIsChatRoomExpanded(true);
                handleCreateThread(e);
              }}
            />
            <StyledLabel htmlFor="billFile">내 고지서 분석</StyledLabel>

            <QuestionBtn onClick={() => setIsChatRoomExpanded(true)}>
              질문하기
            </QuestionBtn>
          </div>
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
                <MyChat>{curContent}</MyChat>
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
      </Mains>{" "}
      {isChatRoomExpanded ? (
        <MessageInputWrap>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            // onChange={handleImageUpload}
          />
          <StyledLabel htmlFor="file">+</StyledLabel>
          {/* {imgFile ? <img src={imgFile} alt="img" style={{ width: "50px" }} /> : ""} */}
          <MessageInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메세지를 입력하세요"
          ></MessageInput>
          <SendMessageBtn onClick={handleSendMessage}>보내기</SendMessageBtn>
        </MessageInputWrap>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatComponent;
