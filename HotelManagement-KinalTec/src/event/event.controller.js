'use strict'

//import User from '../user/user.model.js'
//import Hotel from '../hotel/hotel.model.js'
import Event from '../event/event.model.js'
//import { checkUpdate } from '../utils/validator.js'

export const test = (req, res)=> {
    return res.send({message: 'Function test is running | Event'})
}

export const saveEvent = async(req, res)=> {
    try{
        let data = req.body
        let event = new Event(data)
        await event.save()
        return res.status(200).send({message: 'Event saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving event', err})
    }
}