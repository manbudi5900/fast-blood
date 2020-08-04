import React, {Component} from 'react'
import '../assets/css/main.css'

import axios from 'axios';
import cookie from 'react-cookies';
import swal from 'sweetalert';
import firebase from 'firebase';
import { BeatLoader } from 'react-spinners';

class Masuk extends Component{
    constructor(props){
        super(props);
        this.state ={
            username    :'',
            password    :'',
            cekDB       :'',
            loading     : false,
            nimForget   :'',
            emailForget :'',
            Goldar      : '',
            aktif       : 0,
        }
        this.handleChangeNIM = this.handleChangeNIM.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.nimForgetPass = this.nimForgetPass.bind(this)
        this.kirimEmailPass = this.kirimEmailPass.bind(this)
    }

    componentWillMount(){
        axios.get("https://api.github.com/users/KrunalLathiya")
           .then(response => {
             this.setState({
               company:response.data.company,
               blog: response.data.blog,
               avatar:response.data.avatar_url,
               loading: false
             });
           })
           .catch(error => {
             console.log(error);
           });
    }
    handleChangeNIM(event){ this.setState({ nim : event.target.value }) }
    handleChangePassword(event){ this.setState({ password : event.target.value }) }
    nimForgetPass(event){ this.setState({ nimForget : event.target.value })}
    kirimEmailPass(){ 
        const databaseRef = firebase.database().ref();
        const todosRef = databaseRef.child("user").child(this.state.nimForget);
        swal({
            title: "Pilih OK untuk lanjut",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                todosRef.on('value', snap => {
                    if (snap.exists() !== false){
                        const from_email    ='manbudi590@gmail.com';
                        const from_name     ='Admin Fast-Blood';
                        const to_email      =snap.val().email;
                        const to_name       =snap.val().nama;
                        const subject       ='Password akun Fast-Blood';
                        const content       ='Password akun Fast-Blood Anda adalah '+snap.val().password;
                        const send = 'https://api.lrsoft.id/mail/v1/send?'+
                                    'to_email='+to_email+'&'+
                                    'to_name='+to_name+'&'+
                                    'from_email='+from_email+'&'+
                                    'from_name='+from_name+'&'+
                                    'content='+content+'&'+
                                    'subject='+subject;
                        axios.post(send)
                        .then(function (response) {
                            console.log(response.data.code);
                            if(response.data.code==='success'){
                                swal("Success!", "Password telah dikirim, Silahkan Cek email Anda!"+snap.val().email, "success");
                            }else{
                                swal("Oops!", "Pengiriman password ke email "+snap.val().email+" Gagal!", "ERROR");
                            }
                            setTimeout(() => {
                                window.location = "/";
                            },5000);
                        });
                    }else{
                        swal("WARNING !", "NIM Tidak Dikenali!", "ERROR");
                    }
                });
            } else {}
          });
    }
    handleSubmit(event){
        const self = this
        self.setState({loading : true})
        event.preventDefault()
        const databaseRef = firebase.database().ref();
        if (this.state.nim !== undefined && this.state.password !== ''){
            if (this.state.nim.length === 9){
                const todosRef = databaseRef.child("user").child(this.state.nim);
                todosRef.on('value', snap => {
                    if (snap.exists() !== false){
                        if ( snap.val().password === this.state.password){
                            cookie.save('user_id', this.state.nim, {
                                path: '/'
                            })
                            cookie.save('access', this.state.nim, {
                                path: '/'
                            })
                            cookie.save('role', 1, {
                                path: '/'
                            })
                            setTimeout(() => {
                                window.location = "/dashboard";
                            },0);
                        }else if (snap.val().password !== this.state.password){
                            this.setState({
                                loading : false
                            })
                            swal("Oops!", "Password salah!", "ERROR");
                        }
                    }else{
                        axios.post('https://if.unram.ac.id/apps/e-skke/api_sia/Mahasiswa.php?nim='+this.state.nim)
                        .then(function (response) {
                            if(response.data!=='kosong'){
                                // console.log(response.data);
                                cookie.save('user_id', response.data.student.nim, {
                                    path: '/'
                                })
                                cookie.save('access', response.data.student.nim, {
                                    path: '/'
                                })
                                cookie.save('role', 1, {
                                    path: '/'
                                })
                                setTimeout(() => {
                                    todosRef.set({
                                        Goldar      : '',
                                        aktif       : 0,
                                        foto        : response.data.student.foto,
                                        password    : response.data.student.nim,
                                        nama        : response.data.student.nama,
                                        email       : response.data.student.email,
                                        no_hp       : response.data.student.no_hp
                                    }); 
                                }, 0);
                            }else{
                                
                                this.setState({
                                    loading : false
                                });
                                swal("WARNING!", "Username atau Password salah!", "ERROR");
                            }
                        })
                        .catch(function (error) {
                            self.setState({
                                loading : false,
                                nim     : '',
                                password: ''
                            })
                            console.log(error);
                        });
                    }
                });
            
            }
            else if (this.state.nim.length === 5){
                const todosRef = databaseRef.child("Sadmin").child(this.state.nim);
                
                todosRef.on('value', snap => {
                    if (snap.exists() !== false){
                        if ( snap.val().password === this.state.password){
                            cookie.save('user_id', this.state.nim, {
                                path: '/'
                            })
                            cookie.save('access', this.state.nim, {
                                path: '/'
                            })
                            cookie.save('role', 3, {
                                path: '/'
                            })
                            
                            setTimeout(() => {
                                window.location = "/";
                               
                            },0);

                        }else if (snap.val().password !== this.state.password){
                            this.setState({
                                loading : false
                            })
                            swal("Oops!", "Password salah!", "ERROR");
                        }
                    }
                });
            }
            else if(this.state.nim.length >= 10){
                const todosRef = databaseRef.child("Admin").child(this.state.nim);
                todosRef.on('value', snap => {
                    if (snap.exists() !== false){
                        if ( snap.val().password === this.state.Password){
                            cookie.save('user_id', this.state.nim, {
                                path: '/'
                                // expires: new Date(Date.now()+2592000)
                            })
                            cookie.save('access', this.state.nim, {
                                path: '/'
                            })
                            cookie.save('role', 2, {
                                path: '/'
                            })
                            setTimeout(() => {
                                window.location = "/dashboard";
                            }, 0);
                        }else if (snap.val().password !== this.state.nim){
                            this.setState({
                                loading : false
                            })
                            swal("Oops!", "Password salah!", "ERROR");
                        }
                    }else{
                        this.setState({
                            loading : false
                        })
                        swal("Oops!", "Username atau Password salah!", "ERROR");
                    }
                })
            }
            else{
                this.setState({
                    loading : false
                })
                swal("Oops!", "Username atau Password salah!", "ERROR");
            }
        }else{
            this.setState({
                loading : false
            })
            swal("Oops!", "Username atau Password salah!", "ERROR");
        }
    }

    render(){
        return(
            <div>
            <div>
            <div className='padLogin'/>
                <div >
                    <div >
                       <center> <div className='input-group' style={{'marginTop':30}}>
                            <div className="auth-box-icon text-center"><i className="fa fa-user" ></i><br/><br/></div>
                                    
                                    <center><form  onSubmit={this.handleSubmit}>
                                                                    
                                        <div className='input-group' >
                                       
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control"  name="username" placeholder="Masukkan NIM" onChange={this.handleChangeNIM}/>
                                        </div><br/>

                                        <div className="input-group" >
                                        
                                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                                            <input type="password" className="form-control" name="password" id="signin-password" placeholder="Masukkan Password" onChange={this.handleChangePassword}/>
                                        </div><br/>
                                        <div className='sweet-loading' >
                                        <center><BeatLoader
                                                color={'#808080'} 
                                                loading={this.state.loading} 
                                            /></center>
                                        </div>
                                        <br/>
                                        <div className="form-group text-center no-gutters mb-4" >
                                        <div className="bottom" >
                                                <span className="helper-text"><i className="fa fa-lock"></i> <a data-toggle="modal" data-target="#forget"> Lupa Kata Sandi?</a></span>
                                                
                                            </div>
                                            <center><button className="btn btn-primary btn-lg btn-block" type="submit">{ this.state.loading ? "Loading..." : "Masuk" }</button></center><br/>
                                        </div>                                     
                                    </form></center> <br/>           
                            
                            <div className="clearfix"></div>
                        </div>
                        </center>
                    </div>
                </div>
            </div>

            <div id="forget" className="modal Beat" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="vertical-align-wrap">
                    <div className="vertical-align-middle">
                        <div className="auth-box lockscreen clearfix">
                            <div className="content">
                                <h2 className="text-center"><b>Lupa Password</b></h2>
                                <div className="auth-box-icon text-center"><i className="fa fa-user" ></i></div>
                                <div className="user text-center">
                                    Fast Blood
                                </div>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Enter your NIM ..." onChange={this.nimForgetPass}/>
                                    <span className="input-group-btn"><button type="submit" className="btn btn-primary2" onClick={this.kirimEmailPass}><i className="fa fa-arrow-right"></i></button></span>
                                </div>
                                <h5 className="name" >*Password akan dikirim melalui Email Anda</h5>
                            </div>
                            <div className="logo text-center">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Kembali</button>                            
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            
            </div>
        )
    }
}
export default Masuk