// mongoDB - atlas database
const { MongoClient } = require("mongodb");
// express.js (back end web apps framework for building RESTful APIs with Node.js)
const express = require("express");
// cors middleware (CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options)
// Cross-origin resource sharing
const cors = require("cors");
// bcrypt is a password-hashing function library for NodeJS
const bcrypt = require("bcrypt");
// dotenv for env. var.s
require("dotenv").config();

const app = express();
const port = 4000;

// mongo db connection uri
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

// database name CartVista
// collection names: Products, Users

// Get All Products
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

// Post a Product
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

// Sign Up - Users
app.post("/api/signup", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("cartvista");
    const col = db.collection("users");

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await col.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const result = await col.insertOne(newUser);

    res.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

// Sign In - Users
app.post("/api/signin", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("cartvista");
    const col = db.collection("users");

    const { email, password } = req.body;

    const user = await col.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({
        success: true,
        message: "Sign in successful",
        userId: user._id,
        userEmail: user.email,
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
