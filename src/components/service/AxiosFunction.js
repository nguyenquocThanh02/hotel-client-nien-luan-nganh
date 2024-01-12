import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9090'
})

export async function addRoom(roomImage, roomType, roomPrice, roomDetails){
	const formData = new FormData()
    formData.append("roomImage", roomImage)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    formData.append("roomDetails", roomDetails)

	const response = await api.post("/rooms/add/room", formData)
	if(response.status === 200)
		return true;
	return false;
}

export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/get/type")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

export async function getRoomById(roomId){
	try{
		const response = await api.get(`/rooms/get/${roomId}`);
		return response.data;
	}catch (error){
		throw new Error("Error to get room");
	}
}

export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/get-all/room")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

export async function deleteRoom(roomId){
	try{
		const result = await api.delete(`/rooms/delete/${roomId}`);
		return result.data;
	} catch (error) {
		throw new Error("Error delete a rooms");
	}
}

export async function updateRoom(roomId, room){
	const formData = new FormData();
	formData.append('roomImage', room.roomImage);
	formData.append('roomType', room.roomType);
	formData.append('roomPrice', room.roomPrice);
	formData.append('roomDetails', room.roomDetails);
	
	try{
		const result = await api.put(`/rooms/update/${roomId}`, formData);
		return result.data;
	} catch (error) {
		throw new Error("Error update a rooms");
	}
}