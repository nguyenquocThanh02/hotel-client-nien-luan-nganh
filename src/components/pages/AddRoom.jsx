import { useState } from "react";
import MessageAlert from "../component/MessageAlert";
import TypeRoomForm from "../component/TypeRoomForm";
import AdminHeader from "../layout/AdminHeader";
import Navigate from "../layout/Navigate";
import { addRoom } from "../service/AxiosFunction";


function AddRoom() {
    const initialRoom = {
        roomImage: null,
        roomType: "",
        roomPrice: "",
        roomDetails: ""
    }

    const [newRoom, setNewRoom] = useState(initialRoom);
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
                value = ""
            }
        }
        setNewRoom({...newRoom, [name]: value})
    }

    const handleImageChange = (e) => {
        const imageSelect = e.target.files[0];
        setNewRoom({...newRoom, roomImage: imageSelect})
        setLinkImage(URL.createObjectURL(imageSelect))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const result = await addRoom(newRoom.roomImage, newRoom.roomType, newRoom.roomPrice, newRoom.roomDetails);
            if(result !== undefined){
                setNewRoom(initialRoom);
                setLinkImage("");
                setSuccess("Adding a new room successfully")
                setError("")
            } else {
                setError("Error creating a new room")
            }
        } catch(error){
            setError(error.message)
        }
    }

    setTimeout(() => {
        setSuccess("")
        setError("")
    }, 5000)

    return (  
        <main>
            <AdminHeader/>
            <Navigate path='home/admin/add-room'/>

            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <form onSubmit={handleSubmit} className="form-hotel border-1 border p-2 rounded-2">
                <h5 className="text-center text-color">New room</h5>
                
                <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">Room Type</label>
                    <div>
                        <TypeRoomForm handleInputChange={handleInputChange} newRoom={newRoom}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="roomPrice" className="form-label">Price per night</label>
                    <input required value={newRoom?.roomPrice} onChange={handleInputChange} type="number" className="form-control" name="roomPrice" placeholder="100$ ..."/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roomDetails" className="form-label">Room Details</label>
                    <textarea value={newRoom?.roomDetails} onChange={handleInputChange} className="form-control" name="roomDetails" rows="2" placeholder="Enter room detail..."></textarea>
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
                <button type="submit" className="btn-hotel p-2 w-100">Add new room</button>
            </form>
            
        </main>
    );
}

export default AddRoom;