import { createStore } from 'redux';

const INITIAL_STATE =   {
    isLogged: false,
    user: {}
}

function reducer(state = INITIAL_STATE, action){

    if( action.type === 'UPDATE_USER_AND_LOGIN_STATE'){
        const state = {  user: action.user, isLogged: action.isLogged }
        return state;   
    }
    
    return state ;
}

const store = createStore(reducer);

export default store;