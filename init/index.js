const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listen.js");

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

const initDB = async ()=> {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
};

initDB();