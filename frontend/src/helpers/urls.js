const API_ROOT = 'http://localhost:8000';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: () => `${API_ROOT}/`,
  editProfile: () => `${API_ROOT}/users/edit`,
  userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createComment: () => `${API_ROOT}/comments/`,
  toggleLike: (id, likeType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  userSearch: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};
//we do it in a function becz we need argument ,which must be send
//like page=1 and limit=5
