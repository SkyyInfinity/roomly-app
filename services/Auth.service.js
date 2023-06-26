import axios from 'redaxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        const response = await axios.post(`${this.apiUrl}/login`, credentials, this.config);
        if(response.data) {
            await AsyncStorage.setItem('@roomly_token', response.data.token);
        }
        return response.data;
    }

    async register(firstName, lastName, email, password) {
        const credentials = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };
        
        const response = await axios.post(`${this.apiUrl}/users`, credentials, this.config);
        return response.data;
    }

    async logout() {
        const token = await AsyncStorage.getItem('@roomly_token');
        if (token !== null) {
            this.config.headers['Authorization'] = `Bearer ${token}`;
            const reponse = await axios.post(`${this.apiUrl}/logout`, null, this.config);
            if(reponse.data) {
                await AsyncStorage.removeItem('@roomly_token');
            }
            return reponse.data;
        }
    }

    async check(token) {
        if (token) {
            this.config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(`${this.apiUrl}/user`, this.config);
        return response.data;
    }
}

export default new AuthService();