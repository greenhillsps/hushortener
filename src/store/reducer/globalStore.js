
import * as actionType from '../constants/index';
export const initialState = {
  
    //set notification
    notificationMessage: false,
    notificationType: 'error'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       
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




        default:
            return state;
    }
}

export default reducer;