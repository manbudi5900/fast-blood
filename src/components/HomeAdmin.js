import React, { Component } from 'react';
import firebase from 'firebase';
import cookie from 'react-cookies';
import swal from 'sweetalert';

class Home extends Component{
    constructor(props){
        super(props);
        this.state ={
            nama    :'',
            email   :'',
            nomor   :'',
            nim  :'',
            pass    :'',
            passLama    :'',
            passBaru    :'',
            passUBaru   :'',
            pass1       :'',
            email1       :'',
            nomor1       :'',

            
        } 
        this.handleSelectLama = this.handleSelectLama.bind(this)

        this.handleSelectBaru = this.handleSelectBaru.bind(this)
        this.handleSelectUlangBaru = this.handleSelectUlangBaru.bind(this)
        this.handleEditPassword = this.handleEditPassword.bind(this)
        this.handleAktif = this.handleAktif.bind()
       
        this.handleSelectEmail = this.handleSelectEmail.bind(this)
        this.handleSelectKontak = this.handleSelectKontak.bind(this)
        this.handleEditBio = this.handleEditBio.bind(this)

        this.todosData = firebase.database().ref().child("Admin").child(cookie.load('user_id'));
        
        
    }
    componentWillMount(){
        const self = this
        const getNim = cookie.load('access')
        const databaseRef = firebase.database().ref();
        const todosRef = databaseRef.child("Admin").child(getNim);
        
        todosRef.on('value', snap => {
            
            if (snap.exists() !== false){
                self.setState({
                    nama    : snap.val().nama,
                    email   : snap.val().Email,
                    nomor   : snap.val().Nomor,
                    nim     : cookie.load('user_id'),
                    pass    : snap.val().Password,
                    pass1   : snap.val().Password,
                   
                })
                
            }else{
                console.log('Data kosong!')
            }
        })
    }
    handleUnduh(){ 
        swal("Oops!", "Password salah!", "error");
    }
    
    
    handleSelectKontak(event){ 
        this.setState({ nomor1 : event.target.value         
            
        }) 
        
    }
    handleSelectEmail(event){ 
        this.setState({ email1 : event.target.value  
        }   
    )}

    handleSelectLama(event){ 
        this.setState({ passLama : event.target.value 
            
        }) 
        
    }
    handleSelectBaru(event){ 
        this.setState({ passBaru : event.target.value 
        }   
    )}
    handleSelectUlangBaru(event){ this.setState({ passUBaru : event.target.value })}

    handleEditBio(){
        
        if ((this.state.nomor==='') || (this.state.email==='')){
            swal("Oops!", "Ada Data yang Belum Di Input!", "error");
            
        }else{
                var data = {
                    Email       : this.state.email1,
                    Nomor       : this.state.nomor1, 
                    Password    : this.state.pass,
                    nama        : this.state.nama,
                   
                     
                }

                var updates = {};
                updates['/Admin/' + cookie.load('user_id')] = data;
                firebase.database().ref().update(updates);
                setTimeout(() => {
                    swal("Success! Anda berhasil mengubah Data!", {
                        icon: "success",
                    });
                }, 3000)
            }
        
    }    

    handleEditPassword(){
        
        if ((this.state.passLama==='') || (this.state.passBaru==='') || (this.state.passUBaru==='')){
            swal("Oops!", "Ada Data yang Belum Di Input!", "error");
            
        }else{
            console.log(this.state.passLama)
            console.log(this.state.pass)
            var pas=this.state.pass;
            var pas2=this.state.passLama;
            if (pas !== pas2){
                swal("Oops!", "Password lama yang anda masukan salah!", "error");
            }else{
                var data = {
                    Email       : this.state.email,
                    Nomor       : this.state.nomor, 
                    Password    : this.state.passBaru,
                    nama        : this.state.nama,
                   
                     
                }
                console.log(this.state.email);
                console.log(this.state.nomor);
                console.log(this.state.passBaru);
                console.log(this.state.nama);

                var updates = {};
                updates['/Admin/' + cookie.load('user_id')] = data;
                firebase.database().ref().update(updates);
                setTimeout(() => {
                    swal("Success! Anda berhasil mengubah password!", {
                        icon: "success",
                    });
                }, 3000)
            }
        }
    }
    handleAktif(){

    {//this.setState({ isChecked: !this.state.isChecked })
    }console.log(this.state.isChecked )
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
                                                        <td>{this.state.nomor}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>:</td>
                                                        <td>{this.state.email}</td>
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
                                            <div className="col-md-6">
                                                <div className="metric">
                                                    <h1 className="panel-title"><b>Edit Biodata</b></h1><br/>
                                                    <a data-toggle="modal" data-target='#modalEditdata' className="btn btn-primary" title="Ganti Password"><i className="fa fa-edit"></i> <span>Biodata</span></a>
                                                </div>
                                            </div>
                                            
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
                                                <input type="password"  className="form-control" name="berlaku" onChange={this.handleSelectLama}/>
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
                            <div id="modalEditdata" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title"><b>Ganti Biodata</b></h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" placeholder={this.state.email} name="berlaku" onChange={this.handleSelectEmail}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Kontak</label>
                                                <input type="text" className="form-control" name="baru" placeholder={this.state.nomor} onChange={this.handleSelectKontak}/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {       (this.state.passLama!=='' && this.state.passBaru!=='' && this.state.passUBaru!=='')?
                                                    <button onClick={this.handleEditBio} className="btn btn-primary" data-dismiss="modal"><i className="fa fa-save"></i> <span> Simpan</span></button>
                                                :   <button onClick={this.handleEditBio} className="btn btn-default"><i className="fa fa-save"></i> <span> Simpan</span></button>
                                            }
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
export default Home