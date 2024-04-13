'use strict'

import Hotel from './hotel.model.js'

export const test = (req, res)=>{
    return res.send('Hello World')
}

export const addHotel = async(req, res)=>{
    try {
        //Getting the information
        let data = req.body
        //Creating the hotel
        let hotel = new Hotel(data)
        //Saving the information
        await hotel.save()
        //Answer
        return res.status(200).send({message: 'Hotel registered successfully.'})

    } catch (err) {
        console.error(err)
        return res.status(500).send({mesage: 'Error creating the hotel.'})
    }
}

