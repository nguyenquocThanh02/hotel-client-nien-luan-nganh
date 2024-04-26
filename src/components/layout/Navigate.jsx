import React from 'react';

function Navigate({path}) {
    return (  
        <>
            <span className='badge text-bg-light p-2 mt-1 shadow-sm'>{path}</span>
        </>
    );
}

export default Navigate;
