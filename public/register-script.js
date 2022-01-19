var orderId ;
var paymentDone = true;
// $(document).ready(function(){   
//      var settings = {  "url": "/create/orderId",  "method": "GET",  "timeout": 0,  "headers": {    "Content-Type": "application/json"  },
//     };//creates new orderId everytime
// $.ajax(settings).done(function (response) {
//     response = JSON.parse(response);
//     orderId=response.id; 
//     var options = {    "key": "rzp_live_IuHUh7tegtBSzR", // Enter the Key ID generated from the Dashboard    
//     "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise   
//     "currency": "INR",    "name": "THE COVER",    "description": "Membership Charges for public Library",      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the previous step    
//     "handler": function (response){ 
//       console.log(response); 
//       var settings = {
//                 "url": "/api/payment/verify",
//                 "method": "POST",
//                 "timeout": 0,
//                 "headers": {
//                   "Content-Type": "application/json"
//                 },
//                 "data": JSON.stringify({response}),
//               }
//               $.ajax(settings).done(function (response){
//                 if(response.signatureIsValid == "true"){
//                   paymentDone = true;
//                 }else{
//                   $("#error-msg")[0].innerText = "Oops, Your Payment has Failed!!"
//                   $("#error-msg").show();
//                   setTimeout(function(){
//                       $("#error-msg").hide();
//                   },4000)
//                 }
//               }); 

//       },  
//     "prefill": {        "name": "Karan Kapoor",        "email": "sarthaksingh38@gmail.com",        "contact": "9045848350"    },        "theme": {        "color": "#3399cc"    }};
//     var rzp1 = new Razorpay(options);
//     rzp1.on('payment.failed', function (response){        console.log(response)});
//     document.getElementById('rzp-button1').onclick =    function(e){   
//              rzp1.open();    
//              e.preventDefault();
//             }  });

// });




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
    if(paymentDone == true){
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
        });
    }else{
        $("#error-msg")[0].innerText = "Oops, You need to pay for the membership to register";
        $("#error-msg").show();
        setTimeout(function(){
            $("#error-msg").hide();
        },4000)
        $("#submit-button")[0].innerText = "Register";
        return true;
    }
    
})