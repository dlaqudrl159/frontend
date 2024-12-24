import { createStore } from "redux";

const initState = {

    loading : false,
    map : null

}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'loadingShow':
            return {
                ...state,
                loading : true
            }
        case 'loadingClose':
            return {
                ...state,
                loading : false
            }
        case 'setMap' :
            return {
                ...state,
                map : action.payload
            }    
        case 'setMapCenter':
            state.map.setCenter(action.payload);
            return {
                ...state,
                map : state.map
            }
        default : {
            return state;
        }    
    }

}

const store = createStore(reducer);

export default store;