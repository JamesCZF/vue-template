import http from './axios/http';

export const login = data => http.post('/api/user/login', data);