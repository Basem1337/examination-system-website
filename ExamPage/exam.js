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