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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true})); //to parse the data

app.get("/", (req,res)=> {
    res.send("Hello");
});

//Index route
app.get("/listings", async (req,res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//Show route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/show.ejs", {listing});
})

app.listen(8080, ()=>{
    console.log("Connected");
});