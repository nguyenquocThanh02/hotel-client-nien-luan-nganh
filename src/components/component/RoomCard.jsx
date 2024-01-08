import {Col, Card} from "react-bootstrap";
import {Link} from "reat-router-dom";


function RoomCard({room}) {
    return (  
        <Col key={room?.id} className="mb-6" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrrink-0 mr-3 mb-3">
                        <Link to={`/booking/${room?.id}`}>
                            <Card.Img className="room-card-img">
                                variant="top"
                                src={`data:image/png;base64, ${room?.photo}`}
                                alt="Room Image"
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
                            Some room information goes here for the guest to read through
                        </Card.Text>
                    </div>
                    <div className="flex-shrink mt-3">
                        <Link to={`/booking/${room?.id}`} className="btn-hotel">
                            Book it
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RoomCard;