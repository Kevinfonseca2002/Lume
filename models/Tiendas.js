import mongoose from "mongoose"

const {Schema}=mongoose;

const storesSchema= new Schema({
    nombre: { type: String, required: true},
    correo: { type: String, required: true, unique: true},
    address: { type: String, required: true},
    categoria: {type: String, enum: ["Vida Nocturna", "Gastronomia", "Arte", "Deporte", "Vacaciones"], required: true}},
    {timestamps:true});

const store= mongoose.model("stores", storesSchema,"tienda");

export default store