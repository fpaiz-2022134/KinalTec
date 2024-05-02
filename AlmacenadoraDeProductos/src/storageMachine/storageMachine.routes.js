'use strict'

import { Router } from 'express'
import {
    saveStorageMachine,
    test,
    deleteStorageMachine,
    updateStorageMachine,
    changeStatus,
    getTasks
} from './storageMachine.controller.js'

const api = Router()

api.post('/save', saveStorageMachine)
api.delete('/delete/:id', deleteStorageMachine)
api.put('/update/:id', updateStorageMachine)
api.put('/changeStatus/:id', changeStatus)
api.get('/getTasks', getTasks)

api.get('/test', test)

export default api