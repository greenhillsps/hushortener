import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { reStructure } from "../../utils/helpers";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class DashBoard extends React.Component {
  chart = data => {
    console.log("test", data);
    const chartConfigs = {
      type: "column2d",
      dataFormat: "json",
      height: 200,
      dataSource: {
        chart: {
          // caption: "Countries With Most Oil Reserves [2017-18]",
          // subcaption: "In MMbbl = One Million barrels",
          // xaxisname: "Country",
          // yaxisname: "Reserves (MMbbl)",
          numbersuffix: "%",
          theme: "candy"
        },
        data: [data]
      }
    };
    return chartConfigs;
  };
  render() {
    const { urlDetails } = this.props;
    var data = {
      Browser: [],
      Device: [],
      Language: [],
      Refferer: [],
      Region: [],
      country: [],
      VisitGraph: []
    };
    if (urlDetails.TotalClicks >= 1) {
      data.Browser = urlDetails.Browser;
      data.Device = urlDetails.Device;
      data.Language = urlDetails.Language;
      data.Refferer = urlDetails.Refferer;
      data.Region = urlDetails.Region;
      data.country = urlDetails.country;
      data.VisitGraph = urlDetails.VisitGraph;
    }
    return (
      <Grid fluid>
        <Row>
          <Col className="chart_col" md={6}>
            <label className="chart_label">Browser</label>
            <ReactFC {...this.chart(reStructure(data.Browser))} />
          </Col>
          <Col className="chart_col" md={6}>
            <label>Device</label>
            <ReactFC {...this.chart(reStructure(data.Device))} />
          </Col>
        </Row>

        <Row>
          <Col className="chart_col" md={6}>
            <label>Language</label>
            <ReactFC {...this.chart(reStructure(data.Language))} />
          </Col>
          <Col className="chart_col" md={6}>
            <label>Refferer</label>
            <ReactFC {...this.chart(reStructure(data.Refferer))} />
          </Col>
        </Row>

        <Row>
          <Col className="chart_col" md={6}>
            <label>Region</label>
            <ReactFC {...this.chart(reStructure(data.Region))} />
          </Col>
          <Col className="chart_col" md={6}>
            <label>Country</label>
            <ReactFC {...this.chart(reStructure(data.country))} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    urlDetails: state.urlDetails
  };
};

export default connect(mapStateToProps)(DashBoard);
