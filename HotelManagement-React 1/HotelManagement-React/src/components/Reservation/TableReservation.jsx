import { useState, useEffect, useContext } from "react";
import { Reservation } from "./Reservation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Index";

export const TableReservation = () => {
    const { id } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [idReservation, setIdReservation] = useState();
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);




    const getRooms = async () => {
        try {
            const { data } = await axios('http://localhost:2880/room/getRooms')
            setRooms(data.rooms)
        } catch (err) {
            console.log(err);
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

    const addReservation = async () => {
        try {
            let reservationsData = {
                descripcion: document.getElementById('inputDescripcion').value,
                entryDate: document.getElementById('inputEntry').value,
                departureDate: document.getElementById('inputDeparture').value,
                estado: document.getElementById('inputStatus').value,
                precio: document.getElementById('inputPrecio').value,
                users: document.getElementById('inputUser').value,
                rooms: document.getElementById('inputRoom').value
            }
            const { data } = await axios.post('http://localhost:2880/reservation/addReservation', reservationsData)
            alert(data.message)
            resetAdd()
        } catch (err) {
            console.error(err);
        }
    }


    const resetAdd = async () => {
        try {
            document.getElementById('inputDescripcion').value = '',
            document.getElementById('inputEntry').value = '',
            document.getElementById('inputDeparture').value = '',
            document.getElementById('inputStatus').value = '',
            document.getElementById('inputPrecio').value = '',
            document.getElementById('inputUser').value = '',
            document.getElementById('inputRoom').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getRooms(); getUsers }, [])



    return (
        <>
            <br />
            <div>
                <h1 className="text-center">Reservacion<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
                    <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                    <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
                </svg>
                </h1>
                <br />
                <div className="text-center">
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                        Agrega Tu Reservacion
                    </button>
                </div>
                <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Agrega Tu Reservacion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="formAdd">
                                <div>
                                        <label htmlFor="inputDescripcion" className="form-label">Descripcion De La Reservacion</label>
                                        <input type="text" className="form-control" id="inputDescripcion" required />
                                    </div>
                                    
                                   
                                    <div>
                                        <label htmlFor="inputEntry" className="form-label">Fecha De Entrada</label>
                                        <input type="date" className="form-control" id="inputEntry" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputDeparture" className="form-label">Fecha De Salida</label>
                                        <input type="date" className="form-control" id="inputDeparture" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="inputStatus" className="form-label">Status</label>
                                        <input type="text" className="form-control" id="inputStatus" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPrecio" className="form-label">Precio</label>
                                        <input type="text" className="form-control" id="inputPrecio" required />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="inputUser" className="form-label">User</label>
                                        <select className="form-control" id="inputUser">
                                            {
                                                users.map(({ _id, numberUser }, i) => {
                                                    return (
                                                        <option key={i} value={_id}>{numberUser}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputRoom" className="form-label">Room</label>
                                        <select className="form-control" id="inputRoom">
                                            {
                                                rooms.map(({ _id, numberRoom }, i) => {
                                                    return (
                                                        <option key={i} value={_id}>{numberRoom}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => addReservation()} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservations.map(({ descripcion, entryDate, departureDate, estado, price, user, rooms }, index) => {

                            const updateReservation = async () => {
                                try {
                                    const { data } = await axios.put(`http://localhost:2880/reservation/updateR/${id}`)
                                    alert('Updated Sucessfully')
                                    resetUp()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            

                            return (
                                <tr className="text-center" key={index}>
                                    <Reservation
                                        descripcion={descripcion}
                                        entryDate={entryDate}
                                        departureDate={departureDate}
                                        status={estado}
                                        precio={price}
                                        users={user.name}       
                                        rooms={rooms.numberRoom}

                                        
                                    >
                                    </Reservation>
                                    <td>
                                        <svg onClick={() => viewUpdate(_id)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Update Reservation</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form id="formUp">
                                                           
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick={() => updateReservation(_id)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <svg onClick={() => cancelReservation(_id)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
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
