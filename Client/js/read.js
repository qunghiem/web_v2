import { fetchApi, getQueryParams } from "./Const.js";

const queryParams = getQueryParams();
const novelCode = queryParams.novelCode;

const URL = "http://54.254.135.110";
const listChapter = document.querySelector("#list-chapter");
const read = document.querySelector("#content-chapter");
const readTitle = document.querySelector("#chapter-name");
const title = document.querySelector("#title");

// Biến cờ để theo dõi trạng thái hiển thị của danh sách chương
let isListChapterVisible = false;

const getListChapter = async () => {
  try {
    const data = await fetchApi(`${URL}/novels/get-chapter-in-novel?novelCode=${novelCode}`);
    return data;
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    // Xử lý lỗi
  }
};

const renderNameChapter = (chapterName) => {
  readTitle.innerHTML = `<h1>${chapterName}</h1>`;
};

const renderContentChapter = (content) => {
  read.innerHTML = `
    <div class="chapter-content">
      <iframe class="read__image" scrolling="no"
        src="${content}"
        width="100%" height="1000px" allow="autoplay" title=overflow="hidden"></iframe>
    </div>
  `;
};

const changeTitle = (chapterName) => {
  readTitle.innerHTML = `<h1>${chapterName}</h1>`;
};

const listChapterHTML = async (data) => {
  listChapter.innerHTML = data.map((chapter, index) => {
    return `<li><a class="chapter-link" href="./read.html?chapterContent=${chapter.contentURL}&chapterName=${chapter.chapterName}&novelCode=${novelCode}">${chapter.chapterName}</a></li>`;
  }).join("\n");
};

const toggleListChapterVisibility = () => {
  isListChapterVisible = !isListChapterVisible;
  listChapter.style.display = isListChapterVisible ? "block" : "none";
};

if (queryParams.chapterContent) {
  renderNameChapter(queryParams.chapterName);
  document.title = queryParams.chapterName;
  changeTitle(queryParams.chapterName);
  renderContentChapter(queryParams.chapterContent);
  getListChapter().then((data) => listChapterHTML(data));
} else {
  getListChapter().then((data) => {
    renderNameChapter(data[0].chapterName);
    document.title = data[0].chapterName;
    changeTitle(data[0].chapterName);
    renderContentChapter(data[0].contentURL);
    listChapterHTML(data);
  });
}

document.querySelector(".list-chapter").addEventListener("click", toggleListChapterVisibility);
