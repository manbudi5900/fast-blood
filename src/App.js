import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import cookie from 'react-cookies';
// import swal from 'sweetalert';
import firebase from 'firebase';
import {DB_CONFIG} from './Config';

import isi_Gol from '././components/isi_Gol';

import Masuk from './components/Masuk';
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import SidebarMhs from './components/SidebarMhs';
import Home from './components/Home';
import Pencapaian from './components/Pencapaian';
import Upload from './components/Upload';
import EventDonor from './components/EventDonor';


import NavbarAdmin from './components/NavbarAdmin';
import SidebarAdmin from './components/SidebarAdmin';
import HomeAdmin from './components/HomeAdmin';
import WaitingListAdmin from './components/WaitingListAdmin';
import WaitingListAdmin1 from './components/WaitingListAdmin1';

import WaitingListAdmin2 from './components/WaitingListAdmin2';


import HomeSAdmin from './components/HomeSAdmin';
import NavbarAdmin1 from './components/NavbarSAdmin';
import SidebarSadmin from './components/SidebarSadmin';
import pegawai from './components/pegawai';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      role : 0
    };
  }

  componentWillMount(){
    firebase.initializeApp(DB_CONFIG);
    if (cookie.load('access') !== undefined && cookie.load('role') === '1') {
      this.setState({role : 1})
      // swal("Hello!", "Selamat datang di Fast Blood!", "Berbagi ituindah");
    }
    if (cookie.load('access') !== undefined && cookie.load('role') === '2') {
      this.setState({role : 2})
      // swal("Hello!", "Selamat datang di Fast Blood!", "Berbagi ituindah");
    }
    if (cookie.load('access') !== undefined && cookie.load('role') === '3') {
      this.setState({role : 3})
      // swal("Hello!", "Selamat datang di Fast Blood!", "Berbagi ituindah");
    }
    if (cookie.load('access') === undefined && cookie.load('role') === undefined && window.location.pathname !== '/') {this.setState({role : 0})}
    if(cookie.load('role') === undefined && window.location.pathname !== '/') {window.location = "/"}
  }

  render() {
    const {role} = this.state
    let content = null
    if (role === 0) {
      content =
        <div id="wrapper" className="wrapper">
          <Route exact path="/" component={Masuk}/>
        </div>
    }else if (role === 1){
      content =
        <div id="wrapper" className="wrapper">
          <Navbar/>
          <SidebarMhs/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dashboard" component={Home}/>
          <Route exact path="/pencapaian" component={Pencapaian}/>
          <Route exact path="/waiting_list" component={EventDonor}/>
          <Route exact path="/upload" component={Upload}/>
          <Route exact path="/isi_Gol" component={isi_Gol}/>
          <div className="clearfix"></div>
		      <footer>
            <Footer/>
          </footer>
        </div>
    }else if (role === 2){
      content =
        <div id="wrapper">
          <NavbarAdmin/>
          <SidebarAdmin/>
          <Route exact path="/" component={HomeAdmin}/>
          <Route exact path="/dashboard" component={HomeAdmin}/>
          <Route exact path="/waiting_list" component={WaitingListAdmin}/>
          <Route exact path="/waiting_list1" component={WaitingListAdmin1}/>
          <Route exact path="/waiting_list2" component={WaitingListAdmin2}/>
		      <footer>
            <Footer/>
          </footer>
        </div>
    }
    else if(role  === 3){
      console.log(role);
      content =
        <div id="wrapper">
          <NavbarAdmin1/>
          <SidebarSadmin/>
          <Route exact path="/" component={HomeSAdmin}/>
          <Route exact path="/dashboard" component={HomeSAdmin}/>
          <Route exact path="/pegawai" component={pegawai}/>
          
          <footer>
            <Footer/>
          </footer>
        </div>
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
