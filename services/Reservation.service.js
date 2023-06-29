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
}

export default new ReservationService();