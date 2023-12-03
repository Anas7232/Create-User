const mongoose = require('mongoose');

const mongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('This is is not valid or not found..!')
}

module.exports = mongodbId;