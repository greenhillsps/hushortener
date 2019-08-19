import React, { Component } from "react";
import axios from 'axios';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { auth } from '../../utils/ApiMethods';
import { Redirect } from "react-router-dom";
import Helmet from 'react-helmet';
import { getTabTitle, appTitle } from '../../utils/constants'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      error: '',
    };
  }

  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {


  }




  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }
  render() {
    const { values, errors, handleChange, touched, isSubmitting } = this.props;

    // const { requestIsRunning, error,redirectToReferrer } = this.props.loginPage; //error = server side error
    if (auth.loggedIn()) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Helmet>
        <title>{getTabTitle("Login")}</title>
        </Helmet>
      <Grid>
        <Row>
          
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <Form >
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                    {<small className="text-danger">{errors.error && errors.error}</small>}

                    <FormGroup
                      validationState={touched.email && errors.email ? "error" : "success"}
                    >
                      <ControlLabel>Email address</ControlLabel>
                      <FormControl placeholder="Enter email"
                        name="email"

                        value={values.email}
                        onChange={handleChange} />

                      {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}


                    </FormGroup>

                    <FormGroup
                      validationState={touched.password && errors.password ? "error" : "success"}
                    >
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}

                      />

                      {touched.password && errors.password && <small className="text-danger">{errors.password}</small>}


                    </FormGroup>

                  </div>
                }
                legend={
                  <Button type="submit" disabled={isSubmitting} bsStyle="info" fill wd>
                    Login
               </Button>
                }
                ftTextCenter
              />
            </Form>
          </Col>
        </Row>
      </Grid>
     
      </div>
    );
  }
}

const FormikApp = withFormik({
  mapPropsToValues(props) {

    return {
      email: '',
      password: ''
    }
  },
  handleSubmit({ email, password }, { props, resetForm, setErrors, setSubmitting }) {
    const data={
       email:email,
       password:password
    }
   
    auth.login(email, password).then(res => {
      setSubmitting(false)
    }).catch(err => {
      console.log(err.response)
      setErrors({ error:err.response?err.response.data.message:err.message })
      setSubmitting(false)
    })
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })
})(LoginPage)



export default FormikApp;
