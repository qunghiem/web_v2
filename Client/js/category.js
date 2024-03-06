import { fetchApi } from "./Const.js";
const URL="http://54.254.135.110"

const typeNovel = document.querySelector("#type__Novel");

fetchApi(`${URL}/novels/get-all-category`)
  .then((data) => {
    let htmls = data.map((item) => {
      // Construct query parameters for novel IDs
      const queryRequest = item.novelId.map((id) => `${id}`).join(",");
      return `
        <div class="type__item">
            <a href="./index.html?listNovelId=${queryRequest}">
                ${item.categoryName}
            </a>
        </div>
      `;
    });

    // Set inner HTML of typeNovel element
    typeNovel.innerHTML = htmls.join("");
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
    // Handle error
  });
