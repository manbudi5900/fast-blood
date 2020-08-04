import React, {Component} from 'react';
import firebase from 'firebase';

class Pencapaian extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            cari : ''
        }
        this.todosData = firebase.database().ref().child("user");
        this.handleCari = this.handleCari.bind(this)
    }
    handleCari(event) {
        this.setState({cari : event.target.value})
       
    }
    componentDidMount() { 
            this.todosData.on('value', snap => {
                var datanya = [];
                snap.forEach(element => {
                    var dataq;    
                    if(element.val().aktif===true){
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
        const filteredCountries = this.state.data.filter( Goldar =>{
             return Goldar.Goldar.indexOf( this.state.cari ) !== -1
        })
        return(
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h3 className="page-title">Data Pendonor Aktif</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h3 className="panel-title" style={{paddingBottom:17}}>Rincian Data</h3>
                                        <select onChange={this.handleCari} >
                                            <option value=''>Pilih</option>
                                            <option >A+</option>
                                            <option >B+</option>
                                            <option>O+</option>
                                            <option>AB+</option>
                                            <option>A-</option>
                                            <option>B-</option>
                                            <option>O-</option>
                                            <option>AB-</option>
                                        </select>
                                    </div>
                                    <div className="panel-body">
                                        <div  className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Nama</th>
                                                        <th>Golongan Darah</th> 
                                                        <th>Nomor Hp</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredCountries.map((adm) => {
                                                            return(
                                                                <tr key={adm['.key'] }>
                                                                    <td>{adm['nama']}</td>
                                                                    <td>{adm['Goldar']}</td>
                                                                    <td>{adm['no_hp']}</td>
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
export default Pencapaian
