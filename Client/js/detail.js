import { IncreaseView, getQueryParams } from "./Const.js";

const URL = "http://54.254.135.110";

async function fetchDataAndRender() {
  try {
    const queryParams = getQueryParams();
    document.title = queryParams.name;
    const novelCode = queryParams.novelCode;

    const [_, listChapter] = await Promise.all([
      IncreaseView(novelCode),
      getChapterByNovelID(novelCode),
    ]);

    renderHTML(queryParams, listChapter);
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
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
      return `<li onclick="location.href='./read.html?chapterContent=${chapter.contentURL}&chapterName=${chapter.chapterName}&novelCode=${item.novelCode}'" ><a >${chapter.chapterName}</a></li>`;
    })
    .join("\n");

  const detail = document.querySelector("#detail");
  const html = `
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
          <li class="list-chapter-1 need" id="show-chapters"><a>DANH SÁCH CHƯƠNG</a></li>
          <li class="cmt need"><a>BÌNH LUẬN</a></li>
        </ul>
        <ul id="list-chapter">${listChapterHTML}</ul>
        <h3 class="novel-name">${item.name}</h3>
        <div class="iframe" display="none"> 
          <iframe scroll="no" overflow="hidden" class="detail-image" scrolling="no"
              src="${item.description}"
              width="100%" height="1000px" allow="autoplay" title=overflow="hidden"></iframe>
        </div>
    </div>
  `;
  detail.innerHTML = html;
  document.querySelector(".dont-need").addEventListener("click", () => {
    document.querySelector(".iframe").style.display = "block";
    document.getElementById("list-chapter").style.display = "none";
  });
  // Add event listener for chapter links
  document.getElementById("show-chapters").addEventListener("click", () => {
    document.getElementById("list-chapter").style.display = "block";
    document.querySelector(".iframe").style.display = "none";
  });

  // Add event listener for chapter links
  document.querySelectorAll(".chapter-link").forEach((link) => {
    link.addEventListener("click", () => {
      const chapterContent = link.dataset.chapter;
      const novelCode = link.dataset.novel;
      // Handle chapter link click, navigate to read.html with appropriate params
      location.href = `./read.html?chapterContent=${chapterContent}&novelCode=${novelCode}`;
    });
  });
}

fetchDataAndRender();
