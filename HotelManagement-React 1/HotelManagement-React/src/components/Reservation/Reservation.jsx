export const Reservation = ({ user, hotel, rooms, cNoches, subTotal}) => {
    return (
        <>
            <td>{user}</td>
            <td>{hotel}</td>
            <td>{rooms}</td>
            <td>{cNoches}</td>
            <td>{subTotal}</td>                                        
        </>
    )
}