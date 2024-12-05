const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Obtener todas las tarjetas
router.get("/", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// Crear una nueva tarjeta
router.post("/", async (req, res) => {
  const newCard = new Card(req.body);
  await newCard.save();
  res.status(201).json(newCard);
});

module.exports = router;
