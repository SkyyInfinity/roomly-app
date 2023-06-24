import axios from 'redaxios';
import StorageService from './Storage.service';

class RoomService {
    constructor() {
        this.apiUrl = process.env.API_URL;
        StorageService.get('@roomly_token').then((res) => {
            this.token = res;
            this.config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            }
        });
    }

    async getAll() {
        try {
            const response = await axios.get(`${this.apiUrl}/rooms`, this.config);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new RoomService();