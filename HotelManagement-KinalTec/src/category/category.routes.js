'use strict'

import express from 'express'

import {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}from './category.controller.js'

const api = express.Router()

api.post('/addCategory', addCategory)
api.get('/getCategories', getCategories)
api.get('/getCategory/:id', getCategory)
api.put('/updateCategory/:id', updateCategory)
api.delete('/deleteCategory/:id', deleteCategory)

export default api