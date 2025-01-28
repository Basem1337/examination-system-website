const score = localStorage.getItem("quizScore");

document.querySelector(".exam-degree").innerText = `${score}%`;