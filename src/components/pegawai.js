import React, {Component} from 'react'
import '../assets/css/main.css'
import swal from 'sweetalert';


import firebase from 'firebase';

export default class pegawai extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            cari : '',
            nama : '',
            email : '',
            pass : '',
             user : '',
             no : '',
           
        }
        this.todosData = firebase.database().ref().child("Admin");
        this.handleCari = this.handleCari.bind(this)
       
        this.handleHapus = this.handleHapus.bind(this)
        this.handleNama = this.handleNama.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleno = this.handleno.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleCari(event) {
        this.setState({cari : event.target.value})
       
    }
    
    handleHapus(nim){
    
        swal({
            title: "Pilih OK untuk lanjut untuk meghapus Admin ini",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var todosRef = firebase.database().ref().child("Admin").child(nim);
                todosRef.remove();
                swal("Success! Anda berhasil Menghapus admin!", {
                    icon: "success",
                });
            } else {}
          });
    }
    
        componentDidMount() { 
                this.todosData.on('value', snap => {
                    var datanya = [];
                    snap.forEach(element => {
                        var dataq;    
                            dataq           = element.val()
                            dataq['.key']   = element.key;
                            datanya.push(dataq);
                    });
                    this.setState({
                        data : datanya
                       })
                       
                });
            }
        handleUsername(event){ this.setState({ user : event.target.value }) 
        console.log(this.state.user)    }
        handlePassword(event){ this.setState({ pass : event.target.value }) }
        handleEmail(event){ this.setState({ email : event.target.value })}
        handleNama(event){ this.setState({ nama : event.target.value })}
        handleno(event){ this.setState({ no : event.target.value })}
        handleSubmit(event){
            event.preventDefault()
            console.log(this.state.user)
            if (this.state.user.length >= 10){
                const todosRef = firebase.database().ref().child("Admin").child(this.state.user);
                event.preventDefault()
                swal({
                    title: "Pilih OK untuk lanjut untuk menambah Admin ini",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                setTimeout(() => {
                    todosRef.on('value', snap => {
                        if (snap.exists() === false){
                        todosRef.set({
                            Password    : this.state.pass,
                            nama        : this.state.nama,
                            Email       : this.state.email,
                            Nomor       : this.state.no,
                        }); 
                    }
                    }, 0);
                });
            }else{
                swal({
                    title: "Username harus lebih dari 10 huruf!!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
            }
        }
    render(){
        const filteredCountries = this.state.data.filter( nama =>{
            return nama.nama.toLowerCase().indexOf( this.state.cari.toLowerCase() ) !== -1})
        return(
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h3 className="page-title">Data Pendonor</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">      
                                    <div className="panel-body">
                                    <div className="row">
                                            <div className="col-md-6">
                                                <div className="metric">
                                                    <h1 className="panel-title"><b>Tambah Admin</b></h1><br/>
                                                    <a data-toggle="modal" data-target='#modalEditPaswword' className="btn btn-primary" title="Tambah Admin"><i className="fa fa-edit"></i> <span>Tambah</span></a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <input type="text" className="form-control" placeholder="Cari dengan NIM" onChange={this.handleCari} style={{ 'width' : '260px'}}/>
                                        
                                        <br/>
                                        <div  className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Nama</th>
                                                        <th>Email</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredCountries.map((adm) => {
                                                            return(
                                                                <tr key={adm['.key'] }>
                                                                    <td>{adm['nama']}</td>
                                                                    <td>{adm['Email']}</td>
                                                                    <td>
                                                                        <button type="button" title="Hapus Pegawai" className="btn btn-danger" onClick={ this.handleHapus.bind(null,adm['.key'],adm['Email'],adm['Nomor'],adm['nama'],adm['Password']) }><i className="fa fa-times-circle"></i></button>
                                                                        
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }                                         
                                                </tbody>
                                            </table>
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
                                            <h4 className="modal-title"><b>Tambah Admin</b></h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input type="text" className="form-control" name="berlaku" required onChange={this.handleUsername}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Nama</label>
                                                <input type="text" className="form-control" name="baru" required onChange={this.handleNama}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="ulangBaru" required onChange={this.handleEmail} />
                                            </div>
                                            <div className="form-group">
                                                <label>Nomor-Telpon</label>
                                                <input type="text" className="form-control" name="ulangBaru" required onChange={this.handleno} />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" className="form-control" name="ulangBaru" required onChange={this.handlePassword} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={this.handleSubmit} className="btn btn-default"><i className="fa fa-save"></i> <span> Simpan</span></button>
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