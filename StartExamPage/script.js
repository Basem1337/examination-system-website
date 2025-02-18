$("#submit-btn").on("click", function () {
  location.href = "../ExamPage/exam.html";
});

localStorage.setItem("testDuration", $("#test-dura").text().split(" ")[0]);
