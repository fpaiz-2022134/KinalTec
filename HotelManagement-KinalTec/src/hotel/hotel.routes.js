'use strict'

import express from 'express'

import {
    test,
    addHotel
} from './hotel.controller.js'

const api = express.Router()

api.post('/test', test)
api.post('/addHotel', addHotel)

export default api