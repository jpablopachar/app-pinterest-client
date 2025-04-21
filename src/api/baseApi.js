import axios from 'axios'
import { API_URL } from '../config/config'

/**
 * Instancia preconfigurada de Axios para realizar solicitudes HTTP a la API base.
 * 
 * @constant
 * @type {import('axios').AxiosInstance}
 * @name baseApi
 * @description Crea una instancia de Axios con la URL base definida por la constante API_URL.
 */
export const baseApi = axios.create({
  baseURL: API_URL,
});

/* export const fetchPhotos = async (page) => {
  try {
    const response = await baseApi.get('/photos', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}; */