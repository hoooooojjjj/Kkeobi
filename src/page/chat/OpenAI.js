import React, { useContext, useState } from "react";
import axios from "axios";
import { userObjContext } from "../../App";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase";

const ChatComponent = () => {
  // 유저 정보
  const userObj = useContext(userObjContext);

  const [fileStingUrl, setfileStingUrl] = useState(); // 파일 렌더링용 url

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
    console.log(userObj.uid);
    // 사용자가 업로드한 파일 가져오기
    console.log(e.target.files[0]);
    // 파일을 렌더링할 수 있는 클래스
    const reader = new FileReader();
    // 파일을 URL로 읽어올 수 있음 -> onloadend를 트리거함
    reader.readAsDataURL(e.target.files[0]);
    // 파일 읽어오기가 끝나면 실행됨.
    reader.onloadend = (finishEvent) => {
      // 파일의 sting URL을 반환함 -> img src에 추가해서 렌더링 가능
      setfileStingUrl(finishEvent.currentTarget.result);
    };
  };

  // 대화 스레드 생성 시
  const handleCreateThread = async () => {
    // 참조 만들기
    const storageRef = ref(storage, `bill/${userObj.uid}`);

    // 파일 업로드
    const upload = await uploadString(storageRef, fileStingUrl);

    // setIsChatStarted(true);
    // try {
    //   // '/chat' 엔드포인트로 POST 요청(이미지 URL 전송 후 대화 스레드 생성)
    //   const response = await axios.post("http://localhost:8080/chat", {
    //     imageUrl,
    //   });
    //   // '/chat' 요청에서 응답으로 받은 thread id 값을 상태에 저장
    //   setThread(response.data.thread);
    //   // '/chat' 요청에서 받은 답변을 상태에 저장
    //   setAnswer([...answer, response.data.response.answer]);
    //   // 콘솔에 thread id 출력
    //   console.log("Thread created! Thread id :", response.data.thread);
    //   // 콘솔에 '/chat' 요청에서 받은 답변 출력
    //   console.log("first response : ", response.data.response.answer);
    // } catch (error) {
    //   // 에러 발생 시 콘솔에 에러 출력
    //   console.error("Failed to create thread : ", error);
    // }
  };

  // 메세지 전송 시
  const handleSendMessage = async () => {
    // // 질문 저장
    // setQuestion([...question, content]);
    // // 스레드 id가 생성된 스레드와 일치하는지 확인 용 콘솔
    // console.log("thread:", thread);
    // // 스레드가 없을 경우 콘솔에 출력
    // if (!thread) {
    //   console.log("No thread available. Create a thread first.");
    //   return null;
    // }
    // try {
    //   // '/chat/message' 엔드포인트로 POST 요청(이미지 URL, 메세지 내용, 스레드 id 전송 후 메세지 전송)
    //   const response = await axios.post("http://localhost:8080/chat/message", {
    //     imageUrl,
    //     content,
    //     threadID: thread,
    //   });
    //   // 콘솔에 '/chat/message' 요청에서 받은 답변 출력
    //   console.log(
    //     `sending response in ${thread} : `,
    //     response.data.response.answer
    //   );
    //   // '/chat/message' 요청에서 받은 답변을 상태에 저장
    //   setAnswer([...answer, response.data.response.answer]);
    // } catch (error) {
    //   // 에러 발생 시 콘솔에 에러 출력
    //   console.error("Failed to send response : ", error);
    // }
    // setContent("");
  };

  return (
    <div>
      <h2>대화 시작하기</h2>
      <input type="file" onChange={(e) => handleImageUpload(e)} />
      {fileStingUrl ? (
        <img src={fileStingUrl} alt="img" style={{ width: "50px" }} />
      ) : (
        ""
      )}
      <button onClick={handleCreateThread}>대화 시작하기</button>
      <h2>메세지 보내기</h2>
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>보내기</button>

      <h2>질문과 답변</h2>
      {isChatStarted ? "채팅이 시작되었습니다. 잠시만 기다려주세요" : ""}
      <p>답변 : {answer[0]}</p>
      {question.map((q, index) => (
        <div key={index}>
          <p>질문: {q}</p>
          <p>
            답변:{" "}
            {answer[index + 1] ? answer[index + 1] : "잠시간 기다려주세요"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
