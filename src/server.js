const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

// get products
app.get("/api/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("cartvista");
    const col = db.collection("products");
    const filter = {};
    const documents = await col.find(filter).toArray();
    res.json(documents);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

// Post a product
app.post("/api/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("cartvista");
    const col = db.collection("products");

    const newProduct = req.body;
    const result = await col.insertOne(newProduct);

    res.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
