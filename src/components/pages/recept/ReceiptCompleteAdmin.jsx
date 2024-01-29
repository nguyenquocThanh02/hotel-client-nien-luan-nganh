import { useEffect, useState } from "react";
import AdminHeader from "../../layout/AdminHeader";
import { getAllReceipts, completeBill, getAllReceiptsPayment, unCompleteBill } from "../../service/AxiosFunction";
import Pagination from "../../component/Pagination";
import { Link } from "react-router-dom";
import MessageAlert from "../../component/MessageAlert";
import ClearFilter from "../../component/ClearFilter";
import DateFilter from "../../component/DateFilter";
import {fixDate} from "../../../components/service/functionCommon";
import moment from "moment";
function ReceiptCompleteAdmin() {

    const [receipts, setReceipts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterReceipt, setFilterReceipt] = useState([{id: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [receiptsPerPage] = useState(6);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")


    useEffect(()=>{
        setIsLoading(true);

        getAllReceiptsPayment().then((data)=>{
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
        const receiptsRender = filterReceipt.slice(startPoint, endPoint)
        return receiptsRender && receiptsRender.length>0 && receiptsRender.map((receipt, i)=>(
            <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{receipt?.totalPrice}</td>
                <td>{receipt?.booked?.bookingConfirmCode}</td>
                <td>{receipt?.booked?.userEmail}</td>
                <td>{receipt?.admin?.adminName}</td>
                <td>{fixDate(receipt?.timePrintBill).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>
                    {fixDate(receipt?.timePrintBill).format("YYYY-MM-DD") == 
                    moment().format("YYYY-MM-DD") &&
                    <button 
                     onClick={() => handleUnPrintBill(receipt?.id)}
                     className="btn-hotel-border p-1"
                    >
                        Undo
                    </button>}
                </td>
            </tr>
        )) 
    }

    const handleUnPrintBill = async (receiptId) => {
        const result = await unCompleteBill(receiptId);
        if(result.status == null){
            setSuccess("Un complete bill successfully");
        }else{
            setError("Can not un complete bill");
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
                <h5 className="mt-3 mb-3 text-color">Completed Receipts</h5>
                <div className="d-flex justify-content-between w-100 align-items-center p-1 bg-light mb-3">
                    <DateFilter data={receipts} setState={setFilterReceipt} />
                    <ClearFilter data={receipts} setState={setFilterReceipt}/>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Booked Id</th>
                            <th scope="col">User</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Date Payment</th>
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

export default ReceiptCompleteAdmin;