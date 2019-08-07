import React, { Component } from 'react';
import LinkItem from './linkItem';
import PropTypes from 'prop-types';
import EditModal from '../../Modals/editModal';


class LinksTable extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      editModalShown: false,
      linkId : null,
      linkUrl : null,
      linkTitle : null,
      linkDetail : null
    };
  }


  componentDidMount() {
    fetch('/getLinks')
      .then(res => res.json())
      .then(links => this.setState({links}, () => console.log('Links fetched...', links)));
  }

  checkboxToggle = (id, field, curState) => {
    // call node.js route to update db

    fetch("/checkbox", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({field : field, status: !curState , linkId : id})
    }).then(
      
      this.setState({links: this.state.links.map(link => {

        if (link.linkId === id){
          if (field === 'star'){
            link.star = !curState;
          }else if (field === 'completed'){
            link.completed = !curState;
          }
          
        }
        return link;
     })})
    ).catch((error) => {
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

      
      // return all the link that the id do not match this id
       this.setState({links: [...this.state.links.filter(link => link.linkId !== todelete_id)] ,
        editModalShown: false})


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

      this.setState({links: this.state.links.map(link => {

        if (link.linkId === toupdate_id){
          link.title = newTitle;
          link.url = newURL;
          link.detail = newDesc;
        }
        return link;
     
      }),
     editModalShown: false})

    )
    .catch((error) => {
      console.log(error);
    });

  }

  

  handleEditClick = (id, url, title, detail) => {

    this.setState({editModalShown:true, linkId: id, linkUrl: url, linkTitle: title, linkDetail : detail });

  }
  
  render() {

    const {linkId, linkUrl, linkTitle, linkDetail} = this.state;

    return (
      <>
        <EditModal isShown={this.state.editModalShown} linkId={linkId} linkUrl={linkUrl} linkTitle={linkTitle}  linkDetail={linkDetail} handleDeleteLink={this.handleDeleteLink} handleUpdateLink={this.handleUpdateLink} />

        {this.state.links.map(link => (
          <LinkItem key={link.linkId} link={link} checkboxToggle={this.checkboxToggle} handleEditClick={this.handleEditClick}/> 
        ))}
      </>
    );


  }
}



export default LinksTable