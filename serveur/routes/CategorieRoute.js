const express = require("express");
const router = express.Router();
const {
    getAllCategories,
    getCategory,
    getCategoryProducts,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesProducts
} = require("../controllers/CategorieC");

router.post("/add", addCategory);
router.get("/allCategories", getAllCategories);
router.get("/allCategoriesProducts", getAllCategoriesProducts);
router.get("/oneCategory/:id", getCategory);
router.get("/oneCategoryProducts/:id", getCategoryProducts);
router.put("/editCategory/:id", updateCategory);
router.delete("/removeCategory/:id", deleteCategory);

module.exports = router;