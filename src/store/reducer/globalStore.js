
import * as actionType from '../constants/index';
export const initialState = {
  
    //set notification
    notificationMessage: false,
    notificationType: 'error',
    showModal:false,
     urlDetails:{},
     getDetailsLoading:false,
     allLinks:[],
     getAllLinksLoading:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_GET_ALL_LINKS':
            return{
                ...state,
                getAllLinksLoading:true
            }
            case 'GET_ALL_LINKS_SUCCESS':
                    return{
                        ...state,
                        allLinks:action.payload,
                        getAllLinksLoading:false
                    }
                    case 'GET_ALL_LINKS_FAILED':
                            return{
                                ...state,
                                getAllLinksLoading:false,
                                notificationMessage: action.payload,
                                notificationType:"error"
                            }
            
        case  'ON_GET_URL_DETAILS':
            return{
                ...state,
                getDetailsLoading:true
            }
            case  'GET_URL_DETAILS_SUCCESS':
                    return{
                        ...state,
                        urlDetails:action.payload,
                        getDetailsLoading:false
                    }
                    case  'GET_URL_DETAILS_FAILED':
                            return{
                                ...state,
                                getDetailsLoading:false,
                                notificationMessage: action.payload,
                                notificationType:"error"

                            }
        //catch error
        case actionType.SET_NOTIFICATION:
            return {
                ...state,
                notificationMessage: action.errorMessage,
                notificationType:action.errorType
             
            }


        case actionType.CLEAR_NOTIFICATION:
            return {
                ...state,
                notificationMessage: false,

            }

          
            case "SHOW_MODAL":
            return{
              ...state,
              showModal:true
            }
            case "HIDE_MODAL":
           return{
          ...state,
          showModal:false
           }

        default:
            return state;
    }
}

export default reducer;