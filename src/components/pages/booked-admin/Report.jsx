import {useState} from 'react';
import { getReport } from '../../service/AxiosFunction';

function Report() {

    const [timeReport, setTimeReport] = useState("");
    const [report, setReport] = useState({
        revenue: "",
        countBill: ""
    })

    const handleReport = () => {
        getReport(timeReport).then((data)=>{
            setReport(data);
        })
    }

    console.log(report);

    return (  
        <main className="mt-4">
            <div className="d-flex justify-content-center align-items-center mb-2">
                <div className="input-group w-50 me-2">
                    <span className="input-group-text" id="basic-addon3">Choose month & year</span>
                    <input type="month" value={timeReport} onChange={(e)=>(setTimeReport(e.target.value))} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>
                <button onClick={handleReport} className="btn-hotel-border">Analysis</button>
            </div>
            <p className="text-center fst-italic fw-light">Monthly Revenue Report for the Hotel</p>
            {report.revenue && (
                <div className='d-flex justify-content-center'>
                    <p className='me-2'>Revenue: ${report.revenue}</p>
                    <p>Number bill: {report.countBill}</p>
                </div>
            )}
        </main>
    );
}

export default Report;