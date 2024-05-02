import React from "react";
import { Link, Outlet } from "react-router-dom";

export const InvoiceDetailPage = () =>{
    return (
        <>
            <h1>Invoice Details</h1>
            <Outlet></Outlet>
        </>
    )
}