import { useEffect, useState } from "react";
import AdminHeader from "../../layout/AdminHeader";
import { getAllBookeds } from "../../service/AxiosFunction";
import {Link} from 'react-router-dom'
import MessageAlert from "../../component/MessageAlert";
import Pagination from "../../component/Pagination";
import moment from "moment";

function BookedAdmin() {
    const [bookeds, setBookeds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterBooked, setFilterBooked] = useState([{id: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookedsPerPage] = useState(6);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")


    useEffect(()=>{
        setIsLoading(true);

        getAllBookeds().then((data)=>{
            setFilterBooked(data);
            setBookeds(data);
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
                    <div className='item-center'>Loading bookeds..., please wait</div>
                </div>
            </main>
        )
    }

    const totalPages = Math.ceil(filterBooked.length / bookedsPerPage);

    const onPageChange = (number) => {
        setCurrentPage(number);
    }

    const handlePrice =  (roomPrice, checkIn, checkOut) => {
        const checkInDate = moment(checkIn);
        const checkOutDate = moment(checkOut);
        const NumberOfDays = checkOutDate.diff(checkInDate, 'days');
        return NumberOfDays * roomPrice;
    }

    // const handleCreateBill = async (booked){
    //     const bill = {
    //         totalPrice: handlePrice(booked?.room?.roomPrice, booked?.checkIn, booked?.checkOut),
            
    //     }
    //     const result = await createBill(idAdmin, bill);
    //     navigate("/...")
    // }

    const renderBooked = () => {
        const startPoint = (currentPage - 1) * bookedsPerPage;
        const endPoint = startPoint + bookedsPerPage;
        const bookedRender = filterBooked.slice(startPoint, endPoint)
        return bookedRender.map((booked, i)=>(
            <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{booked?.bookingConfirmCode}</td>
                <td>{moment(booked.checkIn).format('DD/MM/YYYY')}</td>
                <td>{moment(booked.checkOut).format('DD/MM/YYYY')}</td>
                <td>{booked?.userEmail}</td>
                <td>{booked?.room?.id}</td>
                <td>{handlePrice(booked?.room?.roomPrice, booked?.checkIn, booked?.checkOut)}</td>
                <td><button onClick={()=>handleCreateBill(booked)} className="btn-hotel-border">Create bill</button></td>
                {/* <td> */}
                {/* <Link to={`/edit/${room?.id}`}>
                    <button className="btn-hotel-border p-1 me-2"> Edit </button>
                </Link> */}
                {/* <button 
                    onClick={() => handleDeleteRoom(room?.id)}
                    className="btn-hotel-border p-1"
                >
                    Delete
                </button> */}
                {/* </td> */}
            </tr>
        )) 
    }

    // const handleDeleteRoom = async (roomId) => {
    //     const result = await deleteRoom(roomId);
    //     if(result === ""){
    //         setSuccess("Deleting room successfully");
    //     }else{
    //         setError("Deleting room fail");
    //     }
    // }

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
                <h5 className="mt-3 mb-3 text-color">Manage Bookeds</h5>
                <div className="d-flex justify-content-between w-100 align-items-center p-1 bg-light mb-3">
                    <div className="">
                        {/* <RoomFilter rooms={rooms} setFilterRooms={setFilterRooms}/> */}
                    </div>
                    {/* <div className="">
                        <Link to={"/add/room"}>
                            <button type="button" className="btn-hotel-border">Add New Room</button>
                        </Link>
                    </div> */}
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
                            <th scope="col">Code Id</th>
                            <th scope="col">Check In</th>
                            <th scope="col">Check Out</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Room Id</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBooked()}                  
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

export default BookedAdmin;