import React, { Component } from 'react';
import firebase from 'firebase';
import cookie from 'react-cookies';
import swal from 'sweetalert';
import {NavLink} from "react-router-dom";


class HomeSAdmin extends Component{
        constructor(props){
            super(props);
            this.state ={
                nama    :'',
                nim     :'',
                jurusan :'',
                Goldar : '',
                kode_prodi:'',
                foto    :'',
                kke     :'',
                email   :'',
                no_hp   :'',
                pass    :'',
                passLama    : '',
                passBaru    : '',
                passUBaru   : ''
            }
            this.handleSelectLama = this.handleSelectLama.bind(this)
            this.handleSelectBaru = this.handleSelectBaru.bind(this)
            this.handleSelectUlangBaru = this.handleSelectUlangBaru.bind(this)
            this.handleEditPassword = this.handleEditPassword.bind(this)
        }
        
        handleSelectLama(event){ this.setState({ passLama : event.target.value })}
        handleSelectBaru(event){ this.setState({ passBaru : event.target.value })}
        handleSelectUlangBaru(event){ this.setState({ passUBaru : event.target.value })}
        handleEditPassword(){
            if ((this.state.passLama==='') || (this.state.passBaru==='') || (this.state.passUBaru==='')){
                swal("Oops!", "Ada Data yang Belum Di Input!", "error");
            }else{
                if (this.state.pass!==this.state.passLama){
                    swal("Oops!", "Password lama yang anda masukan salah!", "error");
                }else{
                    var data = {
                        password    : this.state.passBaru,
                        kke         : this.state.kke,
                        foto        : this.state.foto,
                        jurusan     : this.state.kode_prodi,
                        nama        : this.state.nama,
                        email       : this.state.email,
                        no_hp       : this.state.no_hp,
                        Goldar      : this.state.Goldar
                    }
                    var updates = {};
                    updates['/user/' + cookie.load('user_id')] = data;
                    firebase.database().ref().update(updates);
                    setTimeout(() => {
                        swal("Success! Anda berhasil mengubah password!", {
                            icon: "success",
                        });
                    }, 3000)
                }
            }
        }

    render() {
        return(
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h1 className="panel-title"><b>Data Pengguna</b></h1><br/>
                                        <div className="table-responsive">
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="metric">
                                                    <h1 className="panel-title"><b>Edit Password</b></h1><br/>
                                                    <a data-toggle="modal" data-target='#modalEditPaswword' className="btn btn-primary" title="Ganti Password"><i className="fa fa-edit"></i> <span>Password</span></a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeSAdmin
