import moment from 'moment'

function FormBooking({booking, setBooking, setError}) {

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let lag = 0;
        if(name === 'checkOut'){
            if(moment(value).isSameOrBefore(moment())){
                alert("Check out day must be after today");
                lag = 1;
            }
        }
        if(name === 'checkIn'){
            if(moment(value).isBefore(moment())){
                alert("Check in day must be after or same today");
                lag = 1;
            }
        }
        if(name === 'userAmount'){
            if(value < 1){
                alert("Number of people must be greater than 0");
                lag = 1;
            }
        }
        if(lag === 0){
            setBooking({...booking, [name]: value});
        }
    }

    return (  
        <form  className="border-1 border p-2 bg-white">
            <h5 className="text-center text-color">Enter your information</h5>
            
            <div className="mb-3">
                <label htmlFor="userName" className="form-label">Full name: </label>
                <input required  value={booking?.userName} onChange={handleInputChange} type="text" className="form-control" name="userName"/>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Email: </label>
                <input required value={booking?.userEmail} onChange={handleInputChange}  type="email" className="form-control" name="userEmail"/>
            </div>
            <div className="mb-3">
                <label htmlFor="userAmount" className="form-label">Amount people: </label>
                <input required value={booking?.userAmount} onChange={handleInputChange}  type="number" className="form-control" name="userAmount"/>
            </div>
            
            <div className="mb-3">
                <div className="d-flex justify-content-between">
                    <div className="w-48">
                        <label htmlFor="checkIn" className="form-label">Check In: </label>
                        <input required  value={booking?.checkIn} onChange={handleInputChange} type="date" className="form-control" name="checkIn"/>
                    </div>
                    <div className="w-48">
                        <label htmlFor="checkOut" className="form-label">Check Out: </label>
                        <input required value={booking?.checkOut} onChange={handleInputChange}  type="date" className="form-control" name="checkOut"/>
                    </div>
                </div>
            </div>
            
        </form>
    );
}

export default FormBooking;