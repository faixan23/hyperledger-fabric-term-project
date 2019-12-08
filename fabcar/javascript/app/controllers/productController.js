const query = require('../../query');
const invoke = require('../../invoke');
const productValidator = require('../../app/validations/productValidator');
const fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

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
        // return res.send(req.files.image.size);
        // return res.send(Object.keys(req.body));
        // let data = req.body;
        // // let pathV = path.join(__dirname,'/uploads');
        // let pathV = '/uploads'  ;
        // let img = req.files.image;
        // img.mv(pathV, function(err) {
        //     if (err)
        //     return res.status(500).send(err);
            
        //     res.send('File uploaded!');
        // });
        // data['image'] = base64_encode(pathV);

        const result = await invoke.storeProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}