import { Term } from "./types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const termApi = {
    // Barcha terminlarni olish
    async getAll(): Promise<Term[]> {
        const response = await fetch(`${API_URL}/terms`);
        if (!response.ok) throw new Error('Failed to fetch terms');
        return response.json();
    },

    // Terminni qidirish
    async search(query: string): Promise<Term[]> {
        const response = await fetch(`${API_URL}/terms/search?q=${query}`);
        if (!response.ok) throw new Error('Failed to search terms');
        return response.json();
    },

    // Bitta terminni olish
    async getById(id: string): Promise<Term> {
        const response = await fetch(`${API_URL}/terms/${id}`);
        if (!response.ok) throw new Error('Failed to fetch term');
        return response.json();
    }
};