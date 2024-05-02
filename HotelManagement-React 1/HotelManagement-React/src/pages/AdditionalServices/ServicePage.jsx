import React from 'react'
import { Link, Outlet } from "react-router-dom";

export const ServicePage = () => {

    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Services Aplication
            </h1>
            <Outlet></Outlet>
        </>
    )
}