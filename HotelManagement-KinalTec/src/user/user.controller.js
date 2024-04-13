'use strict'

import User from './user.model.js'
import { encrypt } from '../utils/validator.js'
//import { generateJwt } from '../utils/jwt.js'

export const registerU = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = await User(data)
        await user.save()
        return res.status(200).send({message: 'User registered successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user' })
    }
}