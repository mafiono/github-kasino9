import React from "react"
import {Button, Col, Row} from "reactstrap"
import * as Icon from "react-feather"
import { Root } from "../../authServices/rootconfig";
import { GiRetroController } from "react-icons/gi"

class Casino extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items : [],
            additems : [],
            loading : false,
        }
    }
    componentDidMount(){
        this.setState({items : this.props.data.slice(1, 9),additems : this.props.data.slice(9, 21)});
    }

    gettokenreal(games){
        if(!this.me.me.user.values){
            this.me.me.setloginpage({login : true, register : false});
        }else{
            this.me.me.playsaccount(this.me.me.user.values,games,true);
        }
    }

    frgettokenreal(){
        if(!this.props.me.user.values){
            this.props.me.setloginpage({login : true, register : false});
        }else{
            this.props.me.playsaccount(this.props.me.user.values,this.props.data[0],true);
        }
    }

    toggleloading(value) {
        this.setState({
            loading : value,
        })
    }

    render(){
        if(this.props.data.length){
            var firstdata = this.props.data[0];
        var url = firstdata.image ? firstdata.image.length > 0 ? firstdata.image.slice(0,5) === "https" ? firstdata.image : Root.imageurl + firstdata.image : "" : ""

            return(
                <Row className="match-height mb-1 m-0">
                    <Col col="4" xs="12" sm="12" md="4" lg="4" style={{padding:"10px"}}>
                        <div style={{backgroundImage:"url("+url+")", height:"100%", backgroundSize:"100% 100%", padding:"28% 0px", backgroundPosition:"50%",borderRadius:"10px"}}></div>
                        <div className="casino-innor" style={{left:"0px",width: 'calc(100% - 20px)',height: 'calc(100% - 20px)',margin:"10px"}}>
                            <div className="casino-innor-heart" style={{padding:"1% 2%"}}>
                                {
                                    firstdata.heart === false ? <Icon.Heart size={15} color={'white'} /> : <Icon.Heart size={15} color={'red'} />
                                }
                            </div>
                            <div className="casino-innor-buttons">
                                <Button className="first-casino-1 first-button" color="success"  onClick={()=>this.frgettokenreal()} >PLAY FOR REAL</Button>
                            </div>
                            <div className="casino-innor-title-container">
                                <span className="casino-innor-title-container-left">{firstdata.NAME}</span>
                                <span className="casino-innor-title-container-right"><Icon.Star size={12} color={'yellow'} /></span>
                            </div>
                        </div>
                        <GiRetroController style={{
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%',
                            position:'absolute',
                            zIndex:'-1'
                        }} size={50} color={'#1fae73'}/>
                    </Col>
                    <Col lg="8" md="8" sm="12">
                        <Row>
    
                            {(()=>{
                                if(this.state.items.length > 0){
                                    return(
                                        this.state.items.map((item, i) => <Casinos data = {item} key = {i} index={i+1}   gettokenreal={this.gettokenreal} me ={this.props}/>)
                                    )
                                }
                            })()}
                        </Row>
                    </Col>
                    {
                        this.state.additems.length > 0 ?  this.state.additems.map((item, i) => <Casinosadd data = {item} key = {i} index={i+1}  gettokenreal={this.gettokenreal} me ={this.props} />) : ''
                    }
                </Row>
            )
        }else{
            return(<div/>)
        }
    }
}

export default Casino


class Casinos extends React.Component{
    constructor(){
        super();
        this.state = {
            colstyle : {}
        }
    }
    componentDidMount(){
        this.props.index > 4 ?  this.setState({colstyle:{marginTop:"1.7% 14px",padding:"10px"}}):this.setState({colstyle:{marginTop : "0px 14px",padding:"10px"}})
    }
    render(){
        var firstdata = this.props.data;
        var url = firstdata.image ? firstdata.image.length > 0 ? firstdata.image.slice(0,5) === "https" ? firstdata.image : Root.imageurl + firstdata.image : "" : ""

        return(
            <Col  xs="6" sm="6" md="3" lg="3" style={this.state.colstyle}>
                <div style={{backgroundImage:"url("+url+")", backgroundSize:"100% 100%", padding:"35% 0px",borderRadius:"10px"}}></div>
                <div className="casino-innor" style={{width: 'calc(100% - 20px)',left:"0px",margin:"10px",height:'calc(100% - 20px)'}}>
                    <div className="casino-innor-heart" style={{padding:"1% 2%"}}>
                        {this.props.data.heart === false ? <Icon.Heart size={15} color={'white'} /> : <Icon.Heart size={15} color={'red'} />}
                    </div>
                    <div className="casino-innor-buttons">
                        <Button className="first-casino-2 first-button" color="success"  onClick={()=>this.props.gettokenreal(this.props.data)} >PLAY FOR REAL</Button>
                    </div>
                    <div className="casino-innor-title-container">
                        <span className="casino-innor-title-container-left">{this.props.data.NAME}</span>
                        <span className="casino-innor-title-container-right"><Icon.Star size={12} color={'yellow'} /></span>
                    </div>
                </div>
                <GiRetroController style={{
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                    position:'absolute',
                    zIndex:'-1'
                }} size={50} color={'#1fae73'}/>
            </Col>
        )
    }
}

class Casinosadd extends React.Component{
    constructor(){
        super();
        this.state = {
            colstyle : {}
        }
    }
    componentDidMount(){
        this.props.index > 6 ? this.setState({colstyle:{marginTop:"1.7% 14px",padding:"10px"}}):this.setState({colstyle:{marginTop : "0px 14px",padding:"10px"}})
    }
    render(){
        var firstdata = this.props.data;
        var url = firstdata.image ? firstdata.image.length > 0 ? firstdata.image.slice(0,5) === "https" ? firstdata.image : Root.imageurl + firstdata.image : "" : ""

        return(
            <Col  xs="6" sm="6" md="2" lg="2" style={this.state.colstyle}>
                <div style={{backgroundImage:"url("+url+")", backgroundSize:"100% 100%", padding:"35% 0px",borderRadius:"10px"}}></div>
                <div className="casino-innor" style={{width: 'calc(100% - 20px)',left:"0px",margin:"10px",height:'calc(100% - 20px)'}}>
                    <div className="casino-innor-heart" style={{padding:"1% 2%"}}>
                        {this.props.data.heart === false ? <Icon.Heart size={15} color={'white'} /> : <Icon.Heart size={15} color={'red'} />}
                    </div>
                    <div className="casino-innor-buttons">
                        <Button className="first-casino-1 first-button" color="success"  onClick={()=>this.props.gettokenreal(this.props.data)} >PLAY FOR REAL</Button>
                    </div>
                    <div className="casino-innor-title-container">
                        <span className="casino-innor-title-container-left">{this.props.data.NAME === "undefined" || this.props.data.NAME === null ? this.props.data.TYPE.toLocaleUpperCase() : this.props.data.NAME.toLocaleUpperCase() }</span>
                        <span className="casino-innor-title-container-right"><Icon.Star size={12} color={'yellow'} /></span>
                    </div>
                </div>
                <GiRetroController style={{
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                    position:'absolute',
                    zIndex:'-1'
                }} size={50} color={'#1fae73'}/>
            </Col>
        )
    }
}