'use strict'

import express from 'express'
//import { validateJwt, isAdmin } from '../middlewares/validate-jwt'
import { registerU } from './user.controller.js'

const api = express.Router()

api.post('/register', registerU)

export default api