'use strict'

import StorageMachine from './storageMachine.model.js'

export const test = async (req, res) => {
    return res.send({ message: 'Function test is running | StorageMachine' })

}

export const saveStorageMachine = async (req, res) => {
    try {
        let data = req.body
        data.status = true
        let storageMachine = new StorageMachine(data)
        await storageMachine.save()
        return res.status(200).send({ message: 'Storage Machine saved successfully.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving storage machine.', err })
    }
}


export const deleteStorageMachine = async (req, res) => {
    try {
        let { id } = req.params
        let deletedStorageMachine = await StorageMachine.deleteOne({ _id: id })
        if (deletedStorageMachine.deleteCount == 0) return res.status(404).send({ message: 'Storage machine not found, not deleted.' })
        return res.send({ message: 'Deleted storage machine succesfully.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting storage machine.' })
    }
}

export const updateStorageMachine = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = (data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data.' })
        let updateStorageMachine = await StorageMachine.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateStorageMachine) return res.status(404).send({ message: 'Storage machine not found, not updated.' })
        return res.status(200).send({ message: 'Storage machine updated succesfully', updateStorageMachine })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating storage machine.', err })
    }
}

export const changeStatus = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        data.status = false
        if ((data.name != null) || (data.surname != null) || (data.taskName != null) || (data.taskDescription != null) || (data.entryDate != null) || (data.departureDate != null)) {
            return res.status(401).send({ message: 'You only can update the status.' })
        }
        let update = (data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data.' })
        let updateStorageMachineFalse = await StorageMachine.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateStorageMachineFalse) return res.status(404).send({ message: 'Storage machine not found, not updated.' })
        return res.send({ message: 'Event updated succesfully', updateStorageMachineFalse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating storage machine.', err })
    }
     
}


export const getTasks = async (req, res) => {
    try {
       let tasks = await StorageMachine.find()
        return res.status(200).send({ tasks })
    } catch (err) {
        console.error(err)
         return res.status(500).send({ message: 'Error getting tasks.', err })
    }
 }