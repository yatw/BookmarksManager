import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';



class InsertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        urlInput : null,
        titleInput : null,
        descInput : null,
        isDuplicate : false,
        borderColor: null
        
    };
  }


  
  componentWillReceiveProps(newprops) {
    
    this.setState({
        isShown: newprops.isShown,
        isDuplicate : false,
        borderColor: null

    });
  }


  placeBorder(){

    return {
        'borderColor' : this.state.borderColor
    }
    
  }

  urlonChange = (e) => {

    var inputUrl = e.target.value;
    document.getElementById("titleInput").value = "Loading...";
    document.getElementById("descInput").value = "Loading...";
    this.setState({ urlInput: inputUrl, isDuplicate: false});

    fetch("/getTitle", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url : inputUrl})

      }).then(response => response.json())
      .then(data => {

        
        if (data.status === "success"){
            
            this.setState({ titleInput: data.title,
                descInput: data.metaDescription,
                borderColor: '#00b300'
            });

            document.getElementById("titleInput").value = data.title;
            document.getElementById("descInput").value = data.metaDescription;

        }else if (data.status === "duplicate"){
            // same link is already in DB
            
            document.getElementById("titleInput").value = 'Duplicate Link';
            document.getElementById("descInput").value = 'Duplicate Link';
            this.setState({ isDuplicate: true, borderColor: '#ff8080'})
        
        }else{
            // not a valid url
            document.getElementById("titleInput").value = "No title found";
            document.getElementById("descInput").value = "No Description found";
            this.setState({ borderColor: '#ff8080'})
        }
      }).catch((error) => {
          console.log(error);
      });
  }



  titleonChange = (e) => this.setState({ titleInput: e.target.value});
  detailonChange = (e) => this.setState({ descInput: e.target.value});


  displayDuplicateWarning(){
    return (this.state.isDuplicate)? <p style={{color:'red'}}>The same link has already been stored in the database</p>: <></>;
  }
  

  render() {
    
    const {urlInput, titleInput, descInput} = this.state;

    return (

        <> 
        <Modal show={this.props.isShown} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new link</Modal.Title>
          </Modal.Header>
           
          <Modal.Body>

            <form method="post">

                <div className="form-group">
                    <label>Link</label>
                    <input type="text" className="form-control" style={this.placeBorder()} id="urlInput" placeholder="Paste in url" onChange={this.urlonChange}/>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control"  style={this.placeBorder()} id="titleInput" placeholder="Enter title" onChange={this.titleonChange}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control"  style={this.placeBorder()} id="descInput" placeholder="Enter Description" onChange={this.detailonChange}/>
                </div>

            </form>

          </Modal.Body>

          <Modal.Footer>

          {this.displayDuplicateWarning()}

            <Button variant="success" onClick={this.props.handleInsertLink.bind(this, urlInput, titleInput,descInput)} disabled={this.state.isDuplicate}>
              Save
            </Button>

            

          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// PropTypes
InsertModal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleInsertLink: PropTypes.func.isRequired
}


export default InsertModal