// src/api/notesApi.js
import axios from 'axios';

//const API_BASE = import.meta.env.VITE_API_URL;
const API_BASE = "http://notes-backend:8000/notes";

export const getNotes = () => axios.get(API_BASE);
export const getNoteById = (id) => axios.get(`${API_BASE}/${id}`);
export const createNote = (data) => axios.post(API_BASE, data);
export const updateNote = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_BASE}/${id}`);