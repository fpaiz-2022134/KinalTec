'use strict'

import { Schema, model } from 'mongoose'

const storageMachineSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
})

export default model ('storageMachine', storageMachineSchema)