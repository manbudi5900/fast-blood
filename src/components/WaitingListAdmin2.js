import React, {Component} from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class WaitingListAdmin2 extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            ket    :'',
            sv     :'',
            Surat   :'',
            lembaga   :'',
            link    :'',
            nim    :''

        }
        this.todosRef = firebase.database().ref().child("uploadFile");
        
        
    }
    _isMounted = false
    componentDidMount() {
        this._isMounted = true
        if(this._isMounted){  
            const self = this
            this.todosRef.on('value', snapshot => {
                var datanya = [];
                snapshot.forEach(element => {
                    if(element.val().sv===1){
                    var dataq;
                        dataq           = element.val()
                        dataq['.key']   = element.key;
                        datanya.push(dataq);
                    }
                });
                self.setState({data: datanya});
            });
        }
    }
    
    tolakUsulan(Keterangan,Surat,lembaga,link,nim,sv){
        var databaseRef = firebase.database().ref();
        var todosRef1 = databaseRef.child("uploadFile").child(nim);
       
        swal({
            title: "Pilih OK untuk lan b jut Menghapus Event ini",
            icon: "warning",
          })
          .then((willDelete) => {
            if (willDelete) {
               
                todosRef1.remove();
                swal("Success! Anda berhasil Menghapus!", {
                    icon: "success",
                });
            } else {}
          });
    }
    // terimaUsulan(nim,key,poin,kp,kpk,link,pringkat,tingkat){
    //     var databaseRef = firebase.database().ref();
    //     var data = [];
    //     var todosRef1 = databaseRef.child("user").child(nim);
    //     todosRef1.on('value', snap => {
    //             data['password']   = snap.val().password
    //             data['kke']          = (snap.val().kke+poin)
    //             data['foto']       = snap.val().foto
    //             data['jurusan']    = snap.val().jurusan
    //             data['nama']       = snap.val().nama
    //             data['email']      = snap.val().email
    //             data['no_hp']      = snap.val().no_hp
    //     })
    //     swal({
    //         title: "Pilih OK untuk lanjut Menerima usulan KKE",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //       }) 
    //       .then((willDelete) => {
    //         if (willDelete) {
    //             var todosRef = databaseRef.child("fileUpload").child(nim).child(key);
    //             todosRef.set({
    //                 poin        : poin,
    //                 link        : link,
    //                 pringkat    : pringkat,
    //                 tingkat     : tingkat,
    //                 sv          : 1,
    //                 kp          : kp,
    //                 kpk         : kpk,
    //                 nim         : nim
    //             });
    //             var databaru = {
    //                 password    : data.password,
    //                 kke         : data.kke,
    //                 foto        : data.foto,
    //                 jurusan     : data.jurusan,
    //                 nama        : data.nama,
    //                 email       : data.email,
    //                 no_hp       : data.no_hp
    //             }
    //             var updates = {};
    //             updates['/user/' + nim] = databaru;
    //             firebase.database().ref().update(updates);
    //             swal("Success! Anda berhasil Menerima Usulan!", {
    //                 icon: "success",
    //             });
    //         } else {}
    //       });
    //}
    render(){
        const filteredCountries = this.state.data
        return(
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h3 className="page-title">Event</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">
                                    <div className="panel-body">
                                        
                                        <div  className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th> Surat</th>
                                                        <th> Brosur</th>
                                                        <th> Keterangan</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                    
                                                   
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredCountries.map((adm) => {
                                                            return(
                                                                <tr  key={adm['.key']}>
                                                                    <td><a href={adm['Surat']}>Download Surat</a></td>
                                                                    <td><img className="foto" src={adm['link']} /> </td>
                                                                    <td>{adm['Keterangan']}</td>
                                                                    <td>
                                                                        
                                                                        
                                                                        <button type="button" title="Hapus" className="btn btn-danger" onClick={ this. tolakUsulan.bind(null,adm['Keterangan'],adm['Surat'],adm['lembaga'],adm['link'],adm['nim'],adm['sv']) }><i className="fa fa-times-circle"></i></button>
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
export default WaitingListAdmin2