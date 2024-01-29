import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_my_hotel.png';
import {useState, useEffect} from 'react'

function Header() {

    const location = useLocation();
    const navigate = useNavigate();
    const [link, setLink] = useState(location.pathname);
    const [userName, setUserName] = useState("");
    const [adminRole, setAdminRole] = useState("");

    useEffect(()=>{
        if(localStorage.getItem('name')){
            setUserName(localStorage.getItem('name'))
            setAdminRole(localStorage.getItem('role'))
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        if(localStorage.getItem('role')){
            localStorage.removeItem('role');
        }
        setUserName("");
        setAdminRole("");
        // navigate("/");
    }

    return (  
        <header className="sticky-top p-0">
            <nav className="navbar navbar-expand-lg navbar-light margin-rl-8">
                <div className="container-fluid bg-white border-header shadow-sm">
                    <Link to={"/"} className="navbar-brand hover-press" onClick={()=>setLink('/')}>
                        <img src={logo} alt="logo" className='logo'/>
                        <strong className="text-color">MyHotel</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle fw-bolder" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userName ? (userName) : 'Account'}
                                </Link>
                                <ul className="dropdown-menu" tabIndex={-1} aria-labelledby="navbarDropdown">
                                    <li><Link to={"/login"} className="dropdown-item">Login</Link></li>
                                    <li><Link to={"/register"} className="dropdown-item">Register</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={"/rooms"} 
                                    className={`nav-link fw-bolder ${link == '/rooms' ? 'active' : ''}`} 
                                    aria-current="page" 
                                    onClick={()=>setLink('/rooms')}
                                >
                                    Rooms
                                </Link>
                            </li>
                            {!adminRole && <li className="nav-item">
                                <Link to={"/bookeds"} 
                                    className={`nav-link fw-bolder ${link == '/bookings' ? 'active' : ''}`} 
                                    aria-current="page" 
                                    onClick={()=>setLink('/bookings')}
                                >
                                    Bookeds
                                </Link>
                            </li>}
                            {adminRole && 
                                <li className="nav-item">
                                    <Link to={"/admin/room"} 
                                        className={`nav-link fw-bolder ${link == '/admin' ? 'active' : ''}`} 
                                        aria-current="page" 
                                        onClick={()=>setLink('/admin')}
                                    >
                                        Admin
                                    </Link>
                                </li>
                            }
                        </ul>
                        <form className="d-flex p-2">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn-hotel hover-press" type="submit">Search</button>
                        </form>
                    </div>
                    
                </div>
            </nav>
        </header>
    );
}

export default Header;