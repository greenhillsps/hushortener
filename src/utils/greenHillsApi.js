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
     deleteUrls:(id)=>{
        return `${baseUrl}/url/${id}`
        },

      shortenLink:()=>{
     return `${baseUrl}/url/submit`
     },
     getUrlDetails:(id)=>{
        return `${baseUrl}/url/${id}`
        },
        getUser:()=>{
         return `${baseUrl}/users/user`
         },
        updateFeature:(id)=>{
         return `${baseUrl}/feature/buy/${id}`
         },
         BuyFeature:(id)=>{
            return `${baseUrl}/cart/buy/${id}`
            },
}


export default Api;