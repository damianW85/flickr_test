var path = require("path");
var requestProm = require("request-promise");
const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "html")));

var config = {
  flickrApiKey: "932bc4e6e40774a53ef8e06a8b4b986d",
  flickrApiSecret: "0a9034dc89d7f566"
};

function makeRequest(reqOpts, successCB) {
  return requestProm(reqOpts)
    .then(function(body) {
      successCB(body);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getPhotoData(photoObj) {}

app.get(
  "/data",
  function(req, res) {
    let count = 0;
    const responseObj = { data: [] };

    return makeRequest(
      {
        method: "GET",
        url: `https://api.flickr.com/services/rest?per_page=20&viewerNSID=&method=flickr.photos.search&api_key=${
          config.flickrApiKey
        }&format=json&nojsoncallback=1&tagmode=any&${req.query.q.replace(
          "/",
          "&"
        )}`
      },
      function(body) {
        const data = JSON.parse(body);
        responseObj.totalPages = data.photos.pages;
        responseObj.nextPage = data.photos.page + 1;

        data.photos.photo.map(function(photo) {
          makeRequest(
            {
              method: "GET",
              url: `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${
                config.flickrApiKey
              }&photo_id=${photo.id}&format=json&nojsoncallback=1`
            },
            function(body) {
              count++;
              responseObj.data.push(JSON.parse(body));
              count === data.photos.photo.length - 1
                ? res.send(responseObj)
                : null;
            }
          );
        });
      }
    );
  },
  function(error) {
    console.log(error);
  }
);

app.listen(process.env.PORT || 7000, function() {
  console.log("listening on port 7000!");
});
