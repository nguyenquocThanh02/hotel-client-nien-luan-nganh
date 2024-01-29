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
		// console.log(response.data)
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
	formData.append('roomImage', room?.roomImage);
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

// user
export async function login(infor){
	const formData = new FormData()
    formData.append("userEmail", infor?.userEmail)
    formData.append("userPassword", infor?.userPassword)

	try {
        const response = await api.post("/users/login", formData)
		// console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
			// console.log(error.response);
			return error.response;
        }
    }
}

export async function register(infor){
	const formData = new FormData()
    formData.append("userEmail", infor?.userEmail)
    formData.append("userName", infor?.userName)
    formData.append("userPassword", infor?.userPassword)
    formData.append("userConfirmPassword", infor?.userConfirmPassword)

	try {
        const response = await api.post("/users/register", formData)
		// console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
			// console.log(error.response);
			return error.response;
        }
    }
}

// admin
export async function loginAdmin(infor){
	const formData = new FormData()
    formData.append("adminEmail", infor?.adminEmail)
    formData.append("adminPassword", infor?.adminPassword)

	try {
        const response = await api.post("/admin/login", formData)
		// console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
			// console.log(error.response);
			return error.response;
        }
    }
}

// Booking
export async function createBooking(roomId, userEmail, booking){
	try{
		const result = await api.post(`/booking/${roomId}/by/${userEmail}`, booking);
		// console.log(result.data);
		return result.data;
	} catch (error) {
		if(error.response){
			// console.log(error.response)
			return error.response;
		}
	}
}

export async function getAllBookeds(){
	try{
		const result = await api.get("/booking/get/all/booked");
		return result.data;
	}catch (error) {
		throw new Error("Error fetching bookeds")
	}
}

export async function getBookedsOfUser(userEmail){
	try{
		const result = await api.get(`/booking/get/booked/of/${userEmail}`);
		return result.data;
	}catch (error) {
		return error.response;
	}
}

export async function cancelBooked(bookedId){
	try{
		const result = await api.delete(`/booking/delete/booked/${bookedId}`);
		return result.data;
	}catch (error) {
		return error.response;
	}
}

// bill
export async function createBill(bookedId, adminEmail, bill){
	try{
		const result = await api.post(`/bill/create/${bookedId}/by/${adminEmail}`, bill);
		return result.data;
	}catch (error) {
		if(error.response){
			// console.log(error.response)
			return error.response;
		}
	}
}

export async function getAllReceipts(){
	try{
		const result = await api.get("/bill/get/all");
		return result.data;
	}catch (error) {
		if(error.response){
			// console.log(error.response)
			throw new Error("Error fetching bill")
		}
	}
}

export async function getAllReceiptsPayment(){
	try{
		const result = await api.get("/bill/get/all", {
			params: {
				param: true
			}
		});
		return result.data;
	}catch (error) {
		if(error.response){
			// console.log(error.response)
			throw new Error("Error fetching bill")
		}
	}
}


export async function completeBill(billId){
	try{
		const result = await api.put(`/bill/complete/${billId}`);
		return result.data;
	}catch (error) {
		return error.response;
	}
}

export async function unCompleteBill(billId){
	try{
		const result = await api.put(`/bill/un/complete/${billId}`);
		return result.data;
	}catch (error) {
		return error.response;
	}
}
