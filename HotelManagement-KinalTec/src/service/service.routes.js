'use strict'

import { Router } from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteS, getS, saveS, updateS } from './service.controller.js'

const api = Router()

api.post('/save', [validateJwt, isAdmin], saveS)
api.put('/update/:id', [validateJwt, isAdmin], updateS)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteS)

api.get('/get', getS)

export default api