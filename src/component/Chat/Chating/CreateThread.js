import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { useContext } from "react";
import { userObjContext } from "../../../App";
import {
  OpenBillAnalBtn,
  OpenBillAnalText,
  OpenBillAnalTextWrap,
  QuestionBtn,
  StyledLabel,
} from "../ChatStyle";

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

// 파이어스토어에 고지서 텍스트 추출한거 저장
const saveBillImgToJson = async (userObj, billImgToJson, ChatNavigation) => {
  const billImgToJsonRef = doc(
    db,
    "billImgToJson" + ChatNavigation,
    userObj.uid
  );

  try {
    // 문서가 존재하는지 확인
    const docSnap = await getDoc(billImgToJsonRef);
    if (docSnap.exists()) {
      // 문서가 존재하면 업데이트하여 threadID를 업데이트
      await updateDoc(billImgToJsonRef, {
        billImgToJson: billImgToJson,
      });
    } else {
      // 문서가 존재하지 않으면 새로운 문서를 생성하고 threadID를 저장
      await setDoc(billImgToJsonRef, {
        billImgToJson,
      });
    }
  } catch (error) {
    console.error("Error adding billImgToJsonRef: ", error);
  }
};

const CreateThread = ({
  setIsAnswerPending,
  mutation,
  setimgFile,
  data,
  ChatNavigation,
}) => {
  // 유저 정보
  const { data: userObj } = useContext(userObjContext);

  // 고지서 분석 이미지 파일 string으로 저장(렌더링을 위해)
  const handleFileSave = (file) => {
    const reader = new FileReader();
    // 파일을 URL로 읽어올 수 있음 -> onloadend를 트리거함
    reader.readAsDataURL(file);
    // 파일 읽어오기가 끝나면 실행됨.
    reader.onloadend = (finishEvent) => {
      // 파일의 sting URL을 반환함 -> img src에 추가해서 렌더링 가능
      setimgFile(finishEvent.currentTarget.result);
    };
  };

  // 고지서 분석 버튼 클릭으로 대화 스레드 생성 시
  const handleCreateThreadbillImg = async (e) => {
    const isCreateThread = window.confirm("고지서 분석을 시작하시겠습니까?");
    if (!isCreateThread) {
      return null;
    }

    // 답변 대기 시작
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
      // '/chat/billImg' 엔드포인트로 POST 요청(이미지 URL 전송 후 대화 스레드 생성)
      const response = await axios.post("http://localhost:8080/chat/billImg", {
        imageUrl: url,
        userInfo: userInfo,
        ChatNavigation: ChatNavigation,
      });

      // '/chat/billImg' 요청에서 응답으로 받은 thread id 값을 파이어스토어에 저장
      updateThreadID(userObj, response.data.thread);

      // 질문과 답변을 contents에 저장
      const contents = {
        question: url,
        answer: response.data.response.answer,
        isImg: true,
      };

      // mutation으로 파이어스토어에 질문과 답변 저장
      mutation.mutate({ userObj, contents, ChatNavigation });

      // 답변 대기 종료
      setIsAnswerPending(false);

      handleFileSave(e.target.files[0]);

      // 고지서 텍스트 추출한 json 파이어스토어에 저장
      saveBillImgToJson(userObj, response.data.billImgToJson, ChatNavigation);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 출력
      console.error("Failed to create thread : ", error);
    }
  };

  return (
    <OpenBillAnalBtn>
      <OpenBillAnalTextWrap>
        <div style={{ width: 25, height: 25, position: "relative" }}>
          <img
            src={process.env.PUBLIC_URL + "/assets/image-add.svg"}
            style={{
              width: 19.79,
              height: 18.68,
              left: 3.13,
              top: 3.12,
              position: "absolute",
            }}
          ></img>
        </div>
        <input
          type="file"
          id="billFile"
          style={{ display: "none" }}
          onChange={(e) => {
            handleCreateThreadbillImg(e);
          }}
        />{" "}
        <OpenBillAnalText htmlFor="billFile">고지서 보내기</OpenBillAnalText>
      </OpenBillAnalTextWrap>
    </OpenBillAnalBtn>
    // <div>
    // <input
    //   type="file"
    //   id="billFile"
    //   style={{ display: "none" }}
    //   onChange={(e) => {
    //     handleCreateThreadbillImg(e);
    //     handleFileSave(e.target.files[0]);
    //   }}
    // />
    // <StyledLabel htmlFor="billFile">
    //   고지서 분석으로 채팅 시작하기
    // </StyledLabel>
    //   <QuestionBtn
    //     onClick={() => {
    //       handleCreateThreadWithoutImg();
    //     }}
    //   >
    //     그냥 채팅 시작하기
    //   </QuestionBtn>
    //   {data && <QuestionBtn onClick={() => {}}>채팅 다시하기</QuestionBtn>}
    // </div>
  );
};

export default CreateThread;
