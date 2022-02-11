const elRoot = document.getElementById("root");
const elButton = document.getElementById("button");
const elPagination = document.getElementById("pagination");
const elForm = document.getElementById("form");

const buttonShowMore = document.createElement("button");
buttonShowMore.innerHTML = "Show more";
buttonShowMore.onclick = showMoreComments;
elButton.appendChild(buttonShowMore);

сreateForm();

let arrayListComments = [];
let maxPage = 0;
let currentPage = 1;
let paginator = "";

const redrawingComments = () => {
  elRoot.innerHTML = "";
  let presentData = new Date().toJSON();
  let textDate = "";

  presentData = Date.parse(presentData);
  arrayListComments.forEach((el) => {
    const dateParse = Date.parse(el.updated_at);

    const blockComment = document.createElement("div");
    const blockAuthorAndDate = document.createElement("div");
    const authorComment = document.createElement("span");
    const textComment = document.createElement("span");
    const dateCreate = document.createElement("span");

    const raznica = presentData - dateParse;
    let postDate = mydiff("days", raznica);

    blockComment.className = "comment";
    authorComment.className = "comment_author";
    textComment.className = "comment_text";
    blockAuthorAndDate.className = "comment_date_autor";

    if (postDate === 0) {
      postDate = mydiff("hours", raznica);
      textDate = `${postDate} hours ago`;
    } else {
      textDate = `${postDate} days ago`;
    }

    dateCreate.innerHTML = textDate;
    authorComment.innerHTML = el.name;
    textComment.innerHTML = el.text;

    blockAuthorAndDate.appendChild(authorComment);
    blockAuthorAndDate.appendChild(dateCreate);
    blockComment.appendChild(blockAuthorAndDate);
    blockComment.appendChild(textComment);

    elRoot.appendChild(blockComment);
  });
};

getComments("", true);
