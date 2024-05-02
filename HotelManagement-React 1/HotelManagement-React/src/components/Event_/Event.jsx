export const Event = ({name, event_type, price})=>{ 
    return (
        <>
            <td>{name}</td>
            <td>{event_type}</td>
            <td>{price}</td>
        </>
    )
}