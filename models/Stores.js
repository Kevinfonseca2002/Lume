import mongoose from "mongoose"

const {Schema}=mongoose;

const storesSchema= new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    address: { type: String, required: true},
    category: {type: String, enum: ["Night Life", "Gastronomy", "Arts", "Health & Sports", "Holidays"], required: true, default: " "}},
    {timestamps:true});

const store= mongoose.model("stores", storesSchema,"stores");

export default store