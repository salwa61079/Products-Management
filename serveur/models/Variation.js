const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const variationSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    //produits: [{ type: Schema.Types.ObjectId, ref:'Produit', required: false}]
},
{timestamps:true});

variationSchema.virtual('produits', {
    ref: 'Produit', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'variation', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 variationSchema.set('toObject', { virtuals: true });
 variationSchema.set('toJSON', { virtuals: true });



module.exports = Variation = mongoose.model('Variation', variationSchema)