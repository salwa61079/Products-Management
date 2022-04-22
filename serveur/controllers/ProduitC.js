const product = require("../models/Produit");
const variation = require("../models/Variation");
const carateristic = require("../models/Caracteristique");
const { Logger } = require("concurrently");

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await product.find()
        .sort([['code', 'ascending']]);
        res.status(200).send({message: "all products: ", allProducts});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one product 
exports.getProduct = async (req, res) => {
    try {
        const oneProduct = await product.findById(req.params.id);
        res.status(200).send({message: "product found: ", oneProduct});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};


// add product
exports.addProduct = async (req, res) => {
    try {
        const findProduct = await product.findOne({ code: req.body.code});
        if (findProduct) {
            return res
                .status(400)
                .send({ message: "product already exists", findProduct });
        }

        const newProduct = new product(req.body);
        await newProduct.save();
        res.status(200).send({
            message: "product added successfully",
            newProduct,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


//get one product with list variations
exports.getProductVariations = async (req, res) => {
    try {
        const oneProductVariations = await product.findById(req.params.id)
        .populate('variation');
        res.status(200).send({message: "product found: ", oneProductVariations});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};


//get one product with list caracteristics
exports.getProductCaracteristics = async (req, res) => {
    try {
        const oneProductCaracteristics = await product.findById(req.params.id)
        .populate('caracteristique');
        res.status(200).send({message: "product found: ", oneProductCaracteristics});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one product with list variations and caracteristics
exports.getProductVC = async (req, res) => {
    try {
        const oneProductVC = await product.findById(req.params.id)
        .populate('caracteristique', 'variation');
        res.status(200).send({message: "product found: ", oneProductVC});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};


// add  variation to product 
exports.addVariationProduct = async (req, res) => {

    try {
        const newVariation = new variation(req.body);
        await newVariation.save();

        const Product = await product.findById({_id: newVariation.produits})
        Product.variation.push(newVariation);
        await Product.save();

        res.status(200).send({
            message: "variation added to product successfully",
            newVariation,
        });
    } catch (err) {
        Logger.info(err);
        res.status(500).send(err);
    }
};


// add  Caracteristic to product 
exports.addCaracteristicProduct = async (req, res) => {

    try {
        const newCaracteristic = new carateristic(req.body);
        await newCaracteristic.save();

        const Product = await product.findById({_id: newCaracteristic.produits})
        Product.caracteristique.push(newCaracteristic);
        await Product.save();

        res.status(200).send({
            message: "caracteristic added to product successfully",
            newCaracteristic,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

//update Product
exports.updateProduct = async (req, res) => {
    try {
        
        const editProduct = await product.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        );
        res.status(200).send({
            message: "Product is edited successfully: ", editProduct});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//delete product
exports.deleteProduct = async (req, res) => {
  

    try {
        const deleteProduct = await product.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: "product is deleted successfully: "});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};