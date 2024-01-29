

function ClearFilter({data, setState}) {

    const handleClearFilter = () => {
        setState(data);
    }
    return (  
        <div>
            <button className="btn-hotel-border p-2" onClick={handleClearFilter}>Clear Filter</button>
        </div>
    );
}

export default ClearFilter;