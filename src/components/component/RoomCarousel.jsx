import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { getAllRooms } from "../service/AxiosFunction"

const RoomCarousel = () => {
	const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", roomImage: "" }])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllRooms()
			.then((data) => {
				setRooms(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading rooms....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

	return (
		<section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/rooms"} className="text-color">
				Show all room
			</Link>

			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{rooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/booking/${room.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${room.roomImage}`}
													alt="Room Image"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="fs-5">{room.roomType}</Card.Title>
												<Card.Title className="fs-5">{room.roomPrice} $/night</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/booking/${room.id}`} className="btn-hotel p-2 no-underline">
														Detail
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	)
}

export default RoomCarousel