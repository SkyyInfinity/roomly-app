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

    async getAll(token, id) {
        if(token) {
            this.config.headers['Authorization'] = `Bearer ${token}`;
            if(id) {
                const response = await axios.get(`${this.apiUrl}/rooms-with-favorites/${id}`, this.config);
                return response.data;
            } else {
                const response = await axios.get(`${this.apiUrl}/rooms-with-favorites`, this.config);
                return response.data;
            }
        }
    }
}

export default new RoomService();