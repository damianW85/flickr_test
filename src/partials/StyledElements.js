import styled from "styled-components";

export const HeaderWrap = styled.div`
  display: flex;
  margin: 0 15px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  position: relative;
  width: 50%;
  max-width: 500px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  &.filter_input {
    padding-left: 15px;

    @media only screen and (max-width: 800px) {
      padding-left: 0;
    }
  }
`;

export const InnerWrap = styled.div`
  display: flex;
  padding: 0;
  margin: 0;

  .search_button {
    margin-top: 5px;
  }
`;

export const InputLabel = styled.label`
  color: #8c7f58;
  text-transform: capitalize;
  font-weight: bold;
`;

export const Input = styled.input`
  height: 45px;
  background-color: #fafafa;
  padding-left: 1rem;
  border-style: ridge;
  font-size: 1rem;
  outline: none;
  flex: 1;
  margin-top: 5px;
`;

export const StyledButton = styled.button`
  background-color: #a59466;
  color: #fff;
  padding: 0 25px;
  border: 1px solid #a59466;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
  text-transfrom: uppercase;
  font-size: 1rem;

  &:hover {
    color: #00bcbc;
  }

  &.delete {
    padding: 0 5px;
  }
`;

export const ImageWrap = styled.div`
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

// const Component = styled.div.attrs({
//     style: ({ background }) => ({
//       background,
//     }),
//   })`width: 100%;`

export const ImageBackground = styled.div`
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

export const PostWrapper = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  padding: 15px;
  margin: 15px 0 0 15px;
  background-color: #004b64;
  min-width: 400px;
  flex: 1;
`;

export const TagsWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
`;
