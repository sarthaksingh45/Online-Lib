const express = require("express");
const app = express();

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => console.log("Server is listening on PORT 3000"));

app.get("/login", (req, res) => {
    let {userName, userPassword} = req.body;
    User.findOne({name : userName}, (err, User) => {
        console.log(User);


    })
    res.send(JSON.stringify({
        title: "something",
        msg : 'All good'
    }));
});


app.post("/register", (req, res)=>{
    //console.log(req.body);
    let {userName, userPassword} = req.body;
    const user = new User({
        name: userName,
        password: userPassword
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
    password: String
});

const User = mongoose.model('User', userSchema);