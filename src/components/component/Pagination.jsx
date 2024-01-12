
function Pagination({currentPage, totalPages, onPageChange}) {
    const arrayNumberPage = Array.from({ length: totalPages }, (_, i) => i + 1)
    const handleNext = () => {
        if(currentPage === totalPages){
            onPageChange(1)
        }else{
            onPageChange(currentPage + 1)
        }
    }
    const handlePrevious = () => {
        if(currentPage === 1){
            onPageChange(totalPages)
        }else{
            onPageChange(currentPage - 1)
        }
    }
    return (  
        <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
                <li className="page-item">
                <button onClick={handlePrevious} className="page-link" aria-label="Previous">
                    <span aria-hidden="true" className="item-primary-color">&laquo;</span>
                </button>
                </li>
                {arrayNumberPage.map((number, i)=>(
                    <li className={`page-item ${currentPage === number ? "active" : ""}`} key={i}>
                        <button className="page-link text-color" onClick={()=>onPageChange(number)}>{number}</button>
                    </li>
                ))}
                <li className="page-item">
                <button onClick={handleNext} className="page-link" aria-label="Next">
                    <span aria-hidden="true" className="item-primary-color">&raquo;</span>
                </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;