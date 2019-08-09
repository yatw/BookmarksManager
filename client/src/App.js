import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Navigation/navigation.js";
import LinksTable from "./components/Tables/LinksTable/linksTable.js";



class App extends Component{
  constructor() {
    super();
    this.updateTable = this.updateTable.bind(this);
    this.updateNavCount = this.updateNavCount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      TableUpdate : false,
      NavCountUpdate: false,
      searchTerm: null
    };
  }

  updateTable(){
    this.setState({needUpdate : true})
  }

  updateNavCount(){
    this.setState({updateNavCount : true})
  }

  handleSearch(searchTerm){
    this.setState({searchTerm : searchTerm, TableUpdate: false})
  }


  render(){

    return (

      <div className="container-fluid">

        <Nav updateTable={this.updateTable} needUpdate={this.state.NavCountUpdate} handleSearch={this.handleSearch}/>
                
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-primary">Primary</button>

        <hr/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{width: '1%'}}>#</th>
              <th scope="col" style={{width: '1%'}}>Star</th>
              <th scope="col" style={{width: '20%'}}>Title</th>
              <th scope="col" style={{width: '70%'}}>Description</th>
              <th scope="col" style={{width: '5%'}}>CreatedDate</th>
              <th scope="col" style={{width: '1%'}}>Read</th>
              <th scope="col" style={{width: '1%'}}></th>
            </tr>
          </thead>

          <tbody>
            <LinksTable updateNavCount={this.updateNavCount} needUpdate={this.state.TableUpdate} searchTerm={this.state.searchTerm}/>
          </tbody>
          
        </table>

      </div>
      
    );
  }
}

export default App;
