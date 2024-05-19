const {fetchWeatherApi} = require('openmeteo');
const express = require('express');
const axios = require('axios');


const getWeather = async (req,res) =>{

    try{

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString(); 
        });
        req.on('end', async ()=>{
        const paramsi = new URLSearchParams(body);
        const  latitude = paramsi.get('latitude');
        const longitude = paramsi.get('longitude');

        console.log(latitude);

        const params = {
            latitude: [latitude],
            longitude: [longitude],
            timezone: 'auto',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration',
            hourly: 'temperature_2m'
        };
        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await fetchWeatherApi(url, params);

        const range = (start, stop, step) => {
            if (typeof start === 'bigint' || typeof stop === 'bigint' || typeof step === 'bigint') {
              start = Number(start);
              stop = Number(stop);
              step = Number(step);
            }
            const length = Math.ceil((stop - start) / step);
            const result = [];
            for (let i = 0; i < length; i++) {
              result.push(start + step * i);
            }
            return result;
          };
                  

        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const weather_code = response.daily().variables(0).valuesArray();
        const temperatureMax = response.daily().variables(1).valuesArray();
        const temperatureMin = response.daily().variables(2).valuesArray();
        const sunshine_duration = response.daily().variables(3).valuesArray();
        for(let key in sunshine_duration){
            sunshine_duration[key]=sunshine_duration[key]*0.2*2.5;
        }
        const info = {
            time: range(BigInt(response.daily().time()),BigInt(response.daily().timeEnd()), BigInt(response.daily().interval())).map(
                (t) => new Date((Number(t) + utcOffsetSeconds) * 1000)
            ),
            weather_code: weather_code,
            temperatureMin: temperatureMin,
            temperatureMax: temperatureMax,
            Energy: sunshine_duration
        }
        return res.json(info);
        })

    }
    catch(error){
        console.error('Blad przy pobieraniu pogody', error)
        return res.status(500).json({error:'Wystapil blad podczas pobierania danych'})
    }
}

module.exports = getWeather;