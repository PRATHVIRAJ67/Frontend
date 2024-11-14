// src/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://backend-arvb.vercel.app/api';

export const fetchContacts = () => axios.get(`${API_BASE_URL}/contacts`);
export const createContact = (contact) => axios.post(`${API_BASE_URL}/contacts`, contact);
export const updateContact = (id, contact) => axios.put(`${API_BASE_URL}/contacts/${id}`, contact);
export const deleteContact = (id) => axios.delete(`${API_BASE_URL}/contacts/${id}`);
