import User from "../models/User.js";
import bcrypt from "bcryptjs";

async function list(req, res) {
    try {
        const usersList = await User.find();
        res.json(usersList);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function findUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function createNewUser(req, res) {
    try {
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10); 

        const newUser = await User.create({
            username: req.body.username,
            password: hash,
        });
        res.status(200).json(newUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);

        user.username = req.body.username || user.username;
        user.password = hash || user.password;
        await user.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}


async function login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user !== null) {
        const validHash = await bcrypt.compare(req.body.password, user.password);
        if (validHash) {
          res.json("Tus credenciales son correctas");
        } else {
          res.json("Tus credenciales son incorrectas");
        }
      } else {
        res.json("Usuario no encontrado");
      }
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
    findUserById,
    createNewUser,
    updateUser,
    deleteUser,
    login,
};