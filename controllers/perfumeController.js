import Perfume from "../models/Perfume.js";

async function list(req, res) {
    try {
        const perfumeList = await Perfume.find();
        res.json(perfumeList);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function findPerfumeById(req, res) {
    try {
        const perfumeId = req.params.id;
        const perfume = await Perfume.findById(perfumeId);
        if(!perfume) {
            res.status(404).json("Perfume not found");
        } else {
            res.status(200).json(perfume);
        } 
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function createNewPerfume(req, res) {
    try {
        const newPerfume = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            essence: req.body.essence,
            concentration: req.body.concentration,            
            brand: req.body.brand,
            volume: req.body.volume,
        };

        if(req.body.concentration > 0 && req.body.concentration <= 0.33) {
            newPerfume.durability = "Low" 
        } else if (req.body.concentration > 0.33 && req.body.concentration <= 0.66) {
            newPerfume.durability = "Medium"
        } else if(req.body.concentration > 0.66 && req.body.concentration <= 1) {
            newPerfume.durability = "High"
        } else {
            throw new Error("Concentration not valid")
        };

        const exist = await Perfume.findOne({name: newPerfume.name});
        if(exist) {
            if (exist.volume == newPerfume.volume) {
                return res.status(400).json("This perfume already exist") 
            }
        } else {
            await Perfume.create(newPerfume);
        }  
        res.status(200).json(newPerfume);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function updatePerfume(req, res) {
    try {
        const perfume = await Perfume.findById(req.params.id);

        perfume.name = req.body.name || perfume.name;
        perfume.price = req.body.price || perfume.price;
        perfume.description = req.body.description || perfume.description;
        perfume.essence = req.body.essence || perfume.essence;
        perfume.durability = req.body.durability || perfume.durability;
        perfume.concentration = req.body.concentration || perfume.concentration;
        perfume.brand = req.body.brand || perfume.brand;
        perfume.volume = req.body.volume || perfume.volume;
        await perfume.save();   
        res.status(200).json(perfume);
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

async function deletePerfume(req, res) {
    try {
        const perfume = await Perfume.findById(req.params.id);
        if(!perfume){
            return res.status(404).json("Perfume not found");
        }
        await Perfume.deleteOne(perfume);
        res.status(200).json("Perfume deleted successfully");
        
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
    findPerfumeById,
    createNewPerfume,
    updatePerfume,
    deletePerfume,
};