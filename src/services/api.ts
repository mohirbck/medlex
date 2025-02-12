import { Term } from "../types";

const API_URL = 'http://185.171.81.159:3000/api';

export const termApi = {
    async create(data: { title: string }): Promise<Term> {
        try {
          const response = await fetch(`${API_URL}/terms`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create term');
          }
    
          return response.json();
        } catch (error) {
          console.error('Error creating term:', error);
          throw error;
        }
    },

    // Barcha terminlarni olish
    async getAll(): Promise<Term[]> {
        try {
            console.log('Fetching terms from:', `${API_URL}/terms`);
            const response = await fetch(`${API_URL}/terms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // CORS uchun
                    'Access-Control-Allow-Origin': '*'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Received data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching terms:', error);
            throw error;
        }
    },

    // Terminni qidirish
    async search(query: string): Promise<Term[]> {
        const response = await fetch(`${API_URL}/terms/search?q=${query}`);
        if (!response.ok) throw new Error('Failed to search terms');
        return response.json();
    },

    // Bitta terminni olish
    async getById(id: string): Promise<Term> {
        try {
          console.log('Fetching term by id:', id);
          const response = await fetch(`${API_URL}/terms/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Received term:', data);
          return data;
        } catch (error) {
          console.error('Error fetching term:', error);
          throw error;
        }
    },
    
    async delete(id: string): Promise<void> {
        try {
          const response = await fetch(`${API_URL}/terms/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete term');
          }
        } catch (error) {
          console.error('Error deleting term:', error);
          throw error;
        }
    }
}; 