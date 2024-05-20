import express from "express";
import userRoutes from "./routes/userRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import personRoutes from "./routes/personRoutes.js";
import rollRoutes from "./routes/rollRoutes.js";
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/perfume", perfumeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/person", personRoutes);
app.use("/api/roll", rollRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});