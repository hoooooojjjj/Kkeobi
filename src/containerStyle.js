import styled from "@emotion/styled";

export const ContainerStyle = styled.div({
  width: 371,
  height: 760,
  // border: "1px solid black",
  marginTop: 20,
  position: "relative",
  right: -4,
  top: 18,
  borderBottomLeftRadius: 49,
  borderBottomRightRadius: 49,
});

export const Iphone = styled.div((props) => ({
  backgroundImage: `url(${props.src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: 540,
  height: 860,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));
