
function MessageAlert({success = null, error = null}) {
    return (  
        <>
            {success && (
                <div className="alert alert-success " role="alert">
                    {success} !
                </div>
            )}
            {error && (
                <div className="alert alert-error" role="alert">
                    {error} !
                </div>
            )}
            
        </>
    );
}

export default MessageAlert;