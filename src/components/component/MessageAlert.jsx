
function MessageAlert({success = null, error = null}) {
    return (  
        <>
            {success && (
                <div className="alert alert-success " role="alert">
                    {success} !
                </div>
            )}
            {error && (
                <div className="floating-alert alert alert-danger">
                    <strong>Error:</strong> {error}!
                </div>
            )}
            
        </>
    );
}

export default MessageAlert;