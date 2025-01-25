let EmInput = $("#em");
let PwdInput = $("#pw");
let btn = $("#submit-btn");

var counter = 0;
var flag = true;
var chk = false;

// console.log(EmInput);

var eReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

$("#em-error").css({"display":"hidden",});

btn.on("click",function(e){
    e.preventDefault();
    if(!EmInput.value){
        $("#em-error").css({
            "display":"block",
            "color":"red",
        }).html("This field is required!");
    }else if(!eReg.match(EmInput.value)){
        $("#em-error").css({
            "display":"block",
            "color":"red",
        }).html("Enter a valid e-mail!");
    }else{
        $("#em-error").css({
            "display":"hidden",
        });
    }

    if(!PwdInput.value){
        $("#pw-error").css({
            "display":"block",
            "color":"red",
        }).html("This field is required!");
    }else{
        $("#pw-error").css({
            "display":"hidden",
        });
    }
});





