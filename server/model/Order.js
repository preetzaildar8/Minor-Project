const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookCategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bookImage: {
        type: String,
    }
});

module.exports = mongoose.model("Order", orderchema);