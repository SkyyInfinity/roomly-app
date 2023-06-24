import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
    constructor() {
        this.storage = AsyncStorage;
    }

    async set(key, value) {
        try {
            await this.storage.setItem(key, value);
        } catch (error) {
            throw new Error(error);
        }
    }

    async get(key) {
        try {
            const result = await this.storage.getItem(key);
            if(result !== null) {
                return result;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async remove(key) {
        try {
            await this.storage.removeItem(key);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new StorageService();