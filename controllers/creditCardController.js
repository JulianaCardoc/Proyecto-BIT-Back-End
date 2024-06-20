import CreditCard from "../models/CreditCard.js";
import bitErrorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const creditCardList = await CreditCard.find({deletedAt: null});
        res.json(creditCardList);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function findCreditCardById(req, res) {
    try {
        const creditCardId = req.params.id;
        const creditCard = await CreditCard.findById(creditCardId);
        if(!creditCard || creditCard.deletedAt) {
           return bitErrorHandler.error404NotFound(res, CreditCard.modelName);
        }
        return res.status(200).json(creditCard);
    } catch(err) {
        return bitErrorHandler.error500ServerError(res, err);
    }
}

async function createNewCreditCard(req, res) {
    try {
        const newCreditCard = await CreditCard.create ({
            name: req.body.name,
            lastname: req.body.lastName,
            cardNumber: req.body.cardNumber,
            goodThru: req.body.goodThru,
            cvv: req.body.cvv,            
            type: req.body.type,
        });  
        res.status(200).json(newCreditCard);
    } catch(err) {
        console.log(err);
        if(err.code = 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
            bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function updateCreditCard(req, res) {
    try {
        const creditCard = await CreditCard.findById(req.params.id);

        creditCard.name = req.body.name || creditCard.name;
        creditCard.lastName = req.body.lastName || creditCard.lastName;
        creditCard.cardNumber = req.body.cardNumber || creditCard.cardNumber;
        creditCard.goodThru = req.body.goodThru || creditCard.goodThru;
        creditCard.cvv = req.body.cvv || creditCard.cvv;
        creditCard.type = req.body.type || creditCard.type; 
        await creditCard.save();   
        res.status(200).json(creditCard);
    } catch(err) {
        if(err.code = 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
        bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function deleteCreditCard(req, res) {
    try {
        const creditCard = await CreditCard.findById(req.params.id);
        if(!creditCard || creditCard.deletedAt){
            bitErrorHandler.error404NotFound(res, CreditCard.modelName);
        }
        creditCard.deletedAt = new Date();
        await creditCard.save(creditCard);
        res.status(200).json("Credit card deleted successfully");
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findCreditCardById,
    createNewCreditCard,
    updateCreditCard,
    deleteCreditCard,
};