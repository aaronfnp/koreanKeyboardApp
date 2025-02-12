import express from "express";
import ViteExpress from "vite-express";
import { getBooks, addBook } from "../../dynamo.js"; 

const app = express();

app.use(express.json());

// API route to get books from DynamoDB
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks(); // function from dynamo.js
    res.json(books); 
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books"); 
  }
});

// API route to add a new book to DynamoDB
app.post("/api/books", async (req, res) => {
  const newBook = req.body; 

  try {
    await addBook(newBook); // function from dynamo.js
    res.status(201).json(newBook); 
  } catch (err) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

// Start the server
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
