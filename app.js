const express=require("express");
const app=express();
const mongoose= require("mongoose");
const Listing = require('./models/listing');
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
    
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

app.get("/",(req,res)=>{
 res.send("HIi ");
});
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
        // title: "Ocean View Retreat",
        // description: "Peaceful ocean-side villa with modern amenities.",
        // image: "",  // should default to your image
        // price: 1800,
        // location: "Candolim, Goa",
        // country: "India"
    // });
//     //  console.log(sampleListing);  // Check if data looks correct
//     await sampleListing.save();
//     console.log("Sample was saved");

//     res.send("Successfully created test listing");
// });

app.listen(8080,()=>{
    console.log("Server is listening port 8080");
});

//index route 

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
});

// New Route

app.get("/listings/new", async (req, res) => {

    res.render("listings/new.ejs");
});
// Show Route

app.get("/listings/:id", async (req, res) => {
   let {id} = req.params;
   const listing =await Listing.findById(id);
   res.render("listings/show.ejs", { listing });
});


// Create Rout
app.post("/listings",async (req,res)=>{
//    let {title,description,image,price,country,locattion}=req.body; 
// let listing=req.body.listing;
// console.log(listing);

const newListing=new Listing(req.body.listing);//Create as instance 
await newListing.save();
res.redirect("/listings");

});


//Edit rout

app.get("/listings/:id/edit",async(req,res)=>{
    let { id }= req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update rout

app.put("/listings/:id",async (req,res)=>{
    let {id}= req.params;  //id extracted 
    await Listing.findByIdAndUpdate(id,{...req.body.listing});  //Extract listing
   res.redirect(`/listings/${id}`);

});

//Delete rout

app.delete("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});
