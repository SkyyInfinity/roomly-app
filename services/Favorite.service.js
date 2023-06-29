import axios from 'redaxios';

class FavoriteService {
    constructor() {
        this.apiUrl = process.env.API_URL;
        this.config = {
            headers: {
                'Accept': 'application/json'
            }
        };
    }

    async getAll(token, id) {
        if(token) {
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${this.apiUrl}/favorites/${id}`, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }

    async add(token, user_id, room_id) {
        if(token) {
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`;
                const response = await axios.post(`${this.apiUrl}/favorites`, { user_id: user_id, room_id: room_id }, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }

    async remove(token, id) {
        if(token) {
            try {
                this.config.headers['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`${this.apiUrl}/favorites/${id}`, this.config);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
}

export default new FavoriteService();