const variation = require("../models/Variation");
const produit = require("../models/Produit");



//get all variations
exports.getAllVariation = async (req, res) => {
    try {
        const allVariations = await variation.find()
        .sort([['type', 'ascending']])
        .populate({ path: 'produits', select: 'code description marque quantite prix'});
        res.status(200).send({message: "all variations: ", allVariations});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one variation 
exports.getVariation = async (req, res) => {
    try {
        const oneVariation = await variation.findById(req.params.id);
        res.status(200).send({message: "variation found: ", oneVariation});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one variation with list products
exports.getVariationProducts = async (req, res) => {
    try {
        const oneVariationProducts = await variation.findById(req.params.id)
        .populate('produits');
        res.status(200).send({message: "variation found: ", oneVariationProducts});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

// add variation
exports.addVariation = async (req, res) => {
    try {
        const findVariation = await variation.findOne({ value: req.body.value,  label: req.body.label});
        if (findVariation) {
            return res
                .status(400)
                .send({ message: "variation already exists", findVariation });
        }

        const newVariation = new variation(req.body);
        await newVariation.save();
        res.status(200).send({
            message: "variation added successfully",
            newVariation,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};



// add product to variation
exports.addProductVariation = async (req, res) => {

    try {
        const newProduct = new produit(req.body);
        await newProduct.save();

        const Variation = await variation.findById({_id: newProduct.variation})
        Variation.produits.push(newProduct);
        await Variation.save();

        res.status(200).send({
            message: "product added to variation successfully",
            newProduct,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

//update variation
exports.updateVariation = async (req, res) => {
    try {
        const findVariation = await variation.findOne({ value: req.body.value,  label: req.body.label});
        if (findVariation) {
            return res
                .status(400)
                .send({ message: "variation already exists", findVariation });
        }
        const editVariation = await variation.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        );
        res.status(200).send({
            message: "variation is edited successfully: ", editVariation});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//delete variation
exports.deleteVariation = async (req, res) => {
  
    try {
        const allProducts = await produit.find({ variation: req.params.id })

        for (let i = 0; i < allProducts.length; i++) {
            const vari = []
            for (let j = 0; j < allProducts[i].variation.length; j++) {

                if (allProducts[i].variation[j] != req.params.id) {
                    vari.push(allProducts[i].variation[j])
                }
            }
            const editProduct = await produit.updateOne(
                { _id: allProducts[i]._id },
                { $set: { variation: vari } }
            );
        }

        const deleteVariation = await variation.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: "variation is deleted successfully: "});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

