import axios from 'axios';
import {getItem} from '../utils/storage'

const token = getItem('token');

export default axios.create({
    baseURL: 'https://desafio-backend-03-dindin.herokuapp.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY0OTc2MDU3MywiZXhwIjoxNjQ5Nzg5MzczfQ.TxZEtWkbFYCF7Jj0NOz2Jh7YiYC8vgnOH-_xWXYPxHM' 
    }
});