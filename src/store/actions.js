import { GetRequest } from '../utils/ApiMethods'

export const onGetUrlDetails=(id)=>{
    return dispatch=>{
        dispatch({
            type:"ON_GET_URL_DETAILS"
        })
     GetRequest.getUrlDetails(id).then(res=>{
        dispatch({
            type:"GET_URL_DETAILS_SUCCESS",
            payload:res.data
        })
     }).catch(err=>{
        dispatch({
            type:"GET_URL_DETAILS_FAILED",
            payload:err.message
        })
     })
    }
}



export const onGetAllLinks=(params)=>{
  return dispatch=>{
      dispatch({
          type:"ON_GET_ALL_LINKS"
      })
    GetRequest.getAllUrls(params).then(res=>{
        dispatch({
            type:"GET_ALL_LINKS_SUCCESS",
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:"GET_ALL_LINKS_FAILED",
            payload:err.message
        })
    })
  } 
}