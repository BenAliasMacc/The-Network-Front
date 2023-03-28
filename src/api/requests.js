// const baseURL = 'https://rayscheep-family-api.onrender.com';
const baseURL = 'http://localhost:5000';

const requests = {
    baseURL: baseURL,
    getToken: `${baseURL}/jwtid`,
    createUser: `${baseURL}/api/auth/register`,
    logIn: `${baseURL}/api/auth/login`,
    logout: `${baseURL}/api/auth/logout`,
    getUser: `${baseURL}/api/user`,
    post: `${baseURL}/api/post`,
    likePost: `${baseURL}/api/post/like-post`,
    unlikePost: `${baseURL}/api/post/unlike-post`,
    newComment: `${baseURL}/api/post/comments`,
    editComment: `${baseURL}/api/post/edit-comment`,
    deleteComment: `${baseURL}/api/post/delete-comment`,
    follow: `${baseURL}/api/user/follow`,
    unfollow: `${baseURL}/api/user/unfollow`,
    uploadImg: `${baseURL}/api/user/upload`
}

export default requests;