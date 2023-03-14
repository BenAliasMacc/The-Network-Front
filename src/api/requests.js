// const baseURL = 'https://rayscheep-family-api.onrender.com';
const baseURL = 'http://localhost:5000';

const requests = {
    getToken: `${baseURL}/jwtid`,
    createUser: `${baseURL}/api/auth/register`,
    logIn: `${baseURL}/api/auth/login`,
    logOut: `${baseURL}/api/user/logout`,
    getUser: `${baseURL}/api/user`,
    getPost: `${baseURL}/api/post`
}

export default requests;