import { fetchApi, getQueryParams } from "./Const.js";
const queryParams = getQueryParams();
const novelCode = queryParams.novelCode;

const URL = "http://54.254.135.110";
const listChapter = document.querySelector("#list-chapter");
const read = document.querySelector("#content-chapter");
const readTitle = document.querySelector("#chapter-name");
const title = document.querySelector("#title");
const getListChapter=async()=>{
  try {
    const data = await fetchApi(
      `${URL}/novels/get-chapter-in-novel?novelCode=${novelCode}`
    );
      return data;
    }
  catch (error) {
    console.error("Error fetching chapter data:", error);
    // Handle error
  }
}
const renderNameChapter = (chapterName) => {
  readTitle.innerHTML = `
  <h1>${chapterName}</h1>`;
};
const renderContentChapter = (content) => {
  read.innerHTML = `
  <iframe class="read__image" scrolling="no"
  src="${content}"
  width="100%" height="1000px" allow="autoplay" title=overflow="hidden"></iframe>
  `;
};
const changeTitle = (chapterName) => {
  readTitle.innerHTML = `
  <h1>${chapterName}</h1>`;
};
const listChapterHTML = async (data) => {
  listChapter.innerHTML = data
    .map((chapter, index) => {
      return `<li><a onClick="location.href='./read.html?chapterContent=${chapter.contentURL}&chapterName=${chapter.chapterName
      } &novelCode=${novelCode}'"
      > ${chapter.chapterName}</a></li>`;
    })
    .join("\n");
};

if (queryParams.chapterContent) {
  renderNameChapter(queryParams.chapterName);
  changeTitle(queryParams.chapterName);
  renderContentChapter(queryParams.chapterContent);
  listChapterHTML();
}
else {
  const data = await getListChapter();
  renderNameChapter(data[0].chapterName);
  changeTitle(data[0].chapterName);
  renderContentChapter(data[0].contentURL);
  listChapterHTML(data);
}
