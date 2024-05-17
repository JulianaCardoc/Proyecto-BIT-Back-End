import { expressjwt } from "express-jwt";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        if(!user) {
            res.status(404).json("User not found");
        } else {
            res.status(200).json(user);
        }
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
        if(err.code == 11000) {
            res.status(400).json("This username already exist");
        } else {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
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
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json("User not found");
        }
        await User.deleteOne(user);
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
            const tokenPayload = {
                sub: user.id,
                iat: Date.now(),
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
            res.json({ token: token });
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

  async function userProfile(req, res) {
    const { username } = await User.findById(req.auth.sub);
    res.json(`Hola ${username}, bienvenido a tu perfil`);
  }

export default {
    list,
    findUserById,
    createNewUser,
    updateUser,
    deleteUser,
    login,
    userProfile
};