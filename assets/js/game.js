import { dataset } from "../data/dataset.js";

let results = newPair();
//To ensure that player doesnt answer same question twice
let duplicates = [];

document.getElementById("gamepicture").src = results[0];

let word = results[1];

result()

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

/**
 *
 * @returns gamemode easy, intermediate, hard or advanced
 */
function getParams() {
  var nameVal;
  var idx = document.URL.indexOf("?");
  var params = new Array();
  if (idx != -1) {
    var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      nameVal = pairs[i].split("=");
    }
  }
  return nameVal[1];
}

/**
 * 
 * @returns new picture and word as [] -> [0] = picture and [1] = word
 */
function newPair() {
  let gameDifficult = getParams();
  let datasetLength;
  let randomData;
  let image;
  let word;
  let pair = [];

  switch (gameDifficult) {
    case "easy":
      datasetLength = dataset.data.easy.length;
      randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
      image = dataset.data.easy[randomData].picture;
      word = dataset.data.easy[randomData].word;
      pair.push(image);
      pair.push(word);
      break;
    case "intermediate":
      datasetLength = dataset.data.intermediate.length;
      randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
      image = dataset.data.intermediate[randomData].picture;
      word = dataset.data.intermediate[randomData].word;
      pair.push(image);
      pair.push(word);
      break;
    case "hard":
      datasetLength = dataset.data.hard.length;
      randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
      image = dataset.data.hard[randomData].picture;
      word = dataset.data.hard[randomData].word;
      pair.push(image);
      pair.push(word);
      break;
    case "advanced":
      datasetLength = dataset.data.advanced.length;
      randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
      image = dataset.data.advanced[randomData].picture;
      word = dataset.data.advanced[randomData].word;
      pair.push(image);
      pair.push(word);
      break;
    default:
      console.log("Parameter error");
  }

  return pair;
}
