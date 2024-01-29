import intro1 from '../../assets/images/intro1.png';
import intro2 from '../../assets/images/intro2.jpg';

function IntroduceHotel() {
    return (  
        <>
            <div className="Container w-75 m-auto">
                <div className="row mb-2">
                    <h2 className='text-center'>My Introduce</h2>
                    <p className='text-center fw-light fst-italic'>We will bring you the best service</p>
                </div>
                <div className="row">
                    <div className="col-md-7 col-sm-12">
                        <img src={intro1} alt="img introduce 1" className='w-100'/>
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <p className='text-introduce p-2'>Discover the epitome of luxury and convenience at MyHotel, where every detail is tailored to
                         exceed your expectations. Your comfort is our priority, and we look forward to welcoming you to
                          a world of indulgence and relaxation.
                        </p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-5 col-sm-12">
                        <p className='text-introduce p-2'>Welcome to MyHotel, where luxury meets comfort in the heart of MyHotel. Our hotel is
                         designed to provide a sophisticated and relaxing retreat for both business and leisure travelers.
                          With modern amenities and impeccable service, MyHotel offers spacious and elegantly appointed rooms,
                           each equipped with the latest technology and thoughtful touches to ensure a memorable stay.
                        </p>
                    </div>
                    <div className="col-md-7 col-sm-12">
                        <img src={intro2} alt="img introduce 2" className='w-100'/>
                    </div>
                </div>
            </div>
            {/* <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <img src={intro1} alt="img introduce 1"/>
                        </td>
                        <td>
                            <p>Welcome to MyHotel, where luxury meets comfort in the heart of MyHotel. Our hotel is
                            designed to provide a sophisticated and relaxing retreat for both business and leisure travelers.
                            With modern amenities and impeccable service, MyHotel offers spacious and elegantly appointed rooms,
                            each equipped with the latest technology and thoughtful touches to ensure a memorable stay.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           
                        </td>
                        <td colSpan={2}>
                            <img src={intro2} alt="img introduce 2"/>
                        </td>
                    </tr>
                </tbody>
            </table> */}
        </>
    );
}

export default IntroduceHotel;