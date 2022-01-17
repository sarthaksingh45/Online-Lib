$("#submit-button").click(function(){
    
    $("#submit-button")[0].innerText = "Loading";
    let nameText = $("#name-in")[0].value;
    let emailText = $("#email-in")[0].value;
    let passwordText = $("#password-in")[0].value;
    let repeatText = $("#pass-repeat-in")[0].value;
    if( emailText == ""|| nameText=="" || passwordText =="" || repeatText == "" ){
        $("#error-msg")[0].innerText = "Oops, You have missed some entry in the form"
        $("#error-msg").show();
        setTimeout(function(){
            $("#error-msg").hide();
        },4000)
        $("#submit-button")[0].innerText = "Register";
        return true;
    }
    if(passwordText != repeatText){
        $("#error-msg")[0].innerText = "Oops, repeat password is not correct";
        $("#error-msg").show();
        setTimeout(function(){
            $("#error-msg").hide();
        },4000)
        $("#submit-button")[0].innerText = "Register";
        return true;
    }
    if(!$("#check-box")[0].checked){
        $("#error-msg")[0].innerText = "Oops, You need to agree to the terms and conditions";
        $("#error-msg").show();
        setTimeout(function(){
            $("#error-msg").hide();
        },4000)
        $("#submit-button")[0].innerText = "Register";
        return true;
    }
    
    $.post("https://our-online-library.herokuapp.com/register",{userName:emailText, userPassword:passwordText,userFullName:nameText, userPhone:"null"},function(data){
        data = $.parseJSON(data);
        if(data.msg == "All Good"){
            window.location = `https://our-online-library.herokuapp.com/public-library?username=${nameText}`;
        }else{
            $("#error-msg")[0].innerText = "Something went Wrong";
            $("#error-msg").show();
            setTimeout(function(){
                $("#error-msg").hide();
            },4000)
            $("#submit-button")[0].innerText = "Register";
            return true;
        }
    }).fail(function(){
        $("#error-msg")[0].innerText = "Something went Wrong";
            $("#error-msg").show();
            setTimeout(function(){
                $("#error-msg").hide();
            },4000)
            $("#submit-button")[0].innerText = "Register";
            return true;
    })
})