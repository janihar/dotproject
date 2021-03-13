import { dataset } from "../data/dataset.js";
import { getCategory } from "./functions/functions.js";
import { getParams } from "./functions/functions.js";

let results = newPair();
//To ensure that player doesnt answer same question twice
let duplicates = [];

document.getElementById("gamepicture").src = results[0];

let word = results[1];
var letters = [];
var randomLetters = [];

//To track how many question user has been answered. Default 1
var answeredQuestions = 1;
const maxQuestions = 10;

//To track how many answers were correct or wrong

let answers = [];

//-------------
let answeredWords = [];
let correctWords = [];
let times = [];

result();

function result() {
  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");
  showLetters();
  for (var i = 0; i < word.length; i++) {
    correct.setAttribute("id", "my-word");
    let guess = document.createElement("input");
    guess.setAttribute("class", "guess");
    guess.setAttribute("maxLength", 1);
    guess.style.width = "35px";
    guess.setAttribute("id", i);

    if (i == randomLetters[i]) {
      guess.setAttribute("value", letters[i]);
      guess.setAttribute("disabled", "");
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
 * @returns new picture and word as [] -> [0] = picture and [1] = word
 */
function newPair() {
  let gameDifficult = getParams()[0];
  let gameCategory = getParams()[1];
  let datasetLength;
  let randomData;
  let image;
  let word;
  let pair = [];

  console.log(
    dataset.data[gameDifficult][
      getCategory(dataset.data[gameDifficult], gameCategory)
    ]
  );
  datasetLength =
    dataset.data[gameDifficult][
      getCategory(dataset.data[gameDifficult], gameCategory)
    ].questions.length;
  randomData = Math.floor(Math.random() * (datasetLength - 1 - 1 + 1)) + 1;
  image =
    dataset.data[gameDifficult][
      getCategory(dataset.data[gameDifficult], gameCategory)
    ].questions[randomData].picture;
  word =
    dataset.data[gameDifficult][
      getCategory(dataset.data[gameDifficult], gameCategory)
    ].questions[randomData].word;
  pair.push(image);
  pair.push(word);

  return pair;
}

//-------------------------------------
function activateInputs() {
  $(document).ready(function () {
    $("form:first *:input:enabled:first").focus();
  });

  $("input").bind("input", function () {
    var $this = $(this);
    setTimeout(function () {
      if ($this.val().length >= parseInt($this.attr("maxlength"), 10)) {
        $this.nextAll("input:enabled").first().focus();
      }
    }, 0);
  });
}
activateInputs();
var j;
var selectedLetters;
var difficultyLevel;

function showLetters() {
  j = 0;
  selectedLetters = [];
  for (var i = 0; i < word.length; i++) {
    letters.push(word.charAt(i));

    if (getParams()[0] == "easy") {
      difficultyLevel = 0.7;
    } else if (getParams()[0] == "intermediate") {
      difficultyLevel = 0.5;
    } else if (getParams()[0] == "hard") {
      difficultyLevel = 0.25;
    } else if (getParams()[0] == "advanced") {
      difficultyLevel = 0.1;
    }

    var randomLength = Math.round(word.length * difficultyLevel);

    while (selectedLetters.length < randomLength) {
      var r = Math.floor(Math.random() * word.length);
      if (selectedLetters.indexOf(r) === -1) selectedLetters.push(r);
    }
    selectedLetters.sort();

    if (i == selectedLetters[j]) {
      randomLetters.push(i);
      j++;
    } else {
      randomLetters.push("-");
    }
  }
  //alert(randomLetters);
}

var answeredWord;
var score = 0;
var attempt = 0;
var RightOrWrongArnswer;
var t0 = performance.now();
var t1;
function readAnswer() {
  if (answeredQuestions === maxQuestions) {
    learningAnalytics();
    endGame();
  }
  answeredQuestions++;
  $("input").on("keydown", function search(e) {
    if (e.keyCode == 13) {
      answeredWord = "";
      for (var i = 0; i < word.length; i++) {
        answeredWord = answeredWord + document.getElementById(i).value;
      }
      if (word == answeredWord) {
        document.getElementById("counter").innerHTML =
          answeredQuestions + "/10";
        answers.push(true);
        RightOrWrongArnswer = true;
        rightOrWrong(RightOrWrongArnswer);

        answeredWords.push(answeredWord);
        correctWords.push(word);
        t1 = performance.now();
        setTimeout(function () {
          nextQuestion();
        }, 1500);
        score += 1;
        attempt += 1;
      } else {
        document.getElementById("counter").innerHTML =
          answeredQuestions + "/10";
        answers.push(false);
        RightOrWrongArnswer = false;
        rightOrWrong(RightOrWrongArnswer, word);

        answeredWords.push(answeredWord);
        correctWords.push(word);
        t1 = performance.now();
        setTimeout(function () {
          nextQuestion();
        }, 2000);
        attempt += 1;
      }
      if (attempt == 10) {
        alert("Nice work! You got " + score + "/" + attempt + " points!");
        score = 0;
        attempt = 0;
      }
    }
  });
}

readAnswer();
function nextQuestion() {
  timing();
  var inputs = document.getElementsByTagName("input");
  while (inputs.length) inputs[0].parentNode.removeChild(inputs[0]);

  results = newPair();
  duplicates = [];

  document.getElementById("gamepicture").src = results[0];

  word = results[1];
  letters = [];
  randomLetters = [];

  result();
  activateInputs();
  readAnswer();
}

function rightOrWrong(RightOrWrongArnswer, word) {
  var message = document.createElement("P");
  var timeOut = 0;
  if (RightOrWrongArnswer == true) {
    message.innerText = "Right answer!";
    message.style.color = "green";
    message.style.fontWeight = "bold";
    timeOut = 1500;
  } else if (RightOrWrongArnswer == false) {
    message.innerText = "Wrong answer! \n Right answer is: " + word;
    message.style.color = "red";
    message.style.fontWeight = "bold";
    timeOut = 2000;
  }

  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");
  correct.id = "my-word"
  wordHolder.innerHTML = "";
  wordHolder.appendChild(correct);
  correct.appendChild(message);
  setTimeout(function () {
    message.remove();
  }, timeOut);
}

function learningAnalytics() {
  var ul = document.createElement("ul");
  var li = document.createElement("li");
  ul.innerText = "Right answers:";
  li.innerText = "test";
  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("li");
  wordHolder.innerHTML = "";
  correct.innerHTML = "";
  wordHolder.appendChild(correct);
  /*correct.appendChild(ul);
  correct.appendChild(li);*/

  var testing = ["test1", "test2", "test3"];
  var ul = document.createElement("UL");
  for (var i = 0; i < testing.length; i++) {
    var li = document.createElement("LI");
    li.appendChild(document.createTextNode(answeredWords[i]));
    li.appendChild(document.createTextNode(correctWords[i]));
    li.appendChild(document.createTextNode(times[i]));
    ul.appendChild(li);
  }
  correct.appendChild(ul);
}

function timing() {
  var time = t1 - t0;
  var seconds = Math.floor(time / 1000);
  var hundreds = time / 1000 - seconds;
  hundreds = hundreds.toString();
  hundreds = hundreds.split(".")[1];
  hundreds = hundreds.substring(0, 3);
  time = seconds + ":" + hundreds;
  times.push(time);
  t0 = performance.now();
}
