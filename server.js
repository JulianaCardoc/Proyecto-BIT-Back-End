import express from "express";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/proyectoBitDB");

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});