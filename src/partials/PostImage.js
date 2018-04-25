import React from "react";
import styled from "styled-components";

const ImageWrap = styled.div`
  position: relative;
  min-width: calc(100% - 30px);
  height: 350px;
  overflow: hidden;

  &.loader {
    min-width: 480px;
    width: 480px;
    height: 480px;
    bottom: 0;
    margin: 0 auto;
  }
`;

const ImageBackground = styled.div`
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  background-position: center center;
  background-size: cover;
  background-image: linear-gradient(to top, #004b64, rgba(0, 75, 100, 0) 40%), url('${props =>
    props.backgroundSrc ? props.backgroundSrc : ""}');
`;

const PostImage = ({ source, ...props }) => {
  return (
    <ImageWrap {...props}>
      <ImageBackground backgroundSrc={source} />
    </ImageWrap>
  );
};

export default PostImage;
