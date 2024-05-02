import React from 'react'
import { Link, Outlet } from "react-router-dom";

export const EventPage = () => {

    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Events Aplication
            </h1>
            <Outlet></Outlet>
        </>
    )
}