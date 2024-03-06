import { fetchApi } from "./Const.js";
const URL = "http://54.254.135.110";

const listNovelSortByView = fetchApi(`${URL}/novels/get-novel-sorted-by-view`);
const listNovelhtml = document.querySelector("#list_top_view");

listNovelSortByView.then((data) => {
  let htmls = "";
  data.slice(0, 6).forEach((item, index) => {
    htmls += `
      <div class="top__item" onclick="location.href='./detail.html?id=${item._id.toString()}&name=${
      item.novelName
    }&author=${item.authorName}&status=${item.status}&view=${
      item.view
    }&description=${item.descriptionURL}&descriptionImage=${
      item.descriptionImage
    }&novelCode=${item.novelCode}'">
      
        <a>${item.novelName}</a>
      </div>
    `;
  });
  listNovelhtml.innerHTML = htmls;
});
