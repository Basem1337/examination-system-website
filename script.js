let EmInput = $("#em");
let PwdInput = $("#pw");
let PwdInputAll = $(".pwd-input");
let btn = $("#submit-btn");

var counter = 0;

// console.log(EmInput);

PwdInput.on("keyup",function(){

    var pass = PwdInput.val();

    
    
    var strength = 0;
    var arr = [/.{8,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];

    jQuery.map(arr, function(regexp) {
        if(pass.match(regexp)){
            strength++;
        }
    });
    
    switch (strength) {
        case 1:
            $("#pw-msg").css({
                "display":"block",
                "color":"#DB5247",
            }).html("Password security: Low");
            break;
        case 2:
            $("#pw-msg").css({
                "display":"block",
                "color":"#DBC869",
            }).html("Password security: Medium");
            break;
        case 3:
            $("#pw-msg").css({
                "display":"block",
                "color":"#69DB72",
            }).html("Password security: Strong");
            break;
        case 4:
            $("#pw-msg").css({
                "display":"block",
                "color":"#20D43B",
            }).html("Password security: Very Strong!");
            break;
        default:
            break;
    }
    
    
})


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