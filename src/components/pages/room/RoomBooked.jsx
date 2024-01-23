import { useEffect, useState } from "react";
import { getRoomById } from "../../service/AxiosFunction";
import RoomDetail from "./RoomDetail";
import {useParams} from 'react-router-dom'

function RoomBooked() {

    const {roomId} = useParams();
    const [room, setRoom] = useState({
        roomType: "",
        roomPrice: "",
        roomDetails: "",
        roomImage: null
    });

    useEffect(()=>{
        getRoomById(roomId).then((data)=>{
            setRoom(data);
        })
    })
    return (  
        <main className="w-50 m-auto">
            <RoomDetail room={room}/>
        </main>
    );
}

export default RoomBooked;