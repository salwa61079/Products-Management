const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const categorieSchema = new Schema({
    libelleCategorie: { type: String, required: true },
   // produits: [{ type: Schema.Types.ObjectId,ref:'Produit' }],
},
{timestamps:true});


categorieSchema.virtual('produits', {
    ref: 'Produit', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'categorie', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 categorieSchema.set('toObject', { virtuals: true });
 categorieSchema.set('toJSON', { virtuals: true });

module.exports = Categorie = mongoose.model('Categorie', categorieSchema)