const marque = require("../models/Marque");
const product = require("../models/Produit");


//get all brands
exports.getAllMarques = async (req, res) => {
    try {
        const allMarques = await marque.find()
        .sort([['libelleMarque', 'ascending']]);
        res.status(200).send({message: "all brands: ", allMarques});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get all brands with list models ande produits
exports.getMarquesModelesProduit = async (req, res) => {
    try {
        const MarquesModelesProduit = await marque.find()
        .populate({path: 'modeles', select: 'libelleModele'})
        .populate({ path: 'produits', select: 'code description marque quantite prix'});
        res.status(200).send({message: "brands found: ", MarquesModelesProduit});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one brand 
exports.getMarque = async (req, res) => {
    try {
        const oneMarque = await marque.findById(req.params.id);
        res.status(200).send({message: "brands found: ", oneMarque});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one brand with list models
exports.getMarqueModeles = async (req, res) => {
    try {
        const oneMarqueModeles = await marque.findById(req.params.id)
        .populate({path: 'modeles', select: 'libelleModele'});
        res.status(200).send({message: "brand found: ", oneMarqueModeles});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one brand with list produits
exports.getMarqueProduits = async (req, res) => {
    try {
        const oneMarqueProduits = await marque.findById(req.params.id)
        .populate({path: 'produits', select: 'code description marque quantite prix'});
        res.status(200).send({message: "brand found: ", oneMarqueProduits});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one brand with list models ande produits
exports.getMarqueModelesProduit = async (req, res) => {
    try {
        const oneMarqueModelesProduit = await marque.findById(req.params.id)
        .populate({path: 'modeles', select: 'libelleModele', path: 'produits', select: 'code description marque quantite prix'});
        res.status(200).send({message: "brand found: ", oneMarqueModelesProduit});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

// add brand
exports.addMarque = async (req, res) => {
    try {
        const findMarque = await marque.findOne({ libelleMarque: req.body.libelleMarque });
        if (findMarque) {
            return res
                .status(400)
                .send({ message: "brand already exists", findMarque });
        }
        const newMarque = new marque(req.body);
        await newMarque.save();
        res.status(200).send({
            message: "brand added successfully",
            newMarque,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


// // add product to category
// exports.addProduct = async (req, res) => {
//     try {
//         const newProduct = new product(req.body);
//         await newProduct.save();

//         const Category = await category.findById({_id: newProduct.categorie})
//         Category.produits.push(newProduct);
//         await Category.save();

//         res.status(200).send({
//             message: "product added to category successfully",
//             newProduct,
//         });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

//update brand
exports.updateMarque = async (req, res) => {
    try {
        const findMarque = await marque.findOne({ libelleMarque: req.body.libelleMarque });
        if (findMarque) {
            return res
                .status(400)
                .send({ message: "brand already exists", findMarque });
        }
        const editMarque = await marque.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        );
        res.status(200).send({
            message: "brand is edited successfully:", editMarque});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//delete brand
exports.deleteMarque = async (req, res) => {
    try {
        const  allProducts = await product.find({marque:req.params.id})
        for(let i=0; i<allProducts.length;i++) {
            const editProduct = await product.updateOne(
                {_id: allProducts[i]._id},
                {$set: {marque: null}}
            );
        }
        const deleteMarque = await marque.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: "Brand is deleted successfully:"});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};