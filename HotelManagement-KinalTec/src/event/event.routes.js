'use strict'

import { Router } from 'express'

import {
    saveEvent,
    test
} from './event.controller.js'


const api = Router()

api.post('/saveEvent', saveEvent)


//ROLE CLIENT/ADMIN
//api.get('/get', [validateJwt], get)
//api.post('/search', [validateJwt], search)

api.get('/test', test)
export default api