import axios from 'redaxios';

class ReservationService {
    constructor() {
        this.apiUrl = process.env.API_URL;
        this.config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': ''
            }
        }
    }

    async getAll(token, id) {
        if(token) {
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`; 
                const response = await axios.get(`${this.apiUrl}/user-reservations/${id}`, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }

    async add(token, user_id, room_id, start_at, end_at) {
        if(token) {
            const reservation = {
                user: user_id,
                room: room_id,
                start_at: start_at,
                end_at: end_at
            }
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`; 
                const response = await axios.post(`${this.apiUrl}/reservations`, reservation, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }

    async delete(token, id) {
        if(token) {
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`; 
                const response = await axios.delete(`${this.apiUrl}/reservations/${id}`, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
}

export default new ReservationService();