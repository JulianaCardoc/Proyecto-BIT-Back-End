import mongoose from "../config/mongoose.js";

const rollSchema = mongoose.Schema({
    name: String,
    description: String,
});
const Roll = mongoose.model("Roll", rollSchema);

export default Roll;