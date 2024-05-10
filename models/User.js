import mongoose from "../config/mongoose.js";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

export default User;