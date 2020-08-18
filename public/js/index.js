const faveButtons = document.querySelectorAll("button.favorite");
for (let i = 0; i < faveButtons.length; i++) {
  faveButtons[i].addEventListener("click", (e) => {
    const cat = e.target.dataset.cat;
    const name = e.target.dataset.name;
    axios.post("/favorites/new", {cat, name} )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
