import { useState, useEffect } from "react";
import { getHistoryActions } from "../../service/AxiosFunction";
import {fixDate} from "../../service/functionCommon";


function HistoryAction() {
    
    const theUserEmail = localStorage.getItem("email");

    const [history, setHistory] = useState([]);

    const fetchHistoryActions = async () => {
        const result = await getHistoryActions(theUserEmail);
        if(result.status === undefined){
            setHistory(result);
        }else{
            setHistory([])
        }
    }

    useEffect(()=>{
        fetchHistoryActions();
    }, [])
    
    return (  
        <main>
            <div className="w-75 mx-auto mt-2 shadow">
                <table className="table table-borderless p-4">
                    <thead>
                        <tr>
                            <td colSpan={4} className="border-bottom">Action's history of user</td>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Action</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {history?.map((e, index) => (
                            <tr key={index}>
                                <td><input className="form-check-input m-lg-2" type="checkbox" /></td>
                                <td>You used to <u>{e?.action}</u></td>
                                <td>{fixDate(e?.time).format("YYYY-MM-DD HH:mm:ss")}</td>
                                <td><i className="fa-solid fa-ellipsis-vertical"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default HistoryAction;