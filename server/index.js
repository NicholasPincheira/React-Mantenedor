require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const path = require("path");
const app = express();

// Conexión a MongoDB
connectDB();

// Configuración de CORS
app.use(cors({
    origin: "http://localhost:5173", // URL del frontend en desarrollo
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permite cookies y autenticación
  }));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist"))); // Sirve los archivos estáticos

// API routes
app.use("/api/sliders", require("./routes/sliders"));
app.use("/api/cards", require("./routes/cards"));

// Catch-all para enviar index.html del frontend
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));