import mongoose from "../config/mongoose.js";

const paymentMethodSchema = mongoose.Schema({
    name: String,
    type: String,
});
const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;