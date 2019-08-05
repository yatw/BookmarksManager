import React, { Component } from 'react';
import LinkItem from './linkItem';

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

  starToggle = (id, isStar) => {

    // call node.js route to update db
    fetch("/checkbox", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'field' : 'star', 'status': !isStar , 'linkId' : id})
    }).then((result)=>{

       console.log("output" + result.json());

    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {

    return this.state.links.map(link => (
      <LinkItem key={link.linkId} link={link} starToggle={this.starToggle} /> 
    ));        

  }
}


export default LinksTable