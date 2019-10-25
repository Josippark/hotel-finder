const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const client = require('../config/redis-client');


function cache(req, res, next) {
    const { airportCode } = req.params;

    client.get(airportCode, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(JSON.parse(data));

        } else {
            next();
        }
    })

}

router.get('/:airportCode', cache, (req, res) => {
  
    const { airportCode } = req.params;


    const initAuthData = qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.API_KEY,
        client_secret: process.env.API_SECRET
    })

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    let token = ''



    axios.post(process.env.API_TOKEN_URL, initAuthData, headers)
        .then(response => response.data.access_token)
        .then(response => {
            axios.get(`${process.env.API_URL}/v2/shopping/hotel-offers?cityCode=${airportCode}`, { headers: { Authorization: `Bearer ` + response } })
                .then(response => {
                   
                   const hotels = [];
                   for(hot in response.data.data){
                    const hotel = {
                        hotelName: response.data.data[hot].hotel.name,
                        hotelType: response.data.data[hot].hotel.type,
                        hotelDistance: {
                            distance:response.data.data[hot].hotel.hotelDistance.distance,
                            distanceUnit:response.data.data[hot].hotel.hotelDistance.distanceUnit
                        },
                        rating: response.data.data[hot].hotel.rating,
                        address:response.data.data[hot].hotel.address,
                        price:{
                            total:response.data.data[hot].offers[0].price.total,
                            currency:response.data.data[hot].offers[0].price.currency
                        },
                        available: response.data.data[hot].available

                    }
                    hotels.push(hotel)
                }
                    client.setex(airportCode, 3600, JSON.stringify(hotels))                
                    res.json(hotels)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: "Something went wrong" })
                })
        })
        .catch(err => res.status(500).json({ message: "Something went wrong" }));


}

)

module.exports = router;