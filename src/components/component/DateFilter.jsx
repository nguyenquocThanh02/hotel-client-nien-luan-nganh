import {useState} from 'react'
import moment from 'moment';
import { fixDate } from '../service/functionCommon';

function DateFilter({data, setState}){
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(name == "startDate"){
            setStartDate(value);
        }else{
            setEndDate(value);
        }
    }

    const handleFilterByDate = () => {
        let filterData;

        console.log(data[1]);
        if(data[0].timePrintBill != null){
            // For filter bill by time print bill
            filterData = data.filter((receipt) => {
                const receiptDate = fixDate(receipt?.timePrintBill).format("YYYY-MM-DD");
                return receiptDate >= startDate && receiptDate <= endDate;
            });
        }else if(data[0]?.booked?.checkOut != null){
            // For filter bill un complete by checkOut
            filterData = data.filter((receipt) => {
                const receiptDate = fixDate(receipt?.booked?.checkOut).format("YYYY-MM-DD");
                return receiptDate >= startDate && receiptDate <= endDate;
            });
        }else if(data[0]?.checkIn != null){
            // For filter Booked by checkIn
            filterData = data.filter((receipt) => {
                const receiptDate = fixDate(receipt?.checkIn).format("YYYY-MM-DD");
                return receiptDate >= startDate && receiptDate <= endDate;
            });
        }else{
            // For filter Room availability
            filterData = data.filter((room) => {
                const shouldKeepRoom = !room.bookeds.some((booked) => {
                    const dateCheckIn = fixDate(booked.checkIn).format("YYYY-MM-DD");
                    const dateCheckOut = fixDate(booked.checkOut).format("YYYY-MM-DD");
                    return startDate <= dateCheckIn && endDate > dateCheckIn ||
                           endDate >= dateCheckOut && startDate < dateCheckOut;
                });
                return shouldKeepRoom;
            })
        }

        setState(filterData);
    }



    return(
        <div className="d-flex justify-content-between">
            <div className="w-50 me-2">
                <div className="input-group">
                    <div className="input-group-text">From</div>
                    <input required  value={startDate} onChange={handleInputChange} type="date" className="form-control" name="startDate"/>
                </div>
            </div>
            <div className="w-50 me-2">
                <div className="input-group">
                    <div className="input-group-text">to</div>
                    <input required value={endDate} onChange={handleInputChange}  type="date" className="form-control" name="endDate"/>
                </div>
            </div>
            <button className='btn-hotel-border' onClick={handleFilterByDate}>Filter</button>
        </div>
    )
}

export default DateFilter;