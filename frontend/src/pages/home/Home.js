import React from 'react';
import HomeCard from './homeCard';
import {history} from '../../shared/history/history'
import './home.css';
import api from '../service';
import {MdSettings} from 'react-icons/md';
import Configuracoes from '../configuracoes';
import { connect } from 'react-redux';
import {toggleStateUser} from '../../store/actions';

class Home extends React.Component{

    container = React.createRef();
    _isMounted = false;
    dispatch
    constructor(props){
        super(props)
        this.state ={
            user: null,
            expanded: false
        };
        this.dispatch = props.dispatch;
    }


    componentDidMount() {
        this._isMounted = true;
        this.dispatch(toggleStateUser(this.state.user, true));

        document.addEventListener("mousedown", this.handleClickOutside);

        if(this._isMounted && this.state.user === null){

            
            const token = localStorage.getItem('token');
            const headers = {'Authorization': 'Bearer ' + token}
            
            try{
                api.get('/token/' + token ,  { headers }).then((response)=>{
                    if(this._isMounted){
                        this.setState({user: response.data});
                        this.dispatch(toggleStateUser(this.state.user, true));
                    }
                    if(this.state.user === null){
                        history.push('/login');
                    }
                },(error) =>{
                    history.push('/login');
                });

            }catch(error){
                history.push('/login');
            }
        }
            
    
    }

    handleClickOutside = event => {
        if (
          this.container.current &&
          !this.container.current.contains(event.target)
        ) {
          this.setState({
            expanded: false
          });
        }
    };

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        this._isMounted = false;
    }

    handleClick = () => {
        if(this._isMounted)
            this.setState({expanded: !this.state.expanded});
    };


    render(){
        return(
            <>
                {/* <NavBar state={this.state} callBack={this.pageReturn.bind(this)} ></NavBar> */}
                <div className="container-fuid" style={{paddingTop: 60}} >
                    <div className="container" >
                        <div className="card-top-n teste" ref={this.container}>
                            <label style={{marginBottom: 0}} >
                                { (this.state.user !== null) ? this.state.user.name : "   " }
                            </label>
                            <div className="perfil-img" >
                                <img className="img-config" src={this.state?.user?.file === null ? null : this.state?.user?.file?.url}  />
                            </div>
                            <button className="close config-btn"  onClick={this.handleClick} ><MdSettings/></button>
                            <div className="config-div cdh"  >
                                { this.state.expanded && <Configuracoes></Configuracoes>}
                            </div>
                        </div>
                        
                    </div>
                    <div className="container" style={{minHeight: '65vh'}} >
                        <div className="bg-row-at">
                            <HomeCard /> 
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(state => ({isLogged:  state.isLogged, user: state.user}))(Home);
