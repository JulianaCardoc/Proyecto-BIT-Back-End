import { mongo } from "mongoose";
import mongoose from "../config/mongoose.js";

const personSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    document: Number,
    cellphone: Number,
    addresses: [{
        type: mongoose.Types.ObjectId,
        ref:"Addresses",
    }],
    creditCard: [{
        type: mongoose.Types.ObjectId,
        ref:"CreditCard",
    }],
});
const Person = mongoose.model("Person", personSchema);

export default Person;