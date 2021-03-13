import { dataset } from "../data/dataset.js";

let results = newPair();
//To ensure that player doesnt answer same question twice
let duplicates = [];

document.getElementById("gamepicture").src = results[0];

let word = results[1];
var letters=[];
var randomLetters=[];

//To track how many question user has been answered. Default 1
var answeredQuestions = 1;
const maxQuestions = 10;

//To track how many answers were correct or wrong

let answers = []

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
    guess.style.width = '35px';
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
var score=0;
var attempt=0;
var RightOrWrongArnswer;
function readAnswer(){
  answeredQuestions++;

  if (answeredQuestions === maxQuestions) {
    endGame()
  }

  $("input").on("keydown",function search(e) {
    if(e.keyCode == 13) {
      answeredWord="";
      for(var i = 0;i<word.length;i++){
        answeredWord=answeredWord+document.getElementById(i).value;
      }
      if(word==answeredWord){
        document.getElementById("counter").innerHTML = answeredQuestions + "/10";
        answers.push(true);
        RightOrWrongArnswer = true;
        rightOrWrong(RightOrWrongArnswer);
        setTimeout(function () { nextQuestion();}, 1500);
        score+=1;
        attempt+=1;
      }
      else{
        document.getElementById("counter").innerHTML = answeredQuestions + "/10";
        answers.push(false);
        RightOrWrongArnswer = false;
        rightOrWrong(RightOrWrongArnswer,word);
        setTimeout(function () { nextQuestion();}, 2000);
        attempt+=1;
      }
      if(attempt == 10){
        alert("Nice work! You got "+score+"/"+attempt+" points!");
        score = 0;
        attempt = 0;
      }
  }
});
}

readAnswer();
function nextQuestion(){
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

function rightOrWrong(RightOrWrongArnswer,word){
  var message = document.createElement("P");
  var timeOut = 0;
  if(RightOrWrongArnswer==true){
    message.innerText = "Right answer!";
    message.style.color = "green";
    message.style.fontWeight = "bold";
    message.style.fontFamily = "";
    timeOut = 1500;
  }
  else if(RightOrWrongArnswer==false){
    message.innerText = "Wrong answer! \n Right answer is: "+ word;
    message.style.color = "red";
    message.style.fontWeight = "bold";
    timeOut = 2000;
  } 

  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");
  wordHolder.innerHTML = "";
  wordHolder.appendChild(correct);
  correct.appendChild(message);
  setTimeout(function () { message.remove()}, timeOut);
}
