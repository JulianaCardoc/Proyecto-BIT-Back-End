import Roll from "../models/Roll.js";

async function list(req, res) {
    try {
        const rollList = await Roll.find();
        res.json(rollList);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function findRollById(req, res) {
    try {
        const rollId = req.params.id;
        const roll = await Roll.findById(rollId);
        if(!roll) {
            res.status(404).json("Roll not found");
        } else {
            res.status(200).json(roll);
        }
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function createNewRoll(req, res) {
    try {
        const newRoll = await Roll.create({
            name: req.body.name,
            description: req.body.description,
        });
        res.status(200).json(newRoll);
    } catch(err) {
        if(err.code == 11000) {
            res.status(400).json("This roll already exist");
        } else {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
    }
}

async function updateRoll(req, res) {
    try {
        const roll = await Roll.findById(req.params.id);

        roll.name = req.body.name || roll.name;
        roll.description = req.body.description || roll.description;
        await roll.save();
        res.status(200).json(roll);
    } catch(err) {
        if(err.code == 11000) {
            res.status(400).json("This roll already exist");
        } else {
            res.status(500).json({
            message: "Internal server error",
            error: err
            });
        }
    }
}

async function deleteRoll(req, res) {
    try {
        const roll = await Roll.findById(req.params.id);
        if(!roll) {
            return res.status(404).json("Roll not found");
        }
        await Roll.deleteOne(roll);
        res.status(200).json("Roll deleted successfully");
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
    findRollById,
    createNewRoll,
    updateRoll,
    deleteRoll
};