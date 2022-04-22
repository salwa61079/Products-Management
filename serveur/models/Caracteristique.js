const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const caracteristiqueSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    //produits:[{type: Schema.Types.ObjectId, ref:'Produit',required: false}]
},
{timestamps:true});

caracteristiqueSchema.virtual('produits', {
    ref: 'Produit', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'caracteristique', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 caracteristiqueSchema.set('toObject', { virtuals: true });
 caracteristiqueSchema.set('toJSON', { virtuals: true });


module.exports = Caracteristique = mongoose.model('Caracteristique', caracteristiqueSchema)