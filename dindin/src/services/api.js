import axios from 'axios';
import {getItem} from '../utils/storage'

const token = getItem('token');

export default axios.create({
    baseURL: 'https://desafio-backend-03-dindin.herokuapp.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY0OTc4OTU0NCwiZXhwIjoxNjQ5ODE4MzQ0fQ.djbQk94u0GQrtbI9nb5wtKU9uN9VV-qfK-fkRMEsoFY' 
    }
});