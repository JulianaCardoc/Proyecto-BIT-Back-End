import mongoose from "../config/mongoose.js";

const sellSchema = mongoose.Schema({
    total: Number,
    subtotal: Number,
    taxes: Number,
    observation: String,
    date: Date,
    dueDate: Date,
});
const Sell = mongoose.model("Sell", sellSchema);

export default Sell;