'use strict'

import Service from './service.model.js'
//import { checkUpdate } from '../utils/validator.js'

export const saveS = async(req, res)=>{
    try{
        let data = req.body
        let service = new Service(data)
        await service.save()
        return res.status(200).send({message: 'Service save Successfull'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saved Service', err})
    }
}