import React from "react";
import styled from "styled-components";
import posed from "react-pose";

const pose = {
   from: {
      x: ({moveLeft}) => (moveLeft ? "100vw" : "-100vw"),
   },
   enter: {
      x: 0,
      transition: {
         ease: "linear",
         duration: 200,
      },
   },
   exit: {
      x: ({moveLeft}) => (moveLeft ? "-100vw" : "100vw"),
      transition: {
         ease: "linear",
         duration: 200,
      },
   },
};

const Container = styled.div`
   height: 100%;
   width: 100%;
   position: absolute;
`;

function withTransition(Component) {
   return posed(
      React.forwardRef((passThrough, ref) => (
         <Container ref={ref}>
            <Component {...passThrough} />
         </Container>
      )),
   )(pose);
}

export default withTransition;
