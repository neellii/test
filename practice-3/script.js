const tableContent = document.getElementById("data-output");
const tableHeaders = document.querySelectorAll("th");
const searchInput = document.getElementById("search");

const loadPosts = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  const posts = await response.json();
  return posts;
};

const insertToTable = (data) => {
  tableContent.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const rows = `<tr>
              <td>${data[i].userId}</td>
              <td>${data[i].id}</td>
              <td>${data[i].title}</td>
              <td>${data[i].body}</td>
            </tr>`;
    tableContent.innerHTML += rows;
  }
};

function searchTable(value, data) {
  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    value = value.toLowerCase();
    let body = data[i].body.toLowerCase();

    if (body.includes(value)) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
}

loadPosts().then((data) => {
  insertToTable(data);

  tableHeaders.forEach((h) => {
    h.addEventListener("click", () => {
      const column = h.dataset.col;
      let order = h.dataset.order;
      let arrow = h.getElementsByTagName("span")[0];

      if (order === "desc") {
        h.dataset.order = "asc";
        data = data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
        arrow.innerHTML = "&#129123";
      } else {
        h.dataset.order = "desc";
        data = data.sort((a, b) => (a[column] < b[column] ? 1 : -1));
        arrow.innerHTML = "&#129121";
      }

      insertToTable(data);
    });
  });

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    let filteredArr = searchTable(value, data);
    insertToTable(filteredArr);
  });
});
