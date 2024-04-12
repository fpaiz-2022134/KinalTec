'use strict'

import { Router } from 'express'
//import { validateJwt, isAdmin } from '../middlewares/validate-jwt'
import { saveS } from './service.controller.js'

const api = Router()

api.post('/save', saveS)

export default api