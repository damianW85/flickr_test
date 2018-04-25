import React, { Component } from "react";
import PostTemplate from "../templates/PostTemplate";
import LabeledInput from "../partials/LabeledInput";
import Button from "../partials/Button";
import InfiniteScroll from "react-infinite-scroller";
import PostImage from "../partials/PostImage";

class FlickrComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      nextPage: 1,
      noMorePages: false,
      totalPages: null,
      tags: ["street", "london"]
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
        console.log(data);
        callBack(data);
      });
  };

  searchNewTags = () => {
    this.setState(
      { tags: [...this.searchBox.value.split(" ")], nextPage: 1 },
      () => {
        this.getItems(this.addItems, false);
      }
    );
  };

  componentDidMount() {
    this.getItems(this.addItems, false);
  }

  render() {
    return this.state.photos.length ? (
      <div>
        <LabeledInput
          innerRef={searchBox => (this.searchBox = searchBox)}
          name="tags_search"
          placeholder={`current tags: ${this.state.tags}`}
          label="search tags (seperated by space)"
        />
        <Button text="Search" callBack={this.searchNewTags} />
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
            <PostTemplate key={post.photo.id} data={post.photo} />
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
