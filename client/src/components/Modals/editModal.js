import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';


class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        linkId : this.props.linkId,
        linkUrl : this.props.linkUrl,
        linkTitle : this.props.linkTitle,
        linkDetail : this.props.linkDetail
    };
  }

  urlonChange = (e) => this.setState({ linkUrl: e.target.value});
  titleonChange = (e) => this.setState({ linkTitle: e.target.value});
  detailonChange = (e) => this.setState({ linkDetail: e.target.value});
  
  handleUpdateLink = (toupdate_id, newURL, newTitle, newDesc) => {

    fetch("/updateLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({linkId : toupdate_id, title : newTitle, url : newURL, detail : newDesc})
    }).then(

      
      this.props.handleClose(),
      this.props.update()

    )
    .catch((error) => {
      console.log(error);
    });

  }
    
  handleDeleteLink = (todelete_id) => {

    fetch("/deleteLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({linkId : todelete_id})
    }).then(

      this.props.handleClose(),
      this.props.update()

    )
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    
    const {linkId, linkUrl, linkTitle, linkDetail} = this.state;

    return (

        <>
        <Modal show={this.props.isShown} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit a link</Modal.Title>
          </Modal.Header>
           
          <Modal.Body>

            <form method="post">

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
            <Button variant="danger" onClick={this.handleDeleteLink.bind(this, linkId)}>
              Delete Link
            </Button>
            <Button variant="success" onClick={this.handleUpdateLink.bind(this, linkId, linkUrl,linkTitle,linkDetail)}>
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
    handleClose: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
}


export default EditModal