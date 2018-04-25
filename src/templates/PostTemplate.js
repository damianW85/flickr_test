import styled from "styled-components";
import React from "react";
import PostImage from "../partials/PostImage";

const PostWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 15px;
  margin: 15px;
  background-color: #004b64;
  width: 400px;
`;

const TagsWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
`;

const PostTemplate = ({ data }) => {
  return (
    <PostWrapper>
      <PostImage
        source={`https://farm${data.farm}.staticflickr.com/${data.server}/${
          data.id
        }_${data.secret}.jpg`}
      />
      <p>
        <a
          target="_blank"
          href={`https://www.flickr.com/photos/${data.owner.nsid}/${data.id}`}
        >
          {data.title._content}
        </a>{" "}
        By{" "}
        <a
          target="_blank"
          href={`https://www.flickr.com/photos/${data.owner.nsid}`}
        >
          {data.owner.realname || data.owner.nsid}
        </a>{" "}
      </p>
      <p>{data.description._content}</p>
      <TagsWrapper>
        {data.tags.tag.map(
          (tagObj, idx) =>
            idx < 10 ? (
              <span key={tagObj.id} className="tag">
                {tagObj._content}{" "}
              </span>
            ) : null
        )}
      </TagsWrapper>
    </PostWrapper>
  );
};

export default PostTemplate;