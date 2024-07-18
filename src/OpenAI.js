import React, { useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [thread, setThread] = useState("");
  const [response, setResponse] = useState("");

  const handleCreateThread = async () => {
    try {
      const response = await axios.post("http://localhost:8080/chat", {
        imageUrl,
      });
      setThread(response.data.thread); // '/chat' 요청에서 받은 thread 값을 상태에 저장
      console.log("Thread created:", response.data.thread);
    } catch (error) {
      console.error("Failed to create thread:", error);
    }
  };

  const handleSendMessage = async () => {
    console.log("thread:", thread);
    if (!thread) {
      console.log("No thread available. Create a thread first.");
      return null;
    }
    try {
      const response = await axios.post("http://localhost:8080/chat/message", {
        imageUrl,
        content,
        threadID: thread,
      });
      console.log("Message sent:", response.data.response.answer);
      setResponse(response.data.response.answer);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div>
      <h2>대화 시작하기</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleCreateThread}>시작</button>

      <h2>메세지 보내기</h2>
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>보내기</button>

      <p>답변 : {response ? response : "잠시간 기다려주세요"}</p>
    </div>
  );
};

export default ChatComponent;
