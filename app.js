const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listen.js");
const path = require("path");

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

app.get("/listings", (req,res)=> {
    const allListings = Listing.find({});
    res.render("index.ejs", allListings);
});

app.listen(8080, ()=>{
    console.log("Connected");
});