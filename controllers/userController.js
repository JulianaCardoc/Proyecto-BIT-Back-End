import User from "../models/User.js";

async function list(req, res) {
    try {
        const usersList = await User.find();
        res.json(usersList);
    } catch(err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
}

async function findUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
}

async function createNewUser(req, res) {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(200).json(newUser);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

export default {
    list,
    findUserById,
    createNewUser,
};