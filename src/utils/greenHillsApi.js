//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'https://shortenerapi.herokuapp.com/api';
//const baseUrl="http://localhost:4040/api"
const Api = {
    login: `${baseUrl}/auth/login`, //'/api/login'
     register:()=>{
     return `${baseUrl}/auth`
     },
     getAllUrls:(params)=>{
     return `${baseUrl}/url/?page=${params.page}&limit=${params.limit}`
     },

      shortenLink:()=>{
     return `${baseUrl}/url/submit`
     },
}


export default Api;