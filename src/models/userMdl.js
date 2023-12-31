const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    refresh: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.isPasswordMatched = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);