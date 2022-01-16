$(window).scroll(function(){
    if(window.scrollY == 675){
        $("#about-us").addClass("anim");
        $(window).unbind('scroll');
    }
});

$("#login-btn").click(function(){
    $("#login-btn")[0].innerText = "Loading";
    let emailText = $("#email")[0].value;
    let passText = $("#password")[0].value;
    if( emailText == ""){
        $("#null-entry").show();
        setTimeout(function(){
            $("#null-entry").hide();
        },4000)
        $("#login-btn")[0].innerText = "Login";
        return true;
    }
    if( passText == ""){
        $("#null-entry").show();
        setTimeout(function(){
            $("#null-entry").hide();
        },4000)
        $("#login-btn")[0].innerText = "Login";
        return true;
    }
    $.post("https://our-online-library.herokuapp.com/login",{userName: emailText,userPassword:passText},function(data){
        if(data.msg == "all good"){
            window.location = "https://our-online-library.herokuapp.com/imppages";
        }else{
            $("#wrong-pass").show();
            setTimeout(function(){
                $("#wrong-pass").hide();
            },4000)
            $("#login-btn")[0].innerText = "Login";
            return true;
        }
    }).fail(function(){
        $("#server-err").show();
        setTimeout(function(){
            $("#server-err").hide();
        },4000)
        $("#login-btn")[0].innerText = "Login";
        return true;
    })
})