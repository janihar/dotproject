import { getParams } from "./functions/functions.js";
import { dataset } from "../data/dataset.js";

//Change document h1 to gamemode
setGamemode(getParams()[0]);
listCategories();

function setGamemode(gamemode) {
  document.getElementById("gamemode").innerHTML =
    gamemode.charAt(0).toUpperCase() + gamemode.slice(1);
}

function listCategories() {
  let gameDifficult = getParams()[0];
  let data;
  let randomData;
  let word;
  let pair = [];

  //console.log(dataset.data[gameDifficult][getCategory(dataset.data[gameDifficult], gameCategory)]);
  data = dataset.data[gameDifficult];
  //console.log(data)
  randomData = 0;

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]["category"]);
    var node = document.createElement("LI"); // Create a <li> node
    node.id = "gameitem";
    var h2 = document.createElement("H2"); // Create a <h1> element
    h2.className = "text-center"
    var textnode = document.createTextNode(data[i]["category"]); // Create a text nodee
    h2.appendChild(textnode); // Append the text to <h1>
    node.appendChild(h2); // Append the text to <li>
    var a = document.createElement("a");
    a.href = "game.html?gamemode=" + gameDifficult + "&" + "category=" + data[i]["category"]; 
    var image = document.createElement("IMG");
    image.src = data[i].questions[0].picture;
    image.className = "center"
    a.appendChild(image)
    node.appendChild(a)
    document.getElementById("categorygroup").appendChild(node); // Append <li> to <ul> with id="myList"
  }

  //image = dataset.data[gameDifficult][getCategory(dataset.data[gameDifficult], gameCategory)].questions[randomData].picture
  //word = dataset.data[gameDifficult][getCategory(dataset.data[gameDifficult], gameCategory)].questions[randomData].word
}
