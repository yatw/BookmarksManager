import React, { Component } from 'react';


class Nav extends Component {
  constructor() {
    super();
    this.state = {
      linksTotal : 0,
      categoryTotal : 0
    };
  }

  componentDidMount() {
    fetch('/getLinksCount')
      .then(res => res.json())
      .then(res => this.setState({
        
        linksTotal: res[0].count,
        categoryTotal: 3
      
      
      }, () => console.log('LinksCount fetched...', res)));

  }

  render() {
    return (  


      

    <div className="sticky-top">


        <div className="banner">
            <p className="center">Information storage, embededd as links</p>
        </div> 

        <nav className="navbar navbar-expand-lg">

            
            <a className="navbar-brand" style={{cursor: 'pointer'}} onClick={() => window.open('https://github.com/yatw/Bookmark')}>
                <img src="images/logo.jpg" width="60" height="60" alt=""/>
            </a>
            
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

              {/**Modal for insert 
      <div className="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="ModalLabel">Add a new link</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>


                  <div className="modal-body">

                      <form method="post" action="/addLink">
                          <div className="form-group">
                              <label>Link</label>
                              <input type="text" className="form-control" name="url" id="urlInput" placeholder="Paste in url"/>
                          </div>
                          <div className="form-group">
                                  <label for="title">Title</label>
                                  <input type="text" className="form-control" name="title" id="titleInput" placeholder="Enter title"/>
                          </div>
                          <div className="form-group">
                              <label for="title">Description</label>
                              <input type="text" className="form-control" name="detail" id="descriptionInput" placeholder="Enter Description"/>
                          </div>
                        
                          {/** 
                          <div className="form-group">
                                  <label for="category">Category</label>
                                  <input type="text" className="form-control" name="inputCategory" placeholder="Where does it belong"/>
                          </div>

                          <div className="modal-footer">
                              <p id="duplicateAlert" style={{color: 'red', visibility: 'hidden'}}>The exact same link is already stored in database</p>
                              <button type="submit" className="btn btn-success" disabled id="submitButton">Save</button>
                          </div>

                      </form>
                    
                  </div>
              </div>
            </div>
        </div>
      */}
      </div>  

    );
  }
}

export default Nav;