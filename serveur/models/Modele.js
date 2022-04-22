const mongoose = require('mongoose');

const { Schema } = mongoose;

const modeleSchema = new Schema({
    libelleModele: { type: String, required: true },
    marque: {type: Schema.Types.ObjectId, ref:'Marque', required: false}
},
{timestamps:true});



module.exports = Modele = mongoose.model('Modele', modeleSchema)