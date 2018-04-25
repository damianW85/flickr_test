import React from "react";
import PostImage from "../partials/PostImage";
import {
  PostWrapper,
  TagsWrapper,
  StyledButton
} from "../partials/StyledElements";

const PostTemplate = ({ data, deletePost }) => {
  const description = data.description._content
    .replace(/(<([^>]+)>)/gi, " ")
    .trim();

  return (
    <PostWrapper>
      <StyledButton className="delete" onClick={() => deletePost(data.id)}>
        x
      </StyledButton>
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
        By:{" "}
        <a
          target="_blank"
          href={`https://www.flickr.com/photos/${data.owner.nsid}`}
        >
          {data.owner.realname || data.owner.nsid}
        </a>{" "}
      </p>
      <p>{description}</p>
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
