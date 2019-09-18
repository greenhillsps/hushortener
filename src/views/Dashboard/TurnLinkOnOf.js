import React from 'react';
import { Grid, FormGroup, Row, Col } from 'react-bootstrap'
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import { PutRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'
import { onGetUrlDetails } from '../../store/actions'
import { DateFormat } from '../../utils/helpers'
import Switch from 'react-bootstrap-switch';
import LinkDetailsHeader from '../../components/LinkDetailsHeader'
import { LockedFeature } from '../../utils/constants'

class TurnLinkOnOf extends React.Component {
    state = {
        toggle: true,
        change: '',
        unblockLoading: false,
        updateLoading: false
    }



    onSubmit = () => {
        const data = {
            blockIps: {},
            customExpiryDate: {},
            customReports: {},
            customShortUrl: {},
            enableToggle: { enable: this.state.toggle },
            fourOfour: {},
            urlRedirectto: {}
        }
        this.setState({ updateLoading: true })
        PutRequest.updateFeature(this.props.urlDetails.URL._id, data).then(res => {
            this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
            this.props.setNotification("success", `Turn ${this.state.toggle ? "on" : "off"} link successfully`)
            this.setState({ updateLoading: false })
        }).catch(err => {
            this.props.setNotification("error", err.message)
            this.setState({ updateLoading: false })
        })
    }
    onUnlock = () => {
        const data = {
            blockIps: false,
            customExpiryDate: false,
            customReports: false,
            customShortUrl: false,
            enableToggle: true,
            fourOfour: false,
            urlRedirectto: false
        }
        this.setState({ unblockLoading: true })
        PutRequest.BuyFeature(this.props.urlDetails.URL._id, data).then(res => {
            this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
            this.props.setNotification("success", "The feature was unblocked successfully")
            this.setState({ unblockLoading: false })
        }).catch(err => {
            this.props.setNotification("error", err.message)
            this.setState({ unblockLoading: false })
        })
    }
    render() {
        console.log("abcd", this.props.urlDetails)
        const { toggle, unblockLoading, updateLoading, change } = this.state
        const { URL } = this.props.urlDetails
        var feature = {
            locked: true,
            expiryDate: '',
            enable: false

        }

        if (URL) {
            feature.locked = URL.features.enableToggle.locked;
            feature.expiryDate = URL.features.enableToggle.expiryDate;
            feature.enable = URL.features.enableToggle.enable
        }
        return (
            <Grid className="feature_rapper" fluid>
                <LinkDetailsHeader />
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Card
                            title={"Turn Link On/Of"}
                            content={
                                <div>
                                    <FormGroup style={{ textAlign: 'center' }} className="input-wrapper">
                                        <Row>
                                            <Switch
                                                onChange={() => this.setState({ change: 'changed', toggle: !this.state.toggle })}
                                                value={change === '' ? feature.enable : toggle}
                                                onText="Unblock"
                                                offText="Block"
                                                className="golu-golu"
                                            />
                                        </Row>

                                        <label>Expiry Date:</label><span>{DateFormat(feature.expiryDate)}</span>
                                    </FormGroup>
                                    <Row className="button_rapper" >
                                        <Button
                                            fill
                                            //bsStyle="success"
                                            round
                                            onClick={this.onSubmit}
                                            disabled={feature.locked || updateLoading}
                                        >
                                            <i className={feature.locked ? "fa fa-lock" : "fa fa-unlock"} />
                                            {updateLoading ? <i className="fa fa-spin fa-spinner" /> : "Update"}
                                        </Button>
                                        <Button
                                            disabled={!feature.locked || unblockLoading}
                                            fill
                                            //bsStyle="danger"
                                            round
                                            onClick={this.onUnlock}
                                        // disabled={feature.locked}
                                        >
                                            {unblockLoading ? <i className="fa fa-spin fa-spinner" /> : "Unlock"}
                                        </Button>
                                    </Row>
                                    <Row style={{ textAlign: 'center' }} >{
                                        feature.locked && <label className="_error">{LockedFeature}</label>

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

const mapStateToProps = state => {
    return {
        urlDetails: state.urlDetails
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setNotification: (errorType, message) => dispatch({ type: 'SET_NOTIFICATION', errorType: errorType, errorMessage: message }),
        onGetUrlDetails: (id) => dispatch(onGetUrlDetails(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnLinkOnOf)