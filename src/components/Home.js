import React, { Component } from 'react';
import firebase from 'firebase';
import cookie from 'react-cookies';
import swal from 'sweetalert';

class Home extends Component{
    constructor(props){
        super(props);
        this.state ={
            nama    :'',
            nim     :'',
            jurusan :'',
            kode_prodi:'',
            foto    :'',
                        email   :'',
            no_hp   :'',
            pass    :'',
            passLama    : '',
            passBaru    : '',
            passUBaru   : '',
            Goldar  : '',
            aktif   : false,
            aktif1   : true,
            foto    : '',

            isChecked: props.isChecked || false,
        } 
        this.handleSelectLama = this.handleSelectLama.bind(this)

        this.handleSelectBaru = this.handleSelectBaru.bind(this)
        this.handleSelectUlangBaru = this.handleSelectUlangBaru.bind(this)
        this.handleEditPassword = this.handleEditPassword.bind(this)
        this.handleAktif = this.handleAktif
       
        this.todosData = firebase.database().ref().child("user").child(cookie.load('user_id'));
        
        
    }
    componentWillMount(){
        const self = this
        const getNim = cookie.load('access')
        const databaseRef = firebase.database().ref();
        const todosRef = databaseRef.child("user").child(getNim);
        
        todosRef.on('value', snap => {
            
            if (snap.exists() !== false){
                self.setState({
                    nama    : snap.val().nama,
                    foto    : snap.val().foto,
                    email   : snap.val().email,
                    no_hp   : snap.val().no_hp,
                    pass    : snap.val().password,
                    Goldar    : snap.val().Goldar,
                    aktif   :   snap.val().aktif,
                })
            }else{
                console.log('Data kosong!')
            }
        })
    }
    handleUnduh(){ 
        swal("Oops!", "Password salah!", "error");
    }
    
    
    handleSelectLama(event){ 
        this.setState({ passLama : event.target.value 
        }
    )}
    handleSelectBaru(event){ 
        this.setState({ passBaru : event.target.value 
        }
    )}
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
                    foto        : this.state.foto,
                    jurusan     : this.state.kode_prodi,
                    nama        : this.state.nama,
                    email       : this.state.email,
                    no_hp       : this.state.no_hp,
                    Goldar      : this.state.Goldar,
                    aktif       : this.state.aktif,
                    
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
    handleAktif=() =>{
        
        this.setState({
            aktif1    : !this.state.aktif1
        });
        var data = {
            password    : this.state.pass,
            foto        : this.state.foto,
           
            nama        : this.state.nama,
            email       : this.state.email,
            no_hp       : this.state.no_hp,
            Goldar      : this.state.Goldar,
            aktif       : this.state.aktif1,
            
        }
          var updates = {};
        updates['/user/' + cookie.load('user_id')] = data;
        firebase.database().ref().update(updates);
        console.log(this.state.aktif)
       
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
                                            <table className="table table-hover">
                                                <tbody>
                                                    <tr>
                                                        <th>Nama</th>
                                                        <th>:</th>
                                                        <th>{this.state.nama}</th>
                                                    </tr>
                                                   
                                                    
                                                    <tr>
                                                        <th>No. Hp.</th>
                                                        <td>:</td>
                                                        <td>{this.state.no_hp}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>:</td>
                                                        <td>{this.state.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Golongan Darah</th>
                                                        <td>:</td>
                                                        <td>{this.state.Goldar}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Foto</th>
                                                        <td>:</td>
                                                        <td>{this.state.foto}</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
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
                            <div className="col-md-4">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h1 className="panel-title"><b>Status Donor</b></h1><br/>
                                        <div className="metric">
                                            <label className="switch">
                                            {
                                                
                                                (this.state.aktif===true)?<input type="checkbox" id="id" checked onChange={this.handleAktif} />
                                                :<input type="checkbox" id="id" onChange={this.handleAktif} />
                                            }
                                                <div className="slider"></div> 
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="modalEditPaswword" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title"><b>Ganti Password</b></h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Password Sekarang</label>
                                                <input type="password" className="form-control" name="berlaku" onChange={this.handleSelectLama}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Password Baru</label>
                                                <input type="password" className="form-control" name="baru" onChange={this.handleSelectBaru}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Konfirmasi Password Baru</label>
                                                <input type="password" className="form-control" name="ulangBaru"onChange={this.handleSelectUlangBaru} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {       (this.state.passLama!=='' && this.state.passBaru!=='' && this.state.passUBaru!=='')?
                                                    <button onClick={this.handleEditPassword} className="btn btn-primary" data-dismiss="modal"><i className="fa fa-save"></i> <span> Simpan</span></button>
                                                :   <button onClick={this.handleEditPassword} className="btn btn-default"><i className="fa fa-save"></i> <span> Simpan</span></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}
export default Home