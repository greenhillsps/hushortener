import React from 'react';
import { Grid, Table } from 'react-bootstrap'
import { GetRequest } from '../../utils/ApiMethods'
import { connect } from 'react-redux'

import { DateFormat} from '../../utils/helpers'
import Button from "components/CustomButton/CustomButton";

class LinkRedirectOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.getUserProfile()
    }

    getUserProfile = () => {
        GetRequest.getUser().then(res => {
            this.setState({ user: res.data.user })
        }).catch(err => {
         this.props.setNotification("error",err.message)
        })
    }

    render() {
        const { firstName, createdAt, email, lastName, totalAmountSpent, totalURLS, wallet } = this.state.user
        return (
            <Grid className="Setting_wrapper"fluid>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Member Since</th>
                            <th>Balance Availed</th>
                            <th>Balance Available</th>
                            <th>Total Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{firstName + " " + lastName}</td>
                            <td>{email}</td>
                            <td>--</td>
                            <td>{DateFormat(createdAt)}</td>
                            <td>{totalAmountSpent}</td>
                            <td>{wallet}</td>
                            <td>{totalURLS}</td>
                        </tr>

                    </tbody>
                </Table>
                <Button
                    fill
                    round
                    onClick={this.onUnlock}
                    className="btn"
                    >
                    {<i className="fa fa-pencil"/>}Edit
                   </Button>
            </Grid>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
      setNotification:(errorType,message)=>dispatch({type:'SET_NOTIFICATION',errorType:errorType,errorMessage:message}),
    }
  }
  
  export default connect(null,mapDispatchToProps)(LinkRedirectOption)