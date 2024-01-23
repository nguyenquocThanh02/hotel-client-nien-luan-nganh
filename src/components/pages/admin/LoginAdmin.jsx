import { useState } from "react";
import {loginAdmin} from "../../service/AxiosFunction";
import MessageAlert from '../../component/MessageAlert';
import { Link, useNavigate } from "react-router-dom";
function LoginAdmin() {

    const initial = {
        adminEmail: "",
        adminPassword: ""
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
        const result = await loginAdmin(infor);
        if(result.status == 200){
            setError("")
            setSuccess("Welcome you come back with role admin")
            localStorage.setItem('email', result.data.adminEmail);
            localStorage.setItem('name', result.data.adminName);
            localStorage.setItem('role', result.data.adminRole);
            setTimeout(()=>{
                navigate("/admin");
            },1000)
        }else{
            setError(result.data.message);
        }
    }
    return (  
        <main>
            {success && (<MessageAlert success={success}/>)}
            {error && (<MessageAlert error={error}/>)}

            <form onSubmit={handleSubmit} className="form-hotel border-1 border p-2 rounded-2">
                <h5 className="text-center text-color">Login Role Admin</h5>
                
                <div className="mb-3">
                    <label htmlFor="adminEmail" className="form-label">Email: </label>
                    <input required value={infor?.adminEmail} onChange={handleInputChange} type="email" className="form-control" name="adminEmail" placeholder="abc@gmail.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="adminPassword" className="form-label">Password: </label>
                    <input required value={infor?.adminPassword} onChange={handleInputChange} type="password" className="form-control" name="adminPassword" placeholder="******"/>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={"/login"}>Are you user?</Link>
                    <button type="submit" className="btn-hotel p-2">Login</button>
                </div>
            </form>
        </main>
    );
}

export default LoginAdmin;