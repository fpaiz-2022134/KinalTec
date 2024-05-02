//Imports 
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import storageMachineRoutes from '../src/storageMachine/storageMachine.routes.js'

//Configuration
const app = express()
config()

const port = process.env.PORT || 3200

//Configurating the server
//(Configurando el servidor de express)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Routes
app.use('/storageMachine', storageMachineRoutes)

//Levantamos el servidor
export const initServer = () =>{
    app.listen(port)
    console.log(`Sever HTTP running in port ${port}`)
}