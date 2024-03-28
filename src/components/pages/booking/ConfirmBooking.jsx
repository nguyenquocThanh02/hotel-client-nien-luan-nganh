import moment from "moment";

function ConfirmBooking({booking, roomPrice, handleSubmit, isLoading}) {
    const checkInDate = moment(booking.checkIn);
    const checkOutDate = moment(booking.checkOut);

    const handlePrice = () => {        
        const NumberOfDays = checkOutDate.diff(checkInDate, 'days');
        return NumberOfDays * roomPrice > 0 ? NumberOfDays * roomPrice : '0';
    }

    return (  
        <div className="confirm-form-hotel bg-white">
            <h5 className="text-center mt-2 text-color">Confirm booking room</h5>
            <ul className="confirm-infor-hotel">
                <li>FullName: {booking.userName}</li>
                <li>Email: {booking.userEmail}</li>
                <li>Amount: {booking.userAmount}</li>
                <li>Check in: {checkInDate.format('DD/MM/YYYY')}</li>
                <li>Check out: {checkOutDate.format('DD/MM/YYYY')}</li>
                <li>Total: {handlePrice()}</li>
                {isLoading ? (
                    
                    <button className="btn-hotel-border w-100 p-0 mt-2" type="button" disabled>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Booking...
                    </button>       
                    ) : (<button onClick={handleSubmit} className="w-100 btn-hotel-border p-0 mt-2">Confirm</button>)
                }
            </ul>
        </div>
    );
}

export default ConfirmBooking;