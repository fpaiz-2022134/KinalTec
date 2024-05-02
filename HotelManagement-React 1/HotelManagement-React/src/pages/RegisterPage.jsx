import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        role: '',
    


    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const registerU = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:2880/user/register', form)
            if (data.message) {
                alert(data.message)
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
            throw new Error('Error registering user')
        }
    }



    return (
        <>
            <br />
            <h1 className='text-center'>Sing up <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
            </svg></h1>
            <form className='m-5 text-center'>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Name</label>
                    <input onChange={handleChange} name='name' className='form-control' type="text" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Surname</label>
                    <input onChange={handleChange} name='surname' className='form-control' type="text" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Email</label>
                    <input onChange={handleChange} name='email' className='form-control' type="email" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Password</label>
                    <input onChange={handleChange} name='password' className='form-control' type="password" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Phone</label>
                    <input onChange={handleChange} name='phone' className='form-control' type="phone" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Role</label>
                    <input onChange={handleChange} name='role' className='form-control' type="role" />
                    
                </div>
                <Link to='/login'>
                <button onClick={(e) => registerU(e)} className='btn btn-primary m-2'>
                    Sign Up
                </button>
                </Link>
                
                <Link to='/login'>
                    <button className='btn btn-danger'>Cancel</button>
                </Link>
            </form>
        </>
    )
}

export default RegisterPage