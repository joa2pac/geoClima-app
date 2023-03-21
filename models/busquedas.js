const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      lenguage: "es",
    };
  }

  get paramsOpenweather() {
    return {
      access_token: process.env.OPENWEATHER_KEY,
      lenguage: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();
      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
      
      
    } catch (error) {
      return [];
    }
  }

  async climarLugar( lat, lon ) {

    try {
      // peticion http
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }`,
        params: this.paramsOpenweather,
      });

      const resp = await intance.get();
      return resp.data.main.map( temp => ({
        temperatura: temp.temp,
        temperaturaMin: temp.temp_min,
        temperaturaMax: temp.temp_max,
      }));

    } catch ( error ) {
      console.log(error)
    }

  }

}

module.exports = Busquedas;
