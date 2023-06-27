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

    async getAll(token) {
        if(token) {
            this.config.headers['Authorization'] = `Bearer ${token}`; 
            const response = await axios.get(`${this.apiUrl}/reservations`, this.config);
            return response.data;
        }
    }
}

export default new ReservationService();