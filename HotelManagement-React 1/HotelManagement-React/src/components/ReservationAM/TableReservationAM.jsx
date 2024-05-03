import { useState, useEffect, useContext } from "react"
import { Reservation } from "../Reservation/Reservation"
import { HotelR } from "./HotelR"
import axios from "axios"
import { AuthContext } from "../../Index"

const TableReservationAM = () => {
    const [reservations, setReservations] = useState([])
    const [idHotel, setIdHotel] = useState();
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);



    const getRooms = async () => {
        try {
            const { data } = await axios('http://localhost:2880/room/getRooms')
            setRooms(data.rooms)
        } catch (err) {
            console.log(err);
        }
    }

    const getReservationsByHotel = async () => {
        try {
            const { data } = await axios(`http://localhost:2880/reservation/getRH/${idHotel}`)
            setReservations(data.reservations)
        } catch (err) {
            console.log(err)
        }
    }

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:2880/user/getU')
            setUsers(data.users)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { getReservationsByHotel(); getRooms(); getUsers(); }, [])

    return (
        <>
            <br />
            <div>
                <h1 className="text-center">Reservacion <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
                    <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                    <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
                </svg>
                </h1>
                <br />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Descripcion</th>
                        <th>Fecha De Entrada</th>
                        <th>Fecha De Salida</th>
                        <th>Status</th>
                        <th>Precio</th>
                        <th>User</th>
                        <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hotels.map(({ name, addres }, index) => {

                            const viewHotel = async (idHotel) => {
                                try {
                                    setIdHotel(idHotel)
                                    const { data } = await axios(`http://localhost:2880/reservation/getRH/${idHotel}`)
                                    setReservations(data.reservations)
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            return (
                                <tr className="text-center" key={index}>
                                    <HotelR
                                        name={name}
                                        descripcion={descripcion}
                                        addres={addres}
                                        phone={phone}
                                        email={email}
                                        assessment={assessment}
                                        service={service}
                                    >
                                    </HotelR>
                                    <td>
                                        <svg onClick={() => viewHotel(_id)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Reservations</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr className="text-center">
                                                                <th>Descripcion</th>
                                                                <th>Fecha De Entrada</th>
                                                                <th>Fecha De Salida</th>
                                                                <th>Status</th>
                                                                <th>Precio</th>
                                                                <th>User</th>
                                                                <th>Room</th>
                                                                <th>Hotel</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    reservations.map(({ descripcion, entryDate, departureDate, estado, price, user, hotel, rooms }, index) => {

                                                                        return (
                                                                            <tr className="text-center" key={index}>
                                                                                <Reservation
                                                                                     descripcion={descripcion}
                                                                                     entryDate={entryDate}
                                                                                     departureDate={departureDate}
                                                                                     status={estado}
                                                                                     precio={price}
                                                                                     users={user.name}       
                                                                                     hotel={hotel.name}
                                                                                     rooms={rooms.numberRoom}
                                                                                >
                                                                                </Reservation>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </>
    )
}

export default TableReservationAM