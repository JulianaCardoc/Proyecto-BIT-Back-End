import mongoose from "../config/mongoose.js";

const creditCardSchema = mongoose.Schema({
    name: String,
    lastName: String,
    cardNumber: Number,
    goodThru: Date,
    cvv: Number,
    type: String,
});
const CreditCard = mongoose.model("CreditCard", creditCardSchema);

export default CreditCard;