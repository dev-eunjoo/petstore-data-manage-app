const mongoose = require("mongoose");
const cors = require("cors");
const pets = require("./routes/pets");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/petstore")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());
app.use("/api/pets", pets);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
