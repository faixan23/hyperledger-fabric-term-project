const query = require('../../query');
const invoke = require('../../invoke');
const productValidator = require('../../app/validations/productValidator');

exports.listProducts = async (req, res) => {
    try {
        const products = await query.listProducts();
        return res.send({data: products});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

exports.storeProduct = async (req, res) => {
    try {
        const { error, value } = productValidator.validateStoreProduct(req.body);
        if (error) return res.status(422).send(error);
        const result = await invoke.storeProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}