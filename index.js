const express = require("express");
const mongoose = require("mongoose");
const server = express();

mongoose
  .connect(
    "mongodb+srv://hanshika:hanshika@training-cluster.bittvk8.mongodb.net/bookStore?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  publisher: String,
  genre: String,
  publish_year: String,
  price: String,
  image_url: String,
});

const Book = mongoose.model("Book", bookSchema);
server.use(express.json());

//CREATE - post api - new book entry
server.post("/books", async function (req, res) {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).send("created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//READ - get api - display all the data
server.get("/books", async function (req, res) {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//READ - get api - display data by id
server.get("/books/:id", async function (req, res) {
  try {
    const books = await Book.findById(req.params.id);
    if (books) {
      res.json(books);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//UPDATE - patch api - search by id
server.patch("/books/:id", async function (req, res) {
  try {
    const updateBooks = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (updateBooks) {
      res.send("updated");
    } else {
      res.status(404).send("book not found");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

//UPDATE - patch api - search by title
server.patch("/books/title/:title", async function (req, res) {
  try {
    const title = req.params.title;
    const data = req.body;
    await Book.updateOne({ title: title }, data);
    res.send("updated");
  } catch (error) {
    res.status(404).send("Not found");
  }
});

//DELETE - delete api
server.delete("/books/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await Book.deleteOne({ id: id });
    res.send("deleted");
  } catch (error) {
    res.status(404).send("Not found");
  }
});

server.listen(6341, () => {
  console.log("Server is running on port 6341");
});
