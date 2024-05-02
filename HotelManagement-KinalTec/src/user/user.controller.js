'use strict'

import User from './user.model.js'
import { checkEmail, checkPassword, checkUpdate, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send('Access ADMIN Sucessfull')
}

export const registerU = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.rol = 'CLIENT'
        let user = await User(data)
        await user.save()
        return res.status(200).send({message: 'User registered successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user' })
    }
}

export const defaultAdmin = async(nameA, surnameA, usernameA, emailA, passwordA, phoneA, rolA)=> {
    try{
        //busca los usuarios que sean admin
        let admin = await User.findOne({ rol: 'ADMIN'})
        //si no hay admin se crea un admin por default
        if(!admin){
            const data = {
                name: nameA,
                surname: surnameA,
                username: usernameA,
                email: emailA,
                password: await encrypt(passwordA),
                phone: phoneA,
                rol: rolA
            }
        // aqui se guardará el admin por defecto en data
            let user = new User(data)
            await user.save()
            return console.log('Default admin has been created')
        } else {
            return console.log('Default admin cannot be created')
        }
    }catch(err){
        console.error(err)
    }
}

defaultAdmin('Luis', 'Marroquin', 'lmarroquin', 'lmarroquin@gmail.com', '234', '56566565', 'ADMIN')


export const changeRol = async(req, res)=> {
    try{
        let { id } = req.params
        let { rol } = req.body
        let user = await User.findOne({_id: id})
        if(!user) return res.status(404).send({message: 'User not found'})
        user.rol = rol
        await user.save()
        return res.send({message: 'Rol changed successfull'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error changing roles'})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password, email, rol } = req.body
        let user = await User.findOne({
            $or : [
                {username: username},
                {email: email}
            ]
        })
        if(user && await checkPassword && await checkEmail( password, user.password, email, user.email, user.rol)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                rol: user.rol
            }
            let token = await generateJwt(loggedUser)
            return res.send({
                message: `Welcome ${user.name}`,
                user,
                token,
                rol
            })
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}


export const updateU = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})

        // Usa los campos de Usuario
        const currentUser = req.user

        // Encuentre el usuario por el ID
        const userToUpdate = await User.findOne({_id: id})

        // Ver si el usuario tiene permisos para actualiar el usuario
        if (currentUser.rol === 'ADMIN' && currentUser._id.toString() !== id) {
            // Ver si el usuario que actualiza es ADMIN o CLIENTE
            if (userToUpdate.rol === 'ADMIN') {
                return res.status(403).send({message: 'You do not have permission to update this user'})
            }
        } else if (currentUser.rol === 'CLIENT' && currentUser._id.toString() !== id) {
            return res.status(403).send({message: 'You do not have permission to update this user'})
        }
        // actualizar el usuario
        let updatedUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUserRol = req.user.rol;

        // Verificar si el usuario tiene permiso para eliminar
        if (loggedInUserRol === 'ADMIN') {
            // Si el usuario es ADMIN, puede eliminar su perfil y los perfiles de los CLIENTES
            const userToDelete = await User.findById(id);
            if (!userToDelete) return res.status(404).send({ message: 'User not found' });

            // Verificar si el usuario a eliminar es ADMIN, si lo es, no permitir la eliminación
            if (userToDelete.rol === 'ADMIN') {
                return res.status(403).send({ message: 'Cannot delete profiles of other admins' });
            }
        } else if (loggedInUserRol === 'CLIENT') {
            // Si el usuario es CLIENTE, solo puede eliminar su propio perfil
            if (id !== req.user.id) {
                return res.status(403).send({ message: 'Cannot delete profiles of other users' });
            }
        } else {
            return res.status(403).send({ message: 'Unauthorized' });
        }

        // Realizar la eliminación
        const deletedUser = await User.findOneAndDelete({ _id: id });

        if (!deletedUser) return res.status(404).send({ message: 'User not found' });

        return res.send({ message: `User ${deletedUser} deleted successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting account' });
    }
};


export const getU = async(req, res)=>{
    try{
        let users = await User.find()
        return res.send({ users })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting users'})
    }
}

export const searchU = async(req, res)=>{
    try{
        let { id } = req.params
        let user = await User.findOne({_id: id})
        if(!user)return res.status(404).send({message: 'User not found'})
        return res.send({user})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting user'})
    }
}