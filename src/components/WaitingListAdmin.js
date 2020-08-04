import React, {Component} from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';


class WaitingListAdmin extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            cari : '',
           
        }
        this.todosData = firebase.database().ref().child("user");
        this.handleCari = this.handleCari.bind(this)
       
        this.handleHapus = this.handleHapus.bind(this)
    }
    handleCari(event) {
        this.setState({cari : event.target.value})
       
    }
    
    handleHapus(nim){
    
        swal({
            title: "Pilih OK untuk lanjut Pengguna ini",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var todosRef = firebase.database().ref().child("user").child(nim);
                todosRef.remove();
                swal("Success! Anda berhasil Menghapus!", {
                    icon: "success",
                });
            } else {}
          });
    }
    
        componentDidMount() { 
                this.todosData.on('value', snap => {
                    var datanya = [];
                    snap.forEach(element => {
                        if(element.val().Goldar ===''){

                        }
                        else{
                        var dataq;    
                            dataq           = element.val()
                            dataq['.key']   = element.key;
                            datanya.push(dataq);
                        }
                    });
                    this.setState({
                        data : datanya
                       })
                       
                });
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
                                        <input type="text" className="form-control" placeholder="Cari Dengan Nama" onChange={this.handleCari} style={{ 'width' : '260px'}}/>
                                        <br/>
                                        <div  className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>NIM</th>
                                                        <th>Goldar</th>
                                                        <th>Email</th>
                                                        <th>No Hp</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredCountries.map((adm) => {
                                                            return(
                                                                <tr key={adm['.key'] }>
                                                                    <td>{adm['nama']}</td>
                                                                    <td>{adm['Goldar']}</td>
                                                                    <td>{adm['email']}</td>
                                                                    <td>{adm['no_hp']}</td>
                                                                    <td>
                                                                        <button type="button" title="Hapus Pengguna" className="btn btn-success" onClick={ this.handleHapus.bind(null,adm['.key']) } ><i className="fa fa-trash"></i></button>
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
export default WaitingListAdmin