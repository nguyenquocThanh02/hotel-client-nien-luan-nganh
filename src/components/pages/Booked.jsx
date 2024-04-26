import { useEffect, useState } from "react";
import { cancelBooked, getBookedsOfUser } from "../service/AxiosFunction";
import {Link} from 'react-router-dom'
import MessageAlert from "../component/MessageAlert";
import { fixDate } from "../service/functionCommon";

function Booked() {
    const theUserEmail = localStorage.getItem("email");

    const [bookeds, setBookeds] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const fetchBookeds = async () => {
        const result = await getBookedsOfUser(theUserEmail);
        if(result.status === undefined){
            setBookeds(result);
        }else{
            setBookeds([])
        }
    }

    useEffect(()=>{
        fetchBookeds();
    }, [success])

    const handlePrice =  (roomPrice, checkIn, checkOut) => {
        const checkInDate = fixDate(checkIn);
        const checkOutDate = fixDate(checkOut);
        const NumberOfDays = checkOutDate.diff(checkInDate, 'days');
        return NumberOfDays * roomPrice;
    }
    
    const handleCancelBooked = (id) => {
        cancelBooked(id).then((data)=>{
            setSuccess(data);
        }).catch((err) => {
            setError(err);
        })
    }

    setTimeout(()=>{
        setSuccess("");
        setError("");
    }, 3000)

    return (  
        <main>
            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <div className="Container row m-1 bg-light shadow p-2">
                {bookeds && bookeds.length > 0 && bookeds.map((booked, i)=>(
                    <div className="col col-lg-4 col-md-12 mb-2" key={i}>
                        <div className="shadow border rounded bg-white">
                            <h5 className="text-center mt-2">My booked {i+1}</h5>
                            <p className='text-center fw-light fst-italic m-0'>You can check in to the room after 2:00 PM.</p>

                            <ul className="confirm-infor-hotel font-text-hotel">
                                <li>Id: {booked.bookingConfirmCode}</li>
                                <li>FullName: {booked.userName}</li>
                                <li>Email: {booked.userEmail}</li>
                                <li>Amount: {booked.userAmount}</li>
                                <li>Check in: {fixDate(booked.checkIn).format('DD/MM/YYYY')}</li>
                                <li>Check out: {fixDate(booked.checkOut).format('DD/MM/YYYY')}</li>
                                <li>Total: {handlePrice(booked.room.roomPrice, booked.checkIn, booked.checkOut)}</li>
                            </ul>
                            <div className="d-flex justify-content-end mb-2">
                                <Link to={`/booked/room/${booked.room.id}`}>
                                    <button className="btn-hotel me-2 p-2">Show room</button>
                                </Link>
                                <button onClick={()=>handleCancelBooked(booked.id)} className="btn-hotel-border me-2 p-1">Cancel</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Booked;