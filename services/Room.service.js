import axios from 'redaxios';

class RoomService {
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
            const response = await axios.get(`${this.apiUrl}/rooms`, this.config);
            return response.data;
        }
    }
}

export default new RoomService();