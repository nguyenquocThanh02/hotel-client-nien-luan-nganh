import moment from "moment";
import { useEffect, useState } from "react";
import { cancelBooked, getBookedsOfUser, getRoomById } from "../service/AxiosFunction";
import {Link} from 'react-router-dom'
import MessageAlert from "../component/MessageAlert";

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
        const checkInDate = moment(checkIn);
        const checkOutDate = moment(checkOut);
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

            <div className="Container row m-2">
                {bookeds && bookeds.length > 0 && bookeds.map((booked, i)=>(
                    <div className="col col-lg-4 col-md-12 mb-4" key={i}>
                        <div className="confirm-form-hotel">
                            <h5 className="text-center mt-2 text-color">My booked {i+1}</h5>
                            <ul className="confirm-infor-hotel">
                                <li>FullName: {booked.userName}</li>
                                <li>Email: {booked.userEmail}</li>
                                <li>Amount: {booked.userAmount}</li>
                                <li>Check in: {moment(booked.checkIn).format('DD/MM/YYYY')}</li>
                                <li>Check out: {moment(booked.checkOut).format('DD/MM/YYYY')}</li>
                                <li>Total: {handlePrice(booked.room.roomPrice, booked.checkIn, booked.checkOut)}</li>
                            </ul>
                            <div className="d-flex justify-content-end mb-2">
                                <Link to={`/booked/room/${booked.room.id}`}>
                                    <button className="btn-hotel me-2 p-1">Show room</button>
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