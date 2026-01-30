// src/services/customerService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${API_URL}/api/customers`;

const customerService = {
    // Get all customers
    getAll: async () => {
        const response = await axios.get(API_BASE);
        return response.data;
    },

    // Get customer by id
    getById: async (id) => {
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
    },

    // Create new customer
    create: async (customer) => {
        const response = await axios.post(API_BASE, customer);
        return response.data;
    },

    // Update customer
    update: async (id, customer) => {
        const response = await axios.put(`${API_BASE}/${id}`, customer);
        return response.data;
    },

    // Delete customer
    delete: async (id) => {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    }
};

export default customerService;