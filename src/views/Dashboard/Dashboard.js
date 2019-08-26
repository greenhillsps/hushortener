import React from "react";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import { Grid, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import { DateFormat } from "../../utils/helpers";
import { connect } from 'react-redux'
import { GetRequest } from "../../utils/ApiMethods";

import SweetAlert from "react-bootstrap-sweetalert";

export class Dashboard extends React.Component {
  state = {
    redirect: false,
    id: "",
    onDeleteUrl: false,
    allLinks: [],
    loading:false
  };

  onDelete = id => {
    this.setState({ onDeleteUrl: true, id: id });
  };

  onFetch = state => {
   this.setState({loading:true})
    var filter={};
    filter.page = state.page ? state.page + 1 : 1;
    filter.limit = state.pageSize ? state.pageSize : 10;
    GetRequest.getAllUrls(filter).then(res=>{
       this.setState({allLinks:res.data,loading:false})
    }).catch(err=>{
        this.setState({loading:false})
        this.props.setNotification('error',err.message)
    })
  };

  render() {
    var links=this.state.allLinks.URls?this.state.allLinks.URls:[]
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
                    const obj = this.props.allLinks.URls.find(
                      o => o._id === prop._id
                    );
                    this.setState({ id: obj._id, redirect: true });
                  }}
                  bsStyle="info"
                  simple
                  icon
                  view="Details"
                >
                  <i className="fa fa-eye" />
                </Button>
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    const obj = this.props.allLinks.URls.find(
                      o => o._id === prop._id
                    );
                    this.onDelete(obj._id);
                  }}
                  bsStyle="danger"
                  simple
                  icon
                  view="Delete"
                >
                  <i className="fa fa-times" />
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
          this.setState({ onDeleteUrl: false });
          this.props.onDeleteRequist(this.state.id);
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
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Your URLs"
                content={
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
                      this.state.allLinks.length ? this.state.allLinks.pages : 1
                    }
                    loading={this.state.loading}
                    sortable={false}
                    className="-striped -highlight"
                  />
                }
              />
            </Col>
          </Row>
        </Grid>

        {this.state.onDeleteUrl ? sweetAlert : null}
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    setNotification:(errorType,message)=>dispatch({type:'SET_NOTIFICATION',errorType:errorType,errorMessage:message})
  }
}

export default connect(null,mapDispatchToProps)(Dashboard);
