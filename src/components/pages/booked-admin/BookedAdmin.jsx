import { useEffect, useState } from "react";
import AdminHeader from "../../layout/AdminHeader";
import { createBill, getAllBookeds } from "../../service/AxiosFunction";
import {Link} from 'react-router-dom'
import MessageAlert from "../../component/MessageAlert";
import Pagination from "../../component/Pagination";
import moment from "moment";
import DateFilter from "../../component/DateFilter";
import ClearFilter from "../../component/ClearFilter"
import { fixDate } from "../../service/functionCommon";

function BookedAdmin() {

    const adminEmail = localStorage.getItem('email');

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
            setBookeds([])
            setFilterBooked([])
            setError(error.data);
            setIsLoading(false);
        })
    }, [success])


    if(error){
        return (
            <main>
                <div className='text-danger item-center mt-4'>Error: {error}</div>
            </main>
        )
    }

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
        const checkInDate = fixDate(checkIn);
        const checkOutDate = fixDate(checkOut);
        const NumberOfDays = checkOutDate.diff(checkInDate, 'days');
        return NumberOfDays * roomPrice;
    }

    const handleCreateBill = async (booked) => {
        const bill = {
            totalPrice: handlePrice(booked?.room?.roomPrice, booked?.checkIn, booked?.checkOut)
        }
        const result = await createBill(booked?.id, adminEmail, bill);
        if(result.status == null){
            setSuccess(result);
        }else{
            setError(result.data);
        }
    }

    const renderBooked = () => {
        const startPoint = (currentPage - 1) * bookedsPerPage;
        const endPoint = startPoint + bookedsPerPage;
        const bookedRender = filterBooked.slice(startPoint, endPoint)
        return bookedRender && bookedRender.length>0 && bookedRender.map((booked, i)=>(
            <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{booked?.bookingConfirmCode}</td>
                <td>{fixDate(booked.checkIn).format('DD/MM/YYYY')}</td>
                <td>{fixDate(booked.checkOut).format('DD/MM/YYYY')}</td>
                <td>{booked?.userEmail}</td>
                <td>{booked?.room?.id}</td>
                <td>{handlePrice(booked?.room?.roomPrice, booked?.checkIn, booked?.checkOut)}</td>
                <td><button onClick={()=>handleCreateBill(booked)} className="btn-hotel-border">Create bill</button></td>
            </tr>
        )) 
    }

    setTimeout(()=>{
        setSuccess("");
        setError("");
    }, 2000)

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
                    <DateFilter data={bookeds} setState={setFilterBooked}/>
                    <ClearFilter data={bookeds} setState={setFilterBooked}/>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
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