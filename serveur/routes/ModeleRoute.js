const express = require("express");
const router = express.Router();
const {
    getAllModels,
    getModel,
    addModel,
    updateModel,
    deleteModel
} = require("../controllers/ModeleC");

router.post("/addModel", addModel);
router.get("/allModels", getAllModels);
router.get("/oneModel/:id", getModel);
router.put("/editModel/:id", updateModel);
router.delete("/removeModel/:id", deleteModel);

module.exports = router;