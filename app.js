const express = require("express");
const app = express();
var cors = require("cors");
var jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
var fs = require("fs");
var Razorpay = require("razorpay");
var uuid = require('uuid-random');
app.use(cors());


const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//express.static(root);
app.use(express.static('public'))
app.set("view engine","ejs");

app.listen(process.env.PORT, () => console.log("Server is listening on PORT 3000"));

app.post("/login", (req, res) => {
    let {userName, userPassword} = req.body;
    User.findOne({email : userName}, (err, User) => {
        if(User == null){
            res.send(JSON.stringify({msg: "Not a User"}));
        }
        else if(User.password == userPassword){
            
            res.send(JSON.stringify({msg: "all good", name: User.name, email: User.email, phone: User.phone}));
        }else{
            res.send(JSON.stringify({msg: "Bad user"}));
        }
    })
});

app.get("/home", (req,res) =>{
  res.sendFile(__dirname+"/public/index.html");
});

app.get("/register-a-user", (req,res) =>{
  res.sendFile(__dirname+"/public/register.html");
});

var instance = new Razorpay({ key_id: 'rzp_live_IuHUh7tegtBSzR', key_secret: 'hL5AOn3SVcKWLRbS7RQIPY1a' });

var options = {
  amount: 100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "Order Succesfully placed"
};

app.get("/create/orderId",function(req,res){
  instance.orders.create(options, function(err, order) {
    //console.log(order);
    res.send(JSON.stringify(order));
  });
});

app.post("/api/payment/verify",(req,res)=>{
  // var r = json(req.body);
  //console.log(req.body);
  
  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', 'hL5AOn3SVcKWLRbS7RQIPY1a')
                                   .update(body.toString())
                                   .digest('hex');
                                   //console.log("sig received " ,req.body.response.razorpay_signature);
                                   //console.log("sig generated " ,expectedSignature);
   var response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.response.razorpay_signature)
    response={"signatureIsValid":"true"}
       res.send(response);
  // res.send("ok");
   });

   app.get("/api/get-price", (req,res) => {
     res.send(JSON.stringify({price: "000"}));
   })

   app.get("/api/get-jwt", (req, res) => {
     let username = req.query.username;
     const now = new Date();
      var key = fs.readFileSync('key.pk');
      var token = jwt.sign({"aud":"jitsi", "room":"*","sub":"vpaas-magic-cookie-5c7717c6a236429286b7061cd688dc6b","iss":"chat","exp": Math.round(now.setHours(now.getHours() + 3) / 1000),
      "nbf": (Math.round((new Date).getTime() / 1000) - 10),"context": {
        "features": {
          "livestreaming": false,
          "outbound-call": false,
          "sip-outbound-call": false,
          "transcription": false,
          "recording": false
        },
        "user": {
          "moderator": false,
          "name": username,
          "id": uuid(),
          "avatar": "",
          "email": ""
        }
      }},key,{algorithm: "RS256",header: {
        "alg": "RS256",
        "kid": "vpaas-magic-cookie-5c7717c6a236429286b7061cd688dc6b/5712b2",
        "typ": "JWT"
      }});
      res.send(JSON.stringify({token : token}));
   });

app.get("/public-library", (req,res) => {
  let username = req.query.username;
  let email = "";
//   User.findOne({email : userName}, (err, User) => {
//     if(User == null){
//         res.send(JSON.stringify({msg: "Not a User"}));
//     }
//     email = User.email;
    
// })
  //console.log(username);
  const now = new Date();
  var key = fs.readFileSync('key.pk');
  var token = jwt.sign({"aud":"jitsi", "room":"*","sub":"vpaas-magic-cookie-5c7717c6a236429286b7061cd688dc6b","iss":"chat","exp": Math.round(now.setHours(now.getHours() + 3) / 1000),
  "nbf": (Math.round((new Date).getTime() / 1000) - 10),"context": {
    "features": {
      "livestreaming": false,
      "outbound-call": false,
      "sip-outbound-call": false,
      "transcription": false,
      "recording": false
    },
    "user": {
      "moderator": false,
      "name": username,
      "id": uuid(),
      "avatar": "",
      "email": ""
    }
  }},key,{algorithm: "RS256",header: {
    "alg": "RS256",
    "kid": "vpaas-magic-cookie-5c7717c6a236429286b7061cd688dc6b/5712b2",
    "typ": "JWT"
  }})
  //fs.writeFileSync("gen-out.txt",token);
  res.render("lib",{user: username, email:email, jwt: token});
})


app.post("/register", (req, res)=>{
    //console.log(req.body);
    let {userName, userPassword,userFullName, userPhone} = req.body;
    const user = new User({
        name: userFullName,
        password: userPassword,
        email: userName,
        phone: userPhone
    });
    user.save();
    res.send(JSON.stringify({msg: "All Good"}));
})



async function main(){
    await mongoose.connect("mongodb+srv://ss-admin:allgood@cluster0.0jlnr.mongodb.net/",
    { dbName: 'userDb'});
}

main().catch( err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String
});

const User = mongoose.model('User', userSchema);

app.get("/imppages",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <a href="https://our-online-library.herokuapp.com/aboutus">About us</a>
        <a href="https://our-online-library.herokuapp.com/contactus">Contact us</a>
        <a href="https://our-online-library.herokuapp.com/privacy">Privacy Policies</a>
        <a href="https://our-online-library.herokuapp.com/terms">Terms & conditions</a>
        <a href="https://our-online-library.herokuapp.com/cancellation">Cancellation/Refund Policies</a>
        
        <script src="index.js"></script>
      </body>
    </html>`);
})
app.get("/aboutus",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
       About Us: This page is under construction..Also we need some workforce if you would like to join us then visit the contact page.
       
        <script src="index.js"></script>
      </body>
    </html>`);
})
app.get("/contactus",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
       Contact Us: 
       Karan Kapoor:persaccsarthak@gmail.com
       Sarthak Singh: sarthaksingh38@gmail.com
        <script src="index.js"></script>
      </body>
    </html>`);
})
app.get("/privacy",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        Privacy: All the Data you give will be stored in our Database and will not be shared with anyone at any cost.
        <script src="index.js"></script>
      </body>
    </html>`);
})
app.get("/terms",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        Terms: This page is under Construction. In case of any dispute final decision will be of the owner of the business.
        <script src="index.js"></script>
      </body>
    </html>`);
})
app.get("/cancellation",(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Online Lib Dev Pages</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        Cancellation terms:All cancelaltion rights reserved to the owner: 
        <br>
        
        <script src="index.js"></script>
      </body>
    </html>`);
})