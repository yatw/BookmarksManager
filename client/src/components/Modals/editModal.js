import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';


class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isShown: this.props.isShown,
        linkId : null,
        linkUrl : null,
        linkTitle : null,
        linkDetail : null
        
    };
  }

  handleClose = () => {
    this.setState({isShown: false});
  }
  
  componentWillReceiveProps(newprops) {

    this.setState({
        isShown: newprops.isShown, 
        linkId : newprops.linkId,
        linkUrl : newprops.linkUrl,
        linkTitle : newprops.linkTitle,
        linkDetail : newprops.linkDetail
    });
  }

  urlonChange = (e) => this.setState({ linkUrl: e.target.value});
  titleonChange = (e) => this.setState({ linkTitle: e.target.value});
  detailonChange = (e) => this.setState({ linkDetail: e.target.value});

  render() {
    
    const {linkId, linkUrl, linkTitle, linkDetail} = this.state;

    return (

        <>
        <Modal show={this.state.isShown} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit a link</Modal.Title>
          </Modal.Header>
           
          <Modal.Body>

            <form method="post" action="/editLink">

                <div className="form-group">
                    <label>linkId</label>
                    <input type="text" className="form-control" name="linkId" id="linkId" defaultValue={linkId} readOnly/>
                </div>

                <div className="form-group">
                    <label>Link</label>
                    <input type="text" className="form-control" name="url" id="urlEdit"  defaultValue={linkUrl} onChange={this.urlonChange}/>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" id="titleEdit" defaultValue={linkTitle} onChange={this.titleonChange}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="detail" id="descEdit" defaultValue={linkDetail} onChange={this.detailonChange}/>
                </div>

            </form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.handleDeleteLink.bind(this, linkId)}>
              Delete Link
            </Button>
            <Button variant="success" onClick={this.props.handleUpdateLink.bind(this, linkId, linkUrl,linkTitle,linkDetail)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// PropTypes
EditModal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    handleDeleteLink: PropTypes.func.isRequired,
    handleUpdateLink: PropTypes.func.isRequired
}


export default EditModal