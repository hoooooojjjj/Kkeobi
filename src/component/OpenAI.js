import React, { useContext, useState } from "react";
import axios from "axios";
import { userObjContext } from "../App";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import {
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
  BackBtn,
} from "../page/main/MainStyle";

const ChatComponent = ({
  isChatRoomExpanded,
  setIsChatRoomExpanded,
  hidden,
}) => {
  // 유저 정보
  const { data } = useContext(userObjContext);

  // 사용자가 업로드한 이미지 파일
  const [imgFile, setimgFile] = useState();

  // 채팅 시작 여부
  const [isChatStarted, setIsChatStarted] = useState(false);

  // 사용자가 입력한 메세지
  const [content, setContent] = useState("");

  // 대화 스레드 ID
  const [thread, setThread] = useState("");

  // 사용자가 입력한 질문
  const [question, setQuestion] = useState([]);

  // OpenAI로부터 받은 답변
  const [answer, setAnswer] = useState([]);

  // 이미지 업로드
  const handleImageUpload = (e) => {
    // 사용자가 업로드한 파일 가져오기
    setimgFile(e.target.files[0]);
  };

  // 대화 스레드 생성 시
  const handleCreateThread = async () => {
    // 참조 만들기
    const storageRef = ref(storage, `billImg/${data.uid}/${imgFile.name}`);

    // 파일 업로드
    await uploadBytes(storageRef, imgFile);

    // 파일 URL 가져오기
    const url = await getDownloadURL(storageRef);

    setIsChatStarted(true);
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
      // '/chat' 요청에서 받은 답변을 상태에 저장
      setAnswer([...answer, response.data.response.answer]);
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
    // 질문 저장
    setQuestion([...question, content]);
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
      // '/chat/message' 요청에서 받은 답변을 상태에 저장
      setAnswer([...answer, response.data.response.answer]);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to send response : ", error);
    }
    setContent("");
  };

  return (
    // <div>
    //   <h2>대화 시작하기</h2>
    //   <input type="file" onChange={(e) => handleImageUpload(e)} />
    //   {/* {imgFile ? <img src={imgFile} alt="img" style={{ width: "50px" }} /> : ""} */}
    //   <button onClick={handleCreateThread}>대화 시작하기</button>
    //   <h2>메세지 보내기</h2>
    //   <input
    //     type="text"
    //     placeholder="Content"
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //   />
    //   <button onClick={handleSendMessage}>보내기</button>

    //   <h2>질문과 답변</h2>
    //   {isChatStarted ? "채팅이 시작되었습니다. 잠시만 기다려주세요" : ""}
    //   <p>답변 : {answer[0]}</p>
    //   {question.map((q, index) => (
    //     <div key={index}>
    //       <p>질문: {q}</p>
    //       <p>
    //         답변:{" "}
    //         {answer[index + 1] ? answer[index + 1] : "잠시간 기다려주세요"}
    //       </p>
    //     </div>
    //   ))}
    // </div>
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
          <BillAnalysisBtn onClick={() => setIsChatRoomExpanded(true)}>
            내 고지서 분석
          </BillAnalysisBtn>
          <QuestionBtn onClick={() => setIsChatRoomExpanded(true)}>
            질문하기
          </QuestionBtn>
        </div>
        <MyChatWrap>
          <MyChat>기후환경요금이 무슨 뜻이야?</MyChat>
        </MyChatWrap>
        <KkeobiChatWrap>
          <KkeobiChat>
            기후환경요금에 대해 설명해드릴게요!☺️ 깨끗하고 안전한 에너지 제공에
            소요되는 비용으로, "기후환경요금 단가*사용전력량"로 계산해요. 2024년
            0월 00일 기준 기후환경요금 단가는 9원입니다.더 자세한 정보를 알고
            싶다면 말해주세요!☺️
          </KkeobiChat>
        </KkeobiChatWrap>
      </ChatRoom>
    </Mains>
  );
};

export default ChatComponent;
