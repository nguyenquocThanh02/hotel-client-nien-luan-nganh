import {Col, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function RoomCard({room}) {
    
    return (  
        <Col key={room?.id} className="mb-3" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center hover-press">
                    <div className="flex-shrink-0 mr-3" >
                        <Link to={`/booking/${room?.id}`}>
                            <Card.Img 
                                variant="top"
                                src={`data:image/png;base64, ${room?.roomImage}`}
                                alt="Room Image"
                                className="w-100 rounded-3 shadow"
								style={{ maxWidth: "260px"}}
                            >
                            </Card.Img>
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="text-color">
                            {room?.roomType}
                        </Card.Title>
                        <Card.Title className="text-color">
                            {room?.roomPrice} $/night
                        </Card.Title>
                        <Card.Text>
                            {room?.roomDetails}
                        </Card.Text>
                    </div>
                    <div className="flex-shrink mt-3">
                        <Link to={`/booking/${room?.id}`}>
                            <button className="btn-hotel p-3">Book now</button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RoomCard;