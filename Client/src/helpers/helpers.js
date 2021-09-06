import axios from 'axios';

const baseURL = 'http://localhost:3000/info/'; // trailing slash reuired

// You are not expected to understand this.
const handleError = (fn) => (...params) =>
    fn(...params).catch((error) => {
        console.error(error);
    });

export const api = {
    getInfo: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    })
}