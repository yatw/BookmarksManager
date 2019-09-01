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


  displayAll(tags = [], searchTerm = "", sortby = this.state.sortby, order = this.state.order){
    
    fetch("/displayLinks", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tags: tags, searchTerm : (searchTerm.length > 2)? searchTerm : "", sortby : sortby, order : order})
    })
    .then(response => response.json())
    .then(data => {
        this.setState({ links: data, sortby : sortby, order : order})
    })
    .catch((error) => {
      console.log(error);
    });
    
  }


  componentDidMount() {
    this.displayAll();
  }


  // receive new props when a new link is added, or search term is entered
  componentWillReceiveProps(newprops) {

    if (newprops.needUpdate){
      this.displayAll( newprops.filterTags, newprops.searchTerm);
    }
  }


  handleSort(sortby){

    var order = true;

    if (this.state.sortby === sortby){ // if currently sorted on the same field, just sort the other way
      order = !this.state.order;
    }

    this.displayAll(this.props.filterTags, this.props.searchTerm, sortby, order);

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
              <th scope="col" style={{width: '2%'}} onClick={this.handleSort.bind(this,"completed")}></th>
            </tr>
          </thead>

          <tbody>
            {this.state.links.map(link => (
            <LinkItem key={link.linkId} linkNum={linkNum++} link={link} update={this.props.update} tags={this.props.tags}/> 
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
  searchTerm: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  filterTags: PropTypes.array.isRequired
}


export default LinksTable