import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { store } from 'react-notifications-component';

class LoginModal extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            
            inSession : false,
            incorrectUser: false
        };
    }


    showNotification(title, message, type){

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
          duration: 1000,
          onScreen: false,
          pauseOnHover: true
        }
      });
    }

    handleLogin(name){

        fetch("/login", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName : name})
          }).then(response => response.json())
          .then(response => 
            
             (response.status)? 
             
             (this.setState({inSession: true}),
              this.showNotification("Login Success", `Welcome ${name}` , "success"),

              // 10 minutes timeout
              setTimeout(() => {
                this.showNotification("Session Expired","Please login again", "default")
                this.setState({inSession: false});
              }, 10 * 60 * 1000)
             )

             : this.setState({incorrectUser: true}) 
            
          )
          .catch((error) => {
            console.log(error);
          });

    }

    displayIncorrectWarning(){
        return (this.state.incorrectUser)? <p style={{color:'red'}}>Incorrect Username</p>: <></>;
    }


    submitHandler(e) {

        e.preventDefault();
        this.handleLogin((this.refs.nameInput).value);
    }

    requestLogin(){

     this.showNotification("Please login to continue", "You can login as a guest", "info");
    }

    hidewarning(){
      if (this.state.incorrectUser){
        this.setState({incorrectUser : false});
      }
    }

    render() {
        
        return (
            <>
            
            <Modal id="loginModal" show={!this.state.inSession} onHide={this.requestLogin.bind(this)}>
              <Modal.Header>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
               
              <Modal.Body>
    
                <form onSubmit={this.submitHandler.bind(this)}>
    
                    <div className="form-group">
                        <input type="text" className="form-control" ref="nameInput" onChange={this.hidewarning.bind(this)} placeholder="Enter Username"/>
                    </div>
                    {this.displayIncorrectWarning()}
                </form>
    
              </Modal.Body>
    
              <Modal.Footer>
    
                <Button variant="success" onClick={this.handleLogin.bind(this, "guest")}>
                  or Login as Guest
                </Button>
    
              </Modal.Footer>
            </Modal>
          </>
        );
    }

}


export default LoginModal