import mongoose from "mongoose";

const {Schema}=mongoose

const userSchema = new Schema({
    name: {type:String, required: true, trim: true},
    age: {type: Number, required: true, min: 0},
    email: {type:String, required: true, unique: true},
    phone: {type: Number, unique: true},
    address: {type: String,}},
    {timestamps: true}
    
);

const User = mongoose.model("User", userSchema,"usuarios")

export default User