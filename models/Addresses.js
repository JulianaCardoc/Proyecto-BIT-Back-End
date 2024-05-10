import mongoose from "../config/mongoose.js";

const addressesSchema = mongoose.Schema({
    address: String,
    complement: String,
    observation: String,
    city: String,
    state: String,
    country: String,
});
const Addresses = mongoose.model("Addresses", addressesSchema);

export default Addresses;