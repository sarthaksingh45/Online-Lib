const express = require("express");
const app = express();

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

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