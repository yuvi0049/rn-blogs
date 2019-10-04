import axios from 'axios';

const baseURL = "http://0b54165a.ngrok.io";

export default axios.create({
    baseURL: baseURL
});
