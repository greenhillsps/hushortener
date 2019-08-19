import React from "react";
import {
    Col,
    Row,
    Image,
    Label,
    Button,
    OverlayTrigger,
    Tooltip,
    FormGroup,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import Card from "components/Card/Card.jsx";
import * as selectedFoodAction from '../../store/actions/selectedFood';
import * as deleteFoodAction from '../../store/actions/deleteFood';
import * as deleteCategoryAction from '../../store/actions/deleteCategory';
import * as restaurantDetailAction from '../../store/actions/getRestaurantDetail';
import AddOnDetailModal from "../AddOnModal/AddOnDetail"
import { formatCurrency } from '../../utils/helpers';
import EditModal from 'components/EditFoodModal/EditFoodModal.js';
import AddOnModal from 'components/AddOnModal/AddOnModal.js';
import AddCategoryModal from 'components/AddCategoryModal/AddCategoryModal.js';
import EditCategoryModal from 'components/EditCategoryModal/EditCategoryModal.js';
import AddFoodModal from 'components/AddFoodModal/AddFoodModal.js';
import ShowSortingMenuModal from '../../components/Modals/SortingMenu';
import ShowSortingFoodModal from '../../components/Modals/SortingFood';

import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import DashLoader from 'components/DashLoader/dashLoader.js';


class Menu extends React.Component {
    componentWillReceiveProps(props) {
        this.setState({ categories: props.categories })
    }
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            categories: props.categories,
            initialItems: [],
            show: false,
            modalData: {},
            showEditModal: false,
            showAddAddonModal: false,
            showAddCategoryModal: false,
            showEditCategoryModal: false,
            showAddFoodModal: false,
            deleteFoodAlert: false,
            deleteCategoryAlert:false,
            deletingFoodLoading:false,
            deletingCategoryLoading:false,
            showSortingMenuModal:false,
            showSortingFoodModal:false
        }
    }
    handleClose() {
        this.setState({ show: false, modalData: {} });
    }

    handleShow(a) {
        //console.log(a)
        this.setState({ show: true, modalData: a });
    }
    filterList = (event) => {
        var list = this.props.categories;
        let newCat = []
        let newList = []
        list = list.filter(function (item) {
            return item.title.toString().toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        })

        // if (!event.target.value || event.target.value == "") {
        //     this.setState({ categories: this.state.initialItems })
        // }
        // else {
        //     list.map(function (l, k) {
        //         return l.foods = l.foods.filter(function (item) {
        //             return item.title.toString().toLowerCase().search(
        //                 event.target.value.toLowerCase()) !== -1;
        //         })
        //     })

        //     this.setState({ categories: list })
        // }

        this.setState({ categories: list })
    }
    componentWillMount() {
        this.setState({ categories: this.state.categories })
    }

    //delete food
    onDeleteFood = () => {
          this.setState({deletingFoodLoading:true});
        this.props.onDeleteFood(this.props.selectedFood._id).then(res => {
            this.setState({deletingFoodLoading:false});
            this.props.onGetRestaurantDetail(this.props.restaurantId)
        }).catch(err=>{
              this.setState({deletingFoodLoading:false});
        })
    }

    //delete category
    DeleteCategory = () => {
        this.setState({deletingCategoryLoading:true});
        this.props.onDeleteCategory(this.props.selectedCategory._id).then(res => {
            this.setState({deletingCategoryLoading:false});
            this.props.onGetRestaurantDetail(this.props.restaurantId)
        }).catch(err=>{
            this.setState({deletingCategoryLoading:false});
        })
    }
    render() {
        const editTooltip = <Tooltip id="details">Edit Item</Tooltip>;
        const addTooltip = <Tooltip id="details">Add addon</Tooltip>;
        const removeTooltip = <Tooltip id="details">Remove</Tooltip>;
        const DeleteFoodAlert = (
            <SweetAlert
                warning
                style={{ display: 'block', marginTop: '-100px' }}
                title="Are you sure?"
                onConfirm={() => {
                    this.setState({ deleteFoodAlert: false });
                    this.onDeleteFood();
                }}
                onCancel={() =>
                    this.setState({ deleteFoodAlert: false })
                }
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
      </SweetAlert>
        );

         const deleteCategoryAlert = (
            <SweetAlert
                warning
                style={{ display: 'block', marginTop: '-100px' }}
                title="Are you sure?"
                onConfirm={() => {
                    this.setState({ deleteCategoryAlert: false });
                    this.DeleteCategory();
                }}
                onCancel={() =>
                    this.setState({ deleteCategoryAlert: false })
                }
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
      </SweetAlert>
        );
        return <div>

            <Row>
                <Col md={6}>
                    <FormGroup>
                        <InputGroup  >
                            <FormControl
                                type="text"
                                placeholder='Search Food...'
                                onChange={this.filterList}
                            />
                            <InputGroup.Addon style={{
                                backgroundColor: 'rgba(253, 45, 45, 0.78)', color: 'white'
                            }} >
                                SEARCH
                  </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col onClick={
                    () => {
                        this.setState({ showAddCategoryModal: true })
                    }

                } md={3}>
                    <span className='foodCategoriesButton' >
                        <i className='fa fa-plus' />
                        ADD CATEGORY
                                                        </span>
                </Col>

                <Col onClick={
                    () => {
                        this.setState({showSortingMenuModal: true })
                    }

                } md={3}>
                    <span className='foodCategoriesButton' >
                        <i className='fa fa-sort' />
                         SORTING
                                                        </span>
                </Col>
            </Row>

            {this.state.categories.map((c, k) => {
                return <Card key={k}
                    content={
                        <Col>
                            {c.imageUrl ?
                                <div>
                                    <Image src={c.imageUrl} style={{ width: '100%', height: '250px' }} rounded/>
                                </div>
                                : null}
                            <Row className='foodCategoriesBody'>
                                <Col md={4}>{c.title}</Col>
                                <Col md={8}>

                                    <Col onClick={
                                        () => {
                                            
                                    this.setState({ deleteCategoryAlert: true })
                                        }

                                    } md={3}>
                                        <span className='foodCategoriesButton' >
                                            <i className='fa fa-trash' />
                                           { this.state.deletingCategoryLoading?'Deleting..':'Remove CATEGORY'} <i className={this.state.deletingCategoryLoading ?
                                            'fa fa-spin fa-spinner':''}/>
                                                        </span>
                                    </Col>

                                    <Col onClick={
                                        () => {
                                            this.props.onSelectedCategory(c);
                                            this.setState({ showEditCategoryModal: true })
                                        }

                                    } md={3}>
                                        <span className='foodCategoriesButton' >
                                            <i className='fa fa-edit' />
                                            EDIT CATEGORY
                                                        </span>
                                    </Col>

                                    <Col onClick={
                                        () => {
                                            this.props.onSelectedCategory(c);
                                            this.setState({ showAddFoodModal: true })
                                        }

                                    } md={3}>
                                        <span className='foodCategoriesButton' >
                                            <i className='fa fa-plus' />
                                            ADD FOOD
                                                        </span>
                                    </Col>

                                     <Col onClick={
                    () => {
                        this.setState({showSortingFoodModal: true });
                        this.props.onSelectedCategory(c);
                    }

                } md={3}>
                    <span className='foodCategoriesButton' >
                        <i className='fa fa-sort' />
                         SORTING
                                                        </span>
                </Col>

                                </Col>
                                
                            </Row>
                            {c.foods.map((f, k) => {

                                return <Card key={k}
                                    content={
                                        <Row>
                                            <Col md={2}>
                                                <Image src={f.imageUrl} circle style={{ height: '100px', width: '100px' }} />
                                            </Col >
                                            <Col md={8}>
                                                <h5>{f.title}</h5>
                                                <Row className="font-icon-container">
                                                    <Col className='status' md={2}>
                                                        <i className='fa fa-heart' />
                                                        {f.stats.lovesCount}
                                                    </Col>
                                                    <Col className='status' md={2}>
                                                        <i className='fa fa-comment' />
                                                        {f.stats.reviews}
                                                    </Col>
                                                    <Col className='status' md={2}>
                                                        <i className='fa fa-cart-plus' />
                                                        {f.stats.orders}
                                                    </Col>

                                                    <OverlayTrigger placement="bottom" overlay={addTooltip}>
                                                        <Col onClick={
                                                            () => {
                                                                this.setState({ showAddAddonModal: true })
                                                                this.props.onSelectedFood(f)
                                                            }

                                                        } md={1}>
                                                            <span className="actionButton" style={{
                                                                backgroundColor: 'rgb(73, 136, 41)'
                                                            }} >
                                                                <i style={{
                                                                    fontSize: '20px', color: 'white'
                                                                }} className='fa fa-plus' />
                                                            </span>
                                                        </Col>
                                                    </OverlayTrigger>



                                                    <OverlayTrigger placement="bottom" overlay={editTooltip}>
                                                        <Col onClick={
                                                            () => {
                                                                this.setState({ showEditModal: true })
                                                                this.props.onSelectedFood(f)
                                                            }

                                                        } md={1}>
                                                            <span className="actionButton" style={{
                                                                backgroundColor: '#3a9cf1'
                                                            }} >
                                                                <i style={{
                                                                    fontSize: '20px', color: 'white'
                                                                }} className='fa fa-edit' />
                                                            </span>
                                                        </Col>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger placement="bottom" overlay={removeTooltip}>
                                                        <Col onClick={
                                                            () => {
                                                                this.props.onSelectedFood(f)  
                                                                this.setState({ deleteFoodAlert: true })
                                                            }

                                                        } md={1}>
                                                            <span className="actionButton" style={{
                                                                backgroundColor: 'rgb(253, 45, 45)'
                                                            }} >
                                                                <i style={{
                                                                    fontSize: '20px', color: 'white'
                                                                }} className={this.state.deletingFoodLoading && this.props.selectedFood._id === f._id ?
                                                                    'fa fa-spin fa-spinner' : 'fa fa-trash'} />
                                                            </span>
                                                        </Col>
                                                    </OverlayTrigger>

                                                </Row>
                                                <div style={{ height: '10px' }} />
                                                <h6>Rating: {f.rating ? (f.rating.overall).toFixed(1) : 0}</h6>

                                                <Row>
                                                    <Col md={12}>
                                                        {(f.variations != null) ? f.variations.options.map((v, k) => {
                                                            return <div key={k}><Label bsSize="large" bsStyle="success">{v.title} {formatCurrency(v.price)}</Label>{' '}</div>
                                                        }) : null}
                                                    </Col>
                                                </Row>
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        {f.addons.length === 0 ? null : <h5>Addons: </h5>}
                                                        {f.addons.map((a, k) => {
                                                            return <div className='addOn' key={k}>

                                                                <Button bsSize="small" className='addOnButton' onClick={() => {
                                                                    this.props.onSelectedFood(f)
                                                                    this.handleShow(a)
                                                                }
                                                                }>
                                                                    {a.name}
                                                                </Button>

                                                            </div>
                                                        })}

                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col md={2}>
                                                <h5>{formatCurrency(f.price)}</h5>
                                            </Col>
                                        </Row>
                                    }
                                />
                            })}

                        </Col>} />

            })}
            {this.state.show ?
                <AddOnDetailModal
                    show={this.state.show}
                    handleClose={this.handleClose}
                    addOnData={this.state.modalData}

                /> :
                null}
            {this.state.showEditModal ?
                <EditModal
                    showEditModal={this.state.showEditModal}
                    onHideModal={() => this.setState({ showEditModal: !this.state.showEditModal })}
                    selectedFood={this.props.selectedFood}
                /> : null}

            {this.state.showAddAddonModal ?
                <AddOnModal
                    showEditModal={this.state.showAddAddonModal}
                    onHideModal={() => this.setState({ showAddAddonModal: !this.state.showAddAddonModal })}
                    selectedFood={this.props.selectedFood}
                /> : null}
            {
                this.state.showAddCategoryModal ?
                    <AddCategoryModal
                        showAddCategoryModal={this.state.showAddCategoryModal}
                        hideAddCategoryModal={() => this.setState({ showAddCategoryModal: !this.state.showAddCategoryModal })}
                    />
                    : null
            }
            {
                this.state.showEditCategoryModal ?
                    <EditCategoryModal
                        showEditCategoryModal={this.state.showEditCategoryModal}
                        hideEditCategoryModal={() => this.setState({ showEditCategoryModal: !this.state.showEditCategoryModal })}
                    />
                    : null
            }

            {
                this.state.showSortingMenuModal ?
                    <ShowSortingMenuModal
                        show={this.state.showSortingMenuModal}
                        hide={() => this.setState({ showSortingMenuModal: !this.state.showSortingMenuModal })}
                        restaurantMenu={this.state.categories}
                        restaurantId={this.props.restaurantId}
                    />
                    : null
            }

            {
                this.state.showSortingFoodModal ?
                    <ShowSortingFoodModal
                        show={this.state.showSortingFoodModal}
                        hide={() => this.setState({ showSortingFoodModal: !this.state.showSortingFoodModal })}
                        restaurantMenu={this.state.categories}
                        restaurantId={this.props.restaurantId}
                    />
                    : null
            }

            
               <Modal show={this.state.showAddFoodModal} onHide={()=>this.setState({ showAddFoodModal: !this.state.showAddFoodModal })}>
                <Modal.Header closeButton>
                    <Modal.Title>ADDING NEW FOOD</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                       <AddFoodModal
                        showAddFoodModal={this.state.showAddFoodModal}
                        hideAddFoodModal={() => this.setState({ showAddFoodModal: !this.state.showAddFoodModal })}
                    />
                     </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" bsStyle="danger" fill wd onClick={()=>this.setState({ showAddFoodModal: !this.state.showAddFoodModal })}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>

            {
                //*********************************//
                //alert when click on delete Food
                //*********************************//
                this.state.deleteFoodAlert ?
                    DeleteFoodAlert
                    : null
            }
 {
                //*********************************//
                //alert when click on delete category
                //*********************************//
                this.state.deleteCategoryAlert ?
                    deleteCategoryAlert
                    : null
            }


        </div>

    }
}

const mapStateToProp = state => {
    return {
          selectedCategory:state.selectedCategory,
        selectedRestaurant:state.selectedRestaurant,
        selectedFood: state.selectedFood,
        getRestaurantDetailLoading: state.selectedRestaurantLoading,
        restaurantId: state.restaurantId
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onSelectedFood: (food) => dispatch(selectedFoodAction.onSelectedFood(food)),
        onSelectedCategory: (category) => dispatch(selectedFoodAction.onSelectCategory(category)),
        onDeleteFood: (id) => dispatch(deleteFoodAction.deleteFood(id)),
        onGetRestaurantDetail: (id) => dispatch(restaurantDetailAction.getSelectedRestaurant(id)),
        onDeleteCategory:(id)=>dispatch(deleteCategoryAction.deleteCategory(id))
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Menu)