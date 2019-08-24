import React, { Component } from 'react';
import LinkItem from './linkItem';
import PropTypes from 'prop-types';


class LinksTable extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      links: [],
      sortby: null,
      order: false  // true is ASC, false is DESC
    };
  }
  displayAll(sortby = null, order = null){

    fetch("/displayLinks", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortby : sortby, order : order})
    })
    .then(response => response.json())
    .then(data => {
        this.setState({ links: data, sortby : sortby, order : order})
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  
  SearchResult(sortby, order, query){

    fetch("/search", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortby : sortby, order : order, query : query})
    
    })
    .then(res => res.json())
    .then(

       links => this.setState({links, sortby: sortby, order: order}) 
     
    ).catch((error) => {
      console.log(error);
    });

  }

  componentDidMount(sortby = null, order = null, searchTerm = this.props.searchTerm) {

    if (searchTerm === ""){
      this.displayAll(sortby, order);
    }else if (searchTerm.length > 2){
      this.SearchResult(sortby, order, searchTerm);
    }

  }

  componentWillReceiveProps(newprops) {

    if (newprops.needUpdate){
      this.componentDidMount(null, null, newprops.searchTerm);
    }
  }


  handleSort(sortby){

    var order = true;

    if (this.state.sortby === sortby){ // if currently sorted on the same field, just sort the other way
      order = !this.state.order;
    }

    this.componentDidMount(sortby, order);
  }
  
  render() {

    var linkNum = 1;

    return (

      <table className="table table-striped table-wrapper-scroll-y my-custom-scrollbar tableFixHead">
          <thead>
            <tr>
              <th scope="col" style={{width: '1%'}} onClick={this.handleSort.bind(this,"linkId")}>#</th>
              <th scope="col" style={{width: '1%'}} onClick={this.handleSort.bind(this,"star")}>Star</th>
              <th scope="col" style={{width: '20%'}} onClick={this.handleSort.bind(this,"title")} >Title</th>
              <th scope="col" style={{width: '70%'}} onClick={this.handleSort.bind(this,"detail")}>Description</th>
              <th scope="col" style={{width: '5%'}} onClick={this.handleSort.bind(this,"createdDate")}>CreatedDate</th>
              <th scope="col" style={{width: '1%'}} onClick={this.handleSort.bind(this,"completed")}>Read</th>
              <th scope="col" style={{width: '1%'}} onClick={this.handleSort.bind(this,"completed")}></th>
            </tr>
          </thead>

          <tbody>
            {this.state.links.map(link => (
            <LinkItem key={link.linkId} linkNum={linkNum++} link={link} update={this.props.update}/> 
            ))}
          </tbody>
       
      </table>
    );
  }
}


// PropTypes
LinksTable.propTypes = {
  update: PropTypes.func.isRequired,
  needUpdate: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired
}


export default LinksTable