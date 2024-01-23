
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageAlert from "../component/MessageAlert";
import AdminHeader from "../layout/AdminHeader";
import Navigate from "../layout/Navigate";
import { getRoomById, updateRoom } from "../service/AxiosFunction";


function EditRoom() {

    const {roomId} = useParams();

    const initialRoom = {
        roomImage: null,
        roomType: "",
        roomPrice: "",
        roomDetails: ""
    }

    const [room, setRoom] = useState(initialRoom);
    const [linkImage, setLinkImage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name === 'roomPrice' ){
            if(!isNaN(value)){
                value = parseInt(value)
            }else{
                value = room?.roomPrice;
            }
        }
        setRoom({...room, [name]: value});
    }

    const handleImageChange = (e) => {
        const imageSelect = e.target.files[0];
        setRoom({...room, roomImage: imageSelect})
        setLinkImage(URL.createObjectURL(imageSelect))
    }

    const fetchRoom = async (id) => {
        try{
            const theRoom = await getRoomById(id);
            setRoom(theRoom);
            setLinkImage('data:image/jpeg;base64,' + theRoom?.roomImage);
            theRoom.roomImage = null;
        }catch(error){
            setError("Can't access to get exit room!!!")
        }
    }

    useEffect(() => {
        fetchRoom(roomId);
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

            const result = await updateRoom(roomId, room);
            if(result === ""){
                fetchRoom(roomId);
                setSuccess("Updating room successfully")
                setError("")
            } else {
                setError("Error update a new room")
            }
        } catch(error){
            setError(error.message);
        }
    }

    setTimeout(() => {
        setSuccess("")
        setError("")
    }, 3000)

    return (  
        <main>
            <AdminHeader/>
            <Navigate/>

            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <form onSubmit={handleSubmit} className="form-hotel border-1 border p-2 rounded-2">
                <h5 className="text-center text-color">Edit room</h5>
                
                <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">Room type</label>
                    <input required value={room?.roomType} onChange={handleInputChange} type="text" className="form-control" name="roomType" />
                </div>
                <div className="mb-3">
                    <label htmlFor="roomPrice" className="form-label">Price per night</label>
                    <input required value={room?.roomPrice} onChange={handleInputChange} type="number" className="form-control" name="roomPrice" placeholder="100$ ..."/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roomDetails" className="form-label">Room Details</label>
                    <textarea value={room?.roomDetails} onChange={handleInputChange} className="form-control" name="roomDetails" rows="2" placeholder="Enter room detail..."></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="roomImage" className="form-label">Room image</label>
                    <input onChange={handleImageChange} className="form-control" type="file" name="roomImage"/>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    {linkImage && (
                        <img src={linkImage} alt="image room" className="room-card-img "/>
                    )}
                </div>
                <button type="submit" className="btn-hotel p-2 w-100">Update the room</button>
            </form>
            
        </main>
    );
}

export default EditRoom;