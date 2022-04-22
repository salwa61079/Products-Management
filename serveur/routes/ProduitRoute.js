const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    addProduct,
    getProductVariations,
    getProductCaracteristics,
    getProductVC,
    addVariationProduct,
    addCaracteristicProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/ProduitC");

router.post("/addProduct", addProduct);
router.get("/allProducts", getAllProducts);
router.get("/oneProduct/:id", getProduct);
router.put("/editProduct/:id", updateProduct);


router.get("/ProductVariations", getProductVariations);
router.get("/ProductCaracteristics", getProductCaracteristics);
router.get("/ProductVariationCaracteristic", getProductVC);

router.post("/addVariationProduct", addVariationProduct);
router.post("/addCaracteristicProduct", addCaracteristicProduct);

router.delete("/removeProduct/:id",deleteProduct)

module.exports = router;