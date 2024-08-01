import Styled from "@emotion/styled";
import styled from "@emotion/styled/macro";

export const Pending = Styled.div`
  z-index: 100;
  opacity: ${(props) => (props.answerLoaded ? 0 : 1)};
  inset: 0;
  width: 100%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    display: inline-block;
    width: 50px;

    animation: loading 1s infinite linear;
  }
  & > img:nth-of-type(0) {
    margin: 5px;
    animation-delay: 0s;
    background-color: red;
  }
  & > img:nth-of-type(1) {
    margin: 5px;
    animation-delay: 0.2s;
  }
  & > img:nth-of-type(2) {
    margin: 5px;
    animation-delay: 0.4s;
    
  }
  transition: opacity 0.1s ease-in-out;
  ${(props) =>
    !props.answerLoaded &&
    `
    opacity: 1;
  `}

  @keyframes loading {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;

export const PendingBar = styled.div({
  width: "100%",
  height: 7,
  background: "#FEFAE4",
  border: "1px solid #4D956D",
});

export const PendingText = styled.div({
  color: "#626262",
  fontSize: 20,
});
