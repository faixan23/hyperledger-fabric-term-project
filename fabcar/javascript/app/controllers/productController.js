const query = require('../../query');
const invoke = require('../../invoke');
const productValidator = require('../../app/validations/productValidator');
const fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

exports.listProducts = async (req, res) => {
    try {
        const products = await query.listProducts();
        return res.send({data: products});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

exports.storeProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateStoreProduct(req.body);
        if (error) {return res.status(422).send(error);}

        const result = await invoke.storeProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

exports.buyProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateBuyProduct(req.body);
        if (error) {return res.status(422).send(error);}

        const result = await invoke.buyProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

exports.reviewProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateReviewProduct(req.body);
        if (error) {return res.status(422).send(error);}

        const result = await invoke.reviewProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};
