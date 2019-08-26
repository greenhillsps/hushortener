

import React from 'react';
import { connect } from 'react-redux';
 import { PostRequest } from '../../utils/ApiMethods'
import { withFormik, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
} from 'react-share';

import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import Card from 'components/Card/Card';
import Button from 'components/CustomButton/CustomButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from 'react-bootstrap';


import Share from '../SocialShare';

export class ShortenUrl extends React.Component {

  state={
    copied: true,
    animateText:false,
    loading:false,
    shortenLink:''
  }


  onShortenLink=(data)=>{
      this.setState({loading:true})
   PostRequest.shortenLink(data).then(res=>{
this.setState({loading:false,shortenLink:res.data.url})
   }).catch(err=>{
this.setState({loading:false})
   })
  }
  render(){
    const { values, errors, handleChange, touched } = this.props;
    FacebookShareButton,
      FacebookIcon,
      TwitterShareButton,
      TwitterIcon,
      WhatsappShareButton,
      WhatsappIcon,
      EmailShareButton,
      EmailIcon,
      TelegramShareButton,
      TelegramIcon,
      GooglePlusShareButton,
      GooglePlusIcon;
    const Facebook = <Tooltip id="tooltip">Facebook</Tooltip>;
    const Twitter = <Tooltip id="tooltip">Twitter</Tooltip>;
    const Whatsapp = <Tooltip id="tooltip">Whatsapp</Tooltip>;
    const Email = <Tooltip id="tooltip">Email</Tooltip>;
    const Telegram = <Tooltip id="tooltip">Telegram</Tooltip>;
    const GooglePlus = <Tooltip id="tooltip">GooglePlus</Tooltip>;
  
const validationSchema = Yup.object().shape({
      link: Yup.string().matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, { message:"link must be a valid URL" })
      .required(),
    });
  
    return (
      <div className="main-content">
        <Formik
          initialValues={{
           link: '',
          }}
          validationSchema={validationSchema}
          onSubmit={payload => {
            const data={
                actualUrl:payload.link
            }
             this.onShortenLink(data)
          }}
          render={({ touched, errors, values,setFieldValue, handleChange }) => (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Shorten your link here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup
              validationState={
                touched.email && errors.link ? 'error' : 'success'
              }
            >
              <InputGroup>
                <FormControl
                  style={{
                    height: '51px',
                    fontSize: '17px',
                    border: '1px solid #ff7f00',
                  }}
                  className={
                    touched.link && errors.link ? 'animated swing error' : null
                  }
                  placeholder="https://www.google.com/"
                  name="link"
                  type="text"
                  value={values.link}
                  onChange={handleChange}
                />

                <InputGroup.Addon style={{ backgroundColor: '#ff7f00',color:'#fff' }}>
                  <Button
                    
                    type="submit"
                    fill
                    wd
                  >
                    SHORTEN
                  </Button>

                  <i style={{color:'white'}}
                    className={this.state.loading ? 'fa fa-spin fa-spinner' : null}
                  />
                </InputGroup.Addon>
              </InputGroup>
              <small className="text-danger">
                {touched.link && errors.link}
              </small>
            </FormGroup>
          </Form>

          {this.state.shortenLink ? (
            <div>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    name="shortenLink"
                    type="text"
                    value={this.state.shortenLink.shortUrl}
                    readOnly
                    onCopy={()=>this.setState({copied:true,animateText:true})}
                  />
                  <InputGroup.Addon
                    onClick={() => {
                    this.setState({copied:true,animateText:true})
                    }}
                    style={{ backgroundColor: '#ff7f00',color:'#fff' }}
                  >
                    <CopyToClipboard text={this.state.shortenLink.shortUrl}>
                      <button
                        style={{ border: '1px solid #ff7f00' }}
                        onClick={() => {
                          this.setState({copied:true,animateText:true})
                        }}
                        className={this.state.copied ? 'animated shake error' : null}
                        type="text"
                      >
                        Copy
                      </button>
                    </CopyToClipboard>
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
        {this.state.animateText?
          <div style={{color:'#ff7f00'}} className={'animated fadeOutUp'}>
         {this.state.shortenLink.shortUrl}
            </div>
       :null }
              <Share shortenLink={this.state.shortenLink.shortUrl} shorten={true} size={50} />
  
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" bsStyle="danger" fill wd onClick={this.props.hide}> 
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        )}
        />
    </div>
    );
  }
}



export default ShortenUrl;
