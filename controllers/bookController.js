
const Book = require("../models/Book.js");
const Author = require("../models/Author.js");

// GET /books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /books
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /books/:id
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Libro no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const authorInBook = await Author.findOne({ libros: req.params.id });
    if (authorInBook) {
      return res.status(400).json({
        message: "No se puede eliminar un libro que tiene asignado a un autor",
      });
    }

    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Libro no encontrado" });
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
