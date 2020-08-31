const mongoose= require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    language: {
        type: String
    },
    yearofpublication: {
        type: String
    }
    
});
module.exports= mongoose.model('Book', Book);