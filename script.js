let EmInput = $("#em");
let PwdInput = $("#pw");
let PwdInputAll = $(".pwd-input");
let btn = $("#submit-btn");

let eReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let emAddr = localStorage.getItem("email");
let emPass = localStorage.getItem("pass");

console.log(emAddr,emPass);


$("#em-msg").css({"display":"hidden",});

$("#pwd-eye").on("click",function(){

    if(PwdInput.attr("type") == "password"){
        PwdInput.attr("type","text");
        $("#pwd-eye").attr("src","images/iconoir_eye_close.svg");
    }else{
        PwdInput.attr("type","password");
        $("#pwd-eye").attr("src","images/iconoir_eye.svg");
    }


})

btn.on("click",function(e){
    e.preventDefault();
    var flag = true;

    if(!EmInput.val()){
        $("#em-msg").css({
            "display":"block",
            "color":"red",
        }).html("This field is required!");
        EmInput.css({"border":"2px solid red"});
        flag = false;
    }else if(!eReg.test(EmInput.val())){
        $("#em-msg").css({
            "display":"block",
            "color":"red",
        }).html("Enter a valid e-mail!");
        EmInput.css({"border":"2px solid red"});
        flag = false;
    }else if(EmInput.val() != emAddr){
        $("#em-msg").css({
            "display":"block",
            "color":"red",
        }).html("Email is incorrect!");
        EmInput.css({"border":"2px solid red"});
        flag = false;
    }else{
        $("#em-msg").css({
            "display":"none",
        }).html("");
        EmInput.css({"border":"2px solid #D9D9D9"});
    }

    if(!PwdInput.val()){
        $("#pw-msg").css({
            "display":"block",
            "color":"red",
        }).html("This field is required!");
        PwdInputAll.css({"border":"2px solid red"});
        flag = false;
    }else if(PwdInput.val() != emPass){
        $("#pw-msg").css({
            "display":"block",
            "color":"red",
        }).html("Password is incorrect!");
        PwdInputAll.css({"border":"2px solid red"});
        flag = false;
    }else{
        $("#pw-msg").css({
            "display":"none",
        }).html("");
        PwdInputAll.css({"border":"2px solid #D9D9D9"});
    }

    if(flag){
        window.location.replace("../StartExamPage/index.html");
    }
});