import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo_my_hotel.png';
function Header() {
    return (  
        <header className="sticky-top p-0">
            <nav className="navbar navbar-expand-lg navbar-light margin-rl-8">
                <div className="container-fluid bg-white border-header">
                    <Link to={"/"} className="navbar-brand hover-press">
                        <img src={logo} alt="logo" className='logo'/>
                        <strong className="text-color">MyHotel</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle fw-bolder" to={"/account"} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item"></a></li>
                                    <li><a className="dropdown-item">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item">Something </a></li>
                                </ul>
                            </li>
                            <li className="nav-item ">
                                <Link to={"/rooms"} className="nav-link active fw-bolder" aria-current="page">Rooms</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={"/bookings"} className="nav-link fw-bolder" >Bookings</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={"/help"} className="nav-link fw-bolder" >Help</Link>
                            </li>
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