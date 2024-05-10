import mongoose from "../config/mongoose.js";

const itemsSchema = mongoose.Schema({
    quantity: Number,
    discount: Number,
    tax: Number,
    totalItem: Number,
});
const Items = mongoose.model("Items", itemsSchema);

export default Items;