// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(fileUpload());


// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
// require('./app/routes')(app); // configure our routes

const router = express.Router();
const ProductController = require('../javascript/app/controllers/productController');
app.get('/', async(req, res) => {
    return res.send({message: "Hyperledger Fabric API is working!"});
});
app.get('/list-products', ProductController.listProducts);
app.post('/store-product', ProductController.storeProduct);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;