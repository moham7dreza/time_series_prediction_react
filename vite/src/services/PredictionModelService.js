import axios from 'axios';
import config from "../config/app";

class PredictionModelCrudService {
    static API_BASE_URL = config.jsonServerUrl;

    static getFullUrl(endpoint) {
        return `${PredictionModelCrudService.API_BASE_URL}/${endpoint}`;
    }

    // Create
    static async createItem(data) {
        try {
            const response = await axios.post(PredictionModelCrudService.getFullUrl('items'), data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Read
    static async getItems() {
        try {
            const response = await axios.get(PredictionModelCrudService.getFullUrl('items'));
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getItemById(itemId) {
        try {
            const response = await axios.get(PredictionModelCrudService.getFullUrl(`items/${itemId}`));
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update
    static async updateItem(itemId, data) {
        try {
            const response = await axios.put(PredictionModelCrudService.getFullUrl(`items/${itemId}`), data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Delete
    static async deleteItem(itemId) {
        try {
            const response = await axios.delete(PredictionModelCrudService.getFullUrl(`items/${itemId}`));
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default PredictionModelCrudService;
