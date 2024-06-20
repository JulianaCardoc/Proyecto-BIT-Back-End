import PaymentMethod from "../models/PaymentMethod.js";
import bitErrorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const paymentMethodList = await PaymentMethod.find({deletedAt: null});
        res.json(paymentMethodList);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function findPaymentMethodById(req, res) {
    try {
        const paymentMethodId = req.params.id;
        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        if(!paymentMethod || paymentMethod.deletedAt) {
            return bitErrorHandler.error404NotFound(res, PaymentMethod.modelName);
        }
        return res.status(200).json(paymentMethod);
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}

async function createNewPaymentMethod(req, res) {
    try {
        const newPaymentMethod = await PaymentMethod.create ({
            name: req.body.name,
            type: req.body.type,
        });  
        res.status(200).json(newPaymentMethod);
    } catch(err) {
        if(err.code = 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
            bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function updatePaymentMethod(req, res) {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);

        paymentMethod.name = req.body.name || paymentMethod.name;
        paymentMethod.type = req.body.type || paymentMethod.type;
        await paymentMethod.save();   
        res.status(200).json(paymentMethod);
    } catch(err) {
        if(err.code = 11000) {
            bitErrorHandler.error400Database(res, err);
        } else {
        bitErrorHandler.error500ServerError(res, err);
        }
    }
}

async function deletePaymentMethod(req, res) {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if(!paymentMethod || paymentMethod.deleteAt){
            bitErrorHandler.error404NotFound(res, PaymentMethod.modelName);
        }
        paymentMethod.deletedAt = new Date();
        await paymentMethod.save(paymentMethod);
        res.status(200).json("Payment Method deleted successfully");
    } catch(err) {
        bitErrorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findPaymentMethodById,
    createNewPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};