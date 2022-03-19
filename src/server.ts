import axios from 'axios'

const { REACT_APP_API_URL } = process.env

console.log({ REACT_APP_API_URL })

export const server = axios.create({
  baseURL: 'http://localhost:3008/api/v1/pixsy',
  timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});