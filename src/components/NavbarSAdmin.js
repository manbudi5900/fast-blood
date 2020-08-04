import firebase from 'firebase';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import logo from '../assets/img/png logo unram 50x50.png';
import logoo from '../assets/img/admin.png';
import off from '../assets/img/offline.png';
import on from '../assets/img/online.png';
import { Offline, Online } from "react-detect-offline";

class NavbarSAdmin extends Component {
    constructor(props){
        super(props);
        this.state ={
            nama    :cookie.load('nama'),
        } 
       console.log(cookie.load('nama'))
        
        
    }
    handleLogout= () =>{
        cookie.remove('user_id')
        cookie.remove('access')
        window.location = "/";
    }
    componentWillMount(){
        const self = this
        const getNim = cookie.load('access')
        const databaseRef = firebase.database().ref();
        const todosRef = databaseRef.child("Sadmin").child(getNim);
        
        todosRef.on('value', snap => {
            
            if (snap.exists() !== false){
                self.setState({
                    nama    : snap.val().nama
                })
            }else{
                console.log('Data kosong!')
            }
        })
    }
    render() {
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="brand">
                <div>
                    <a  className="logo text-center"><img src={logo} alt="Klorofil Logo"/></a>
                    <a  className="logo text-center"><img src={logoo} alt="Klorofil Logo"/></a>
                </div>
                </div>
                <div className="container-fluid">
                    <div className="navbar-btn">
                        <button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
                        
                    </div>
                    <div className="navbar-btn-right"><i className="fa fa-user"></i>{this.state.nama}</div>
                </div>
                
            </nav>
        )
    }
}
export default NavbarSAdmin