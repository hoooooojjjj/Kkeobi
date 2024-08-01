import React from "react";
import { ContainerStyle } from "../containerStyle";
import { Pending, PendingBar, PendingText } from "./LoadingStyle";

function Loading() {
  return (
    <ContainerStyle
      style={{
        background:
          "linear-gradient(180deg, #FFF4E1 0%, rgba(70.50, 190.33, 127.35, 0.21) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
      }}
    >
      <Pending>
        <img src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/BeforeLoginLogo.png`}></img>
      </Pending>
      <PendingBar></PendingBar>
      <PendingText>로딩 중...</PendingText>
    </ContainerStyle>
  );
}

export default Loading;
