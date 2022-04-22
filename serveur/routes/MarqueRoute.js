const express = require("express");
const router = express.Router();
const {
    getAllMarques,
    getMarque,
    getMarqueModeles,
    addMarque,
    updateMarque,
    deleteMarque,
    getMarqueProduits,
    getMarqueModelesProduit,
    getMarquesModelesProduit
} = require("../controllers/MarqueC");

router.post("/addBrand", addMarque);
router.get("/allBrands", getAllMarques);
router.get("/allBrandsProductsModels", getMarquesModelesProduit);
router.get("/oneBrand/:id", getMarque);
router.get("/oneBrandModels/:id", getMarqueModeles);
router.put("/editBrand/:id", updateMarque);
router.delete("/removeBrand/:id", deleteMarque);

router.get("/MarqueProduits", getMarqueProduits);
router.get("/MarqueModelesProduit", getMarqueModelesProduit);

module.exports = router;