import React from 'react'
import ReactPhoneInput from "react-phone-input-2";

import {
    Modal,
    Grid,
    Row,
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
} from "react-bootstrap"; import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import Button from "components/CustomButton/CustomButton";

import { PutRequest } from '../../utils/ApiMethods'

class EditUser extends React.Component {
    state = {
        errorMessage: '',
        loading: false
    }
    render() {
        const { loading } = this.state
        const { show, hide, user: { email, firstName, lastName, phoneNumber }, getUserProfile, setNotification } = this.props;
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
            <Grid fluid >
                <Modal size="sm" show={show} onHide={hide}>
                    <Modal.Header closeButton >
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "rgb(164, 160, 197)", fontWeight: "bold" }} >
                        <Formik
                            initialValues={{
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                mobileNumber: phoneNumber,
                                password: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={payload => {
                                const data = {
                                    firstName: payload.firstName,
                                    lastName: payload.lastName,
                                    email: payload.email,
                                    mobileNum: payload.mobileNumber,
                                    password: payload.password
                                };
                                this.setState({ loading: true })
                                PutRequest.updateUser(data).then(res => {
                                    setNotification('success', "User updated successfully")
                                    hide()
                                    getUserProfile()
                                    this.setState({ loading: false })
                                }).catch(err => {
                                    if(err.response.data.codeName==="DuplicateKey"){
                                              this.setState({errorMessage:'Email already exist!'})
                                    }else{
                                        setNotification('error', err.message)

                                    }
                                    this.setState({ loading: false })
                                })
                            }}
                            render={({ touched, errors, values, setFieldValue, handleChange }) => (
                                <Row>
                                    <Col md={8} mdOffset={2}>
                                        <Form autoComplete="off">


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
                                                        onChange={(num, code) => {
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
                                                    this.state.errorMessage !== "" &&
                                                    <small className="text-danger">
                                                        {this.state.errorMessage}
                                                    </small>
                                                }
                                            </div>

                                            <Row style={{ textAlign: 'center' }} >
                                                <Button
                                                    wd
                                                    fill
                                                    round
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {"Submit " + " "}
                                                    <i
                                                        className={
                                                            loading ? "fa fa-spin fa-spinner" : null
                                                        }
                                                    />
                                                </Button>

                                            </Row>



                                        </Form>
                                    </Col>

                                </Row>
                            )}
                        />
                    </Modal.Body>


                </Modal>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNotification: (errorType, message) => dispatch({ type: 'SET_NOTIFICATION', errorType: errorType, errorMessage: message }),

    }
}
export default connect(null, mapDispatchToProps)(EditUser)