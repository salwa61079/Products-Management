const category = require("../models/Categorie");
const product = require("../models/Produit");

//get all caterogies
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await category.find()
        .sort([['libelleCategorie', 'ascending']]);
        res.status(200).send({message: "all categories: ", allCategories});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get all caterogies with list product
exports.getAllCategoriesProducts = async (req, res) => {
    try {
        const allCategoriesP = await category.find()
        .populate({path: 'produits', select: 'code description marque quantite prix'})
        .sort([['libelleCategorie', 'ascending']]);
        res.status(200).send({message: "all categories: ", allCategoriesP});   

        
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one category 
exports.getCategory = async (req, res) => {
    try {
        const oneCategory = await category.findById(req.params.id);
        res.status(200).send({message: "Category found: ", oneCategory});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//get one category with list Products
exports.getCategoryProducts = async (req, res) => {
    try {
        const oneCategoryProducts = await category.findById(req.params.id)
        .populate({path: 'produits', select: 'code description marque quantite prix'});
        res.status(200).send({message: "Category found: ", oneCategoryProducts});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

// add category
exports.addCategory = async (req, res) => {
    try {
        const findCategory = await category.findOne({ libelleCategorie: req.body.libelleCategorie });
        if (findCategory) {
            return res
                .status(400)
                .send({ message: "category already exists", findCategory });
        }
        const newCategorie = new category(req.body);
        await newCategorie.save();
        res.status(200).send({
            message: "caterory added successfully",
            newCategorie,
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

//update Catogory
exports.updateCategory = async (req, res) => {

    try {
        const findCategory = await category.findOne({ libelleCategorie: req.body.libelleCategorie });
        if (findCategory) {
            return res
                .status(400)
                .send({ message: "category already exists", findCategory });
        }

        const editCategory = await category.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        );
        res.status(200).send({
            message: "Category is edited successfully: ", editCategory});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};

//delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const  allProducts = await product.find({categorie:req.params.id})
        for(let i=0; i<allProducts.length;i++) {
            const editProduct = await product.updateOne(
                {_id: allProducts[i]._id},
                {$set: {categorie: null}}
            );
        }
        const deleteCategory = await category.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: "Category is deleted successfully: "});   
    } 
    catch (err) {
        res.status(500).send(err);
    }
};