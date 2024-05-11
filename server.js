import express from "express";
import userControllers from "./controllers/UserController.js";

const app = express();

app.use(express.json());

app.get("/api/users", userControllers.list);
app.get("/api/users/:id", userControllers.findUserById);
app.post("/api/users", userControllers.createNewUser);


app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});