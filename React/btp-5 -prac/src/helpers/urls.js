const API_ROOT = 'https://identitytoolkit.googleapis.com/v1';
export const APIUrls = {
  login: () =>
    `${API_ROOT}/accounts:signInWithPassword?key=AIzaSyAlXgvGG5SSa2Uhu5_ZaqITLrukJrgq-Ak`,
  signup: () =>
    `${API_ROOT}/accounts:signUp?key=AIzaSyAlXgvGG5SSa2Uhu5_ZaqITLrukJrgq-Ak`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  getuserdata: () =>
    `${API_ROOT}/accounts:lookup?key=AIzaSyAlXgvGG5SSa2Uhu5_ZaqITLrukJrgq-Ak`,
};
//we do it in a function becz we need argument ,which must be send
//like page=1 and limit=5
