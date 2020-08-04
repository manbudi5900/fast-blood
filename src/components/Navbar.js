import React, { Component } from 'react';
import cookie from 'react-cookies';
import logo from '../assets/img/rsz_fastblood.png';
import logoo from '../assets/img/logo-mhs.png';
import off from '../assets/img/offline.png';
import on from '../assets/img/online.png';
import mhs from '../assets/img/logo-mhs.png';
import { Offline, Online } from "react-detect-offline";

class Navbar extends Component {
    handleLogout= () =>{
        cookie.remove('user_id')
        cookie.remove('access')
        window.location = "/";
    }
    render() {
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="navbar-btn" style={{'paddingTop':20,'paddingLeft':10}}>
                    <img src={mhs} />
                </div>
                <div className="container-fluid">
                    <div className="navbar-btn">
                        <button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Navbar