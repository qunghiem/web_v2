// ES6 modules import/export syntax

import { fetchApi, getQueryParams } from "./Const.js";
const URL = "http://54.254.135.110";
const novelIdString = getQueryParams().listNovelId;
const listNovel = document.querySelector(".list__Novel");
const renderListNovel = (queryRequest = "") => {
  let apiUrl = `${URL}/novels/get-list-novel-by-list-id`;
  if (queryRequest) {
    apiUrl += `?${queryRequest}`;
  }
  fetchApi(apiUrl)
    .then((data) => {
      let htmls = data.map((item) => {
        return `
          <div class="novel__item" onclick="location.href='./detail.html?id=${item._id.toString()}&name=${
          item.novelName
        }&author=${item.authorName}&status=${item.status}&view=${
          item.view
        }&description=${item.descriptionURL}&descriptionImage=${
          item.descriptionImage
        }&novelCode=${item.novelCode}'">
            <img class="novel__image" scrolling="no" src="${
              item.descriptionImage
            }" width="176px" height="250" allow="autoplay" title="${
          item.novelName
        }" overflow="hidden"></img>
            <div class="novel__title">
              <a><h3 id="h3">${item.novelName}</h3></a>
            </div>
            <div class="novel__content">
              <div class="novel__author">
                <p>Tác giả: <a>${item.authorName}</a></p>
              </div>
              <div class="view">
                <p>Luợt xem: <span>${item.view}</span></p>
              </div>                                                           
            </div>
          </div>
        `;
      });
      listNovel.innerHTML = htmls.join("");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
if (novelIdString) {
  const listNovelId = novelIdString.split(",");
  const queryRequest = listNovelId.map((id) => `listNovelId=${id}`).join("&");
  renderListNovel(queryRequest);
} else {
  renderListNovel();
}

