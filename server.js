import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import personRoutes from "./routes/personRoutes.js";
import rollRoutes from "./routes/rollRoutes.js";
import addressesRoutes from "./routes/addressesRoutes.js";
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";
import sellRoutes from "./routes/sellRoutes.js";
import creditCardRoutes from "./routes/creditCardRoutes.js"


const app = express();
app.use(express.json());

const uploadDir = path.join(import.meta.dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api/users", userRoutes);
app.use("/api/perfume", perfumeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/person", personRoutes);
app.use("/api/roll", rollRoutes);
app.use("/api/addresses", addressesRoutes);
app.use("/api/paymentMethod", paymentMethodRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/creditCard", creditCardRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});