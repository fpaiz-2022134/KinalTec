'use strict'

import {
    validateJwt,
    isClient,
    isAdmin
} from '../middlewares/validate-jwt.js'

import express from 'express'

import {
    addInvoice
} from './invoice.controller.js'

const api = express.Router()

api.post('/addInvoice', [validateJwt,isAdmin], addInvoice)

export default api