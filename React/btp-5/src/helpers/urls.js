const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2/';

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};
//we do it in a function becz we need argument ,which must be send
//like page=1 and limit=5
