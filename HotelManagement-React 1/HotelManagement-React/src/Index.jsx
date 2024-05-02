import React, { useState, createContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage';
import App from './App'
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

/* ADMINAM [ROUTES] */

//USERS
import { UserPage } from './pages/Users/UserPage';
import { AddUser } from './pages/Users/AddUser';
import { GetUser } from './pages/Users/GetUser';
import { UpdateUser } from './pages/Users/UpdateUser';

// ROOMS [ROUTES]
import { RoomPage } from './pages/Rooms/RoomPage';
import { GetRooms } from './pages/Rooms/GetRooms';
import { ADDR } from './pages/Rooms/addR';
import { UpdateRoom } from './pages/Rooms/UpdateRoom';
// SERVICES [ROUTES]
import { ServicePage } from './pages/AdditionalServices/ServicePage'
import { GetServices } from './pages/AdditionalServices/GetServices'
import { Add } from './pages/AdditionalServices/AddService'
import { Update } from './pages/AdditionalServices/UpdateService';
// EVENTS [ROUTES]
import { EventPage } from './pages/Events_/EventPage';
import { GetEvents } from './pages/Events_/GetEvents';
import { AddEvent } from './pages/Events_/AddEvent';
import { UpdateEvent } from './pages/Events_/UpdateEvent';

/* ADMIN [ROUTES] */
//invoices details
import { InvoiceDetailPage } from './pages/InvoiceDetail/InvoiceDetailPage';
import { GetInvoicesDetails } from './pages/InvoiceDetail/GetInvoicesDetails';
import { AddInvoiceDetail } from './pages/InvoiceDetail/AddInvoiceDetail';
import { UpdateInvoiceDetail } from './pages/InvoiceDetail/UpdateInvoiceDetail';
import { GetInvoiceDetailasPage } from './pages/InvoiceDetail/GetInvoiceDetailasPage';
import { GetInvoiceDetailEvents } from './pages/InvoiceDetail/GetInvoiceDetailEvents';
//Bills
import { BillPage } from './pages/Bill/BillPage';
import { GetBills } from './pages/Bill/GetBills';
import { AddBill } from './pages/Bill/AddBill';
import { UpdateBill } from './pages/Bill/UpdateBill';
import { GetBill } from './pages/Bill/GetBill';
import ReservatonPage from './pages/Reservation/ReservatonPage';
import ReservationPageAM from './pages/Reservation/ReservationPageAM';
import GraphicsPage from './pages/GraphicsPage';
import RegisterPage from './pages/RegisterPage';

export const AuthContext = createContext();
export const Index = () => {
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })

    const [isAdmin, setIsAdmin] = useState('ADMIN');

    useEffect(() => {
        let token = localStorage.getItem('token')
        let role = localStorage.getItem('role')
        let id = localStorage.getItem('_id')
        if (token) {
            setLoggedIn(true)
            setRole(role)
            setId(id)
        }
    }, [])

    const ADMINAMRoutes = [
        {
            path: 'users',
            element: <UserPage></UserPage>,
            children: [
                {
                    path: '',
                    element: <GetUser></GetUser>
                },
                {
                    path: 'adduser',
                    element: <AddUser></AddUser>
                },
                {
                    path: 'updateuser/:_id',
                    element: <UpdateUser></UpdateUser>
                }
            ]
        },
        {
            path: 'rooms',
            element: <RoomPage></RoomPage>,
            children: [
                {
                    path: '',
                    element: <GetRooms></GetRooms>
                },
                {
                    path: 'addroom',
                    element: <ADDR></ADDR>
                },
                {
                    path: 'updateroom/:_id',
                    element: <UpdateRoom></UpdateRoom>
                }
            ]
        },
        {
            path: 'services',
            element: <ServicePage></ServicePage>,
            children: [
                {
                    path: '',
                    element: <GetServices></GetServices>
                },
                {
                    path: 'addservice',
                    element: <Add></Add>
                }, {
                    path: 'updateservice/:_id',
                    element: <Update></Update>
                }
            ]
        },
        {
            path: 'events',
            element: <EventPage></EventPage>,
            children: [
                {
                    path: '',
                    element: <GetEvents></GetEvents>
                },
                {
                    path: 'addevent',
                    element: <AddEvent></AddEvent>
                }, {
                    path: 'updateevent/:_id',
                    element: <UpdateEvent></UpdateEvent>
                }
            ]
        },
        {
            path: 'reservations',
            element: <ReservationPageAM></ReservationPageAM>
        },
        {
            path: 'graficas',
            element: <GraphicsPage></GraphicsPage>
        }
        //EVENTO
        //SERVICIOS
        //HABITACIONES
        //HOTELES
    ]

    const ADMINRoutes = [
        {
            path: 'invoicedetail',
            element: <InvoiceDetailPage></InvoiceDetailPage>,
            children: [
                {
                    path: '',
                    element: <GetInvoicesDetails></GetInvoicesDetails>
                },
                {
                    path: 'add',
                    element: <AddInvoiceDetail></AddInvoiceDetail>
                },
                {
                    path: 'update/:_id',
                    element: <UpdateInvoiceDetail></UpdateInvoiceDetail>
                },
                {
                    path: 'additionalservices/:_id',
                    element: <GetInvoiceDetailasPage></GetInvoiceDetailasPage>
                },
                {
                    path: 'events/:_id',
                    element: <GetInvoiceDetailEvents></GetInvoiceDetailEvents>
                }
            ]
        }, {
            path: 'bill',
            element: <BillPage></BillPage>,
            children: [
                {
                    path: '',
                    element: <GetBills></GetBills>
                },
                {
                    path: 'add',
                    element: <AddBill></AddBill>
                },
                {
                    path: 'update/:_id',
                    element: <UpdateBill></UpdateBill>
                },
                {
                    path: 'get/:_id',
                    element: <GetBill></GetBill>
                }
            ]
        }
        //HOTEL
        //DETALLE CUENTA
        //FACTURA
    ]

    const CLIENTRoutes = [
        {
            path: 'reservation',
            element: <ReservatonPage></ReservatonPage>
        }
    ]

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: 'register',
                    element: <RegisterPage/>
                },
                {
                    path: '/home',
                    element: loggedIn ? <DashboardPage></DashboardPage> : <LoginPage></LoginPage>,
                    children: role === "ADMINAM" ? ADMINAMRoutes :
                        role === "ADMIN" ? ADMINRoutes : CLIENTRoutes
                }
            ]
        }
    ])
    return (
        <AuthContext.Provider value={{ isAdmin, loggedIn, setLoggedIn, dataUser, setDataUser, role, id }}>
            <RouterProvider router={routes}></RouterProvider>
        </AuthContext.Provider>
    )
}
