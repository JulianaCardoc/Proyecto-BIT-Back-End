import mongoose from "../config/mongoose.js";

const perfumeSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    essence: String,
    durability: String,
    concentration: Number,
    brand: String,
    volume: Number,
    onSale: {
        type: Boolean,
        default: false,
    },
    onSaleDiscount: {
        type: Number,
        default: 0,
    },
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }],
    images: [{
        type: mongoose.Types.ObjectId,
        ref: "Images",
    }],
    deletedAt: {
        type: Date,
        default: null,
    },
});
const Perfume = mongoose.model("Perfume", perfumeSchema);

export default Perfume;