import { check } from "express-validator";

const userValidations = [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty(),
];

export default userValidations;