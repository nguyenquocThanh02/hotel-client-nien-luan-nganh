import { useEffect, useState } from "react";
import RoomFilter from "../component/RoomFilter";
import AdminHeader from "../layout/AdminHeader";
import { getAllRooms, deleteRoom } from "../service/AxiosFunction";
import Pagination from "../component/Pagination";
import { Link } from "react-router-dom";
import MessageAlert from "../component/MessageAlert";


function Admin() {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterRooms, setFilterRooms] = useState([{id: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")


    useEffect(()=>{
        setIsLoading(true);

        getAllRooms().then((data)=>{
            setFilterRooms(data);
            setRooms(data);
            setIsLoading(false);
        }).catch((error)=>{
            setIsLoading(false);
            return(
                <main>Error : {error.message}</main>
            )
        })
    }, [success])

    if(isLoading){
        return (
            <main>
                <div className='d-flex justify-content-center mt-4'>
                    <div className="spinner-border me-2 item-primary-color" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className='item-center'>Loading rooms..., please wait</div>
                </div>
            </main>
        )
    }

    const totalPages = Math.ceil(filterRooms.length / roomsPerPage);

    const onPageChange = (number) => {
        setCurrentPage(number);
    }

    const renderRooms = () => {
        const startPoint = (currentPage - 1) * roomsPerPage;
        const endPoint = startPoint + roomsPerPage;
        const roomRender = filterRooms.slice(startPoint, endPoint)
        return roomRender.map((room, i)=>(
            <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{room?.roomType}</td>
                <td>{room?.roomPrice}</td>
                <td>
                    <Link to={`/edit/${room?.id}`}>
                        <button className="btn-hotel-border p-1 me-2"> Edit </button>
                    </Link>
                    <button 
                     onClick={() => handleDeleteRoom(room?.id)}
                     className="btn-hotel-border p-1"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )) 
    }

    const handleDeleteRoom = async (roomId) => {
        const result = await deleteRoom(roomId);
        if(result === ""){
            setSuccess("Deleting room successfully");
        }else{
            setError("Deleting room fail");
        }
    }

    setTimeout(()=>{
        setSuccess("");
        setError("");
    }, 1000)

    return (  
        <main>
            <AdminHeader/>
            {success && (
                <MessageAlert success={success}/>
            )}
            {error && (
                <MessageAlert error={error}/>
            )}
            <div className="d-flex flex-column align-items-center">
                <h5 className="mt-3 mb-3 text-color">Manage Rooms</h5>
                <div className="d-flex justify-content-between w-100 align-items-center p-1 bg-light mb-3">
                    <div className="">
                        <RoomFilter rooms={rooms} setFilterRooms={setFilterRooms}/>
                    </div>
                    <div className="">
                        <Link to={"/add/room"}>
                            <button type="button" className="btn-hotel-border">Add New Room</button>
                        </Link>
                    </div>
                    <div className="">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Room Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRooms()}                  
                    </tbody>
                </table>
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </main>
    );
}

export default Admin;