import mongoose from "../config/mongoose.js";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true           
        },
    password: {
        type: String,
        match: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]).{6,}$/
    },
    roll: [{
        type: mongoose.Types.ObjectId,
        ref: "Roll",
    }],
    person: [{
        type: mongoose.Types.ObjectId,
        ref: "Person",
    }],
});
const User = mongoose.model("User", userSchema);

export default User;