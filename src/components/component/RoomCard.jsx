import {Col, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function RoomCard({room}) {
    
    return (  
        <Col key={room?.id} className="mb-3" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center hover-press">
                    <div className="flex-shrink-0 mr-3" >
                        <Link to={`/booking/${room?.id}`}>
                            <Card.Img className="room-card-img rounded-4"
                                variant="top"
                                src={`data:image/png;base64, ${room?.roomImage}`}
                                alt="Room Image"
                            >
                            </Card.Img>
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="text-color">
                            {room?.roomType}
                        </Card.Title>
                        <Card.Title className="text-color">
                            {room?.roomPrice}
                        </Card.Title>
                        <Card.Text>
                            {room?.roomDetails}
                        </Card.Text>
                    </div>
                    <div className="flex-shrink mt-3">
                        <Link to={`/booking/${room?.id}`}>
                            <button className="btn-hotel p-3">Details</button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RoomCard;