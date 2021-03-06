import React from "react";
import Button from "components/CustomButton/CustomButton";
import { Grid, Row, Col,Modal,Nav,NavItem } from "react-bootstrap";
import ReactTable from "react-table";
import { DateFormat } from "../../utils/helpers"
import { connect } from 'react-redux'
import { PutRequest } from "../../utils/ApiMethods";
import { onGetUrlDetails } from '../../store/actions'
import SweetAlert from "react-bootstrap-sweetalert";
import { onGetAllLinks } from '../../store/actions'
import { auth } from '../../utils/Auth'
const defaultParams={
    page:0,
    limit:10
}
export class AllUrls extends React.Component {
  state = {
    redirect: false,
    id: "",
    onDeleteUrl: false,
    deleteLoader:false,
  };

  onDelete = id => {
    this.setState({ onDeleteUrl: true, id: id });
  };
  onDeleteRequist=()=>{
   this.setState({deleteLoader:true,onDeleteUrl:false})
   PutRequest.deleteUrls(this.state.id).then(res=>{
       this.onFetch(defaultParams)
       this.setState({deleteLoader:false})
    this.props.setNotification('success',"Url deleted Successfully")
   }).catch(err=>{
    this.props.setNotification('error',err.message)
   })
  }
  onFetch = state => {
   this.setState({loading:true})
    var filter={};
    filter.page = state.page ? state.page + 1 : 1;
    filter.limit = state.pageSize ? state.pageSize : 10;
    this.props.getAllUrls(filter)
  };


  onGetDetails=(id)=>{
    this.setState({id})
    this.props.hide()
  this.props.onGetUrlDetails(id)
  }
  render() {
      const { show,hide }=this.props
    var links=this.props.allLinks.URls?this.props.allLinks.URls.sort((a, b) => b.createdAt - a.createdAt):[]
    const data = links.map((prop, sn) => {
          return {
            id: prop._id,
            serialNumber: sn + 1,
            title: prop.title,
            actualUrl: prop.actualUrl,
            shortUrl: prop.shortUrl,
            date: DateFormat(prop.createdAt),
            // we've added some custom button actions
            actions: (
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                <Button
                  onClick={() => {
                   this.onGetDetails(prop._id)
                  }}
                  bsStyle="info"
                  simple
                  icon
                  view="Details"
                >
                  <i className={this.state.id===prop._id?"fa fa-spin fa-spinner":"fa fa-eye"} />
                </Button>
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    
                    this.onDelete(prop._id);
                  }}
                  bsStyle="danger"
                  simple
                  icon
                  view="Delete"
                >
                  <i className={this.state.id===prop._id&&this.state.deleteLoader? "fa fa-spin fa-spinner":"fa fa-times"} />
                </Button>
              </div>
            )
          };
        })
      

    //shw sweet alert when click on delete button
    const sweetAlert = (
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
          this.onDeleteRequist();
        }}
        onCancel={() => this.setState({ onDeleteUrl: false })}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      />
    );

    return (
      <div>
          <Modal
          size="lg"
       dialogClassName="urlList_modal"
        show={show}
        onHide={hide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          <span>
            {/* <Button  bsStyle="danger" fill round onClick={this.props.onShowModal} >
              Create New   
            </Button> */}
            <Nav>
          <NavItem eventKey={4} href="#">
           
            <div className="header_links_style"
              onClick={() => {
            this.props.onShowModal();
              }}
            >
              <i className={'fa fa-chain'} />
              Create New
            </div>
          </NavItem>
             
              </Nav>
              <Nav>

          <NavItem eventKey={3} onClick={() => { auth.logout(this.props.history) }}>

            <div className="header_links_style">
              <i className="fa fa-sign-out" /> Log out
              </div>
          </NavItem>

        </Nav>

          </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Grid fluid>
          <Row>
            <Col md={12}>
            
                  <ReactTable
                    data={data}
                    filterable={false}
                    columns={[
                      {
                        Header: "Sr.No",
                        accessor: "serialNumber",
                        width: 60
                      },
                      {
                        Header: "title",
                        accessor: "title",
                        width: 150
                      },
                      {
                        Header: "actual Url",
                        accessor: "actualUrl"
                      },
                      {
                        Header: "short Url",
                        accessor: "shortUrl"
                      },
                      {
                        Header: "date",
                        accessor: "date",
                        width: 100
                      },

                      {
                        Header: "Actions",
                        accessor: "actions",
                        width: 100,
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    manual
                    defaultPageSize={10}
                    showPaginationTop
                    onFetchData={this.onFetch}
                    showPaginationBottom
                    showPaginationTop={false}
                    pages={
                      this.props.allLinks.length ? this.props.allLinks.pages : 1
                    }
                    loading={this.props.loading}
                    sortable={false}
                    className="-striped -highlight"
                  />
               
            </Col>
          </Row>
        </Grid>
        </Modal.Body>
      </Modal>
       

        {this.state.onDeleteUrl ? sweetAlert : null}
       
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    loading:state.getAllLinksLoading,
    allLinks:state.allLinks
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    setNotification:(errorType,message)=>dispatch({type:'SET_NOTIFICATION',errorType:errorType,errorMessage:message}),
    onGetUrlDetails:(id)=>dispatch(onGetUrlDetails(id)),
    onShowModal:()=>dispatch({type:"SHOW_MODAL",payload:true}),
    getAllUrls:(params)=>dispatch(onGetAllLinks(params))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AllUrls);
