import mongoose from "../config/mongoose.js";

const personSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    document: {
        type: Number,
        unique: true,
        match: /^.{8,10}$/
    },
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