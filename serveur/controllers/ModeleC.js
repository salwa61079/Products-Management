const model = require("../models/Modele");
const product = require("../models/Produit");

//get all models
exports.getAllModels = async (req, res) => {
    try {
        const allModels = await model.find()
        .sort([['libelleModele', 'ascending']]);
        res.status(200).send({message: "all models: ", allModels});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one model 
exports.getModel = async (req, res) => {
    try {
        const oneModel = await model.findById(req.params.id);
        res.status(200).send({message: "model found: ", oneModel});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};


// add model
exports.addModel = async (req, res) => {
    try {
        const findModel = await model.findOne({ libelleModele: req.body.libelleModele, marque:req.body.marque });
        if (findModel) {
            return res
                .status(400)
                .send({ message: "Model already exists", findModel });
        }
        const newModel = new model(req.body);
        await newModel.save();
        res.status(200).send({
            message: "model added successfully",
            newModel,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};



//update model
exports.updateModel = async (req, res) => {

    try {
        const findModel = await model.findOne({ libelleModele: req.body.libelleModele, marque:req.body.marque });
        if (findModel) {
            return res
                .status(400)
                .send({ message: "model already exists", findModel });
        }

        const editModel = await model.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        );
        res.status(200).send({
            message: "model is edited successfully: ", editModel});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//delete model
exports.deleteModel = async (req, res) => {
    try {
        const  allProducts = await product.find({modele:req.params.id})
        for(let i=0; i<allProducts.length;i++) {
            const editProduct = await product.updateOne(
                {_id: allProducts[i]._id},
                {$set: {modele: null}}
            );

        }
        const deleteModel = await model.deleteOne({_id: req.params.id})       
        res.status(200).send({
            message: "model is deleted successfully: "});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};