const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider");

// Obtener todos los sliders
router.get("/", async (req, res) => {
  const sliders = await Slider.find();
  res.json(sliders);
});

// Crear un nuevo slider
router.post("/", async (req, res) => {
  const newSlider = new Slider(req.body);
  await newSlider.save();
  res.status(201).json(newSlider);
});

// Eliminar un slider por ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const slider = await Slider.findByIdAndDelete(id);
      if (!slider) {
        return res.status(404).json({ message: "Slider not found" });
      }
      res.json({ message: "Slider deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Actualizar un slider por ID
 router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Desactiva el slider actual destacado
      if (req.body.isFeatured) {
        await Slider.updateMany({ isFeatured: true }, { isFeatured: false });
      }
  
      const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedSlider) {
        return res.status(404).json({ message: "Slider not found" });
      }
      res.json(updatedSlider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get("/featured", async (req, res) => {
    try {
      const slider = await Slider.findOne({ isFeatured: true });
      if (!slider) {
        return res.status(404).json({ message: "No featured slider found" });
      }
      res.json(slider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
