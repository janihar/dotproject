import { dataset } from "../data/dataset.js";

let results = newPair();
//To ensure that player doesnt answer same question twice
let duplicates = [];

document.getElementById("gamepicture").src = results[0];

let word = results[1];
var letters=[];
var randomLetters=[];

result();

function result() {
  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");
  showLetters();
  for (var i = 0; i < word.length; i++) {
    
    correct.setAttribute("id", "my-word");
    let guess = document.createElement("input");
    guess.setAttribute("class", "guess");
    guess.setAttribute("maxLength",1);
    guess.style.width = '30px';
    
    
    if(i==randomLetters[i])
    {
      guess.setAttribute("value",letters[i]);
      guess.setAttribute("disabled","");
    }
    
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
$("input").bind("input", function() {
  var $this = $(this);
  setTimeout(function() {
      if ( $this.val().length >= parseInt($this.attr("maxlength"),10) )
      {
        $this.next("input").focus();
      }
      if($this.val()){
        
      }
  },0);
});

//---------------------------
function showLetters(){
  for (var i = 0; i < word.length; i++) {
    letters.push(word.charAt(i));

    randomLetters.push(Math.floor(Math.random() * (word.length - 1 + 1)) + 1);
    /*if(i == 2 || i == 4 || i == 5){
      randomLetters.push(i);
    }
    else{
      randomLetters.push("");
    }*/
    //randomLetters.push(Math.floor(Math.random() * word.length-1));
  }
  alert(randomLetters);
}

