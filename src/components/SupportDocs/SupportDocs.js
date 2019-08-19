import React from 'react';
import { Row, Col, Image, Grid, FormControl, ControlLabel, FormGroup, InputGroup } from 'react-bootstrap';
import Card from "components/Card/Card.jsx";
import CommentThread from '../CommetsThread/CommentsThread';
import Gallery from '../ImageGallery/ImageGallery';
import Button from "components/CustomButton/CustomButton.jsx";

import AddImagesModal from '../../components/Modals/addOrDeleteSupprtDocsImages';

class SupportDocs extends React.Component {

    state = {
        selectedImage: false,
        showAddImagesModal:false
    }
 


    render() {
        const { docs, _id } = this.props.restaurantDetails
        return (
            <Card
                content={
                    <Grid fluid>
                        <Row>
                            <Col md={6}>
                                <h4 className="title_bar"onClick={()=>{
                                    this.setState({showAddImagesModal:true})
                                    }} >Add Images <i className="fa fa-plus" /></h4>              
                                <div className="galleryScroll">
                                    <Gallery images={docs.attachments} />
                                </div>

                            </Col>

                            <Col md={6}>

                                <h4 className="title_bar">Add Comments <i className="fa fa-plus" /></h4>
                                <CommentThread restaurantDetails={this.props.restaurantDetails} />


                            </Col>
                        </Row>
                    {
                        this.state.showAddImagesModal?
                        <AddImagesModal
                        show={this.state.showAddImagesModal}
                        hide={()=>this.setState({showAddImagesModal:false})}
                         restaurantDetails={this.props.restaurantDetails}
                         Images={docs.attachments}
                        />
                        :null
                    }
                    </Grid>
                }
            />
        )
    }
}




export default SupportDocs;