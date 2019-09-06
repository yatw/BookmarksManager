import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { store } from 'react-notifications-component';


class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        linkId : this.props.linkId,
        linkUrl : this.props.linkUrl,
        linkTitle : this.props.linkTitle,
        linkDetail : this.props.linkDetail,
        selectedTags : []
    };
  }

  componentWillReceiveProps(newprops) {
    this.getSelectedTags();
  }
  
  showNotification(title, message, type, time=1000){

    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      width: 300,
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: time,
        onScreen: false,
        pauseOnHover: true
      }
    });
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
      body: JSON.stringify({linkId : toupdate_id, title : newTitle, url : newURL, detail : newDesc, tags: this.state.selectedTags})
    })
    .then(response => response.json())
    .then(
      
      (response) => {


        if (response.status === "ignored"){
          this.showNotification("Update Ignored", "Not executing guest request to protect the data", "info", 2500);
        }else{
          this.props.handleClose();
          this.showNotification("Update Success", `Updated ${newTitle}`, "success");
          this.props.update();
        }

      }
      
    )
    .catch((error) => {
      console.log(error);
    });

  }
    
  handleDeleteLink = (todelete_id, todelete_title) => {

    fetch("/deleteLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({linkId : todelete_id})
    })
    .then(response => response.json())
    .then(

      (response) =>{

        if (response.status === "ignored"){
          this.showNotification("Delete Ignored", "Not executing guest request to protect the data", "info", 2500);
        }else{
          this.props.handleClose();
          this.showNotification("Delete Success", `Deleted ${todelete_title}`, "warning");
          this.props.update();
        }
      }
     
    )
    .catch((error) => {
      console.log(error);
    });

  }

  selectTag(tagName){

    // this clicked tag is already selected, now unselect it
    if( this.state.selectedTags.indexOf(tagName) > -1 ) {

      this.setState({selectedTags: this.state.selectedTags.filter(function(tag) { 
        return tag !== tagName
      })});

    }else{

      // else it is not selected, select it
      this.setState({selectedTags: this.state.selectedTags.concat([tagName])});
    }
  }

  getSelectedTags(){
    fetch("/getSelectedTags", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({linkId : this.state.linkId})
    })
    .then(res => res.json())
    .then(
      
      tags => this.setState({selectedTags: tags}) 
    
    ).catch((error) => {
      console.log(error);
    });

}

  getTagClass = (tagName) =>{
    
    var index = this.state.selectedTags.indexOf(tagName);

    return (index > -1)? "list-group-item list-group-item-info" : "list-group-item ";
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

                <div className="form-group">
                    <label>Tags</label>

                    <ul className="list-group">
                      {this.props.tags.map(tag => (
                        <li key={tag.tagId} className={this.getTagClass(tag.name)} onClick={() => { this.selectTag(tag.name) }}>{tag.name}</li>
                      ))}
                    </ul>
                </div>

            </form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleDeleteLink.bind(this, linkId, linkTitle)}>
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
    update: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired
}


export default EditModal