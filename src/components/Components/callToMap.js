import React, { Component } from 'react';
import { googleMapKey } from '../../variables/constents';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey(`${googleMapKey}`);
Geocode.enableDebug();

class Map extends Component {


    state = {

        mapPosition: {
            lat: this.props.center.lat,
            lng: this.props.center.lng
        },
        markerPosition: {
            lat: this.props.center.lat,
            lng: this.props.center.lng
        }
    }

	/**
	 * Get the current address from the default map position and set those values in the state
	 */
    componentDidMount() {
        Geocode.fromLatLng(this.props.mapPosition.lat, this.props.mapPosition.lng).then(

            response => {
                const { address,fullAddress }=this.props.location;
               const LongAddress =fullAddress,
                    city =address.city,
                    area = address.area,
                    state ='',
                    country=address.country;
                const res = { LongAddress, city, area, state, country }
                this.props.onResponse(res)
            },
            error => {
                console.error(error);
            }
        );
    };
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.markerPosition.lat !== this.props.center.lat ||
            this.props.address !== nextState.address ||
            this.props.city !== nextState.city ||
            this.props.area !== nextState.area ||
            this.props.state !== nextState.state
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getCity = (addressArray) => {

        let city = '';
        if (addressArray !== undefined)
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                    city = addressArray[i].long_name;
                    return city;
                }
            }
    };
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getArea = (addressArray) => {
        let area = '';
        if (addressArray !== undefined)
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0]) {
                    for (let j = 0; j < addressArray[i].types.length; j++) {
                        if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                            area = addressArray[i].long_name;
                            return area;
                        }
                    }
                }
            }
    };
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getState = (addressArray) => {
        let state = '';
        if (addressArray !== undefined)
            for (let i = 0; i < addressArray.length; i++) {
                for (let i = 0; i < addressArray.length; i++) {
                    if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                        state = addressArray[i].long_name;
                        return state;
                    }
                }
            }
    };

	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
    onInfoWindowClose = (event) => {

    };

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                var temp = new Array();
                var country = '';
                temp = response.results[0].formatted_address.split(",");
                temp.forEach(function (element) {
                    country = element;
                });
                const LongAddress = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                const res = { LongAddress, city, area, state, country }
                this.props.onResponse(res)
            },
            error => {
                console.error(error);
            }
        );
    };

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
    onPlaceSelected = (place) => {
        if (place.formatted_address) {
            var temp = new Array();
            var country = '';
            temp = place.formatted_address.split(",");
            temp.forEach(function (element) {
                country = element;
            });
            const LongAddress = place.formatted_address,
                addressArray = place.address_components,
                city = this.getCity(addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray),
                latValue = place.geometry.location.lat(),
                lngValue = place.geometry.location.lng();
            // Set these values in the state.
            const res = { LongAddress, city, area, state, country }
            this.props.onResponse(res)
            this.props.onChangePosition(latValue, lngValue)

        }
    };


    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.props.mapPosition.lat, lng: this.props.mapPosition.lng }}
                    >
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.props.markerPosition.lat + 0.0018), lng: this.props.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.props.address}</span>
                            </div>
                        </InfoWindow>
                        {/*Marker*/}
                        <Marker google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.props.markerPosition.lat, lng: this.props.markerPosition.lng }}
                        />
                        <Marker />
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={[]}
                            componentRestrictions={{ country: "pk" }}
                        />
                    </GoogleMap>
                )
            )
        );
        console.log('center', this.props.center)
        return (
            <div>
                {
                    this.props.center.lat !== undefined ?
                        <AsyncMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=places`}
                            loadingElement={
                                <div style={{ height: `100%` }} />
                            }
                            containerElement={
                                <div style={{ height: this.props.height }} />
                            }
                            mapElement={
                                <div style={{ height: `100%` }} />
                            }
                        />
                        : null
                }
            </div>
        )

    }
}
export default Map