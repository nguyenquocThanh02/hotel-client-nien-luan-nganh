import {useState} from 'react';
import ChartColumn from '../../component/ChartColumn';
import { getReport, getRevenueInYear } from '../../service/AxiosFunction';

function Report() {

    const [timeReport, setTimeReport] = useState("");
    const [report, setReport] = useState({
        revenue: "",
        countBill: ""
    })
    const [selectedYear, setSelectedYear] = useState("");
    const [revenueInYear, setRevenueInYear] = useState({})

    const handleReport = () => {
        getReport(timeReport).then((data)=>{
            setReport(data);
        })
    }

    const handleRevenueInYear = () => {
        getRevenueInYear(selectedYear).then((data)=>{
            setRevenueInYear(data);
        })
    }

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
            <div className="text-center">
                {report.revenue ? (
                    <div className='d-flex justify-content-center'>
                        <p className='me-2'>Revenue: ${report.revenue},</p>
                        <p>Number bill: {report.countBill}</p>
                    </div>
                ) : <div>Don't have booked in this month <i className="fa-solid fa-face-frown text-color icon-md"></i></div>}
            </div>

            {/* Graph */}
            <div className="d-flex justify-content-center align-items-center mb-2 mt-5">
                <div className="input-group w-50 me-2">
                    <span className="input-group-text" id="basic-addon3">Choose year</span>
                    <input type="number" min="2022" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                <button onClick={handleRevenueInYear} className="btn-hotel-border">Views</button>
            </div>
            <p className="text-center fst-italic fw-light">Graph Revenue Report for the Hotel in year</p>
           
            {Object.entries(revenueInYear).length > 0 &&
                <div className='p-2 w-50 m-auto'>
                    <ChartColumn data={revenueInYear}/>
                </div>
            }
           
        </main>
    );
}

export default Report;