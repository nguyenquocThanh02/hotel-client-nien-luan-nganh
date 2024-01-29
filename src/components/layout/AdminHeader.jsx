import {Link} from 'react-router-dom'

function AdminHeader() {
    return (  
        <>
            <div className="d-flex justify-content-evenly header-admin align-items-center">
                <div><Link to={"/admin/room"} className="no-underline fw-bolder  text-white">Manage rooms</Link></div>
                <div><Link to={"/admin/booked"} className="no-underline fw-bolder text-white">Manage bookeds</Link></div>
                <div><Link to={"/admin/receipt"} className="no-underline fw-bolder  text-white">Await receipts</Link></div>
                <div><Link to={"/admin/receipt-completed"} className="no-underline fw-bolder  text-white">Completed receipts</Link></div>
            </div>
        </>
    );
}

export default AdminHeader;