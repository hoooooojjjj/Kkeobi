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
  Header,
  HeaderTitle,
  HeaderTitleImg,
  MainLogoWrap,
  OpenBillAnalBtn,
  OpenBillAnalTextWrap,
  OpenBillAnalText,
} from "./ChatStyle";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import SendMessage from "./Chating/SendMessage";
import CreateThread from "./Chating/CreateThread";
import { ContainerStyle } from "../../containerStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 채팅 기록 가져오는 함수
const getChatLog = async (userObj, ChatNavigation) => {
  const docRef = doc(db, `chatLogWith${ChatNavigation}`, userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// 채팅 기록 추가하는 함수
const insertChatLog = async ({ userObj, contents, ChatNavigation }) => {
  const chatLogRef = doc(db, `chatLogWith${ChatNavigation}`, userObj.uid);

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

const Chat = ({ ChatNavigation, setChatNavigation }) => {
  const nav = useNavigate();
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);

  // 사용자가 고지서 분석 시 업로드한 이미지 파일
  const [imgFile, setimgFile] = useState();

  // 답변 왔는지 여부
  const [isAnswerPending, setIsAnswerPending] = useState(false);

  // 현재 질문
  const [curContent, setCurContent] = useState("");

  const [isFirstChat, setIsFirstChat] = useState(true);

  // 마지막 채팅 ref
  const chatEndRef = useRef(null);

  // 자주 하는 질문 클릭 여부
  const [isFrequentlyAskedQuestion, setIsFrequentlyAskedQuestion] = useState({
    isClick: false,
    askMessage: "",
  });

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  // 채팅 기록 가져오는 Query
  const { isPending, isError, data, error } = useQuery({
    queryKey: [userObj.uid + "'s chatLog"],
    queryFn: () => getChatLog(userObj, ChatNavigation),
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

  // 메인 페이지에서 대화 스레드 생성
  const handleCreateThreadWithoutImg = async () => {
    // 답변 대기 시작
    setIsAnswerPending(true);

    // 사용자 정보 가져오기
    const userInfo = await getUserInfo(userObj);

    try {
      // '/chat/noImg' 엔드포인트로 POST 요청(대화 스레드 생성)
      const response = await axios.post("http://localhost:8080/chat/noImg", {
        userInfo: userInfo,
        ChatNavigation: ChatNavigation,
      });

      // '/chat/noImg' 요청에서 응답으로 받은 thread id 값을 파이어스토어에 저장
      updateThreadID(userObj, response.data.thread);

      // 답변 대기 종료
      setIsAnswerPending(false);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to create thread : ", error);
    }
  };

  useEffect(() => {
    handleCreateThreadWithoutImg();
  }, [ChatNavigation]);

  useEffect(() => {
    scrollToBottom();
  }, [data, curContent]);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <ContainerStyle>
      <Header>
        <BackBtn
          src={process.env.PUBLIC_URL + `/assets/backBtn.svg`}
          onClick={() => setChatNavigation(null)}
        ></BackBtn>
        <HeaderTitle>
          1:1 채팅
          <HeaderTitleImg
            src={process.env.PUBLIC_URL + `/assets/elecImg.svg`}
          />
        </HeaderTitle>
      </Header>
      <Mains>
        <MainLogoWrap>
          <MainLogo
            src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.svg`}
          />
        </MainLogoWrap>
        <ChatRoom>
          <FirstChatWrap>
            <FirstChat>
              안녕하세요! 고지서를 보내거나 질문을 시작해주세요😚
            </FirstChat>
          </FirstChatWrap>
          {isFirstChat ? (
            <MyChatWrap style={{ display: "flex", flexDirection: "column" }}>
              <CreateThread
                setIsAnswerPending={setIsAnswerPending}
                mutation={mutation}
                setimgFile={setimgFile}
                data={data}
                ChatNavigation={ChatNavigation}
                setIsFirstChat={setIsFirstChat}
              />
              <OpenBillAnalBtn
                onClick={() =>
                  setIsFrequentlyAskedQuestion({
                    ...isFrequentlyAskedQuestion,
                    isClick: !isFrequentlyAskedQuestion.isClick,
                  })
                }
                style={{ background: "#4D956D" }}
              >
                <OpenBillAnalTextWrap>
                  <div style={{ width: 25, height: 25, position: "relative" }}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/help-circle-contained.svg"
                      }
                      style={{
                        width: 19.79,
                        height: 18.68,
                        left: 3.13,
                        top: 3.12,
                        position: "absolute",
                      }}
                    ></img>
                  </div>
                  <OpenBillAnalText style={{ color: "#FFFFFF" }}>
                    자주 묻는 질문
                  </OpenBillAnalText>
                </OpenBillAnalTextWrap>
              </OpenBillAnalBtn>
            </MyChatWrap>
          ) : (
            <></>
          )}

          {isFrequentlyAskedQuestion.isClick ? (
            <div
              className="Frame85"
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 5,
                display: "inline-flex",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              <div
                onClick={() =>
                  setIsFrequentlyAskedQuestion({
                    ...isFrequentlyAskedQuestion,
                    askMessage: "사용자 명의변경은 어떻게 하나요?",
                  })
                }
                className="Frame82"
                style={{
                  cursor: "pointer",
                  width: "65%",
                  paddingTop: 11,
                  paddingBottom: 11,
                  background: "white",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  border: "1px #4D956D solid",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#5B5B5B",
                    fontSize: 13,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  사용자 명의변경은 어떻게 하나요?
                </div>
              </div>
              <div
                onClick={() =>
                  setIsFrequentlyAskedQuestion({
                    ...isFrequentlyAskedQuestion,
                    askMessage: "자동이체 신청 및 해지는 어떻게 하나요?",
                  })
                }
                className="Frame82"
                style={{
                  cursor: "pointer",
                  width: "65%",
                  paddingTop: 11,
                  paddingBottom: 11,
                  background: "white",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  border: "1px #4D956D solid",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#5B5B5B",
                    fontSize: 13,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  자동이체 신청 및 해지는 어떻게 하나요?
                </div>
              </div>
              <div
                onClick={() =>
                  setIsFrequentlyAskedQuestion({
                    ...isFrequentlyAskedQuestion,
                    askMessage: "갑자기 전기요금이 많이 나와요",
                  })
                }
                className="Frame82"
                style={{
                  cursor: "pointer",
                  width: "65%",
                  paddingTop: 11,
                  paddingBottom: 11,
                  background: "white",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  border: "1px #4D956D solid",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#5B5B5B",
                    fontSize: 13,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  갑자기 전기요금이 많이 나와요
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {isPending ? (
            <Spin />
          ) : (
            data &&
            data.content.map((Chat, index) => (
              <OneChatWrap key={Chat.answer}>
                {Chat.question && (
                  <MyChatWrap>
                    {Chat.question?.startsWith("https://firebasestorage") ? (
                      <img
                        src={Chat.question}
                        alt="img"
                        style={{ width: "200px" }}
                      />
                    ) : (
                      <MyChat>{Chat.question}</MyChat>
                    )}
                  </MyChatWrap>
                )}

                {(Chat.isImg && Chat.answer.startsWith("[")) ||
                Chat.answer.startsWith("`") ? (
                  Chat.answer.startsWith("```json") &&
                  Chat.answer.endsWith("```") ? (
                    JSON.parse(
                      Chat.answer.slice(7, Chat.answer.length - 3)
                    ).map((answer, index) => (
                      <KkeobiChatWrap key={index} ref={chatEndRef}>
                        <KkeobiChat>{answer}</KkeobiChat>
                      </KkeobiChatWrap>
                    ))
                  ) : (
                    JSON.parse(Chat.answer).map((answer, index) => (
                      <KkeobiChatWrap key={index} ref={chatEndRef}>
                        <KkeobiChat>{answer}</KkeobiChat>
                      </KkeobiChatWrap>
                    ))
                  )
                ) : (
                  <KkeobiChatWrap ref={chatEndRef}>
                    <KkeobiChat>{Chat.answer}</KkeobiChat>
                  </KkeobiChatWrap>
                )}
              </OneChatWrap>
            ))
          )}
          {isAnswerPending ? (
            <>
              {curContent ? (
                <MyChatWrap>
                  <MyChat>{curContent}</MyChat>{" "}
                </MyChatWrap>
              ) : (
                imgFile && (
                  <MyChatWrap>
                    <img
                      src={imgFile}
                      alt="고지서 이미지"
                      style={{ width: "200px" }}
                    />
                  </MyChatWrap>
                )
              )}
              <KkeobiChatWrap ref={chatEndRef}>
                <KkeobiChat style={{ display: "flex" }}>
                  <div>{imgFile ? "꺼비가 고지서를 읽고 있어요!" : ""}</div>
                  <PendingAnswer answerLoaded={!isAnswerPending}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </PendingAnswer>
                </KkeobiChat>
              </KkeobiChatWrap>
            </>
          ) : (
            <></>
          )}
        </ChatRoom>
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "fixed",
            bottom: 120,
          }}
        >
          {" "}
          <CreateThread
            setIsAnswerPending={setIsAnswerPending}
            mutation={mutation}
            setimgFile={setimgFile}
            data={data}
            ChatNavigation={ChatNavigation}
            setIsFirstChat={setIsFirstChat}
          />
          <OpenBillAnalBtn
            style={{ background: "#4D956D" }}
            onClick={() =>
              setIsFrequentlyAskedQuestion({
                ...isFrequentlyAskedQuestion,
                isClick: !isFrequentlyAskedQuestion.isClick,
              })
            }
          >
            <OpenBillAnalTextWrap>
              <div style={{ width: 25, height: 25, position: "relative" }}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/help-circle-contained.svg"
                  }
                  style={{
                    width: 19.79,
                    height: 18.68,
                    left: 3.13,
                    top: 3.12,
                    position: "absolute",
                  }}
                ></img>
              </div>
              <OpenBillAnalText style={{ color: "#FFFFFF" }}>
                자주 묻는 질문
              </OpenBillAnalText>
            </OpenBillAnalTextWrap>
          </OpenBillAnalBtn>
        </div>
        {isFrequentlyAskedQuestion.isClick ? (
          <div
            className="Frame85"
            style={{
              position: "fixed",
              bottom: 180,
              left: 150,
              width: "55%",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 5,
              display: "inline-flex",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            <div
              onClick={() =>
                setIsFrequentlyAskedQuestion({
                  ...isFrequentlyAskedQuestion,
                  askMessage: "사용자 명의변경은 어떻게 하나요?",
                })
              }
              className="Frame82"
              style={{
                cursor: "pointer",
                width: "65%",
                paddingTop: 11,
                paddingBottom: 11,
                background: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                border: "1px #4D956D solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#5B5B5B",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                사용자 명의변경은 어떻게 하나요?
              </div>
            </div>
            <div
              onClick={() =>
                setIsFrequentlyAskedQuestion({
                  ...isFrequentlyAskedQuestion,
                  askMessage: "자동이체 신청 및 해지는 어떻게 하나요?",
                })
              }
              className="Frame82"
              style={{
                cursor: "pointer",
                width: "65%",
                paddingTop: 11,
                paddingBottom: 11,
                background: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                border: "1px #4D956D solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#5B5B5B",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                자동이체 신청 및 해지는 어떻게 하나요?
              </div>
            </div>
            <div
              onClick={() =>
                setIsFrequentlyAskedQuestion({
                  ...isFrequentlyAskedQuestion,
                  askMessage: "갑자기 전기요금이 많이 나와요",
                })
              }
              className="Frame82"
              style={{
                cursor: "pointer",
                width: "65%",
                paddingTop: 11,
                paddingBottom: 11,
                background: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                border: "1px #4D956D solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#5B5B5B",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                갑자기 전기요금이 많이 나와요
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Mains>
      <SendMessage
        setCurContent={setCurContent}
        setIsAnswerPending={setIsAnswerPending}
        mutation={mutation}
        ChatNavigation={ChatNavigation}
        isFrequentlyAskedQuestion={isFrequentlyAskedQuestion}
        setIsFirstChat={setIsFirstChat}
      />
    </ContainerStyle>
  );
};

export default Chat;
