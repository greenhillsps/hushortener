

// /**
//  *
//  * Analytics
//  *
//  */

import React from 'react';
import Button from 'components/CustomButton/CustomButton';

import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card';
//import 'ionicons/dist/css/ionicons.css';

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


function ReactFusionChart(URLdetails, props) {
  const { devices,regions,countries,refferers,languages,browsers }=manageData(URLdetails,props)
  var clicksChart=[];
   if (props.URLdetails.TotalClicks >= 1) {
  URLdetails.VisitGraph.map(data => {  
      clicksChart.push({label:data.month,value:(data.count*100)/props.URLdetails.TotalClicks});
      return null;
    });
   }

  const horizontalChartBar = {
    type: "column2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
      chart: {
      // caption: "Countries With Most Oil Reserves [2017-18]",
      // subcaption: "In MMbbl = One Million barrels",
      // xaxisname: "Country",
      //yaxisname: "Reserves (MMbbl)",
      
       bgColor:'#303642',
         palettecolors:"#ff7f00",
       showLimits:'0',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...clicksChart]
    }
  };

  const verticalChartBar = {
    //devices chart
    devicesChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
         bgColor:'#303642',
         palettecolors:"#ff7f00",
     showLimits:'0',
     caption:'Top Devices',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...devices]
    }
    },

    //regions chart
  regionsChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
          bgColor:'#303642',
         palettecolors:"#ff7f00",
          showLimits:'0',
     caption:'Region Wise Visists',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...regions]
    }
    },

    //countries chart
     countriesChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
          bgColor:'#303642',
         palettecolors:"#ff7f00",
          showLimits:'0',
     caption:'Country Wise Visits',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...countries]
    }
    },

    //refferers chart
     refferersChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
          bgColor:'#303642',
         palettecolors:"#ff7f00",
          showLimits:'0',
     caption:'Referrers',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...refferers]
    }
    },

    //language chart
     languagesChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
          bgColor:'#303642',
         palettecolors:"#ff7f00",
          showLimits:'0',
     caption:'Languages',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...languages]
    }
    },

    //browser chart
    browsersChart:{
    type: "bar2d",
    width: '100%',
    dataFormat: "json",
    dataSource:{
       chart: {
          bgColor:'#303642',
         palettecolors:"#ff7f00",
       showLimits:'0',
     caption:'Top Browser',
      numbersuffix: "%",
      theme: "candy"
    },
    data:[...browsers]
    }
    },
  };

  return { horizontalChartBar,verticalChartBar };
}





function manageData(URLdetails, props) {
  const devices = [];
  const regions = [];
  const countries = [];
  const refferers = [];
  const languages = [];
  const browsers = [];
  

  if (props.URLdetails.TotalClicks >= 1) {

    URLdetails.Device.map(data => {
      if(devices.length>=4){
        devices[3]+=data.percentage
      }else{
      devices.push({label:data._id,value:data.percentage});
      if(devices.length>=4){
         devices.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    URLdetails.Region.map(data => {
      if(regions.length>=4){
        regions[3]+=data.percentage
      }else{
        regions.push({label:data._id,value:data.percentage});
      if(regions.length>=3){
         regions.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    URLdetails.country.map(data => {
      if(countries.length>=4){
        countries[3]+=data.percentage
      }else{
        countries.push({label:data._id,value:data.percentage});
      if(countries.length>=4){
           countries.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    URLdetails.Refferer.map(data => {
      if(refferers.length>=4){
        refferers[3]+=data.percentage
      }else{
         refferers.push({label:data._id,value:data.percentage});
      if(refferers.length>=3){
        refferers.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    URLdetails.Language.map(data => {
      if(languages.length>=4){
        languages[3]+=data.percentage
      }else{
      languages.push({label:data._id,value:data.percentage});
      if(languages.length>=3){
        languages.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    URLdetails.Browser.map(data => {
      if(browsers.length>=4){
        browsers[3]+=data.percentage
      }else{
      browsers.push({label:data._id,value:data.percentage});
      if(browsers.length>=3){
        browsers.push({label:'Other',value:'0'});
      }
      }
      return null;
    });

    
}
  return { devices,regions,countries,refferers,languages,browsers }
}



function Analytics(props) {
  
console.log(props);
  const { URLdetails } = props;
  
const { horizontalChartBar,verticalChartBar } = ReactFusionChart(URLdetails, props);
try{
return URLdetails.TotalClicks > 0 ? (
    <div>
      <Grid fluid>
       
        <Row className="chartssetting">
          <Col md={12} className="padd-4">
            <Card style={{ padding:'10px 0px' }}
              content={
                <div>
                 
                     <ReactFC {...horizontalChartBar} />
                </div>
              }
            />
          </Col>
        </Row>

         <Row>
          <Col md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
          <ReactFC {...verticalChartBar.devicesChart} />

              }
            />
            </Col>
          </Col>
          <Col md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
                 <ReactFC {...verticalChartBar.browsersChart} />
                 
              }
            />
            </Col>
          </Col>
      </Row>
      <Row>
          <Col md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
               <ReactFC {...verticalChartBar.languagesChart} />
              }
            />
            </Col>
          </Col>
          <Col  md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
                <ReactFC {...verticalChartBar.refferersChart} />
              }
            />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
               <ReactFC {...verticalChartBar.countriesChart} />
              }
            />
            </Col>
          </Col>
          <Col md={6} className="padd-4">
          <Col md={12}>
            <Card style={{ padding:'10px 0px' }}
              content={
               <ReactFC {...verticalChartBar.regionsChart} />
              }
            />
            </Col>
          </Col>
        </Row> 
      </Grid>
    </div>
  ) : (
    null
  );
}catch(e){
  return <p>{JSON.stringify(e)}</p>
}
  
}

export default Analytics;
