import { useState } from "react";
import {login} from "../../service/AxiosFunction";
import MessageAlert from '../../component/MessageAlert';
import { Link, useNavigate } from "react-router-dom";
function Login() {

    const initial = {
        userEmail: "",
        userPassword: ""
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
        }else{
            setInfor({...infor, [name]: value});

        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await login(infor);
        if(result.status == 200){
            setError("")
            setSuccess("Welcome you come back!")
            localStorage.setItem('email', result.data.userEmail);
            localStorage.setItem('name', result.data.userName);
            setTimeout(()=>{
                navigate("/");
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
                <h5 className="text-center text-color">Login</h5>
                
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email: </label>
                    <input required value={infor?.userEmail} onChange={handleInputChange} type="email" className="form-control" name="userEmail" placeholder="abc@gmail.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password: </label>
                    <input required value={infor?.userPassword} onChange={handleInputChange} type="password" className="form-control" name="userPassword" placeholder="******"/>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={"/login/admin"}>Are you admin?</Link>
                    <div className="d-flex">
                        <Link to={"/register"}>
                            <button className="btn-hotel-border p-2 me-2">Register</button>
                        </Link>
                        <button type="submit" className="btn-hotel p-2">Login</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Login;