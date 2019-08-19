import React from 'react';
//import Carousel from 'react-bootstrap/Carousel'
import { Carousel } from 'react-bootstrap';
class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const label="NREL's PVWatts® Calculator";
    const def="Estimates the energy production and cost of energy of grid-connected photovoltaic (PV) energy systems throughout the world. It allows homeowners, small building owners, installers and manufacturers to easily develop estimates of the performance of potential PV installations.";
    const { index, direction } = this.state;

    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img style={{width:'100%',height:'400px'}}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
            alt="NREL's PVWatts® Calculator"
          />
          <Carousel.Caption>
            <h3>{label}</h3>
            <p>{def}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={{width:'100%',height:'400px'}}
            className="d-block w-100"
            src="https://images.pexels.com/photos/411592/pexels-photo-411592.jpeg?cs=srgb&dl=alternative-alternative-energy-blue-411592.jpg&fm=jpg"
            alt="NREL's PVWatts® Calculator"
          />

          <Carousel.Caption>
            <h3>{label}</h3>
            <p>{def}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={{width:'100%',height:'400px'}}
            className="d-block w-100"
            src="https://images.pexels.com/photos/256312/pexels-photo-256312.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="NREL's PVWatts® Calculator"
          />

          <Carousel.Caption>
            <h3>{label}</h3>
            <p>
          {def}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default ControlledCarousel;