import mongoose from "mongoose";

const {Schema} = mongoose;

const eventSchema= new Schema({
    storeName: {type:String, required:true},
    eventName: {type: String, required: true},
    date: {type: Date, required: true, 
        validate: {
            validator: (dateEstablished)=>{
                return dateEstablished > new Date();
            },
            message: "Date must be in the future"
    }}
})

const Events = mongoose.model("storesScheme", eventSchema, "events")

export default Events