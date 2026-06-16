const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        filename : String,
        url : {
            type : String,
            default : "https://imgs.search.brave.com/vaWDz9DEX7iLcz6JG9bm5I_2WwjGve2X-ydUASr6800/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjc1/NjYzNzQvcGV4ZWxz/LXBob3RvLTI3NTY2/Mzc0L2ZyZWUtcGhv/dG8tb2YtdmFya2Fs/YS1iZWFjaC1jbGlm/ZnNpZGUuanBlZz9h/dXRvPWNvbXByZXNz/JmNzPXRpbnlzcmdi/JmRwcj0xJnc9NTAw",
        }
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
