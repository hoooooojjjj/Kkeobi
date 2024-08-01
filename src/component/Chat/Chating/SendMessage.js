import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  MessageInput,
  SendMessageBtn,
  MessageInputWrap,
  StyledLabel,
} from "../ChatStyle";
import { useContext, useState } from "react";
import { userObjContext } from "../../../App";

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

const SendMessage = ({
  setCurContent,
  setIsAnswerPending,
  mutation,
  ChatNavigation,
}) => {
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);

  // 사용자가 입력한 메세지
  const [content, setContent] = useState("");

  // 메세지 전송 시
  const handleSendMessage = async (e) => {
    e.preventDefault();
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
    console.log(ChatNavigation);
    try {
      // '/chat/message' 엔드포인트로 POST 요청(이미지 URL, 메세지 내용, 스레드 id 전송 후 메세지 전송)
      const response = await axios.post("http://localhost:8080/chat/message", {
        // imageUrl,
        content: curContent,
        threadID: thread.threadID,
        ChatNavigation: ChatNavigation,
      });

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

  return (
    <MessageInputWrap>
      <input type="file" id="file" style={{ display: "none" }} />
      <StyledLabel htmlFor="file">+</StyledLabel>
      <MessageInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메세지를 입력하세요"
      ></MessageInput>
      <SendMessageBtn onClick={(e) => handleSendMessage(e)}>
        보내기
      </SendMessageBtn>
    </MessageInputWrap>
  );
};

export default SendMessage;
