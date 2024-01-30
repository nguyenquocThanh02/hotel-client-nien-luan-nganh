

function ClearFilter({data, setState}) {

    const handleClearFilter = () => {
        setState(data);
    }
    return (  
        <div>
            <button className="btn-hotel-border p-2 w-100" onClick={handleClearFilter}>Clear Filter</button>
        </div>
    );
}

export default ClearFilter;