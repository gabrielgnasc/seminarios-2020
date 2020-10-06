import api from './service';
import {history} from '../shared/history/history';
import uuid from '../shared/gerarId'
 
async function serviceUpdateUser(e, userI, idI, stateI){
        e.preventDefault()
        
        let user = userI;
        var index ;

        var ids = [];
        user.type.map((t) => {
            ids.push(t.typeId);
        })
        
        if(ids.includes(idI)){
            user.type.map((types) => {
                if(types.typeId === idI){
                    index = user.type.indexOf(types);
                }
                return null;
            });

            user.type[index] = stateI;

        }else{
            stateI.typeId = btoa(userI.email) + '--sep--'+uuid();
            user.type.push(stateI)
        }

        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        try{
            const res = await api.post('/updateUser',{user: user} ,{ headers })
            history.push('/');
        }catch(error){
            alert(error);
        }
    }

export default serviceUpdateUser