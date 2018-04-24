import React from "react";
import styled from "styled-components";

const ImageWrap = styled.div`
  position: relative;
  min-width: calc(100% - 30px);
  height: 350px;
  overflow: hidden;
`;

const ImageBackground = styled.div`
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  background-position: center center;
  background-size: cover;
  background-image: linear-gradient(to top, #004b64, rgba(0, 75, 100, 0) 40%), url('${props => props.backgroundSrc? props.backgroundSrc: ''}');
`;

const PostImage = ({ source }) => {
  return (
    <ImageWrap>
      <ImageBackground backgroundSrc={source} />
    </ImageWrap>
  );
};

export default PostImage;