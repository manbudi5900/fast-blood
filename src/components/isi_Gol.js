import React, {Component} from 'react'
import '../assets/css/main.css'
import goldar from '../assets/img/goldar.png'
import cookie from 'react-cookies';
import firebase from 'firebase';


class isi_Gol extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            goldar : '',
            nama    :'',
            aktif   :'',
            foto    :'',
            email   :'',
            no_hp   :'',
            password:''
        }
        this.todosData = firebase.database().ref().child("user").child(cookie.load('user_id'));
        this.handleinput = this.handleinput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    handleinput(event){
        this.setState({
            goldar  : event.target.value
        })
        this.todosData.on('value', snap => {
            this.setState({
                nama    : snap.val().nama,
                jurusan : snap.val().jurusan,
                foto    : snap.val().foto,
                email   : snap.val().email,
                no_hp   : snap.val().no_hp,
                password: snap.val().password,
            })
        })
    }

    handleSubmit(){
        var databaru = {
            Goldar      : this.state.goldar,
            foto        : this.state.foto,
            aktif     : this.state.aktif,
            password    : this.state.password,
            nama        : this.state.nama,
            email       : this.state.email,
            no_hp       : this.state.no_hp
        }
        var updates = {};
        updates['/user/' + cookie.load('user_id')] = databaru;
        firebase.database().ref().update(updates);
        window.location='/dashboard';
    }
  
    render(){
        return(
            <div style={{'paddingTop':100}}>
            <div>
            <div id="wrapper">
            <div className='padLogin'/>
                <div className="vertical-align-wrap">
                    <div >
                        <div className="auth-box ">
                            
                        <div><h2 ><center><b>Form Isi Golongan darah</b></center></h2></div>
                        
                            <div className="auth-box-icon text-center"><img src={goldar} style={{'width':77, 'height':97 }}></img>
                            <h4>Silahkan isikan golongan darah anda</h4> 
                            <br/></div>
                            <center>
                            <div className="input-group">
                                       
                                       <select onChange={this.handleinput} style={{'float':'left', 'padding':3}}>
                                           <option value=''>Pilih Golongan Darah</option>
                                           <option >A+</option>
                                           <option >B+</option>
                                           <option>O+</option>
                                           <option>AB+</option>
                                           <option>A-</option>
                                           <option>B-</option>
                                           <option>O-</option>
                                           <option>AB-</option>
                                       </select>
                                       <div style={{'float':'right'}}><button onClick={this.handleSubmit}>Tambahkan</button></div>
                                       </div></center><br/>    

                                                                            
                                     <br/>           
                            
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
            </div>



        )
    }
}
export default isi_Gol