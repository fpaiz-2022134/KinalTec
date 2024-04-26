'use strict'

import Invoice from './invoice.model.js'
import User from '../user/user.model.js'
import Event from '../event/event.model.js'
import Reservation from '../reservation/reservation.model.js'


import {
    checkUpdate
} from '../utils/validator.js'

export const addInvoice = async(req, res)=>{
    try {
       //Getting the data
       let data = req.body
       let {_id} =req.user
         //Setting the client
        data.user = _id 
        // Searching some models to get information
         let reservation = await Reservation.findOne({_id: data.reservation})
         let event = await Event.findOne({_id: data.Event})
         if(!reservation && !event) return res.status(404).send({message: 'We need information of your event or reservation.'})
         //Checking if the information of the user is valid
        if(reservation.userId.toString() != _id.toString()){
            return res.status(403).send({message: 'You are not the owner of this reservation'})
        } else if(event.user.toString() != _id.toString){
            return res.status(403).send({message: 'You are not the owner of this event'})
        }
        //Setting the total
        if(reservation != null){
            data.description = reservation.description
            data.entryDate = reservation.entryDate
            data.departureDate = reservation.departureDate
            data.total = reservation.total
        } else if( event != null){
            data.description = event.description
            data.entryDate = event.entryDate
            data.departureDate = event.departureDate
            data.total = event.total
        }else{
            return res.status(404).send({message: 'Reservation or event not found'})
        }

        let invoice = new Invoice(data)
        //Saving the invoice
        await invoice.save()
        //Answer
        let showInvoice = await Invoice.findOne({_id: invoice.id}).populate('user', ['-_id', 'name','username',  'email'])
        return res.status(200).send(showInvoice)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding the invoice.' })
    }
}


