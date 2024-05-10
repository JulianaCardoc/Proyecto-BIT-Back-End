import mongoose from "../config/mongoose.js";

const perfumeSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    essence: String,
    durability: [String],
    concentration: [String],
    brand: String,
    volume: Number,
});
const Perfume = mongoose.model("Perfume", perfumeSchema);

export default Perfume;