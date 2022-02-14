const { Pet } = require("../models/pet");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find().sort("name");
  res.send(pets);
});

router.get("/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const pets = await Pet.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }, { age: { $regex: keyword, $options: "i" } }, { price: { $regex: keyword, $options: "i" } }] }).sort("name");
  res.send(pets);
});

router.post("/", async (req, res) => {
  let pet = new Pet({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    price: req.body.price
  });
  pet = await pet.save();

  res.send(pet);
});

router.put("/:id", async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      price: req.body.price
    },
    { new: true }
  );

  if (!pet) return res.status(404).send("The pet with the ID was not found.");

  res.send(pet);
});

router.delete("/:id", async (req, res) => {
  const pet = await Pet.findByIdAndRemove(req.params.id);

  if (!pet) return res.status(404).send("The pet with the ID was not found.");

  res.send(pet);
});

module.exports = router;
