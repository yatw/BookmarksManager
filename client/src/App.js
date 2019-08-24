import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Navigation/navigation.js";
import LinksTable from "./components/Tables/LinksTable/linksTable.js";



class App extends Component{
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      needUpdate : false,
      searchTerm: ""
    };
  }

  update(){
    this.setState({needUpdate: true})
  }


  handleSearch(searchTerm){
    
    this.setState({needUpdate: true, searchTerm : searchTerm.trim()})
    
  }

  render(){
    return (

      <div className="container-fluid">

        <Nav update={this.update} needUpdate={this.state.needUpdate} handleSearch={this.handleSearch}/>

        <LinksTable update={this.update} needUpdate={this.state.needUpdate} searchTerm={this.state.searchTerm}/>
        <p className="lead">fine</p>
      </div>
      
    );
  }
}

export default App;
