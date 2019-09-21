import React from 'react';
import { Grid, FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap'
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import { PutRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'
import { onGetUrlDetails } from '../../store/actions'
import { DateFormat } from '../../utils/helpers'
import LinkDetailsHeader from '../../components/LinkDetailsHeader'
import { LockedFeature } from '../../utils/constants'
class CustomShortLink extends React.Component {
    state = {
        CustomLink:'',
        unblockLoading:false,
         updateLoading:false,
         error:''
    }

componentDidMount(){
    if(this.props.urlDetails.URL){
        this.setState({CustomLink:this.props.urlDetails.URL.queryKey})
    }
}

componentWillReceiveProps(props){
    if(props.urlDetails.URL){
        this.setState({CustomLink:props.urlDetails.URL.queryKey})
    }
}

    onSubmit = () => {
        const data = {
            blockIps: {},
            customExpiryDate: {},
            customReports: {},
            customShortUrl: {shortUrl: this.state.CustomLink},
            enableToggle: {},
            fourOfour: {},
            urlRedirectto: {}
        }
        this.setState({updateLoading:true,error:''})
        PutRequest.updateFeature(this.props.urlDetails.URL._id,data).then(res=>{
            this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
            this.props.setNotification("success","Link updated successfully")
            this.setState({updateLoading:false})
        }).catch(err=>{
            if(err.response.status===401)
            this.setState({updateLoading:false,error:"The link is already exist!"})
            else{
            this.props.setNotification("error",err.message)
            this.setState({updateLoading:false,error:''})
            }
        })
    }
    onUnlock=()=>{
      const data={
        blockIps: false,
        customExpiryDate: false,
        customReports: false,
        customShortUrl: true,
        enableToggle: false,
        fourOfour: false,
        urlRedirectto: false
      }
      this.setState({unblockLoading:true})
      PutRequest.BuyFeature(this.props.urlDetails.URL._id,data).then(res=>{
        this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
        this.props.setNotification("success","The feature was unblocked successfully")
        this.setState({unblockLoading:false})
    }).catch(err=>{
        this.props.setNotification("error",err.message)
        this.setState({unblockLoading:false})
    })
    }
    render() {
        console.log("abcd",this.props.urlDetails)
        const { CustomLink,unblockLoading,updateLoading,error } = this.state
        const { URL }=this.props.urlDetails
        var feature={
            locked:true,
            expiryDate:'',
            
        }

        if(URL){
            feature.locked=URL.features.customShortUrl.locked;
            feature.expiryDate=URL.features.customShortUrl.expiryDate;
        }
        return (
            <Grid className="feature_rapper" fluid>
                <LinkDetailsHeader/>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Card
                            title={"Custom short link"}
                            content={
                                <div>
                                <FormGroup className="input-wrapper">
                                    <ControlLabel>short link</ControlLabel>
                                    <FormControl type="rext" value={CustomLink} onChange={(e) => this.setState({ CustomLink: e.target.value })} placeholder="Enter your custom link" />
                                   {error!==''&&<Row className="_error">{error}<br/></Row>}
                                   <label>Expiry Date:</label><span>{DateFormat(feature.expiryDate)}</span>
                                </FormGroup>
                                 <Row className="button_rapper" >
                                 <Button
                                 fill
                                 round
                                 onClick={this.onSubmit}
                                 disabled={feature.locked||updateLoading}
                             >
                                <i className={feature.locked?"fa fa-lock":"fa fa-unlock"} />
                                {updateLoading?<i className="fa fa-spin fa-spinner"/>:"Update"}
                               </Button>
                               <Button
                                disabled={!feature.locked||unblockLoading}
                                 fill
                                 round
                                 onClick={this.onUnlock}
                                // disabled={feature.locked}
                             >
                               {unblockLoading?<i className="fa fa-spin fa-spinner"/>:"Unlock"}
                               </Button>
                             </Row>
                             <Row style={{textAlign:'center'}} >{
                                feature.locked&&<label className="_error">{LockedFeature}</label>

                             }</Row>
                             </div>
                            }
                        />
                    </Col>
                </Row>

            </Grid>
        )
    }
}

const mapStateToProps=state=>{
    return{
        urlDetails:state.urlDetails
    }
}
const mapDispatchToProps=dispatch=>{
  return{
    setNotification:(errorType,message)=>dispatch({type:'SET_NOTIFICATION',errorType:errorType,errorMessage:message}),
    onGetUrlDetails:(id)=>dispatch(onGetUrlDetails(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomShortLink)