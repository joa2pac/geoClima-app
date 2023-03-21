const fs = require('fs');

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json';

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
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
      
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
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
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenweather, lat, lon}
      });

      const resp = await instance.get();
      const{ weather, main } = resp.data;
  
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };

    } catch ( error ) {
      console.log(error)
    }

  }

  agregarHistorial( lugar = '') {

    if ( this.historial.includes.apply( lugar.toLocaleLowerCase() ) ) {
      return;
    }

    this.historial.unshift( lugar.toLocaleLowerCase() );

    this.guardarDB();

    this.leerDB();

  }

  guardarDB() {

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync( this.dbPath, JSON.stringify( payload ))

  }

  leerDB = () => {
    if ( !fs.existsSync(historial) ) {
        return null;
    }

    const info = fs.readFileSync(historial, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    // console.log(data);

    return data;
}

}

module.exports = Busquedas;
