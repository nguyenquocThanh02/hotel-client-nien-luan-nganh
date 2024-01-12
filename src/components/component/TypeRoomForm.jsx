import { useEffect } from "react";
import { useState } from "react";
import { getRoomTypes } from "../service/AxiosFunction";

function TypeRoomForm({handleInputChange, newRoom}) {
    const [roomTypes, setRoomTypes] = useState([]);
    const [newType, setNewType] = useState("");
    const [showNewType, setShowNewType] = useState(false);

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, [])

    const handleAddNewType = () => {
        if(newType !== ""){
            setRoomTypes([...roomTypes, newType])
            setNewType("")
            setShowNewType(false)
        }
    }

    return (  
        <>
          {roomTypes.length > 0 && (
            <select name="roomType" className="form-select"
                onChange={(e) => {
                    if(e.target.value === "New type"){
                        setShowNewType(true);
                        
                    }
                    else{
                        setShowNewType(false);
                        handleInputChange(e); 
                    } 
                }}
                value={newRoom?.roomType}
            >
                <option value={"New type"} className='bg-light'>New type ...</option>
                {roomTypes.map((type, i)=>(
                    <option key={i} value={type}>{type}</option>
                ))}
            </select>
          )}  
          {showNewType && (
            <div className="mt-3">
                <div className="input-group">
                    <input type="text" 
                        className="form-control"
                        placeholder="Enter new type"
                        value={newType}
                        onChange={(e) => {
                            setNewType(e.target.value);
                        }}
                    />
                    <button className="btn-hotel" type="submit" onClick={handleAddNewType}>Adding</button>
                </div>
            </div>
          )}
        </>
    );
}

export default TypeRoomForm;