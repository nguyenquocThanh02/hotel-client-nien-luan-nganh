import { useEffect, useState } from "react";
// import RoomFilter from "../component/RoomFilter";
import AdminHeader from "../../layout/AdminHeader";
import { getAllReceipts, completeBill } from "../../service/AxiosFunction";
import Pagination from "../../component/Pagination";
import { Link } from "react-router-dom";
import MessageAlert from "../../component/MessageAlert";


function ReceiptAdmin() {

    const [receipts, setReceipts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterReceipt, setFilterReceipt] = useState([{id: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [receiptsPerPage] = useState(6);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")


    useEffect(()=>{
        setIsLoading(true);

        getAllReceipts().then((data)=>{
            setFilterReceipt(data);
            setReceipts(data);
            setIsLoading(false);
        }).catch((error)=>{
            setIsLoading(false);
            setFilterReceipt([]);
            setReceipts([])
            return(
                <main>Error : {error.message}</main>
            )
        })
    }, [success])

    if(isLoading){
        return (
            <main>
                <div className='d-flex justify-content-center mt-4'>
                    <div className="spinner-border me-2 item-primary-color" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className='item-center'>Loading receipts..., please wait</div>
                </div>
            </main>
        )
    }

    const totalPages = Math.ceil(filterReceipt.length / receiptsPerPage);

    const onPageChange = (number) => {
        setCurrentPage(number);
    }

    const renderRooms = () => {
        const startPoint = (currentPage - 1) * receiptsPerPage;
        const endPoint = startPoint + receiptsPerPage;
        const receptsRender = filterReceipt.slice(startPoint, endPoint)
        return receptsRender && receptsRender.length>0 && receptsRender.map((receipt, i)=>(
            <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{receipt?.totalPrice}</td>
                <td>{receipt?.booked?.bookingConfirmCode}</td>
                <td>{receipt?.booked?.userEmail}</td>
                <td>{receipt?.admin?.adminName}</td>
                <td>{!receipt?.paid ? 'Wait payment' : 'Complete'}</td>
                <td>
                    <button 
                     onClick={() => handlePrintBill(receipt?.id)}
                     className="btn-hotel-border p-1"
                    >
                        Print Bill
                    </button>
                </td>
            </tr>
        )) 
    }

    const handlePrintBill = async (receiptId) => {
        const result = await completeBill(receiptId);
        console.log(result)
        if(result.status == null){
            setSuccess("Complete bill successfully");
        }else{
            setError("Can not complete bill");
        }
    }

    setTimeout(()=>{
        setSuccess("");
        setError("");
    }, 2000)

    return (  
        <main>
            <AdminHeader/>
            {success && (
                <MessageAlert success={success}/>
            )}
            {error && (
                <MessageAlert error={error}/>
            )}
            <div className="d-flex flex-column align-items-center">
                <h5 className="mt-3 mb-3 text-color">Manage Receipts</h5>
                <div className="d-flex justify-content-between w-100 align-items-center p-1 bg-light mb-3">
                    {/* <div className="">
                        <RoomFilter rooms={rooms} setFilterRooms={setFilterRooms}/>
                    </div> */}
                    {/* <div className="">
                        <Link to={"/add/room"}>
                            <button type="button" className="btn-hotel-border">Add New Room</button>
                        </Link>
                    </div> */}
                    <div className="">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Booked Id</th>
                            <th scope="col">User</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRooms()}                  
                    </tbody>
                </table>
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </main>
    );
}

export default ReceiptAdmin;