import api from './service';
import {history} from '../shared/history/history';

    async function serviceGetUser(idI){
        let user
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        const res = await api.get('/token/' + token ,  { headers })
        let typesUser;
            user =res.data;
            if(idI){
                user.type.map((types) =>{
                    if(types.typeId === idI){
                        typesUser = types 
                    }
                    return null;
                });
            }
            if(res.data.error){
                history.push('/login');
            }
            
        return {
            user,
            typesUser
        }
    }

    export default serviceGetUser
