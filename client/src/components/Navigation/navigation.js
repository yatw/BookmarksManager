import React, { Component } from 'react';


class Nav extends Component {
  constructor() {
    super();
    this.state = {
      linksTotal : 0,
      categoryTotal : 0
    };
  }

  /**
  componentDidMount() {
    fetch('/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  } */

  render() {
    return (
        
          <div className="sticky-top">

            <div className="banner">
                <p className="center">Knowledge is power, embedded as links</p>
            </div> 

            <nav className="navbar navbar-expand-lg">

                {/**
                <a className="navbar-brand" onClick={window.open('https://github.com/yatw/InfoCluster')}>
                    <img src="images/logo.jpg" width="60" height="60" alt=""/>
                </a>
                 */}
                <button className="navbar-toggler" type="button">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <span className="navbar-text ml-3">
                Stored {this.state.linksTotal} entries in {this.state.categoryTotal} categories
                </span>
                
                <form className="row ml-5">
                    <input type="text" className="form-control search-query bar-size" placeholder="Search" id="searchBox"/>
                    <button className="btn btn-success my-2 ml-sm-2 my-sm-0" type="submit">Search</button>
                </form>
                
                <button type="button" className="btn btn-outline-primary ml-5 mx-auto" data-toggle="modal" data-target="#addNewModal">Add a new entry</button>
                
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#">About</a>
                    <a className="nav-item nav-link" href="#">Pricing</a>
                    <a className="nav-item nav-link disabled" href="#">Disabled</a>
                </div>
            </nav>
          </div>  
    );
  }
}

export default Nav;