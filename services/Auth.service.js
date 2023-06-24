import axios from 'redaxios';
import StorageService from './Storage.service';

class AuthService {
    constructor() {
        this.apiUrl = process.env.API_URL;
        this.config = {
            headers: {
                'Accept': 'application/json'
            }
        }
    }

    async login(email, password) {
        const credentials = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${this.apiUrl}/login`, credentials, this.config);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async register(firstName, lastName, email, password) {
        const credentials = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${this.apiUrl}/users`, credentials, this.config);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async check(token) {
        if (token) {
            this.config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await axios.get(`${this.apiUrl}/user`, this.config);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new AuthService();