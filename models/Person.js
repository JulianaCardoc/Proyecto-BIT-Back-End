import mongoose from "../config/mongoose.js";

const personSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    document: Number,
    cellphone: Number,
});
const Person = mongoose.model("Person", personSchema);

export default Person;