const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listen.js");

const url = 'mongodb://127.0.0.1:27017/wonderlust';

main()
    .then (()=> {
        console.log("mongo connected");
    }).catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(url);
}

app.get("/", (req,res)=> {
    res.send("Hello");
});
 
app.get("/testlisting", async (req,res)=>{
    let sample = new Listing({
        title : "My new villa",
        discription : "By the beach",
        price : 2000,
        location : "goa",
        country : "India",
    })

    await sample.save();
    console.log("response send");
    res.send("Successful");
});

app.listen(8080, ()=>{
    console.log("Connected");
});