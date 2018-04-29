import React, { Component } from "react";
import PostTemplate from "../templates/PostTemplate";
import LabeledInput from "../partials/LabeledInput";
import Button from "../partials/Button";
import PostImage from "../partials/PostImage";
import { HeaderWrap, ScrollWrap } from "../partials/StyledElements";
import { makeRequest } from "../partials/Methods";

// FLICKR API CONFIG DATA \\

const config = {
  flickrApiKey: "932bc4e6e40774a53ef8e06a8b4b986d",
  flickrApiSecret: "0a9034dc89d7f566"
};

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
  // UPDATE OR REPLACE PHOTOS IN STATE \\
  addItems = (resp, update) => {
    let photosArray;
    update
      ? (photosArray = [
          ...this.state.photos,
          ...resp.data.filter(
            pik => !this.state.photos.find(pic => pik.photo.id === pic.photo.id)
          )
        ])
      : (photosArray = [...resp.data]);

    this.setState({
      photos: photosArray,
      nextPage: resp.nextPage,
      totalPages: resp.totalPages,
      noMorePages: resp.nextPage < resp.totalPages
    });
  };
  // UPDATE TAGS IN STATE,SEARCH FOR NEW TAGS AND STORE NEW PHTOS IN STATE \\
  searchNewTags = () => {
    this.setState(
      { tags: [...this.searchBox.value.split(" ")], nextPage: 1 },
      () => {
        this.getData(this.addItems, false);
        this.searchBox.value = "";
      }
    );
  };
  // DELETE A PHOTO \\
  removePhoto = elementId => {
    this.setState({
      photos: [...this.state.photos.filter(post => post.photo.id !== elementId)]
    });
  };
  // UPDATE KEYWORDS IN STATE, FILTER PHOTOS BY TITLE, USERNAME AND DESCRIPTION, BASED ON KEYWORDS \\
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
        this.state.photos.length < 10 ? this.getData(this.addItems, true) : null
    );
  };
  // CALL API, PASS IN SEARCH PARAMS AND CALLBACK TO HABDLE RESPONSE \\
  getData(callBack) {
    return makeRequest(
      `https://api.flickr.com/services/rest?per_page=20&viewerNSID=&api_key=${
        config.flickrApiKey
      }&method=flickr.photos.search&tags=${this.state.tags.map(
        tag => `${tag}`
      )}&format=json&nojsoncallback=1&tagmode=any&page=${this.state.nextPage}`,
      resp => {
        let count = 0;
        const responseObj = { data: [] };

        responseObj.totalPages = resp.photos.pages;
        responseObj.nextPage = resp.photos.page + 1;

        resp.photos.photo.map(photo => {
          return makeRequest(
            `https://api.flickr.com/services/rest/?format=json&api_key=${
              config.flickrApiKey
            }&photo_id=${
              photo.id
            }&method=flickr.photos.getInfo&nojsoncallback=1`,
            body => {
              count++;
              responseObj.data.push(body);
              return count === resp.photos.photo.length - 1
                ? callBack(responseObj)
                : null;
            }
          );
        });
      }
    );
  }

  componentDidMount() {
    this.getData(this.addItems, false);
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
        <ScrollWrap
          className="scroll_wrapper"
          pageStart={0}
          loadMore={() => this.getData(data => this.addItems(data, true))}
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
          {this.state.photos.map(post => (
            <PostTemplate
              deletePost={this.removePhoto}
              key={post.photo.id}
              data={post.photo}
            />
          ))}
        </ScrollWrap>
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