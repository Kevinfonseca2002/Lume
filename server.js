import app from "./app.js"
import mongoose from "mongoose"

const {MONGO_URI, PORT=5500}=process.env;

async function main () {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conectado a Mongo DB");
        app.listen(PORT, ()=>console.log(`API http://localhost:${PORT}`));

    }
    catch(err){console.log({message:"Error con la base de datos", err})}
};

main();