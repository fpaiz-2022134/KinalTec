'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { changeRol, deleteU, getU, login, registerU, searchU, test, updateU } from './user.controller.js'

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
api.post('/search/:id', searchU)
api.put('/changerol/:id', changeRol)

export default api