'use strict'

import express from 'express'

import {
    test,
    addHotel,
    getHotels,
    getHotel,
    updateHotel,
    deleteHotel
} from './hotel.controller.js'

const api = express.Router()

api.post('/test', test)
api.post('/addHotel', addHotel)
api.get('/getHotels', getHotels)
api.get('/getHotel/:id', getHotel)
api.put('/updateHotel/:id', updateHotel)
api.delete('/deleteHotel/:id', deleteHotel)

export default api