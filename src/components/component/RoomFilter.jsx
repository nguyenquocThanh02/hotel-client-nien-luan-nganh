
function RoomFilter({rooms, setFilterRooms}){
    const [filterType, setFilterType] = useState("");

    const handleSelectChange = (e) => {
        const selectedType = e.target.value
        setFilterType(selectedType)
        const filterRoom = rooms.filter((room) => 
            room?.roomType.toLowerCase().include(selectedType.toLowerCase())
        )
        setFilterRooms(filterRoom)
    }

    const clearFilter = () => {
        setFilterType("")
        setFilterRooms(rooms)
    }

    const roomTypes = ["", ...new Set(rooms.map((room) => room.roomType))]
    return(
        <div className="input-group mb-3">
            <span className="input-group-text" id="type-filter">
                Filter by type
            </span>
            <select className="form-select" aria-label="type filter" value={filterType} onChange={handleSelectChange}>
                {roomTypes.map((type, i) => (
                    <option key={i} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button className="btn-hotel btn-sm" type="type" onClick={clearFilter}>
                Clear all filter
            </button>
        </div>
    )
}

export default RoomFilter;