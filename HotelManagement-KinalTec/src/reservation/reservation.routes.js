'use strict'

import { Router } from 'express'

import { addReservation, updateReservation, searchReservation } from './reservation.controller.js'


const api = Router()

api.post('/addReservation', addReservation)
api.put('/updateR/:id', updateReservation)
api.post('/searchReservation', searchReservation)

export default api