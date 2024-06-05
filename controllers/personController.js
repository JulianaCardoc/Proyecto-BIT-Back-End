import Person from "../models/Person.js";
import bitErrorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const personList = await Person.find();
        res.json(personList);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function findPersonById(req, res) {
    try {
        const personId = req.params.id;
        const person = await Person.findById(personId).populate("addresses").populate("creditCard");
        if(!person) {
            return bitErrorHandler.error404NotFound(res, Person.modelName)
        }
        res.status(200).json(person);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}


async function createNewPerson(req, res) {
    try {
        const newPerson = await Person.create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            document: req.body.document,
            cellphone: req.body.cellphone,
        });
        res.status(200).json(newPerson);
    } catch (err) {
        if(err.code == 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
        bitErrorHandler.error500ServerError(res, err);
        }
        
    }
}

async function updatePerson(req, res) {
    try {
        const person = await Person.findById(req.params.id);

        person.name = req.body.name || person.name;
        person.lastName = req.body.lastName || person.lastName;
        person.email = req.body.email || person.email;
        person.document = req.body.document || person.document;
        person.cellphone = req.body.cellphone || person.cellphone;
        await person.save();
        res.status(200).json(person);
    } catch(err) {
        if(err.code == 11000) {
            bitErrorHandler.error400Database(res, err);
        }   else {
            bitErrorHandler.error500ServerError(res, err);
        }
    }
}


async function deletePerson(req, res) {
    try {
        const person = await Person.findById(req.params.id);
        if(!person) {
            return bitErrorHandler.error404NotFound(res, Person.modelName);
        }
        await Person.deleteOne(person);
        res.status(200).json("Person deleted successfully");
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findPersonById,
    createNewPerson,
    updatePerson,
    deletePerson
};