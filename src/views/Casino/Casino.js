import React from "react"
import { Row, Col, Input, Button} from "reactstrap"
import { connect } from "react-redux";
import {providerchange,gametypechange,filterData,data_load} from "../../redux/actions/casino" 
import {setloginpage,casino_images,playsaccount,playsaccountguest} from "../../redux/actions/auth/loginActions"
import CasinoItems from "./CasinoItems"
import {Root} from "../../authServices/rootconfig"
import {Search} from "react-feather"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import 'react-awesome-slider/dist/styles.css';
import {providerconfig} from "../../configs/providerConfig"
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from "react-select"
import MultiSelect from "react-multi-select-component";

const AutoplaySlider = withAutoplay(AwesomeSlider);

class Casino extends React.Component {

  static getDerivedStateFromProps(props, state) {
    if (props.dataList.data.length !== state.data.length || props.allData !== props.dataList.filteredData) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
    }
  }
  return null;
}
      state = {
          casinoItems : [],
          index : 1,
          data: [],
          allData: [],
          value: "",
          bool : false
        }

    componentDidMount(){
      this.props.casino_images();
      this.props.data_load(providerconfig["CASINO/SLOTS"]);
      window.addEventListener('scroll', this.listenToScroll)
    }
    
    componentWillUnmount() {
      window.removeEventListener('scroll', this.listenToScroll)
    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.index !== this.state.index){
        let {data,allData,value} = this.state
        let indata=value.length ? allData.slice(0,this.state.index*24) : data.slice(0,this.state.index*24);
        if(this.state.index*24 > indata.length){
          this.setState({bool:true})
        }else{
          this.setState({bool:false})
        }
      }
    }
    
    listenToScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll+350) / height;
      if(scrolled>=1){
        this.setState({index : this.state.index+1});
      }
    }


    handleFilter(e){
      this.setState({ value: e.target.value })
      this.props.filterData(e.target.value)
    }

    play = (item) =>{
      if(!this.props.user.values){
        this.props.setloginpage({login : true, register : false});
      }else{
        this.props.playsaccount(this.props.user.values,item.gamedata,true);
      }
    }


    render() {
      let {data,allData,value} = this.state
      let indata=value.length ? allData.slice(0,this.state.index*24) : data.slice(0,this.state.index*24);
        return(
            <React.Fragment>

                <Row className="fp-header  p-0 m-0 w-100">
                    <Col lg="12" md="12" className="p-0 m-0 w-100">
                        <div className="fp-header-image p-0 m-0 w-100">
                        {
                          this.props.casinoSlider_images ?
                            (
                              <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false}
                                interval={6000}
                                organicArrows={false}
                                animation="scaleOutAnimation"
                                bullets={true}
                              >
                                {
                                    this.props.casinoSlider_images.map((item, i) => (
                                      <div  className='firstpage-sliber-text' key={i} data-src={Root.imageurl+item.image}>
                                        <div style={{zIndex:50}} className="fp-header-def">
                                        {/* <div className='fp-header-def-h'>
                                          <h1><strong>{item.data.text1}</strong></h1>
                                        </div> */}
                                        {/* <div className="fp-header-def-c" style={{maxWidth:'250px', overflow:'hidden', border:'none'}}>
                                          <h5>{item.data.text2}</h5>
                                        </div> */}
                                        <div className="fp-header-def-c" style={{padding:'10px', top:'70%', right: '2vw'}}>
                                          <Button color="success" onClick={()=>this.play(item.data)}>&nbsp;Play&nbsp;Now</Button>
                                        </div>
                                        </div>
                                      </div>
                                    ))
                                }
                            </AutoplaySlider>
                            ):(
                              <div/>
                            )
                        }
                          </div>
                    </Col>
                </Row>
                 <Row className="p-0 m-0 mt-1 w-100">
                 <Col  md="3" sm="12">

                  </Col>

                    <Col  md="3" sm="12">
                         <div className="React casino-game-show-select m-1 ml-1">
                            <Search size={18} style={{    position: 'absolute',top: '1.6rem',marginLeft:"0.5rem"}} /> 
                            <Input  type="text" name="livecasino-game-search" style={{borderColor: '#18480c',border: '1px solid #d9d9d9',paddingLeft:"2.5rem"}} onChange={e => this.handleFilter(e)} />
                        </div>
                    </Col>
                    <Col  md="3" sm="12">
                      <div className="React casino-game-show-select m-1">
                      <Select
                        options={this.props.types} 
                        placeholder="GAME TYPES"
                        value={this.props.types.find(obj => obj.value === this.props.settype.value)}
                        onChange={(e)=>this.props.gametypechange(e.value)}
                          className="React"
                          classNamePrefix="select"
                        />                       
                      </div>
                    </Col>
                    <Col  md="3" sm="12">
                      <div className="React casino-game-show-select m-1">
                      <MultiSelect
                        options={this.props.provider}
                        className="multi-select"
                        classNamePrefix="select"
                        selectAllLabel="ALL PROVIDER"
                        hasSelectAll="All"
                        shouldToggleOnHover={true}
                        value={this.props.setprovider}
                        focusSearchOnOpen={true}
                        onChange={(e)=>this.props.providerchange(e)}
                        labelledBy={"Select Provider"}
                      />
                      
                      </div>
                    </Col>
                  
                </Row>
                  
                <div style={{minHeight:"25rem"}}>                
                  <Row  className="w-100 p-0 m-0 mb-1">
                    {
                      indata.length > 0 ?
                      indata.map((item,i) => (
                          <CasinoItems key={i} data={item} me={this.props} />
                      )) : 
                    <div></div>
                    }
                  </Row>
                </div>

            </React.Fragment>
        )
    }
}

const get_game  = (state) =>{

    return { 
      user : state.auth.login,
      casinoSlider_images : state.auth.login.casino_images,
      dataList: state.casinolist,
      provider : state.casinolist.providerData,
      types : state.casinolist.types,
      settype : state.casinolist.settype,
      setprovider : state.casinolist.setprovider
    }
}

export default connect(get_game,{setloginpage,casino_images,providerchange,gametypechange,filterData,playsaccount,data_load,playsaccountguest})(Casino)