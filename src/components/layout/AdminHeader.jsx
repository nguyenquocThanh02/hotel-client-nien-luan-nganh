import {Link} from 'react-router-dom'

function AdminHeader() {
    return (  
        <>
            <div className="d-flex justify-content-evenly header-admin align-items-center">
                <div><Link to={"/admin/room"} className="fw-bolder  text-white">Manage rooms</Link></div>
                <div><Link to={"/admin/booked"} className="fw-bolder text-white">Manage bookeds</Link></div>
                <div><Link to={"/admin/receipt"} className="fw-bolder  text-white">Manage receipts</Link></div>
                <div><Link to={"/rooms"} className="fw-bolder  text-white">Manage users</Link></div>
            </div>
        </>
    );
}

export default AdminHeader;