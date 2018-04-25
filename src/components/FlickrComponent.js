import React, { Component } from "react";
import PostTemplate from "../templates/PostTemplate";
import LabeledInput from "../partials/LabeledInput";
import Button from "../partials/Button";
import MasonryInfiniteScroller from "react-masonry-infinite";

class FlickrComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      nextPage: 1,
      tags: ["street", "london"]
    };
  }

  updateItems = resp => {
    this.setState({ photos: [...resp.data], nextPage: resp.nextPage });
  };

  getItems(callBack) {
    fetch(
      `data?q=tags=${this.state.tags.map(tag => `${tag},`)}&page=${
        this.state.nextPage
      }`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        callBack(data);
      });
  }

  searchNewTags = () => {
    this.setState(
      { tags: [...this.searchBox.value.split(" ")], nextPage: 1 },
      () => {
        this.getItems(this.updateItems);
      }
    );
  };

  componentDidMount() {
    this.getItems(this.updateItems);
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
        <MasonryInfiniteScroller
          className="grid"
          hasMore={this.state.hasMore}
          loadMore={() =>
            this.setState({ elements: this.state.elements.push("Element") })
          }
          sizes={[
            { columns: 1, gutter: 15 },
            { mq: "800px", columns: 2, gutter: 15 },
            { mq: "1024px", columns: 3, gutter: 15 }
          ]}
        >
          {this.state.photos.map((post, postIdx) => (
            <PostTemplate key={post.photo.id} data={post.photo} />
          ))}
        </MasonryInfiniteScroller>
      </div>
    ) : (
      <h2>Loading...</h2>
    );
  }
}

export default FlickrComponent;