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

  handleDeleteLink = () => {

    this.setState({isShown: false});

  }

  handleUpdateLink = () => {
    
    this.setState({isShown: true});
  }
  
  componentWillReceiveProps(newprops) {
    console.log(newprops);
    this.setState({
        isShown: newprops.isShown, 
        linkId : newprops.linkId,
        linkUrl : newprops.linkUrl,
        linkTitle : newprops.linkTitle,
        linkDetail : newprops.linkDetail
    });
  }

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
                    <input type="text" className="form-control" name="linkId" id="linkId" value={linkId} readOnly/>
                </div>

                <div className="form-group">
                    <label>Link</label>
                    <input type="text" className="form-control" name="url" id="urlEdit" placeholder="Edit url" value={linkUrl}/>
                </div>

                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" name="title" id="titleEdit" placeholder="Edit title" value={linkTitle}/>
                </div>

                <div className="form-group">
                    <label for="title">Description</label>
                    <input type="text" className="form-control" name="detail" id="descriptionEdit" placeholder="Edit Description" value={linkDetail}/>
                </div>

            </form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleDeleteLink}>
              Delete Link
            </Button>
            <Button variant="success" onClick={this.handleUpdateLink}>
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
}


export default EditModal