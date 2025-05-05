const Book = require("../models/Book.js");
const Author = require("../models/Author.js");

// GET /authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("libros");
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /authors/:id
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("libros");
    if (!author)
      return res.status(404).json({ message: "Autor no encontrado" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /authors
exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /authors/:id
exports.updateAuthor = async (req, res) => {
  try {
    const updated = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Autor no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Autor no encontrado" });
    res.json({ message: "Autor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /authors/:id/addBook/:bookId
exports.addBookToAuthor = async (req, res) => {
  const { id, bookId } = req.params;

  try {
    // Validación: el libro debe existir
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Libro no existe" });

    const author = await Author.findById(id);
    if (!author)
      return res.status(404).json({ message: "Autor no encontrado" });

    author.libros.push(bookId);
    await author.save();
    res.json({ message: "Libro agregado al autor" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
