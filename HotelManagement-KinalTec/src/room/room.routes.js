'use strict'

import { Router } from 'express'

import { saveRoom, addRoom, updateRoom, deleteRoom, } from './room.controller.js'


const api = Router()

api.post('/saveRoom', saveRoom)
api.post('/add', addRoom)
api.put('/update/:id', updateRoom)
api.delete('/delete/:id', deleteRoom)

export default api