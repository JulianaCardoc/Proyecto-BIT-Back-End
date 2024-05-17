import Category from "../models/Category.js";

async function list(req, res) {
    try {
        const categoryList = await Category.find();
        res.json(categoryList);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function findCategoryById(req, res) {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if(!category) {
            res.status(404).json("Category not found");
        } else {
            res.status(200).json(category);
        }
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function createNewCategory(req, res) {
    try {
        const newCategory = await Category.create ({
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl
        });
        res.status(200).json(newCategory);
    } catch(err) {
        if(err.code == 11000) {
            res.status(400).json("This category already exist");
        }
         else {
            res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
    }
}

async function updateCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);

        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;
        category.imgUrl = req.body.imgUrl || category.imgUrl;
        await category.save();
        res.status(200).json(category);
    } catch(err) {
        if(err.code == 11000) {
            res.status(400).json("This category already exist");
        }
        else {
            res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
    }   
}

async function deleteCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
            return res.status(404).json("Category not found");
        } 
        await Category.deleteOne(category);
        return res.status(200).json("Category deleted successfully");
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}


export default {
    list,
    findCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory,
};