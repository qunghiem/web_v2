import { fetchApi, getQueryParams } from "./Const.js";

const queryParams = getQueryParams();
const novelCode = queryParams.novelCode;

const URL = "http://54.254.135.110";
const listChapter = document.querySelector("#list-chapter");
const read = document.querySelector("#content-chapter");
const readTitle = document.querySelector("#chapter-name");

let contentHtml = `
<iframe class="read__image" scrolling="no"
src="${queryParams.chapterContent}"
width="100%" height="1000px" allow="autoplay" title=overflow="hidden"></iframe>
`;
let chapterNameHtml = `
<h1>${queryParams.chapterName}</h1>`;

const listChapterHTML = async () => {
  try {
    const data = await fetchApi(
      `${URL}/novels/get-chapter-in-novel?novelCode=${novelCode}`
    );

    let htmls = data
      .map((chapter, index) => {
        return `<li><a onClick="location.href='./read.html?chapterContent=${chapter.contentURL}&chapterName=${chapter.chapterName} &novelCode=${novelCode}'"
        > ${chapter.chapterName}</a></li>`;
      })
      .join("\n");

    listChapter.innerHTML = htmls;
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    // Handle error
  }
};

read.innerHTML = contentHtml;
readTitle.innerHTML = chapterNameHtml;
listChapterHTML();
