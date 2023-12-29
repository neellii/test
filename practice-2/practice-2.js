const table = document.getElementById("data-output");

(function insertToTable() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const rows = `<tr>
							<td>${data[i].userId}</td>
							<td>${data[i].id}</td>
							<td>${data[i].title}</td>
							<td>${data[i].body}</td>
					  </tr>`;
        table.innerHTML += rows;
      }
    })
    .catch((err) => console.error(err));
})();
