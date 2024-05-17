import Person from "../models/Person.js";


async function list(req, res) {
    try {
        const personList = await Person.find();
        res.json(personList);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function findPersonById(req, res) {
    try {
        const personId = req.params.id;
        const person = await Person.findById(personId);
        if(!person) {
            res.status(404).json("Person not found");
        } else {
            res.status(200).json(person);
        }
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
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
            res.status(400).json(`The ${Object.keys(err.keyValue)} ${err.keyValue[Object.keys(err.keyValue)]} already exist`);
        } else {
        res.status(500).json({
            message: "Internal server error",
            error: err
            });
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
            res.status(400).json(`The ${Object.keys(err.keyValue)} ${err.keyValue[Object.keys(err.keyValue)]} already exist`);
        res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
    }
}

async function deletePerson(req, res) {
    try {
        const person = await Person.findById(req.params.id);
        if(!person) {
            return res.status(404).json("Person not found");
        }
        await Person.deleteOne(person);
        res.status(200).json("Person deleted successfully");
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
    findPersonById,
    createNewPerson,
    updatePerson,
    deletePerson
};