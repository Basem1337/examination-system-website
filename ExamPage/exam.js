/////////////////
//////a setinterval function to simulate time and will be used to call the function timeout.
//added a shake effect when turning red.
let getTime = localStorage.getItem("testDuration");
let time = getTime * 60;
let timeWarn = time*0.5;

let x = setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  $(".time").text(`${minutes}:${seconds}`);
  if (time <= timeWarn) {
    $(".time").css("color", "#ffd500");
  }
  if (time === 30) {
    $(".time").addClass("shake");
  }
  if (time <= 30) {
    $(".time").css("color", "red");
  }
  if (time === 29) {
    $(".time").removeClass("shake");
  }
  if (time <= 0) {
    clearInterval(x);
    window.location.replace("../TimeOut Page/timeOut.html");
  } else {
    time--;
  }
}, 1000);
////////////////
//function to show the marked section as a menue and hide it when the size of window returns to normal.
$(".menu").on("click", function () {
  $("#close").css("display", "flex");
  $(".menu").css("display", "none");
  $(".side").css("display", "flex");
  $(".marked").css("display", "flex");
});
$(window).on("resize", function () {
  if ($(window).width() < 720) {
    $(".menu").css("display", "flex");
    $("#close").css("display", "flex");
    $(".marked").css({
      display: "none",
    });
  }
});
$(window).on("resize", function () {
  if ($(window).width() > 720) {
    $(".menu").css("display", "none");
    $(".marked").css({
      display: "flex",
    });
    $("#close").css("display", "none");
  }
});
////////////////////
///////close the marked section on the lower size screens.
$("#close").on("click", function () {
  $(".marked").css("display", "none");
  $(".menu").css("display", "flex");
});
////////////////////////////////
/////////////////////////////////////////////////////////////////

function randNum(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min - 1;
}

let questions = [];
let currentIndex = 0;
let questIndex = 0;
let userAnswers = [];

$.getJSON("questions.json", function (data) {
  questions = data;
  userAnswers = Array(questions.length).fill(null);

  let shuffledQuestions = [];
  let numOfIteration = questions.length;
  for (let i = 0; i < numOfIteration; i++) {
    let num = randNum(0, questions.length);
    shuffledQuestions.push(questions[num]);
    questions.splice(num, 1);
  }

  questions = shuffledQuestions;
  displayQuestion(questIndex);
}).fail(function (jqXHR, textStatus, errorThrown) {
  $(".question").css("display","none");
  $(".side").css("display", "none");
  $(".error").css("display", "flex");
  });

function displayQuestion(index) {
  const question = questions[index % questions.length];
  $(".question-text").text(question.question);
  $(".q-number").text(`${currentIndex + 1}/${questions.length}`);
  $(".num").text(`${currentIndex + 1}`);

  $(".option").remove();

  question.answers.forEach((answer, i) => {
    $(".answers").append(`
        <div class="option" data-index="${i}">
          <p>${answer}</p>
        </div>
      `);
  });

  if (userAnswers[index] !== null) {
    $(`.option[data-index="${userAnswers[index]}"]`).addClass("active");
  }
}

$(".mid-section").on("click", ".option", function () {
  $(".option").removeClass("active");
  $(this).addClass("active");

  const selectedIndex = $(this).data("index");
  userAnswers[questIndex] = selectedIndex;
});

$(".next").on("click", function () {
  if (currentIndex === questions.length - 2) {
    $(".next").css("cursor", "default");

    $(".next").css("background", "rgba(233, 233, 233, 1)");
  }
  if (currentIndex < questions.length - 1) {
    $(".back").css("cursor", "pointer");
    $(".back").css("background", "rgba(255, 124, 124, 1)");
    currentIndex++;
    displayQuestion(++questIndex);
  }

  if (markArr.includes(currentIndex)) {
    $(".mark i").attr("class", "fa-solid fa-bookmark");
  } else {
    $(".mark i").attr("class", "fa-regular fa-bookmark");
  }
});

$(".back").on("click", function () {
  if (currentIndex === 1) {
    $(".back").css("cursor", "default");
    $(".back").css("background", "rgba(233, 233, 233, 1)");
  }
  if (currentIndex > 0) {
    $(".next").css("cursor", "pointer");
    $(".next").css("background", "rgba(255, 124, 124, 1)");
    currentIndex--;
    displayQuestion(--questIndex);
  }

  if (markArr.includes(currentIndex)) {
    $(".mark i").attr("class", "fa-solid fa-bookmark");
  } else {
    $(".mark i").attr("class", "fa-regular fa-bookmark");
  }
});

$(".submit").on("click", function () {
  let correctAnswers = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      correctAnswers++;
    }
  });

  const percentage = (correctAnswers / questions.length) * 100;

  localStorage.setItem("quizScore", percentage);
  if (percentage > 50) {
    window.location.replace("../Success Page/success.html");
  } else {
    window.location.replace("../Failed Page/failed.html");
  }
});

////////////////////////////////////////////////////////////////////////

let markArr = [];

$(".mark").on("click", function () {
  if ($(this.children).hasClass("fa-regular fa-bookmark")) {
    $(this.children).attr("class", "fa-solid fa-bookmark");
    $(".marked-quest").append(
      `<div class="q-mark" id="${currentIndex}"><div class="gotoQuest" id="${currentIndex}"><h6>Question No.${
        currentIndex + 1
      }</h6></div><i class="fa-solid fa-trash"></i></div>`
    );

    if (!markArr.includes(currentIndex)) {
      markArr.push(currentIndex);
    }
  } else {
    $(this.children).attr("class", "fa-regular fa-bookmark");
    $(`#${currentIndex}`).remove();
    markArr = markArr.filter((i) => i !== currentIndex);
  }
});

$(".marked-quest").on("click", ".q-mark i", function () {
  let arrInd = markArr.indexOf(Number($(this).closest(".q-mark").attr("id")));

  $(this).closest(".q-mark").remove();

  if (currentIndex == $(this).closest(".q-mark").attr("id")) {
    $($(".mark i")).attr("class", "fa-regular fa-bookmark");
  }

  markArr.splice(arrInd, 1);
});

$(".marked-quest").on("click", ".gotoQuest", function () {
  const markedQuestionIndex = Number($(this).attr("id"));
  currentIndex = markedQuestionIndex;
  questIndex = markedQuestionIndex;
  console.log(questions);

  if(currentIndex == 0){
    $(".back").css("cursor", "default");
    $(".back").css("background", "rgba(233, 233, 233, 1)");
  }

  if(currentIndex > 0){
    $(".back").css("cursor", "pointer");
    $(".back").css("background", "rgba(255, 124, 124, 1)");
    $(".next").css("cursor", "pointer");
    $(".next").css("background", "rgba(255, 124, 124, 1)");
  }

  if(currentIndex == questions.length-1){
    $(".next").css("cursor", "default");
    $(".next").css("background", "rgba(233, 233, 233, 1)");
  }

  if ($(window).width() < 720) {
    $(".menu").css("display", "flex");
    $(".marked").css("display", "none");
  }

  displayQuestion(currentIndex);

  if (markArr.includes(currentIndex)) {
    $(".mark i").attr("class", "fa-solid fa-bookmark");
  } else {
    $(".mark i").attr("class", "fa-regular fa-bookmark");
  }
});

$(".goHome").on("click",function(){
  window.location.href = "../StartExamPage/index.html";
});