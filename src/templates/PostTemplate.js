import React from "react";
import PostImage from "../partials/PostImage";
import { removeHTMLTags } from "../partials/Methods";
import {
  PostWrapper,
  TagsWrapper,
  StyledButton,
  Link,
  TextWrap
} from "../partials/StyledElements";

const PostTemplate = ({ data, deletePost }) => {
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
        <Link
          target="_blank"
          href={`https://www.flickr.com/photos/${data.owner.nsid}/${data.id}`}
        >
          {data.title._content}
        </Link>{" "}
        By:{" "}
        <Link
          target="_blank"
          href={`https://www.flickr.com/photos/${data.owner.nsid}`}
        >
          {data.owner.realname || data.owner.nsid}
        </Link>{" "}
      </p>
      <TextWrap>{removeHTMLTags(data.description._content)}</TextWrap>
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