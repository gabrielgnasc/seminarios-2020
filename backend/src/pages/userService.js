import api from './service';
import {history} from '../shared/history/history';
import uuid from '../shared/gerarId'

module.exports = {

    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.user =res.data;
            this.setState({typeId: btoa(this.user.email) + uuid()});
            if(this.id){
                this.user.type.map((types) =>{
                    if(types.typeId === this.id){
                        this.setState(state =>{
                            return types;               
                        });
                    }
                    return null
                });
            }
            if(res.data.error){
                history.push('/login');
            }

        })
    },

    updateUser(user, id, state){
       
        
        var email = atob(id.split("=")[0])
        var index ;
        if(email === this.user.email ){

            user.type.map((types) => {
                if(types.typeId === this.id){
                    index = user.type.indexOf(types);
                }
                return null;
            });
            user.type[index] = state;

        }else{

            user.type.push(state)
        }

        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}

        api.post('/updateUser',{user: user} ,{ headers }).then((res) =>{
            history.push('/');
        },(error) => {
            alert(error)
        })
    }


}