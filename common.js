class Paginator {
  constructor(current, all, parentElement) {
    this.current = current;
    this.all = all;
    this.parentElement = parentElement;
  }

  render() {
    if (this.all === 1) {
      return;
    }
    const links = [1, this.all];
    for (let i = this.current - 2; i <= this.current + 2; i++) {
      if (i < 1 || i > this.all || links.length > 7) {
        continue;
      }
      links.push(i);
    }
    const uniqLinks = [...new Set(links)];
    uniqLinks.sort((a, b) => a - b);

    for (let i = 0; i < uniqLinks.length; i++) {
      this._renderLink(uniqLinks[i]);
      if (i + 1 < uniqLinks.length && uniqLinks[i] + 1 !== uniqLinks[i + 1]) {
        this.__renderDots();
      }
    }
  }

  _renderLink(pageNum) {
    const span = document.createElement("span");
    span.innerHTML = pageNum;
    span.className = "pagination_num";
    span.onclick = setCurrentPage;

    if (pageNum == this.current) {
      span.classList.add("current");
    }

    this.parentElement.appendChild(span);
  }

  __renderDots() {
    const span = document.createElement("span");
    span.innerHTML = "...";
    this.parentElement.appendChild(span);
  }
}

const setCurrentPage = (e) => {
  currentPage = Number(e.target.innerHTML);
  getComments("goToNewCurrentPage");
};

const redrawingPagination = () => {
  elPagination.innerHTML = "";
  paginator.current = currentPage;
  paginator.all = maxPage;
  paginator.render();
};

const showMoreComments = () => {
  currentPage += 1;
  getComments("getNextComments");
};

const createPaginator = () => {
  paginator = new Paginator(currentPage, maxPage, elPagination);
};

const updateArrayList = (objPage) => {
  objPage.data.forEach((element) => {
    arrayListComments.push(element);
  });
};

const сreateForm = () => {
  const formParent = document.createElement("form");
  const h1Form = document.createElement("h1");
  const formInputName = document.createElement("input");
  const formInputText = document.createElement("textarea");
  const blockButton = document.createElement("div");
  const buttonForm = document.createElement("input");

  buttonForm.type = "submit";
  buttonForm.value = "post";
  formParent.method = "post";
  formParent.onsubmit = sendComment;

  h1Form.innerHTML = "Comments";

  formInputName.type = "text";
  formInputName.id = "name";
  formInputName.min = "1";
  formInputName.placeholder = "Name";
  formInputName.required = true;

  formInputText.type = "text";
  formInputText.id = "text";
  formInputText.min = "1";
  formInputText.placeholder = "Text";
  formInputText.required = true;
  
  formParent.appendChild(h1Form);
  formParent.appendChild(formInputName);
  formParent.appendChild(formInputText);
  blockButton.appendChild(buttonForm);
  formParent.appendChild(blockButton);

  elForm.appendChild(formParent);
};

const sendComment = (e) => {
  e.preventDefault();
  postComments({
    name: document.getElementById("name").value,
    text: document.getElementById("text").value,
  });
  document.getElementById("name").value = "";
  document.getElementById("text").value = "";
};

function mydiff(interval,timediff) {
  const second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
  if (isNaN(timediff)) return NaN;
  switch (interval) {
      case "days"   : return Math.floor(timediff / day); 
      case "hours"  : return Math.floor(timediff / hour); 
      default: return undefined;
  }
}