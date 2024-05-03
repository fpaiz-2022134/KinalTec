import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
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

    const register = async (e) => {
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
            <h1 className='text-center'>Sing up </h1>
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
                    <input onChange={handleChange} name='email' className='form-control' type="text" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Password</label>
                    <input onChange={handleChange} name='password' className='form-control' type="password" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Username</label>
                    <input onChange={handleChange} name='username' className='form-control' type="text" />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="">Phone</label>
                    <input onChange={handleChange} name='phone' className='form-control' type="tel" />
                </div>
                <div>
                    <label className='form-label' htmlFor="">Role</label>
                    <input onChange={handleChange} name='role' className='form-control' type="role" />
                    
                </div>
                <Link to='/login'>
                <button onClick={(e) => register(e)} className='btn btn-primary m-2'>
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