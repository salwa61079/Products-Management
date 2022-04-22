const { send } = require("process");
const caracteristic = require("../models/Caracteristique");
const produit = require("../models/Produit");



//get all caracteristic
exports.getAllCaracteristic = async (req, res) => {
    try {
        const allCaracteristics = await caracteristic.find()
            .sort([['type', 'ascending']])
            .populate({ path: 'produits', select: 'code description marque quantite prix' });
        res.status(200).send({ message: "all caracteristics: ", allCaracteristics });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

//get one caracteristic 
exports.getCaracteristic = async (req, res) => {
    try {
        const oneCaracteristic = await caracteristic.findById(req.params.id);
        res.status(200).send({ message: "caracteristic found: ", oneCaracteristic });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

//get one caracteristic with list products
exports.getCaracteristicProducts = async (req, res) => {
    try {
        const oneCaracteristicProducts = await caracteristic.findById(req.params.id)
            .populate('produits');
        res.status(200).send({ message: "caracteristic found: ", oneCaracteristicProducts });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

// add caracteristic
exports.addCaracteristic = async (req, res) => {
    try {
        const findCaracteristic = await caracteristic.findOne({ label: req.body.label, value: req.body.value });
        if (findCaracteristic) {
            return res
                .status(400)
                .send({ message: "caracteristic already exists", findCaracteristic });
        }

        const newCaracteristic = new caracteristic(req.body);
        await newCaracteristic.save();
        res.status(200).send({
            message: "caracteristic added successfully",
            newCaracteristic,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};



// add product to caracteristic
exports.addProductCaracteristic = async (req, res) => {

    try {
        const newProduct = new produit(req.body);
        await newProduct.save();

        const Caracteristic = await caracteristic.findById({ _id: newProduct.caracteristique })
        Caracteristic.produits.push(newProduct);
        await Caracteristic.save();

        res.status(200).send({
            message: "product added to Caracteristic successfully",
            newProduct,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

//update Caracteristic
exports.updateCaracteristic = async (req, res) => {
    try {
        const findCaracteristic = await caracteristic.findOne({ label: req.body.label, value: req.body.value });
        if (findCaracteristic) {
            return res
                .status(400)
                .send({ message: "caracteristic already exists", findCaracteristic });
        }
        const editCaracteristic = await caracteristic.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).send({
            message: "Caracteristic is edited successfully: ", editCaracteristic
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

//delete caracteristic
exports.deleteCaracteristic = async (req, res) => {

    try {
        const allProducts = await produit.find({ caracteristique: req.params.id })

        for (let i = 0; i < allProducts.length; i++) {
            const caract = []
            for (let j = 0; j < allProducts[i].caracteristique.length; j++) {

                if (allProducts[i].caracteristique[j] != req.params.id) {
                    caract.push(allProducts[i].caracteristique[j])
                }
            }
            const editProduct = await produit.updateOne(
                { _id: allProducts[i]._id },
                { $set: { caracteristique: caract } }
            );
        }
        const deleteCaracteristic = await caracteristic.deleteOne({ _id: req.params.id });
        res.status(200).send({
            message: "caracteristic is deleted successfully: "
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
};