
const express = require("express");
const router = express.Router();
const {
    getAllVariation,
    getVariation,
    getVariationProducts,
    addVariation,
    addProductVariation,
    updateVariation,
    deleteVariation
} = require("../controllers/VariationC");

router.post("/addVariation", addVariation);
router.get("/allVariations", getAllVariation);
router.get("/oneVariation/:id", getVariation);
router.get("/oneVariationProducts/:id", getVariationProducts);
router.put("/editVariation/:id", updateVariation);
router.post("/addProductVariation", addProductVariation);
router.delete("/removeVariation/:id",deleteVariation)
module.exports = router;



