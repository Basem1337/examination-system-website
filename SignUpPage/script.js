let EmInput = $("#em");
let PwdInput = $("#pw");
let PwdInput2 = $("#pw2");
let FnInput = $("#fn");
let LnInput = $("#ln");
let btn = $("#submit-btn");

var counter = 0;
var flag = true;
var chk = false;

// console.log(EmInput);

PwdInput.on("keyup", function () {
  var pass = PwdInput.val();

  var strength = 0;
  var arr = [/.{8,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];

  jQuery.map(arr, function (regexp) {
    if (pass.match(regexp)) {
      strength++;
    }
  });

  switch (strength) {
    case 1:
      $("#pw-msg")
        .css({
          display: "block",
          color: "#DB5247",
        })
        .html("Password security: Low");
      break;
    case 2:
      $("#pw-msg")
        .css({
          display: "block",
          color: "#DBC869",
        })
        .html("Password security: Medium");
      break;
    case 3:
      $("#pw-msg")
        .css({
          display: "block",
          color: "#69DB72",
        })
        .html("Password security: Strong");
      break;
    case 4:
      $("#pw-msg")
        .css({
          display: "block",
          color: "#20D43B",
        })
        .html("Password security: Very Strong!");
      break;
    default:
      break;
  }
});

var eReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

$("#em-msg").css({ display: "hidden" });

$("#pwd-eye").on("click", function () {
  if (PwdInput.attr("type") == "password") {
    PwdInput.attr("type", "text");
    PwdInput.css("border", "none");

    $("#pwd-eye").attr("src", "../images/iconoir_eye_close.svg");
  } else {
    PwdInput.attr("type", "password");
    $("#pwd-eye").attr("src", "../images/iconoir_eye.svg");
  }
});

$("#pwd2-eye").on("click", function () {
  if (PwdInput2.attr("type") == "password") {
    PwdInput2.attr("type", "text");
    PwdInput2.css("border", "none");
    $("#pwd2-eye").attr("src", "../images/iconoir_eye_close.svg");
  } else {
    PwdInput2.attr("type", "password");
    $("#pwd2-eye").attr("src", "../images/iconoir_eye.svg");
  }
});

btn.on("click", function (e) {
  e.preventDefault();

  if (!FnInput.val()) {
    $("#fn-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This field is required!");
    FnInput.css({ border: "2px solid red" });
  } else if (isFinite(FnInput.val())) {
    $("#fn-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This Field is Characters only..");
    FnInput.css({ border: "2px solid red" });
  } else {
    $("#fn-msg")
      .css({
        display: "none",
      })
      .html("");
    FnInput.css({ border: "2px solid #D9D9D9" });
  }

  if (!LnInput.val()) {
    $("#ln-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This field is required!");
    LnInput.css({ border: "2px solid red" });
  } else if (isFinite(LnInput.val())) {
    $("#ln-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This Field is Characters only..");
    LnInput.css({ border: "2px solid red" });
  } else {
    $("#ln-msg")
      .css({
        display: "none",
      })
      .html("");
    LnInput.css({ border: "2px solid #D9D9D9" });
  }

  if (!EmInput.val()) {
    $("#em-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This field is required!");
    EmInput.css({ border: "2px solid red" });
  } else if (!eReg.test(EmInput.val())) {
    $("#em-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("Enter a valid e-mail!");
    EmInput.css({ border: "2px solid red" });
  } else {
    $("#em-msg")
      .css({
        display: "none",
      })
      .html("");
    EmInput.css({ border: "2px solid #D9D9D9" });
  }

  if (!PwdInput.val()) {
    $("#pw-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This field is required!");
    $(".pwd-input").css({ border: "2px solid red" });
  } else {
    $("#pw-msg")
      .css({
        display: "none",
      })
      .html("");
    $(".pwd-input").css({ border: "2px solid #D9D9D9" });
  }

  if (!PwdInput2.val()) {
    $("#pw2-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("This field is required!");
    $(".pwd-input").css({ border: "2px solid red" });
  } else if (PwdInput2.val() != PwdInput.val()) {
    $("#pw2-msg")
      .css({
        display: "block",
        color: "red",
      })
      .html("Password doesn't match!");
    $(".pwd-input").css({ border: "2px solid red" });
  } else {
    $("#pw2-msg")
      .css({
        display: "none",
      })
      .html("");
    $(".pwd-input").css({ border: "2px solid #D9D9D9" });
  }
});
