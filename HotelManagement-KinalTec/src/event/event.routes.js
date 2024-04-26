'use strict'

import { Router } from 'express'

import {
    saveEvent,
    test,
    updateEvent,
    changeStatus,
    searchEvent,
    getEvent
} from './event.controller.js'

import {
    validateJwt,
    isAdmin,
} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveEvent', saveEvent,)
api.put('/updateEvent/:id', [validateJwt, isAdmin], updateEvent)
api.put('/changeStatus/:id', [validateJwt, isAdmin], changeStatus)
api.post('/search/:id', [validateJwt], searchEvent)
api.get('/getEvent', [validateJwt, isAdmin], getEvent)

api.get('/test', test)

export default api