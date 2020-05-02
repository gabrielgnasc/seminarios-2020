export function toggleStateUser(user, isLogged){
    return {
        type: 'UPDATE_USER_AND_LOGIN_STATE',
        user ,
        isLogged
    };
}

