import React from 'react';
import { Grid, FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap'
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import { PutRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'
class LinkRedirectOption extends React.Component {
    state = {
        redirectLink: ''
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
        PutRequest.updateFeature(this.props.urlDetails.URL._id,data).then(res=>{

        }).catch(err=>{

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
      PutRequest.BuyFeature(this.props.urlDetails.URL._id,data).then(res=>{

    }).catch(err=>{

    })
    }
    render() {
        console.log("abcd",this.props.urlDetails)
        const { redirectLink } = this.state
        const { URL }=this.props.urlDetails
        var feature={
            locked:false
        }
        if(URL){
            feature.locked=URL.features.urlRedirectto
        }
        return (
            <Grid className="feature_rapper" fluid>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Card
                            title={"Link redirect option"}
                            content={
                                <FormGroup controlId="formBasicEmail">
                                    <ControlLabel>Redirect Link</ControlLabel>
                                    <FormControl type="rext" value={redirectLink} onChange={(e) => this.setState({ redirectLink: e.target.value })} placeholder="Choose redirect link" />
                                    <Row className="button_rapper" >
                                        <Button
                                        fill
                                        bsStyle="success"
                                        round
                                        onClick={this.onSubmit}
                                        disabled={feature.locked}
                                    >
                                       <i className={feature.locked?"fa fa-lock":"fa fa-unlock"} /> Update
                                      </Button>
                                      <Button
                                        fill
                                        bsStyle="danger"
                                        round
                                        onClick={this.onUnlock}
                                       // disabled={feature.locked}
                                    >
                                       Unlock
                                      </Button>
                                    </Row>
                                </FormGroup>
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

export default connect(mapStateToProps)(LinkRedirectOption)