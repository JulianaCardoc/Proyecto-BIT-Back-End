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
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }],
    images: [{
        type: mongoose.Types.ObjectId,
        ref: "Images",
    }],
});
const Perfume = mongoose.model("Perfume", perfumeSchema);

export default Perfume;