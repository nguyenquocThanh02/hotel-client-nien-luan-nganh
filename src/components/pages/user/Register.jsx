import { useState } from "react";
import {register} from "../../service/AxiosFunction";
import MessageAlert from '../../component/MessageAlert';
import { Link, useNavigate } from "react-router-dom";
function Register() {

    const initial = {
        userName: "",
        userEmail: "",
        userPassword: "",
        userConfirmPassword: ""
    }
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [infor, setInfor] = useState(initial);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        
        const name = e.target.name;
        const value = e.target.value
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!emailRegex.test(value)) {
                setError("Form email incorrect");
            }
        }
        else {        
            setInfor({...infor, [name]: value});
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await register(infor);
        if(result.status == 200){
            setSuccess("Congrarulation! resgister successfully")
            setError("");
            setTimeout(()=>{
                navigate("/login");
            },1000)
        }else{
            setError(result.data.message);
        }
    }
    return (  
        <main>
            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <form onSubmit={handleSubmit} className="form-hotel border-1 border p-2 rounded-2 mt-3">
                <h5 className="text-center text-color">Register</h5>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Name: </label>
                    <input required value={infor?.userName} onChange={handleInputChange} type="text" className="form-control" name="userName" placeholder="abc"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email: </label>
                    <input required value={infor?.userEmail} onChange={handleInputChange} type="email" className="form-control" name="userEmail" placeholder="abc@gmail.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password: </label>
                    <input required value={infor?.userPassword} onChange={handleInputChange} type="password" className="form-control" name="userPassword" placeholder="******"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userConfirmPassword" className="form-label">Confirm password: </label>
                    <input required value={infor?.userConfirmPassword} onChange={handleInputChange} type="password" className="form-control" name="userConfirmPassword" placeholder="******"/>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={"/login/admin"}>Are you admin?</Link>
                    <div className="d-flex">
                        <Link to={"/login"}>
                            <button className="btn-hotel-border p-2 me-2">Login</button>
                        </Link>
                        <button type="submit" className={`btn-hotel p-2`}>Register</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Register;