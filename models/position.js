// Importamos mongoose
const mongoose = require("mongoose");

// Creamos el esquema de position
const dataSchema = new mongoose.Schema({
  teamName: String,
  pj: String,
  g: String,
  e: String,
  p: String,
  gf: String,
  gc: String,
  pts: String,
});

// Creamos el modelo de position
const Data = mongoose.model("Data", dataSchema);

// Exportamos el modelo
module.exports = Data;
