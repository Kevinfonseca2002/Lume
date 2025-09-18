import app from "./app.js"
import mongoose from "mongoose"

// const {MONGO_URI, PORT=3000}=process.env;

// async function main () {
    // try {
    //     await mongoose.connect(MONGO_URI);
    //     console.log("Conectado a Mongo DB");
    //     app.listen(PORT, ()=>console.log(`API http://localhost:${PORT}`));
        
    //     process.on('SIGINT', async () => {
    //     await mongoose.connection.close();
//     // //     server.close(() => process.exit(0));
//     // // })}
//     // catch(err){console.log({message:"Error con la base de datos", err})}
// };

// main();

mongoose.connect("mongodb://localhost:27017/Eltodero")
.then(() => {  console.log("Conectado a la base de datos");})
.catch((error) => {console.error("Error al conectar a la base de datos:", error);});

const PORT = 8888; // Crear el puerto

app.listen(PORT, () => {
console.log(`Servidor escuchando http://localhost:${PORT}`);
});
