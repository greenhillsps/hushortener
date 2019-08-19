//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'https://shortenerapi.herokuapp.com/api';
//const baseUrl="http://localhost:3002"
const Api = {
    login: `${baseUrl}/auth/login`, //'/api/login'
     register:()=>{
     return `${baseUrl}/auth`
     },
}


export default Api;