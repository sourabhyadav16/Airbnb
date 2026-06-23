const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listen.js");
const path = require("path");
const methodOverride = require("method-override"); //for put method
const ejsMate = require("ejs-mate");

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
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

//Main root
app.get("/", (req,res)=> {
    res.send("Hello");
});

//Index route
app.get("/listings", async (req,res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//Create new
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//New Post
app.post("/listings", async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Get update
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//Put update
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);    
});

//Delete route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(8080, ()=>{
    console.log("Connected");
});