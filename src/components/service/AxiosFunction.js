import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9090'
})

export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/get/type")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

export async function getAllRoom() {
	try {
		const result = await api.get("/rooms/get-all/room")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}