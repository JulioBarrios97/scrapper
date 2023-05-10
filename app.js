const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

const client = new MongoClient(process.env.MONGODB_URI);

app.get("/table", async (req, res) => {
  try {
    await client.connect(process.env.MONGODB_URI);
    const db = client.db("test");
    const collection = db.collection("datas");

    // Buscar todos los documentos en la colección "datas"
    const cursor = await collection.find();
    const result = await cursor.toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});