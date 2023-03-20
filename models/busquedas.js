const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {}

  get paramsMapbox() {
    return {
      access_token:
        "pk.eyJ1Ijoiam9hcXVpbmFodWVsOTMiLCJhIjoiY2xmaGEwamxyMDY0ODNxbm16Zm4zOG9tcCJ9.pE6F2xPGsBJwvcf1vAmFMg",
      limit: 5,
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

      console.log(resp);

      console.log(resp.data);

      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
