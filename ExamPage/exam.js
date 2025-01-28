/////////////////
//////a setinterval function to simulate time and will be used to call the function timeout.
//added a shake effect when turning red.
let time = 6 * 60;

let x = setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  $(".time").text(`${minutes}:${seconds}`);
  if (time <= 90) {
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
    window.location.href = "../TimeOut Page/timeOut.html";
  } else {
    time--;
  }
}, 1000);
////////////////
//function to show the marked section as a menue and hide it when the size of window returns to normal.
$(".menu").on("click", function () {
  $("#close").css("display", "flex");
  $(".menu").css("display", "none");
  $(".marked")
    .css("display", "flex")
    .css("position", "absolute")
    .css("width", "500px");
});
$(window).on("resize", function () {
  if ($(window).width() < 600) {
    $(".menu").css("display", "flex");
  }
});
$(window).on("resize", function () {
  if ($(window).width() > 600) {
    $(".menu").css("display", "none");
    $(".marked").css({
      display: "flex",
      position: "relative",
      width: "80%",
      height: "84%",
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
let questIndex = randNum(0, 9);
let userAnswers = [];

$.getJSON("questions.json", function (data) {
  questions = data;
  userAnswers = Array(questions.length).fill(null);
  displayQuestion(questIndex);
});


function displayQuestion(index) {
  const question = questions[index%questions.length];
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
    window.location.href = "../Success Page/success.html";
  } else {
    window.location.href = "../Failed Page/failed.html";
  }
});
