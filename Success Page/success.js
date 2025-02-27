$(".go-home").on("click",function(){
  window.location.replace("../StartExamPage/index.html");
});

function launchConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    const randomX = Math.random();
    if (randomX < 0.35 || randomX > 0.75) {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 70,
        origin: {
          x: randomX,
          y: 1,
        },
        colors: ["#bb0000", "#ffffff", "#00bb00", "#0000bb", "#ffcc00"],
      });
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


const score = localStorage.getItem("quizScore");
const FrName = localStorage.getItem("fName");
const LsName = localStorage.getItem("lName");
const fullName = FrName + " " + LsName;

$(".exam-degree").text(`${score}%`);
$("h4").text(`${fullName}`);

window.onload = launchConfetti;

