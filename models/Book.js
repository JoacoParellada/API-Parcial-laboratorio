const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  gender: {
    type: String,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema, "libros");
module.exports = Book;
