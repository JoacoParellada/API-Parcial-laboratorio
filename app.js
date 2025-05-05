const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error("Error de conexión:", error));
