import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PostRequest } from '../../utils/ApiMethods'
import {
  Grid,
  Row,
  Col,
  Media,
  FormControl,
  FormGroup,
  ControlLabel,
  Image
} from "react-bootstrap";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";

import React from "react";
import { connect } from "react-redux";
import "assets/css/style.css";

import ReactPhoneInput from "react-phone-input-2";

export class RegisterPage extends React.Component {
 state={
   errorMessage:''
 }
  onRegisterUser = (data) => {
  PostRequest.registerUser(data).then(res=>{
    // localStorage.token = res.data.token;
   //localStorage.user = JSON.stringify(res.data);
    this.props.history.push('/page/login')
  }).catch(err=>{
   err.response.status===401?this.setState({errorMessage:err.response.data.message})
   :this.setState({errorMessage:err.message})
  })
  };

  render() {
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required("First Name is a required field"),
      test: Yup.bool(),
      lastName: Yup.string().required("Last Name is a required field"),
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is a required field"),

      password: Yup.string().required("Password is a required field")
    });

    return (
      <Grid>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            mobileCode: "",
            countryCode: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={payload => {
            const data = {
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              mobileNum: payload.mobileNumber,
              mobileCode: payload.mobileCode,
              countryCode: payload.countryCode,
              password: payload.password
            };
            this.onRegisterUser(data)
          }}
          render={({ touched, errors, values,setFieldValue, handleChange }) => (
            <Row>
              <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                <Form autoComplete="off">
                  <Row className="register-label">
                    <h2>Sign Up</h2>
                  </Row>
                  <Card
                    plain
                    content={
                      <div>
                        <FormGroup
                          validationState={
                            touched.firstName && errors.firstName ? (
                              "error"
                            ) : (
                              "success"
                            )
                          }
                        >
                          <ControlLabel style={{ color: "white" }}>
                            First Name
                          </ControlLabel>
                          <FormControl
                            className={
                              touched.firstName && errors.firstName ? (
                                "animated shake error"
                              ) : null
                            }
                            placeholder="Your First Name"
                            name="firstName"
                            type="text"
                            value={values.firstName}
                            onChange={handleChange}
                          />
                          <small className="text-danger">
                            {touched.firstName && errors.firstName}
                          </small>
                        </FormGroup>

                        <FormGroup
                          validationState={
                            touched.lastName && errors.lastName ? (
                              "error"
                            ) : (
                              "success"
                            )
                          }
                        >
                          <ControlLabel style={{ color: "white" }}>
                            Last Name
                          </ControlLabel>
                          <FormControl
                            className={
                              touched.lastName && errors.lastName ? (
                                "animated shake error"
                              ) : null
                            }
                            placeholder="Your Last Name"
                            name="lastName"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                          />
                          <small className="text-danger">
                            {touched.lastName && errors.lastName}
                          </small>
                        </FormGroup>

                        <FormGroup
                          validationState={
                            touched.email && errors.email ? "error" : "success"
                          }
                        >
                          <ControlLabel style={{ color: "white" }}>
                            Email address
                          </ControlLabel>
                          <FormControl
                            className={
                              touched.email && errors.email ? (
                                "animated shake error"
                              ) : null
                            }
                            placeholder="Enter email"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <small className="text-danger">
                            {touched.email && errors.email}
                          </small>
                        </FormGroup>

                        <FormGroup
                          validationState={
                            touched.mobileNumber && errors.mobileNumber ? (
                              "error"
                            ) : (
                              "success"
                            )
                          }
                        >
                          <ControlLabel style={{ color: "white" }}>
                            Mobile Number
                          </ControlLabel>

                          <ReactPhoneInput
                            defaultCountry={"pk"}
                            onChange={(num, code) =>{
                              setFieldValue("mobileNumber", num)
                              setFieldValue("mobileCode", code.dialCode)
                              setFieldValue("countryCode", code.countryCode)
                              }
                                } 
                            value={values.mobileNumber}
                            countryCodeEditable={false}
                          />
                        </FormGroup>
                        <FormGroup
                          validationState={
                            touched.password && errors.password ? (
                              "error"
                            ) : (
                              "success"
                            )
                          }
                        >
                          <ControlLabel style={{ color: "white" }}>
                            Password
                          </ControlLabel>
                          <FormControl
                            className={
                              touched.password && errors.password ? (
                                "animated shake error"
                              ) : null
                            }
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                          <small className="text-danger">
                            {touched.password && errors.password}
                          </small>
                        </FormGroup>
                        <p style={{ color: "red" }}>
                          {this.props.registrationError ? (
                            this.props.registrationError
                          ) : null}
                        </p>

                         {
                     this.state.errorMessage!==""&&
                       <small className="text-danger">
                           {this.state.errorMessage}
                          </small>
                       }
                      </div>
                     
                    }
                    
                    ftTextCenter
                    legend={
                      <Button
                        wd
                        fill
                        neutral
                        type="submit"
                        disabled={this.props.loading}
                      >
                        Create Free Account{" "}
                        <i
                          className={
                            this.props.loading ? "fa fa-spin fa-spinner" : null
                          }
                        />
                      </Button>
                    }
                  />
                 
                </Form>
              </Col>
            
            </Row>
          )}
        />
      </Grid>
    );
  }
}




const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    //setNotification:(errorType,message)=>dispatch({type:'SET_NOTIFICATION',errorType:errorType,errorMessage:message})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
