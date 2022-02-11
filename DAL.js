async function postComments(objValues) {
  const response = await fetch(
    `https://jordan.ashton.fashion/api/goods/30/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objValues),
    }
  );

  if (response.status === 200) {
    createPaginator();
    redrawingPagination();
    if (currentPage === maxPage) {
      getComments("goToNewCurrentPage");
      redrawingComments();
    }
  }
}

async function getComments(func = "", needCreatePaginator = false) {
  fetch(
    `https://jordan.ashton.fashion/api/goods/30/comments?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((objPage) => {
      maxPage = objPage.last_page;
      if (needCreatePaginator) {
        createPaginator();
      }
      if (func && func === "getNextComments") {
        updateArrayList(objPage);
      } else if (func && func === "goToNewCurrentPage") {
        arrayListComments = [];
        updateArrayList(objPage);
      } else if (!func) {
        updateArrayList(objPage);
      }
      redrawingPagination();
      redrawingComments();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  currentPage === maxPage
    ? (elButton.style.display = "none")
    : (elButton.style.display = "block");
}
