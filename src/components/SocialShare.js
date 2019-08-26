/**
 *
 * SocialShare
 *
 */

import React from 'react';

import {
  Grid,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
    NavDropdown,
     MenuItem,
     Nav     
} from 'react-bootstrap';
    import Button from 'components/CustomButton/CustomButton';

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

class SocialShare extends React.Component {
  state={
    showSocialShare:false
  }
  render(){
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

  return (
    <div>
      {this.props.shorten?
       <Row>
                <OverlayTrigger placement="bottom" overlay={Facebook}>
                  <Col lg={2}>
                    <FacebookShareButton
                      url={this.props.shortenLink}
                      children={<FacebookIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Twitter}>
                  <Col lg={2}>
                    <TwitterShareButton
                      url={this.props.shortenLink}
                      children={<TwitterIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Whatsapp}>
                  <Col lg={2}>
                    <WhatsappShareButton
                      url={this.props.shortenLink}
                      children={<WhatsappIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Email}>
                  <Col lg={2}>
                    <EmailShareButton
                      url={this.props.shortenLink}
                      children={<EmailIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Telegram}>
                  <Col lg={2}>
                    <TelegramShareButton
                      url={this.props.shortenLink}
                      children={<TelegramIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={GooglePlus}>
                  <Col lg={2}>
                    <GooglePlusShareButton
                      url={this.props.shortenLink}
                      children={<GooglePlusIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>
              </Row>
              :
              <Row>
                <Col md={2} >
            <Button  onClick={()=>this.setState({showSocialShare:!this.state.showSocialShare}) } fill >SHARE</Button>
              </Col>
              {this.state.showSocialShare?
              <Col md={8}>
               <OverlayTrigger placement="bottom" overlay={Facebook}>
                  <Col md={1}>
                    <FacebookShareButton
                      url={this.props.shortenLink}
                      children={<FacebookIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Twitter}>
                  <Col md={1}>
                    <TwitterShareButton
                      url={this.props.shortenLink}
                      children={<TwitterIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Whatsapp}>
                  <Col md={1}>
                    <WhatsappShareButton
                      url={this.props.shortenLink}
                      children={<WhatsappIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Email}>
                  <Col md={1}>
                    <EmailShareButton
                      url={this.props.shortenLink}
                      children={<EmailIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={Telegram}>
                  <Col md={1}>
                    <TelegramShareButton
                      url={this.props.shortenLink}
                      children={<TelegramIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={GooglePlus}>
                  <Col md={1}>
                    <GooglePlusShareButton
                      url={this.props.shortenLink}
                      children={<GooglePlusIcon size={this.props.size} round />}
                    />
                  </Col>
                </OverlayTrigger>

              </Col>
  :null}              
              </Row>
      }
      </div>
  )
}
}

export default SocialShare;
