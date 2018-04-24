import React, { Component } from "react";
import PostTemplate from "../templates/PostTemplate";
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

  reorderItems(data) {}

  componentDidMount() {
    this.getItems(this.updateItems);
  }

  render() {
    console.log(this.state.photos);
    return this.state.photos.length ? (
      <div>
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