import React from 'react';
import Select from "react-select";
import "react-select/dist/react-select.css";
import Button from "components/CustomButton/CustomButton.jsx";
import Card from "components/Card/Card.jsx";
import Map from '../GoogleMapAutoCompleat';
import {
    Col,
    Row,
    Grid
} from "react-bootstrap";


class MapA extends React.Component {



    state = {
        address: '',
        mapPosition: {
            lat: 0,
            lng: 0
        },
        markerPosition: {
            lat: 0,
            lng: 0
        },
        latInput: 0,
        lngInput: 0,
        nextScreen: false,
    }

    //on click to lnext button
    OnNext = () => {
        this.setState({ nextScreen: true })
    }
    onResponse = (res) => {

        this.setState({
            address: (res.LongAddress) ? res.LongAddress : '',

        })
    }

    onChangePosition = (latValue, lngValue) => {
        this.setState({

            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
            latInput: latValue,
            lngInput: lngValue
        })
    }
    render() {

        return (

            <div>
                <Card
                    //title="Address Details"
                    content={
                        <div>
                            <h4 className='title_bar'>Address Details</h4>
                            <Row>
                                <Col md={6}>
                                    <Map
                                        center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                                        height='300px'
                                        zoom={15}
                                        address={this.state.address}
                                        onResponse={this.onResponse}
                                        mapPosition={this.state.mapPosition}
                                        markerPosition={this.state.markerPosition}
                                        onChangePosition={this.onChangePosition}
                                    //location={location}
                                    />
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="Latitude">Latitude</label>
                                        <input type="number" name="latitude" className="form-control" onChange={(e) => {
                                            this.setState({

                                                latInput: e.target.value
                                            })
                                        }} value={this.state.latInput} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Longitude">Longitude</label>
                                        <input type="number" name="longitude" className="form-control" onChange={(e) => {
                                            this.setState({

                                                lngInput: e.target.value
                                            })
                                        }} value={this.state.lngInput} />
                                    </div>

                                    <Button
                                        disabled={this.state.editAddressLoading}
                                        type="Next"
                                        bsStyle="info"
                                        fill
                                        wd
                                        onClick={() => {
                                            this.OnNext()
                                        }}
                                    >
                                        {this.state.editAddressLoading ? 'Loading...' : 'Next'}
                                        <i className={this.state.editAddressLoading ?
                                            "fa fa-spin fa-spinner" : ''} />


                                    </Button>

                                </Col>

                            </Row>





                        </div>

                    } />

                {
                    this.state.nextScreen ?
                        this.props.history.push('/systemInformation')
                        : null
                }
            </div>
        )
    }
}

export default MapA;