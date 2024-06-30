import Perfume from "../models/Perfume.js";
import bitErrorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const {
            name,
            minPrice,
            maxPrice,
            essence,
            brand,
            onSale,
            category
        } = req.query;

        let query = { deletedAt: null };

        if (name) query.name = { $regex: name, $options: 'i' };
        if (essence) query.essence = essence;
        if (brand) query.brand = brand;
        if (onSale) query.onSale = onSale === 'true';
        if (category) query.category = category;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const perfumeList = await Perfume.find(query)
            .populate('category')
            .populate('images');

        res.json(perfumeList);
    } catch (err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function findPerfumeById(req, res) {
    try {
        const perfumeId = req.params.id;
        const perfume = await Perfume.findById(perfumeId).populate("category").populate("images");
        if (!perfume || perfume.deletedAt) {
            return bitErrorHandler.error404NotFound(res, Perfume.modelName);
        }
        return res.status(200).json(perfume);
    } catch (err) {
        return bitErrorHandler.error500ServerError(res, err);
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
            category: req.body.category,
            images: req.body.images,
        };

        if (req.body.concentration > 0 && req.body.concentration <= 0.33) {
            newPerfume.durability = "Low"
        } else if (req.body.concentration > 0.33 && req.body.concentration <= 0.66) {
            newPerfume.durability = "Medium"
        } else if (req.body.concentration > 0.66 && req.body.concentration <= 1) {
            newPerfume.durability = "High"
        } else {
            throw new Error("Concentration not valid")
        };

        const exist = await Perfume.findOne({ name: newPerfume.name });
        if (exist) {
            if (exist.volume == newPerfume.volume) {
                bitErrorHandler.error400Database(res, Perfume.modelName);
            }
        }
        await Perfume.create(newPerfume);
        res.status(200).json(newPerfume);
    } catch (err) {
        bitErrorHandler.error500ServerError(res, err);
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
        perfume.images = req.body.images || perfume.images;
        perfume.category = req.body.category || perfume.category;
        await perfume.save();
        res.status(200).json(perfume);
    } catch (err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function deletePerfume(req, res) {
    try {
        const perfume = await Perfume.findById(req.params.id);
        if (!perfume || perfume.deletedAt) {
            bitErrorHandler.error404NotFound(res, Perfume.modelName);
        }
        perfume.deletedAt = new Date();
        await perfume.save(perfume);
        res.status(200).json("Perfume deleted successfully");

    } catch (err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function massiveCreation(req, res) {
    try {
        const perfumes = req.body;
        for (const perfume of perfumes) {
            if (perfume.concentration > 0 && perfume.concentration <= 0.33) {
                perfume.durability = "Low"
            } else if (perfume.concentration > 0.33 && perfume.concentration <= 0.66) {
                perfume.durability = "Medium"
            } else if (perfume.concentration > 0.66 && perfume.concentration <= 1) {
                perfume.durability = "High"
            } else {
                throw new Error("Concentration not valid")
            };
            const exist = await Perfume.findOne({ name: perfume.name, volume: perfume.volume });
            if (exist) {
                console.log(`The perfume ${perfume.name} wasn't created, it already exist`);
            } else {
                try {
                    await Perfume.create(perfume);
                } catch (err) {
                    console.log(`The perfume ${perfume.name} wasn't created`, err);
                }
            }
        } 
        res.status(200).json(`Massive creation succeeded`);
    }
    catch (err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

export default {
    list,
    findPerfumeById,
    createNewPerfume,
    updatePerfume,
    deletePerfume,
    massiveCreation,
};