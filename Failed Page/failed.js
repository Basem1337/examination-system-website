$(".go-home").on("click",function(){
    window.location.replace("../StartExamPage/index.html");
});

const score = localStorage.getItem("quizScore");
const FrName = localStorage.getItem("fName");
const LsName = localStorage.getItem("lName");
const fullName = FrName + " " + LsName;

$(".exam-degree").text(`${score}%`);
$("h4").text(`${fullName}`);