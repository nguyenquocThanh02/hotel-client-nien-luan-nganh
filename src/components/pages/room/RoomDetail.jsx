

function RoomDetail({room}) {
    return (  
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <td colSpan={2}>
                        <img className='img-fluid w-100' src={"data:image/jpeg;base64,"+room?.roomImage} alt="anh room" />
                    </td>
                </tr>
                <tr>
                    <td>Type: </td>
                    <td>{room?.roomType}</td>
                </tr>
                <tr>
                    <td>Price: </td>
                    <td>{room?.roomPrice}</td>
                </tr>
                <tr>
                    <td>Devices: </td>
                    <td>wifi, 2 beds, bath, ...</td>
                </tr>
                <tr>
                    <td>Details: </td>
                    <td>{room?.roomDetails}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default RoomDetail;