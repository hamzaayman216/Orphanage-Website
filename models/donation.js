const mongoose = require('mongoose');
const {Schema}=mongoose;
const donationSchema= mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donationDate:{
        type:Date,
        required:true
    }
 
})
const Donation = mongoose.model('Donation',donationSchema);

module.exports = Donation;