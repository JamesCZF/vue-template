import http from './axios/http';

export const addBlog = data => http.post('/api/blog/new', data);
export const deleteBlog = id => http.post(`/api/blog/del?id=${id}`);
export const updateBlog = (id, data) => http.post(`/api/blog/update?id=${id}`, data);
export const getBlogList = data => http.get('/api/blog/list', data);

export const getBlogDetail = id => http.get(`/api/blog/detail?id=${id}`);
