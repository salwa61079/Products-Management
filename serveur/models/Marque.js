const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const marqueSchema = new Schema({
    libelleMarque: { type: String, required: true },
    //modeles: [{ type: Schema.Types.ObjectId,ref:'Modele', required: true }],
},
{timestamps:true});


marqueSchema.virtual('modeles', {
    ref: 'Modele', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'marque', // is equal to foreignField
 });

 marqueSchema.virtual('produits', {
    ref: 'Produit', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'marque', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 marqueSchema.set('toObject', { virtuals: true });
 marqueSchema.set('toJSON', { virtuals: true });


module.exports = Marque = mongoose.model('Marque', marqueSchema)