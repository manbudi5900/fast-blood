import React, {Component} from 'react';
import firebase from 'firebase';
import '../assets/css/bootstrap.css';

class EventDonor extends Component{
    constructor(props){
        super(props);
        this.state ={
            data    :[],
            jumlah  : 0
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
    
    render(){
        const filteredCountries = this.state.data
        return(
            <div className="main">
            <div className="main-content">
                <div className="container-fluid">
                    <h3 className="page-title">Fast Blood Universitas Mataram<br/><br/> ---Event - Event Donor---</h3>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel">
                                <div className="panel-heading">
                                    <h1 className="panel-title"><i><b><u>Event - Event Donor</u></b></i></h1>
                                </div>
                               
                                <div className="panel-body">
                                    <div  className="panel-heading">
                                       
                                     <div className="row">
                                        <div className="col-md-6">
                                        {
                                            filteredCountries.map((adm) => {
                                                return(
                                            
                                            <div className="metric" key={adm['.key'] }>
                                                <h1 className="panel-title text-center"><b>{adm['lembaga']}</b></h1><br/>
                                                <div className=" metric text-center"><img className="foto" src={adm['link']} /></div>
                                                <div className="panel-title text-center">{adm['Keterangan']}</div>       
                                            </div>
                                            
                                             )
                                            })
                                        } 
                                        </div>

                                     </div>
                                     
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
export default EventDonor