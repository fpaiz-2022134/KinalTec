export const Reservation = ({ descripcion, entryDate, departureDate, estado, price, user, hotel, rooms,  }) => {
    return (
        <>
            <td>{descripcion}</td>
            <td>{entryDate}</td>
            <td>{departureDate}</td>
            <td>{estado}</td>
            <td>{price}</td>                       
            <td>{user}</td> 
            <td>{hotel}</td>
            <td>{rooms}</td>                
        </>
    )
}