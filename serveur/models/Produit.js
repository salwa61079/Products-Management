const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const produitSchema = new Schema({
    code: { type: String, required: true },
    description: { type: String, required: false },
    quantite: { type: Number, required: true },
    prix: { type: Number, required: true },
    taxe: { type: Number, required: false },
    codeABarre: { type: Number, required: false },
    variation: [{ type: Schema.Types.ObjectId,ref:'Variation', required: false }],
    marque: { type: Schema.Types.ObjectId, ref:'Marque', required: false },
    categorie: { type: Schema.Types.ObjectId,ref:'Categorie', required: false },
    modele: { type: Schema.Types.ObjectId,ref:'Modele', required: false },
    caracteristique: [{type: Schema.Types.ObjectId, ref:'Caracteristique', required: false}]
},
{timestamps:true});




module.exports = Produit = mongoose.model('Produit', produitSchema)