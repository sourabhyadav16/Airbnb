const express = require("express");
const app = express();
const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/test';

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
})

app.listen(8080, ()=>{
    console.log("Connected");
});