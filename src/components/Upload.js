import React, {Component} from 'react';
import cookie from 'react-cookies';
import firebase from 'firebase';
import swal from 'sweetalert';

class Upload extends Component{
    constructor(props){
        super(props);
        this.state ={
            Lemabaga    :   '',
            Keterangan  : '',
            namaFile    : '',
            jpg         : null,
            filenya     : false,
            pdf         : null,
            surat       : '',  
            browser       : '',  
        }
     
       
        this.handleUpload = this.handleUpload.bind(this)
        this.handleKet = this.handleKet.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLem  = this.handleLem.bind(this)
    }
   
   
    handleUpload(event){ 
        const jpg = event.target.files[0];
        this.setState(()=>({jpg}));
        let files = event.target.files;
        let reader = new FileReader();
        // console.log(event.target.files[0].name);
        if(files[0]!==null){
            reader.readAsDataURL(files[0]);
            this.setState({ filenya : true })
        }
            const storage = firebase.storage();
            const uploadFile = storage.ref(`uploadFile/${cookie.load('user_id')+'.jpg'}`).put(jpg);
            
            uploadFile.on('state_changed', 
            (snapshot)=>{}, 
            (error)=>{console.log(error)
            }, 
            ()=>{
                storage.ref('uploadFile').child(''+cookie.load('user_id')+'.jpg').getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({ browser : url })
                })
            });
    }
    handleUploadS(event){ 
        const pdf = event.target.files[0];
        this.setState(()=>({pdf}));
        let files = event.target.files;
        let reader = new FileReader();
        // console.log(event.target.files[0].name);
        if(files[0]!==null){
            reader.readAsDataURL(files[0]);
            this.setState({ filenya : true })
        }
            const storage = firebase.storage();
            const uploadFile = storage.ref(`Surat/${cookie.load('user_id')+'.pdf'}`).put(pdf);
            uploadFile.on('state_changed', 
            (snapshot)=>{}, 
            (error)=>{console.log(error)
            }, 
            ()=>{
                storage.ref('Surat').child(''+cookie.load('user_id')+'.pdf').getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({ surat : url })
                    
                })
            });
    }
    handleLem(event){ this.setState({ Lemabaga : event.target.value })
    console.log(this.state.Keterangan)
    }

    handleKet(event){ this.setState({ Keterangan : event.target.value })
    console.log(this.state.Keterangan)
    }
    
    handleSubmit(event){ 
        const databaseRef = firebase.database().ref();
        const todosRef = databaseRef.child("uploadFile").child(cookie.load('user_id'));
        todosRef.set({
        lembaga     : this.state.Lemabaga,
        Keterangan  : this.state.Keterangan,
        link        : this.state.browser,
        Surat       : this.state.surat,
        sv          : 0,
        nim         : cookie.load('user_id')
        });
            setTimeout(() => {
                swal("Success! Anda berhasil menambah data!", {
                    icon: "success",
                });
              }, 3000)
        
    }
    render(){
        return(
            
            <div>
            <div className="main">
                <div className="main-content">
                <br/>
                    
                        <div className="auth-box" style={{'backgroundColor':'#000000'}}>
                           <center> <h4 style={{'color':'white'}}>Form Pengajuan Even</h4></center><br/>
                                    
                                    <form  onSubmit={this.handleSubmit}> 
                                        
                                        <div className='input-group' style={{'paddingLeft':10,'paddingRight':10}}>
                                        <p style={{'float':'left','color':'white'}}>Brosur</p>   
                                        <input type="file" name='file' onChange={(event)=>this.handleUpload(event)} className="form-control" />
                                        </div>

                                        <div className='input-group' style={{'paddingLeft':10,'paddingRight':10}}>
                                        <p style={{'float':'left','color':'white'}}>Surat</p>
                                        <input type="file" name='Surat' onChange={(event)=>this.handleUploadS(event)} className="form-control"/>
                                        </div>

                                        <div className='input-group' style={{'paddingLeft':10,'paddingRight':10}}>
                                        <p style={{'float':'left','color':'white'}}>Keterangan</p>
                                        <input type="text" className="form-control"  name="Keterangan" placeholder="Masukkan Keterangan" onChange={this.handleKet}/>
                                        </div>

                                        <div className='input-group' style={{'paddingLeft':10,'paddingRight':10}}>
                                        <p style={{'float':'left','color':'white'}}>Lembaga</p>
                                        <input type="text" className="form-control"  name="Lemabaga" placeholder="Masukkan Lembaga" onChange={this.handleLem}/>
                                        </div>
                                       
                                        <br/>
                                        <div className="form-group text-center no-gutters mb-4" style={{'marginBottom':-20}} >
                                            <center><button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Ajukan</button></center><br/>
                                        </div>                                     
                                    </form><br/>          
                            
                            <div className="clearfix"></div>
                        </div>
                    <br/> <br/> <br/> <br/>
                    </div>
                </div>
                </div>
        )
    }
}
export default Upload

                                    {/* <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Browser</th>
                            <th>Surat</th>
                            <th>Keterangan</th>
                            <th align='center'>Tambahkan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <input type="file" name='file' onChange={(event)=>this.handleUpload(event)} className="form-control"/>
                            </td>
                            <td>
                            <input type="file" name='Surat' onChange={(event)=>this.handleUploadS(event)} className="form-control"/>
                            </td>
                            <td>
                            <input type="text" className="form-control"  name="Keterangan" placeholder="Masukan Keterangan" onChange={this.handleKet}/>
                            </td>
                            <td>
                            <input type="text" className="form-control"  name="Lemabaga" placeholder="Masukan Lemabaga" onChange={this.handleLem}/>
                            </td>
                            <td align='center'>
                                <button type="button"  className="btn btn-primary" onClick={this.handleSubmit}>Tambah</button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table> */}