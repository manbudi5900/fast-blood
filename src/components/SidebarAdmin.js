import React, { Component } from 'react';
import cookie from 'react-cookies';
import {NavLink} from "react-router-dom";
import swal from 'sweetalert';

class SidebarAdmin extends Component {
    componentWillMount(){
        if(cookie.load('access') === undefined){
            window.location = "/";
        }
    }
    handleLogout= () =>{
        swal({
            title: "Anda ingin logout?",
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
        return(
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/dashboard"><i className="lnr lnr-home"></i> <span>Dashboard</span></NavLink></li>
                            <li><NavLink to="/waiting_list"><i className="lnr lnr-inbox"></i> <span>Pengguna</span></NavLink></li>
                            <li><NavLink to="/waiting_list2"><i className="lnr lnr-tag"></i> <span>Event</span></NavLink></li>
                            <li><NavLink to="/waiting_list1"><i className="lnr lnr-tag"></i> <span>Verivikasi Event</span></NavLink></li>
                            <li><a onClick={this.handleLogout}><i className="lnr lnr-exit"></i> <span>Keluar</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
export default SidebarAdmin