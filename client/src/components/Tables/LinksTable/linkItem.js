import React, { Component } from 'react'
import PropTypes from 'prop-types';
import EditModal from '../../Modals/editModal';

export class LinkItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
          editModalShown: false,
          Id : this.props.link.linkId,
          url : this.props.link.url,
          title : this.props.link.title,
          detail : this.props.link.detail,
          star : this.props.link.star,
          completed : this.props.link.completed,
        };
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
    
            this.props.update()
    
        )
        .catch((error) => {
          console.log(error);
        });
    
      }
    
    getStarClass = () =>{
        return (this.state.star)?"fas fa-star fa-clickable" : "far fa-star fa-clickable";
    }

    getReadClass = () =>{
        
        return (this.state.completed)?"fas fa-check-square fa-clickable" : "far fa-check-square fa-clickable";
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
        this.handleClose(),
        this.props.update()
    )
    .catch((error) => {
      console.log(error);
    });

  }


  handleUpdateLink = (toupdate_id, newURL, newTitle, newDesc) => {

    fetch("/updateLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({linkId : toupdate_id, title : newTitle, url : newURL, detail : newDesc})
    }).then(

      this.setState({url : newURL, title : newTitle, detail: newDesc, editModalShown: false })

    )
    .catch((error) => {
      console.log(error);
    });

  }

  checkboxToggle = (id, field, curState) => {
    // call node.js route to update db

    var starState = this.state.star;
    var completedState = this.state.completed;

    if (field === "star"){
        starState = !starState;
    }else if (field === "completed"){
        completedState = !completedState;
    }


    fetch("/checkbox", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({field : field, status: !curState , linkId : id})
    }).then(
        this.setState({star : starState, completed : completedState })

    ).catch((error) => {
      console.log(error);
    });
  }


  handleClose = () => {
    this.setState({editModalShown: false});
  }

  handleOpen = (id, url, title, detail) => {
    this.setState({editModalShown:true, Id: id, url: url, title: title, detail : detail });
  }


    
    render() {
        const {Id, title, detail, url, completed, star} = this.state;

        return (
            <tr>
                {/*Count */}
                <td>{this.props.linkNum}</td>

                {/*Star */}
                <td><i className={this.getStarClass()} style={{fontSize:'20px', color:'#FFD700'}} onClick={this.checkboxToggle.bind(this, Id, 'star',star)}></i></td>
              
                {/*Title */}
                <td><a href= {url} target="_blank" rel="noopener noreferrer">{title}</a></td>

                {/*Description */}
                <td>{detail}</td>

                {/*createdDate */}
                <td>{this.props.link.createdDate}</td>

                {/*Read */}
                <td><i className={this.getReadClass()} style={{fontSize:'30px', color:'#02cf32'}} onClick={this.checkboxToggle.bind(this, Id, 'completed', completed)}></i></td>

                {/*Edit */}
                <td><i className="fas fa-edit fa-clickable" style={{fontSize:'30px', color:'#ff9933'}} onClick={this.handleOpen.bind(this, Id, url, title, detail )}></i></td>


                <EditModal isShown={this.state.editModalShown} linkId={Id} linkUrl={url} linkTitle={title}  linkDetail={detail} 
                        handleDeleteLink={this.handleDeleteLink} handleUpdateLink={this.handleUpdateLink} handleClose={this.handleClose}/>
                </tr>
        );
    }
}

// PropTypes
LinkItem.propTypes = {
    link: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
}

  
export default LinkItem
