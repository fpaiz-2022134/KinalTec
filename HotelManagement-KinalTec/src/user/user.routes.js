'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteU, getU, login, registerU, test, updateU } from './user.controller.js'

const api = express.Router()

//middleware
//Role ADMIN
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt, isAdmin], updateU)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteU)

//PUBLIC
api.post('/register', registerU)
api.post('/login', login)
api.get('/get', getU)

export default api