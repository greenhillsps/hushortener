import React from 'react'
import { connect } from 'react-redux'
import { Grid,Row } from 'react-bootstrap'

class LinksDetails extends React.Component {
    render() {
        const { urlDetails }=this.props;
        var url={
            actualUrl:'',
            shortUrl:'',
            title:'',
            createdAt:'',
            description:'',
            TotalClicks:''
        }
        if(urlDetails.URL){
          url.actualUrl=urlDetails.URL.actualUrl;
          url.shortUrl=urlDetails.URL.shortUrl;
          url.title=urlDetails.URL.title;
          url.createdAt=urlDetails.URL.createdAt;
          url.description=urlDetails.URL.description;
          url.TotalClicks=urlDetails.URL.TotalClicks;
        }
        return (
            <Grid className="_link_details_wrapper" fluid>
             <Row>
          <label>Title</label><span>{url.title}</span>
             </Row>
             <Row>
          <label>Description</label><span>{url.description}</span>
             </Row>
             <Row>
          <label>Created At</label><span>{url.createdAt}</span>
             </Row>
             <Row>
          <label>Actual URL</label><span>{url.actualUrl}</span>
             </Row>
             <Row>
          <label>Short URL</label><span>{url.shortUrl}</span>
             </Row>
             <Row>
          <label>Total Clicks</label><span>{url.TotalClicks}</span>
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

export default connect(mapStateToProps)(LinksDetails);