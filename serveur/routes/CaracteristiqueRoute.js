const express = require("express");
const router = express.Router();
const {
    getAllCaracteristic,
    getCaracteristic,
    getCaracteristicProducts,
    addCaracteristic,
    addProductCaracteristic,
    updateCaracteristic  ,
    deleteCaracteristic
} = require("../controllers/CaracteristiqueC");

router.post("/add", addCaracteristic);
router.get("/allCaracteristics", getAllCaracteristic);
router.get("/oneCaracteristic/:id", getCaracteristic);
router.get("/oneCaracteristicProducts/:id", getCaracteristicProducts);
router.put("/editCaracteristic/:id", updateCaracteristic);
router.post("/addProductCaracteristic", addProductCaracteristic);
router.delete("/removeCaracteristic/:id", deleteCaracteristic);
module.exports = router;