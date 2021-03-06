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
    guess.setAttribute("id",i);
    
    if(i==randomLetters[i])
    {
      guess.setAttribute("value",letters[i]);
      guess.setAttribute("disabled","");
    }
    
    if (word[i] === "-") {
      guess.innerHTML = "-";
      //space = 1;
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

//-------------------------------------
function activateInputs(){


$(document).ready(function() {
  $('form:first *:input:enabled:first').focus();
});

$("input").bind("input", function() {
  var $this = $(this);
  setTimeout(function() {
      if ( $this.val().length >= parseInt($this.attr("maxlength"),10) )
      {
        $this.nextAll("input:enabled").first().focus();
      }
  },0);
});}
activateInputs();
var j;
var selectedLetters;
var difficultyLevel;

function showLetters(){
  j=0;
  selectedLetters=[];
  for (var i = 0; i < word.length; i++) {
    letters.push(word.charAt(i));
    
    
    if(getParams() == "easy"){
      difficultyLevel = 0.70;
    }
    else if(getParams() == "intermediate"){
      difficultyLevel = 0.50;
    }
    else if(getParams() == "hard"){
      difficultyLevel = 0.25;
    }
    else if(getParams() == "advanced"){
      difficultyLevel = 0.10;
    }
    
    var randomLength = Math.round(word.length*difficultyLevel);
    
    while(selectedLetters.length < randomLength){
      var r = Math.floor(Math.random() * word.length);
      if(selectedLetters.indexOf(r) === -1) selectedLetters.push(r);
    }
    selectedLetters.sort();
    
    if(i == selectedLetters[j]){
      randomLetters.push(i);
      j++;
    }
    else{
      randomLetters.push("-");
    }
  }
  //alert(randomLetters);
}

var answeredWord;
function readAnswer(){
  
  $("input").on("keydown",function search(e) {
    if(e.keyCode == 13) {
      answeredWord="";
      for(var i = 0;i<word.length;i++){
        answeredWord=answeredWord+document.getElementById(i).value;
      }
      if(word==answeredWord){
        alert("Right answer! :)");

        var inputs = document.getElementsByTagName('input');
        while (inputs.length) inputs[0].parentNode.removeChild(inputs[0]);

        results = newPair();
        duplicates = [];

        document.getElementById("gamepicture").src = results[0];

        word = results[1];
        letters=[];
        randomLetters=[];

        result();
        activateInputs();
        readAnswer();
      }
      else{
        alert("Wrong answer.. :(");
      }
  }
});
}
readAnswer();