import mongoose from "../config/mongoose.js";

const categorySchema = mongoose.Schema({
    name: String,
    description: String,
    imgUrl: String,
});
const Category = mongoose.model("Category", categorySchema);

export default Category;