import React, { Component } from "react";
import PostTemplate from "../templates/PostTemplate";
import LabeledInput from "../partials/LabeledInput";
import Button from "../partials/Button";
import InfiniteScroll from "react-infinite-scroller";
import PostImage from "../partials/PostImage";
import { HeaderWrap } from "../partials/StyledElements";

class FlickrComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      nextPage: 1,
      noMorePages: false,
      totalPages: null,
      tags: ["street", "london"],
      keywords: ""
    };
  }

  addItems = (resp, update) => {
    let photosArray;
    update
      ? (photosArray = [...this.state.photos, ...resp.data])
      : (photosArray = [...resp.data]);

    this.setState({
      photos: photosArray,
      nextPage: resp.nextPage,
      totalPages: resp.totalPages,
      noMorePages: resp.nextPage < resp.totalPages
    });
  };

  getItems = callBack => {
    fetch(
      `data?q=tags=${this.state.tags.map(tag => `${tag}`)}/page=${
        this.state.nextPage
      }`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        callBack(data);
      });
  };

  searchNewTags = () => {
    this.setState(
      { tags: [...this.searchBox.value.split(" ")], nextPage: 1 },
      () => {
        this.getItems(this.addItems, false);
        this.searchBox.value = "";
      }
    );
  };

  removePhoto = elementId => {
    this.setState({
      photos: [...this.state.photos.filter(post => post.photo.id !== elementId)]
    });
  };

  filterPhotos = () => {
    this.setState(
      {
        keywords: this.filterBox.value.toLowerCase(),
        photos: [
          ...this.state.photos.filter(
            post =>
              post.photo.description._content
                .toLowerCase()
                .indexOf(this.filterBox.value.toLowerCase()) !== -1 ||
              post.photo.title._content
                .toLowerCase()
                .indexOf(this.filterBox.value.toLowerCase()) !== -1 ||
              post.photo.owner.username
                .toLowerCase()
                .indexOf(this.filterBox.value.toLowerCase()) !== -1
          )
        ]
      },
      () =>
        this.state.photos.length < 10
          ? this.getItems(this.addItems, true)
          : null
    );
  };

  componentDidMount() {
    this.getItems(this.addItems, false);
  }

  render() {
    return this.state.photos.length ? (
      <div>
        <HeaderWrap>
          <LabeledInput
            innerRef={searchBox => (this.searchBox = searchBox)}
            name="tags_search"
            placeholder={`current tags: ${this.state.tags}`}
            label="Search Tags (seperated by space)"
          >
            <Button
              className="search_button"
              text="Search"
              callBack={this.searchNewTags}
            />
          </LabeledInput>
          <LabeledInput
            onChange={this.filterPhotos}
            className="filter_input"
            innerRef={filterBox => (this.filterBox = filterBox)}
            name="tags_search"
            placeholder={
              this.state.keywords.length ? this.state.keywords : "enter keyword"
            }
            label="Filter Photos"
          />
        </HeaderWrap>
        <InfiniteScroll
          className="scroll_wrapper"
          pageStart={0}
          loadMore={() => this.getItems(data => this.addItems(data, true))}
          hasMore={this.state.noMorePages}
          threshold={300}
          loader={
            <PostImage
              key={this.state.nextPage}
              className="loader"
              source="../loading.gif"
            />
          }
        >
          {this.state.photos.map((post, postIdx) => (
            <PostTemplate
              deletePost={this.removePhoto}
              key={post.photo.id}
              data={post.photo}
            />
          ))}
        </InfiniteScroll>
      </div>
    ) : (
      <PostImage
        key={this.state.nextPage}
        className="loader"
        source="../loading.gif"
      />
    );
  }
}

export default FlickrComponent;
