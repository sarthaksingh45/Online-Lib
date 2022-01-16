const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
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
  res.render("lib",{user: username, email:email});
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