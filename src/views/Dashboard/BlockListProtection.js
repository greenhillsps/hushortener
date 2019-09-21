import React from 'react';
import { Grid, FormGroup, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import { PutRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'
import { onGetUrlDetails } from '../../store/actions'
import { DateFormat } from '../../utils/helpers'
import LinkDetailsHeader from '../../components/LinkDetailsHeader'
import { LockedFeature } from '../../utils/constants'
class BlockListProtection extends React.Component {
    state = {
        unblockLoading: false,
        updateLoading: false,
        ip: '',
        ipsList: [],
        error: ''
    }

    componentWillReceiveProps(props) {
        if (props.urlDetails.URL) {
            this.setState({ ipsList: props.urlDetails.URL.features.blockIps.ips })
        }
    }
    componentDidMount() {
        if (this.props.urlDetails.URL) {
            this.setState({ ipsList: this.props.urlDetails.URL.features.blockIps.ips })
        }
    }

    onAddIps = () => {
        const { error, ip, ipsList } = this.state;
        if (ip === '') {
            this.setState({ error: 'Empty field not allowed!' })
            return;
        }
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
            var newIpsList = ipsList;
            newIpsList.push(ip)
            this.setState({ error: '', ipsList: newIpsList }, () => {
                this.setState({ ip: '' })
            })

        }
        else {
            this.setState({ error: 'Ip address not valid!' })
            return;
        }
    }

    onDelte = (id) => {
        var newlist = this.state.ipsList;
        newlist.splice(id, 1)
        this.setState({ ipsList: newlist })
    }
    onSubmit = () => {
        const data = {
            blockIps: { ips: this.state.ipsList },
            customExpiryDate: {},
            customReports: {},
            customShortUrl: {},
            enableToggle: {},
            fourOfour: {},
            urlRedirectto: {}
        }
        this.setState({ updateLoading: true })
        PutRequest.updateFeature(this.props.urlDetails.URL._id, data).then(res => {
            this.props.onGetUrlDetails(this.props.urlDetails.URL._id)
            this.props.setNotification("success", "Block List updated successfully")
            this.setState({ updateLoading: false })
        }).catch(err => {
            this.props.setNotification("error", err.message)
            this.setState({ updateLoading: false })
        })
    }
    onUnlock = () => {
        const data = {
            blockIps: true,
            customExpiryDate: false,
            customReports: false,
            customShortUrl: false,
            enableToggle: false,
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
        const { unblockLoading, updateLoading, ip, ipsList, error } = this.state
        const { URL } = this.props.urlDetails
        var feature = {
            locked: true,
            expiryDate: '',

        }

        if (URL) {
            feature.locked = URL.features.blockIps.locked;
            feature.expiryDate = URL.features.blockIps.expiryDate;
        }
        return (
            <Grid fluid>
                <LinkDetailsHeader />
                <Row className="feature_rapper">
                    <Col md={6} mdOffset={3}>
                        <Card
                            title={"Block List Protection"}
                            content={
                                <div>
                                    <FormGroup style={{ textAlign: 'center' }} className="input-wrapper">
                                        <FormControl type="text"
                                            value={ip} onChange={(e) => this.setState({ ip: e.target.value })}
                                            placeholder="Enter a ip that you want to block"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    this.onAddIps()
                                                }
                                            }}
                                        />
                                        {error !== '' && <div className="_error" >{error}</div>}
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
                                    <div className="_ip_number_wrapper" >
                                        {
                                            ipsList.map((ip, key) => (
                                                <div>
                                                    <div className="_ip_number" key={key}>
                                                        {ip}
                                                        <span>
                                                            <Button
                                                                onClick={() => {
                                                                    this.onDelte(key)
                                                                }}
                                                                bsStyle="danger"
                                                                simple
                                                                icon
                                                                view="Delete"
                                                            >
                                                                <i className="fa fa-times" />
                                                            </Button>
                                                        </span>
                                                    </div>
                                            </div>
                                            ))
                                        }
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockListProtection)