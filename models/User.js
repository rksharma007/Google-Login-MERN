const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const myJwtSecret = config.get('JWT_SECRET');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateJWT = function () {
    const token = jwt.sign(
      {
        expiresIn: '12h',
        _id: this._id,
        email: this.email,
      },
      myJwtSecret,
    );
    //console.log(token);
    return token;
};


module.exports = User = mongoose.model('user', UserSchema);