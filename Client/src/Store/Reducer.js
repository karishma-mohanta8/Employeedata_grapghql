
import {
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE,
    OPEN_POPUP,
    CLOSE_POPUP

} from '../Action';
// import { employee } from '../Data';


const initialState = {
    popupOpen: false,
    aEmployee: [],
    load: false
}

const reducer = (state = initialState, action) => {
    if (action.type === ADD_EMPLOYEE) {
        return {
            ...state,
            load: !action.value
        }
    }
    // if (action.type === DELETE_EMPLOYEE) {
    //     var deleteEployee = [...state.aEmployee];
    //     deleteEployee.splice(action.index, 1);
    //     return {
    //         aEmployee: deleteEployee
    //     }
    // }
    if (action.type === OPEN_POPUP) {
        return {
            popupOpen: true
        }
    }
    if (action.type === CLOSE_POPUP) {
        return {
            popupOpen: false
        }
    }
    return state;
}

export default reducer;