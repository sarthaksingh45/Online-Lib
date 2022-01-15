$("#login-btn").click(function(){
    $("#login-btn").innerText = "Loading";
    if($("#email")[0].value == ""){
        return ;
    }
    if($("#password")[0].value == ""){
        return ;
    }
    $.post("localhost:3000/login",{userName: "sar@gg.com",password:"123"},function(data){
        
    })
})