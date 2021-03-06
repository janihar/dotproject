import { dataset } from "../data/dataset.js";

let datasetLength = dataset.data.easy.length;
//Determines which task will be picked
let randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
//To ensure that player doesnt answer same question twice
let duplicates = [];

let image = dataset.data.easy[randomData].picture;
document.getElementById("gamepicture").src = image;
let word = "Kissa";
result();

function result() {
  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");

  for (var i = 0; i < word.length; i++) {
    correct.setAttribute("id", "my-word");
    let guess = document.createElement("input");
    guess.setAttribute("class", "guess");
    if (word[i] === "-") {
      guess.innerHTML = "-";
      space = 1;
    } else {
      guess.innerHTML = "_";
    }

    wordHolder.appendChild(correct);
    correct.appendChild(guess);
  }
}
