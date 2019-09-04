import React, { Component } from 'react';
import InsertModal from '../Modals/insertModal';
import PropTypes from 'prop-types';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linksTotal : 0,
      insertModalShown: false,
    };
  }

  updateCounts(){

    fetch('/getLinksCount')
    .then(res => res.json())
    .then(res => this.setState({
      
      linksTotal: res[0].count,
      categoryTotal: 0
    
    
    }))
    .catch((error) => {
      console.log(error);
    });

  }
  
  componentWillReceiveProps(newprops) {

    if (newprops.needUpdate){
      this.updateCounts();
    }
  }

  componentDidMount(){
    this.updateCounts();
  }


  

  handleOpen = () => {
    this.setState({insertModalShown:true});
  }

  handleClose = () => {
    this.setState({insertModalShown: false});
  }

  onSearchInput = (e) => {

    this.props.handleSearch( e.target.value);
    
  }

  getTagBtnClass = (tagName) =>{

    return (this.props.filterTags.includes(tagName))? "btn btn-primary" : "btn btn-light ";
  }

  render() {

    return (  
    <>

        <div className="banner">
            <p className="center">Information storage</p>
        </div> 


        <nav className="navbar navbar-expand-lg sticky-top">


            <a style={{cursor: 'pointer'}} href= 'https://github.com/yatw/Bookmark' target="_blank" rel="noopener noreferrer">
              <img id="logo" className="navbar-brand" src="logo.jpg" alt=""/>
            </a>

            <div className="collapse navbar-collapse">
          
                <span className="navbar-text mr-5 ">
                  Stored {this.state.linksTotal} entries in {this.props.tags.length} categories
                </span>
    
                
                <input type="text" className="form-control search-query mr-5 bar-size" placeholder="Search" onChange={this.onSearchInput}/>
                
                <button type="button" className="btn btn-outline-primary" onClick={this.handleOpen}>Add a new entry</button>
                
            </div>

        </nav>

        <div className="offset-sm-1">
            {this.props.tags.map(tag => (
                <button type="button" key={tag.tagId} className={this.getTagBtnClass(tag.name)} onClick={ () => { this.props.handleFilter(tag.name) }}>{tag.name}</button>
            ))}
        </div>


        <InsertModal isShown={this.state.insertModalShown} handleClose={this.handleClose} update={this.props.update} tags={this.props.tags} />
      </>  

    );
    }
  }

  // PropTypes
  Nav.propTypes = {
    update: PropTypes.func.isRequired,
    needUpdate: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    filterTags: PropTypes.array.isRequired,
    handleFilter: PropTypes.func.isRequired
}


export default Nav;