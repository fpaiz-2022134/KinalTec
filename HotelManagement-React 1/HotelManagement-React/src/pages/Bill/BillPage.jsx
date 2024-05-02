import React from "react";
import { Outlet } from "react-router-dom";

export const BillPage = () =>{
    return (
        <>
            <h1>Bill page</h1>
            <Outlet></Outlet>
        </>
    )
}