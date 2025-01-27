////////to add the background color on the selected option//////
//note: i think the user should not remove his choise!!
$(".option").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".option").removeClass("active");
    $(this).addClass("active");
  }
});
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