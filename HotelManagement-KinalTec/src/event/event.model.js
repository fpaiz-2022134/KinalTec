'use strict'

import { Schema, model} from 'mongoose'

const eventSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    entryDate: {
        type: date,
        required: true
    },
    departureDate: {
        type: date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: 'hotel',
        required: true
    } 
 }) 

export default model('event', eventSchema)