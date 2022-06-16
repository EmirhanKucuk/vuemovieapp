/* eslint-disable no-unused-vars */
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGU2OTRlZmQ2MmM2NjdkYjJkNjhjMmNiN2E4ZTI5OSIsInN1YiI6IjYyYTcxNzk5M2Q0ZDk2MTdlOTY5YjY4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qachrdLgOCaIv2hoejxETQz6UG8ibLGd0N-VgY2vi60';
const apiKey = 'a0e694efd62c667db2d68c2cb7a8e299';
const apiRequest = 'https://api.themoviedb.org/3/movie/550?api_key=a0e694efd62c667db2d68c2cb7a8e299'
export default axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Authorization:`Bearer ${token}`
    }
})