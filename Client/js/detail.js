import { IncreaseView, getQueryParams } from "./Const.js";
const URL="http://54.254.135.110"


const novelName=getQueryParams().name;
async function fetchDataAndRender() {
  const item = getQueryParams();
  try {
    await Promise.all([
      IncreaseView(item.novelCode),
      getChapterByNovelID(item.novelCode),
    ]).then(([_, listChapter]) => {
      console.log(listChapter);
      renderHTML(item, listChapter);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error
  }
}

async function getChapterByNovelID(novelCode) {
  try {
    const response = await fetch(
      `${URL}/novels/get-chapter-in-novel?novelCode=${novelCode}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chapters");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
}

function renderHTML(item, listChapter) {
  const listChapterHTML = listChapter
    .map((chapter, index) => {
      return `<li><a onClick="location.href='./read.html?chapterContent=${chapter.contentURL}&chapterName=${chapter.chapterName
    } &novelCode=${item.novelCode}'"
      > ${chapter.chapterName}</a></li>`;
    })
    .join("\n");
  console.log(listChapterHTML);

  let detail = document.querySelector("#detail");
  let html = `
  <div class="detail-top">
    <img scroll="no" overflow="hidden" class="detail-image" scrolling="no"
      src="${item.descriptionImage}"
      width="176px" height="270" allow="autoplay" title=overflow="hidden"></img>
    <div class="detail-content">
      <h3 class="detail-title">${item.name}</h3>
      <p class="detail-author">Tác giả: <a href="">${item.author}</a></p>
      <p class="detail-view">Luợt xem: <span>${item.view}</span></p>
      <button class="read" onclick="location.href='./read.html?novelCode=${item.novelCode}'">Đọc truyện</button>
      <div class="rate">
              <a>
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <p>Ủng hộ</p>
              </a>
              <a>
                <i class="fa-solid fa-star"></i>
                <p>Đánh giá</p>
              </a>
              <a>
                <i class="fa-solid fa-calendar-check"></i>
                <p>Đề cử</p>
              </a>
      </div>
    </div>
  </div>
  <div class="detail-bottom">
    <ul>
      <li class="desc dont-need"><a>GIỚI THIỆU</a></li>
      <li class="list-chapter-1 need" onclick="hamNone()"><a>DANH SÁCH CHƯƠNG</a>
      </li>
      <li class="cmt need"><a>BÌNH LUẬN</a></li>
    </ul>
  
      <ul id="list-chapter" >
      </ul>
    <h3>${item.name}</h3>
  
    <div class="iframe"> 
      <iframe scroll="no" overflow="hidden" class="detail-image" scrolling="no"
          src="${item.description}"
          width="100%" height="1000px" allow="autoplay" title=overflow="hidden"></iframe>
    </div>
    
  </div>
  
  `;

  detail.innerHTML = html;
  document.getElementById("list-chapter").innerHTML = listChapterHTML;

  // You may want to do additional DOM manipulation or event handling here
}

fetchDataAndRender();
