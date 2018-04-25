import React from "react";
import { ImageWrap, ImageBackground } from "./StyledElements";

const PostImage = ({ source, ...props }) => {
  return (
    <ImageWrap {...props}>
      <ImageBackground backgroundSrc={source} />
    </ImageWrap>
  );
};

export default PostImage;
