import React, { Component } from 'react';
import cookie from 'react-cookies';
import {NavLink} from "react-router-dom";
import swal from 'sweetalert';
import firebase from 'firebase';

class SidebarMhs extends Component {
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            Goldar : ''
        }
        this.todosData = firebase.database().ref().child("user").child(cookie.load('user_id'));
        this.todosData.on('value', snap => {
            this.setState({
                Goldar : snap.val().Goldar
                
            })
        })
    }
    componentWillMount(){
        if(cookie.load('access') === undefined){
            window.location = "/";
        }
        
    }
    handleLogout= () =>{
        swal({
            title: "Anda Yakin Akan Keluar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                cookie.remove('user_id')
                cookie.remove('access')
                cookie.remove('role')
                window.location = "/";
            } else {
              }
          });
    }
    render() {
        let content = null
        if(this.state.Goldar!==''){
            content =
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/dashboard"><i className="lnr lnr-home"></i> <span>Dashboard</span></NavLink></li>
                            <li><NavLink to="/pencapaian" className="nav-item"><i className="lnr lnr-chart-bars"></i> <span>Pendonor aktif</span></NavLink></li>
                            <li><NavLink to="/waiting_list"><i className="lnr lnr-inbox"></i> <span>Event Donor</span></NavLink></li>
                            <li><NavLink to="/upload"><i className="lnr lnr-upload"></i> <span>Ajukan Event</span></NavLink></li>                       
                            <li><a onClick={this.handleLogout}><i className="lnr lnr-exit"></i> <span>Keluar</span></a></li>
                        </ul>
                    </nav>
                </div>
        }else{
            content =
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/dashboard"><i className="lnr lnr-home"></i> <span>Dashboard</span></NavLink></li>
                            <li><NavLink to="/isi_Gol"><i className="lnr lnr-home"></i> <span>Isi_Goldar</span></NavLink></li>
                            <li><a onClick={this.handleLogout}><i className="lnr lnr-exit"></i> <span>Keluar</span></a></li>
                        </ul>
                    </nav>
                </div>
        }
        return(
            <div id="sidebar-nav" className="sidebar">
                {content}
            </div>
        )
    }
}
export default SidebarMhs