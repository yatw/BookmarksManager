import React, { Component } from 'react';
import LinkItem from './linkItem';
import PropTypes from 'prop-types';


class LinksTable extends Component {
  constructor() {
    super();
    this.state = {
      links: []
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
    }).then((result)=>{

       this.setState({links: this.state.links.map(link => {

          if (link.linkId === id){
            if (field === 'star'){
              link.star = !curState;
            }else if (field === 'completed'){
              link.completed = !curState;
            }
            
          }
          return link;
       })
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
  
  render() {

    return this.state.links.map(link => (
      <LinkItem key={link.linkId} link={link} checkboxToggle={this.checkboxToggle} handleEditClick={this.props.handleEditClick}/> 
    ));        

  }
}

// PropTypes
LinksTable.propTypes = {
  handleEditClick: PropTypes.func.isRequired
}


export default LinksTable