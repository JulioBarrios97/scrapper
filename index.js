const cheerio = require("cheerio");
const request = require("request-promise");
const mongoose = require("mongoose");
const Data = require("./models/position");
require("dotenv").config();

async function init() {
  // Conecta con la base de datos
  await mongoose.connect(process.env.MONGODB_URI);

  setInterval(async () => {
    const response = await request.get(
      "https://www.futbolargentino.com/primera-division/tabla-de-posiciones"
    );
    const $ = cheerio.load(response);
    const newDataArray = [];

    $("tbody tr").each((i, el) => {
      const teamName = $(el).find("td:nth-child(2)").text();
      const pj = $(el).find("td:nth-child(3)").text();
      const g = $(el).find("td:nth-child(4)").text();
      const e = $(el).find("td:nth-child(5)").text();
      const p = $(el).find("td:nth-child(6)").text();
      const pts = $(el).find("td:nth-child(7)").text();

      // Crea una instancia del modelo con los datos obtenidos
      const newData = new Data({ teamName, pj, g, e, p, pts });
      newDataArray.push(newData);
    });

    try {
      // Elimina los datos antiguos de la base de datos
      await Data.deleteMany({});
      console.log("Data deleted successfully!");

      // Guarda los nuevos datos en la base de datos
      await Data.insertMany(newDataArray);
      console.log("Data saved successfully!");
    } catch (err) {
      console.log(err);
    }
  }, process.env.UPDATE_INTERVAL);
}

module.exports = { init };
