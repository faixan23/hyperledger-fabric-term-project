const query = require('../../query');
const invoke = require('../../invoke');
const productValidator = require('../validations/productValidator');
const fs = require('fs');

exports.getUser = async (req, res) => {
    try {
        const user = await query.getUser(req.params.userId);
        return res.send({data: user});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

exports.storeUser = async (req, res) => {
    try {
        console.log(req.body);
        
        const user = await invoke.storeUser(req.body);
        return res.send({data: user});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}
