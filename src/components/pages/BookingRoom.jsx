import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import MessageAlert from '../component/MessageAlert';
import { createBooking, getRoomById } from '../service/AxiosFunction';
import ConfirmBooking from './booking/ConfirmBooking';
import FormBooking from './booking/FormBooking';
import moment from 'moment';
import RoomDetail from './room/RoomDetail';
import RoomCarousel from '../component/RoomCarousel';

function BookingRoom() {

    const theUserEmail = localStorage.getItem('email');

    const initialRoom = {
        roomType: "",
        roomPrice: "",
        roomDetails: "",
        roomImage: null
    }

    const initialBooking = {
        userName: localStorage.getItem("name") ?? "",
        userEmail: localStorage.getItem("email") ?? "",
        userAmount: 1,
        checkIn: moment().format('YYYY-MM-DD'),
        checkOut: moment().add(1, 'days').format("YYYY-MM-DD")
    }

    const {roomId} = useParams();
    const [room, setRoom] = useState(initialRoom);
    const [booking, setBooking] = useState(initialBooking);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getRoomById(roomId).then((data)=>{
            setRoom(data);
        }).catch((error)=>console.error(error));
    }, [roomId]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsLoading(true);
        const result = await createBooking(roomId, theUserEmail, booking);
        if(result.status === undefined){
            setSuccess(result);
            setError("");
            setIsLoading(false);
        }else{
            setIsLoading(false);
            setError(result.data.message);
        }
    }

    setTimeout(()=>{
        setSuccess("")
        setError("")
    }, 5000)

    return (  
        <main>
            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <div className="container bg-light shadow p-2 mt-2">
                <div className="row">
                    <div className="col col-lg-4 col-md-12">
                       <RoomDetail room={room}/>
                    </div>
                    <div className="col col-lg-4 col-md-12">
                        <FormBooking booking={booking} setBooking={setBooking} setError={setError}/>
                    </div>
                    <div className="col col-lg-4 col-md-12">
                        <ConfirmBooking booking={booking} roomPrice={room?.roomPrice} handleSubmit={handleSubmit} isLoading={isLoading}/>
                    </div>
                </div>
            </div>

            <RoomCarousel/>
        </main>
    );
}

export default BookingRoom;