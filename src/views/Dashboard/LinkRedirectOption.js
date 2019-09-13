import React from 'react';
import { Grid, FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap'
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import { PutRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'
import { onGetUrlDetails } from '../../store/actions'
import { DateFormat } from '../../utils/helpers'
import LinkDetailsHeader from '../../components/LinkDetailsHeader'

class LinkRedirectOption extends React.Component {
    state = {
        redirectLink:'',
        unblockLoading:false,
         updateLoading:false
    }

    onSubmit = () => {
        const data = {
            blockIps: {},
            customExpiryDate: {},
            customReports: {},
            customShortUrl: {},
            enableToggle: {},
            fourOfour: { allow: false },
            urlRedirectto: { change: true, url:this.state.redirectLink }
        }
        this.setState({updateLoading:true})
        PutRequest.updateFeature(this.props.urlDetails.URL._id,data).then(res=>{
            this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
            this.props.setNotification("success","Link updated successfully")
            this.setState({updateLoading:false})
        }).catch(err=>{
            this.props.setNotification("error",err.message)
            this.setState({updateLoading:false})
        })
    }
    onUnlock=()=>{
      const data={
        blockIps: false,
        customExpiryDate: false,
        customReports: false,
        customShortUrl: false,
        enableToggle: false,
        fourOfour: false,
        urlRedirectto: true
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
        const { redirectLink,unblockLoading,updateLoading } = this.state
        const { URL }=this.props.urlDetails
        var feature={
            locked:true,
            expiryDate:'',
            url:''

        }

        if(URL){
            feature.locked=URL.features.urlRedirectto.locked;
            feature.expiryDate=URL.features.urlRedirectto.expiryDate;
            feature.url=URL.features.urlRedirectto.url
        }
        return (
            <Grid className="feature_rapper" fluid>
                <LinkDetailsHeader/>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Card
                            title={"Link redirect option"}
                            content={
                                <div>
                                <FormGroup className="input-wrapper">
                                    <ControlLabel>Redirect Link</ControlLabel>
                                    <FormControl type="rext" value={redirectLink===''?feature.url:redirectLink} onChange={(e) => this.setState({ redirectLink: e.target.value })} placeholder="Choose redirect link" />
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

export default connect(mapStateToProps,mapDispatchToProps)(LinkRedirectOption)