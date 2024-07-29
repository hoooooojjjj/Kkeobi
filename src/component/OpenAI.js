import React, { useContext, useState } from "react";
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
} from "../page/main/MainStyle";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const getChatLog = async (userObj) => {
  const docRef = doc(db, "chatLog", userObj.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const insertChatLog = async (userObj, content) => {
  const chatLogRef = doc(db, "chatLog", userObj.uid);

  try {
    // 문서가 존재하는지 확인
    const docSnap = await getDoc(chatLogRef);
    if (docSnap.exists()) {
      // 문서가 존재하면 업데이트하여 content를 배열에 추가
      await updateDoc(chatLogRef, {
        content: arrayUnion(content),
      });
    } else {
      // 문서가 존재하지 않으면 새로운 문서를 생성하고 content를 배열로 저장
      await setDoc(chatLogRef, { content: [content] });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const ChatComponent = ({
  isChatRoomExpanded,
  setIsChatRoomExpanded,
  hidden,
}) => {
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);

  // 사용자가 업로드한 이미지 파일
  const [imgFile, setimgFile] = useState();

  // 답변 왔는지 여부
  const [isPending, setIsPending] = useState(false);

  // 사용자가 입력한 메세지
  const [content, setContent] = useState("");

  // 대화 스레드 ID
  const [thread, setThread] = useState("");

  // 대화 기록
  const [ChatLog, setChatLog] = useState([]);

  // // 이미지 업로드
  // const handleImageUpload = (e) => {
  //   // 사용자가 업로드한 파일 가져오기
  //   console.log(e.target.files[0]);
  //   setimgFile(e.target.files[0]);
  // };

  // 대화 스레드 생성 시
  const handleCreateThread = async (e) => {
    setIsPending(true);
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
          userInfo: "",
        }
      );
      // '/chat' 요청에서 응답으로 받은 thread id 값을 상태에 저장
      setThread(response.data.thread);

      // '/chat' 요청에서 보낸 고지서 이미지 URL 질문, 답변을 상태에 저장
      setChatLog([
        ...ChatLog,
        { question: url, answer: response.data.response.answer },
      ]);

      setIsPending(false);

      insertChatLog(userObj, {
        question: url,
        answer: response.data.response.answer,
      });

      // 콘솔에 thread id 출력
      console.log("Thread created! Thread id :", response.data.thread);

      // 콘솔에 '/chat' 요청에서 받은 답변 출력

      console.log("first response : ", response.data.response.answer);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to create thread : ", error);
    }
  };

  // 메세지 전송 시
  const handleSendMessage = async () => {
    setIsPending(true);
    // 스레드 id가 생성된 스레드와 일치하는지 확인 용 콘솔
    console.log("thread:", thread);
    // 스레드가 없을 경우 콘솔에 출력
    if (!thread) {
      console.log("No thread available. Create a thread first.");
      return null;
    }
    try {
      // '/chat/message' 엔드포인트로 POST 요청(이미지 URL, 메세지 내용, 스레드 id 전송 후 메세지 전송)
      const response = await axios.post(
        "https://grumpy-tara-kkeobi-d212fa6d.koyeb.app/chat/message",
        {
          // imageUrl,
          content,
          threadID: thread,
        }
      );
      // 콘솔에 '/chat/message' 요청에서 받은 답변 출력
      console.log(
        `sending response in ${thread} : `,
        response.data.response.answer
      );

      // '/chat/message' 요청에서 받은 질문, 답변을 상태에 저장
      setChatLog([
        ...ChatLog,
        { question: content, answer: response.data.response.answer },
      ]);

      setIsPending(false);

      insertChatLog(userObj, {
        question: content,
        answer: response.data.response.answer,
      });
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to send response : ", error);
    }
    setContent("");
  };

  return (
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
        {ChatLog.map((Chat, index) => (
          <div>
            <MyChatWrap>
              <MyChat>{Chat.question}</MyChat>
            </MyChatWrap>
            <KkeobiChatWrap>
              <KkeobiChat>{Chat.answer}</KkeobiChat>
            </KkeobiChatWrap>
          </div>
        ))}
        {isPending ? (
          <KkeobiChatWrap>
            <PendingAnswer answerLoaded={!isPending}>
              <span></span>
              <span></span>
              <span></span>
            </PendingAnswer>
          </KkeobiChatWrap>
        ) : (
          <></>
        )}
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
      </ChatRoom>
    </Mains>
  );
};

export default ChatComponent;
