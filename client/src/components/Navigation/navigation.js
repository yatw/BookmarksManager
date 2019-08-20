import React, { Component } from 'react';
import InsertModal from '../Modals/insertModal';
import PropTypes from 'prop-types';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linksTotal : 0,
      categoryTotal : 0,
      insertModalShown: false
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

  handleInsertLink = (urlInput, titleInput, descInput) => {
    
    fetch("/insertLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title : titleInput, url : urlInput, detail : descInput})
    }).then(
      this.handleClose(),
      this.props.update() // table component need update after the insert

    )
    .catch((error) => {
      console.log(error);
    });
  
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
                  Stored {this.state.linksTotal} entries in {this.state.categoryTotal} categories
                </span>
    
                
                <input type="text" className="form-control search-query mr-5 bar-size" placeholder="Search" onChange={this.onSearchInput}/>
                
                <button type="button" className="btn btn-outline-primary" onClick={this.handleOpen}>Add a new entry</button>
                
            </div>

        </nav>
          

        <InsertModal isShown={this.state.insertModalShown} handleInsertLink={this.handleInsertLink} handleClose={this.handleClose}/>
      </>  

    );
    }
  }

  // PropTypes
  Nav.propTypes = {
    update: PropTypes.func.isRequired,
    needUpdate: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,

}


export default Nav;