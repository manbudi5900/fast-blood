import React, {Component} from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import KegiatanGet from './KegiatanGet';

class kelolaEvent extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            jumlah  : 0,
            nama    :'',
            nim     :'',
            jurusan :'',
            foto    :'',
            kke     :'',
            email   :'',
            no_hp   :'',
            password:'',
            cari    :''
        }
        this.todosRef = firebase.database().ref().child("fileUpload");
        this.handleCari = this.handleCari.bind(this)
    }
    _isMounted = false
    componentDidMount() {
        this._isMounted = true
        if(this._isMounted){  
            const self = this
            this.todosRef.on('value', snapshot => {
                var datanya = [];
                snapshot.forEach(element => {
                    var todosRef1 = this.todosRef.child(element.key);
                    todosRef1.on('value', snapshot1 => {
                        snapshot1.forEach(element1 => {
                            var dataq;
                            if(element1.val().sv===0){
                                dataq           = element1.val()
                                dataq['.key']   = element1.key;
                                datanya.push(dataq);
                            }
                        });
                    });
                });
                self.setState({data: datanya});
            });
        }
    }
    componentWillUnmount() {
        this.todosRef.off();
        this._isMounted = false;
    }
    handleCari(event) {
        this.setState({cari : event.target.value})
    }
    tolakUsulan(nim,key,poin,kp,kpk,link,pringkat,tingkat){
        swal({
            title: "Pilih OK untuk lanjut Menolak Usulan KKE",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var todosRef = firebase.database().ref().child("fileUpload").child(nim).child(key);
                todosRef.set({
                    poin        : poin,
                    link        : link,
                    pringkat    : pringkat,
                    tingkat     : tingkat,
                    sv          : 2,
                    kp          : kp,
                    kpk         : kpk,
                    nim         : nim
                });
                swal("Success! Anda berhasil Menolak Usulan!", {
                    icon: "success",
                });
            } else {}
          });
    }
    terimaUsulan(nim,key,poin,kp,kpk,link,pringkat,tingkat){
        var databaseRef = firebase.database().ref();
        var data = [];
        var todosRef1 = databaseRef.child("user").child(nim);
        todosRef1.on('value', snap => {
                data['password']   = snap.val().password
                data['kke']        = (snap.val().kke+poin)
                data['foto']       = snap.val().foto
                data['jurusan']    = snap.val().jurusan
                data['nama']       = snap.val().nama
                data['email']      = snap.val().email
                data['no_hp']      = snap.val().no_hp
        })
        swal({
            title: "Pilih OK untuk lanjut Menerima usulan KKE",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var todosRef = databaseRef.child("fileUpload").child(nim).child(key);
                todosRef.set({
                    poin        : poin,
                    link        : link,
                    pringkat    : pringkat,
                    tingkat     : tingkat,
                    sv          : 1,
                    kp          : kp,
                    kpk         : kpk,
                    nim         : nim
                });
                var databaru = {
                    password    : data.password,
                    kke         : data.kke,
                    foto        : data.foto,
                    jurusan     : data.jurusan,
                    nama        : data.nama,
                    email       : data.email,
                    no_hp       : data.no_hp
                }
                var updates = {};
                updates['/user/' + nim] = databaru;
                firebase.database().ref().update(updates);
                swal("Success! Anda berhasil Menerima Usulan!", {
                    icon: "success",
                });
            } else {}
          });
    }
    render(){
        const filteredCountries = this.state.data.filter( nim =>{
            return nim.nim.toLowerCase().indexOf( this.state.cari.toLowerCase() ) !== -1
        })
        return(
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h3 className="page-title">Data Pendonor</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">
                                   
                                    <div className="panel-body">
                                        <input type="text" className="form-control" placeholder="Cari dengan NIM" onChange={this.handleCari} style={{ 'width' : '260px'}}/>
                                        <br/>
                                        <div  className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>NIM</th>
                                                        <th>Kegiatan</th>
                                                        <th>jurusan</th>
                                                        <th>Goldar</th>
                                                        <th>Alamat</th>
                                                        <th>no_hp</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredCountries.map((adm) => {
                                                            return(
                                                                <tr key={adm['.key'] }>
                                                                    <td>{adm['nim']}</td>
                                                                    <td><KegiatanGet kp={adm['kp']} kpk={adm['kpk']}/></td>
                                                                    <td>{adm['tingkat']}</td>
                                                                    <td>{adm['pringkat']}</td>
                                                                    <td>{adm['poin']}</td>
                                                                    <td>
                                                                        <a href={adm['link']} className="btn btn-primary" title="Bukti Usulan KKE"><i className="fa fa-download"></i></a>
                                                                        <button type="button" title="Terima usulan KKE" className="btn btn-success" onClick={ this.terimaUsulan.bind(null,adm['nim'],adm['.key'],adm['poin'],adm['kp'],adm['kpk'],adm['link'],adm['pringkat'],adm['tingkat']) }><i className="fa fa-check-circle"></i></button>
                                                                        <button type="button" title="Tolak usulan KKE" className="btn btn-danger" onClick={ this.tolakUsulan.bind(null,adm['nim'],adm['.key'],adm['poin'],adm['kp'],adm['kpk'],adm['link'],adm['pringkat'],adm['tingkat']) }><i className="fa fa-times-circle"></i></button>
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
                    </div>
                </div>
            </div>
        )
    }
}
export default kelolaEvent