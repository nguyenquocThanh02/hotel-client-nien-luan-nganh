import {useState, useEffect} from 'react'
import { getAllRooms } from '../service/AxiosFunction';
import RoomFilter  from '../component/RoomFilter';
import Pagination from '../component/Pagination';
import RoomCard from '../component/RoomCard'
import DateFilter from '../component/DateFilter';
import ClearFilter from '../component/ClearFilter';
function Room() {

    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(4);
    const [filterRooms, setFilterRooms] = useState([{id: ""}])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setFilterRooms(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            })
    }, [])

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
    if(error){
        return (
            <main>
                <div className='text-danger item-center mt-4'>Error: {error}</div>
            </main>
        )
    }

    const onPageChange = (number) => {
        setCurrentPage(number);
    }

    const totalPages = Math.ceil(filterRooms.length / roomsPerPage)
    
    const renderRooms = () => {
        const startPoint = (currentPage - 1) * roomsPerPage;
        const endPoint = startPoint + roomsPerPage;
        return filterRooms.slice(startPoint, endPoint).map((room, i)=> <RoomCard key={i} room={room}/>)
    }

    return (  
        <main className='container mt-4'>
            <div className='row'>
                <div className='col col-6 mb-2'>
                    <DateFilter data={rooms} setState={setFilterRooms}/>
                </div>
                <div className='col col-4 mb-2'>
                    <RoomFilter rooms={rooms} setFilterRooms={setFilterRooms}/>
                </div>
                <div className='col col-2 mb-2'>
                    <ClearFilter data={rooms} setState={setFilterRooms}/>
                </div>
            </div>
            <div className='row'>
                {renderRooms()}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </main>
    );
}

export default Room;