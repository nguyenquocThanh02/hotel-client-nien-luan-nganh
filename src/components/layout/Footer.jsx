import '@fortawesome/fontawesome-free/css/all.css';
import logo from '../../assets/images/logo_my_hotel.png'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 footer mt-lg-4">
      <div className="container">
        <div className="row">
        
          <div className="pt-3 col-md-4 col-sm-12 d-flex flex-column align-items-center">
            <h5>Informations</h5>
            <ul>
              <li>Phone: 0123456789</li>
              <li>Email: myhotel@gmail.com</li>
              <li>Hotel Name: my_hotel</li>
            </ul>
            <div>
              <img src={logo} alt="" className="logo"/>
              MyHotel
            </div>
          </div>
          <div className="pt-3 col-md-4 col-sm-12 d-flex flex-column align-items-center">
            <h5>Follow Us</h5>
            <ul>
              <li>
                Facebook 
                <a href="https://www.facebook.com" className="me-3 text-light m-2">
                  <i className="fa-brands fa-facebook icon-md"></i>
                </a>
              </li>
              <li>
                Twitter
                <a href="https://www.twitter.com" className="me-3 text-light m-2">
                  <i className="fa-brands fa-square-twitter icon-md"></i>
                </a>
              </li>
              <li>
                Instagram
                <a href="https://www.instagram.com" className="me-3 text-light m-2">
                  <i className="fa-brands fa-square-instagram icon-md"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-3 col-md-4 col-sm-12 d-flex flex-column align-items-center">
            <h5>Contact Us</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email...'/>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea cols={2} type="text" className="form-control" id="message" aria-describedby="emailHelp" placeholder='Enter your email...'/>
              </div>
          </form>
          </div>
         
        </div>
        <hr className="text-light" />
        <div className="text-center">
          <p>&copy; 2023 MyHotel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
