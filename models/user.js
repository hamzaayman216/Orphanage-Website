const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const userSchema= mongoose.Schema({
    first: {
        type: String,
       // required: true
    },
    last: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})


// Define a static method on the User model's schema to find and validate a user
userSchema.statics.findAndValidate = async function(email, password) {
    // Attempt to find a user with the matching email
    const foundUser = await this.findOne({ email });
    // If a user is found, compare the provided password to the hashed version stored in the database
    if (foundUser) {
       const isValid = await bcrypt.compare(password, foundUser.password);
       // If the passwords match, return the found user
       if (isValid) return foundUser;
    }
    // If the passwords do not match or no user is found, return false
    return false;
 };
 



 // Define a middleware function to hash the user's password before saving it to the database
 userSchema.pre('save', async function(next) {
    // If the password field has not been modified, move on to the next step
    if (!this.isModified('password')) return next();
    // Hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    // Move on to the next step
    next();
 });


const User = mongoose.model('User',userSchema);

module.exports = User;