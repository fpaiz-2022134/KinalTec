export const Room = ({ numberRoom, amountPeople, typeRoom, price, status }) => {
    return (
        <>
            <td>{numberRoom}</td>
            <td>{amountPeople}</td>
            <td>{typeRoom}</td>
            <td>{price}</td>
            <td>{status}</td>
        </>
    )
}