import { expressjwt } from "express-jwt";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bitErrorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const usersList = await User.find({deletedAt: null});
        res.json(usersList);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function findUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate("roll").populate("person");
        if(!user || user.deletedAt) {
            return bitErrorHandler.error404NotFound(res, User.modelName);
        }
        return res.status(200).json(user);
    } catch(err) {
        return bitErrorHandler.error500ServerError(res, err);
    }
}

async function createNewUser(req, res) {
    try {
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10); 

        const newUser = await User.create({
            email: req.body.email, 
            password: hash,
            roll: req.body.roll,
            person: req.body.person,
        });
        res.status(200).json(newUser);
    } catch(err) {
        if(err.code == 11000) {
            bitErrorHandler.error400Database(res, err);
        } else if(err.name === "ValidationError") {
            bitErrorHandler.error428Required(res, err);
        } else {
            bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if(req.body.password) {
            const password = req.body.password;
            const hash = await bcrypt.hash(password, 10);
            user.password = hash || user.password;
            }
        user.email = req.body.email || user.email;
        user.roll = req.body.roll || user.roll;
        user.person = req.body.person || user.person;
        
        await user.save();
        res.status(200).json(user);
    } catch(err) {
        if(err.code == 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
            bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if(!user || user.deletedAt) {
            return bitErrorHandler.error404NotFound(res, User.modelName);
        }
        user.deletedAt = new Date();
        await user.save(user);
        res.status(200).json("User deleted successfully");
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}


async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user !== null && user.deletedAt == null) {
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
        bitErrorHandler.error500ServerError(res, err);
    }
  }

  async function userProfile(req, res) {
    const user = await User.findById(req.auth.sub).populate("person");
    res.json(`Hola ${user.person.name}, bienvenido a tu perfil`);
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