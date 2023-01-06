const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const adminSchema= mongoose.Schema({
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }

})


// Define a static method on the Admin model's schema to find and validate an admin
adminSchema.statics.findAndValidateAdmin = async function(adminEmail, adminPassword) {
    // Attempt to find an admin with the matching email
    const foundAdmin = await this.findOne({ adminEmail });
    // If an admin is found, return true
    if (foundAdmin) return true;
    // If no admin is found, return false
    return false;
 };
 


 // Define a middleware function to hash the admin's password before saving it to the database
 adminSchema.pre('save', async function(next) {
    // If the adminPassword field has not been modified, move on to the next step
    if (!this.isModified('adminPassword')) return next();
    // Hash the password with bcrypt
    this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
    // Move on to the next step
    next();
 });


const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;


