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
      searchTerm: "",
      tags : [],
      filterTags : []
    };
  }

  componentDidMount(){

    fetch("/displayTags", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(

       tags => this.setState({tags}) 
     
    ).catch((error) => {
      console.log(error);
    });
  }


  update(){
    this.setState({needUpdate: true})
  }


  handleSearch(searchTerm){
    
    this.setState({needUpdate: true, searchTerm : searchTerm.trim()})
    
  }

  // in order to access "this.state" use arrow function
  //https://stackoverflow.com/questions/43284394/react-child-calling-parent-method-cant-access-state
  handleFilter = (tagName) => {

    var pos = this.state.filterTags.indexOf(tagName);

    var l = null;

    // already selected, now remove it from selected
    if (pos > -1){

      l = this.state.filterTags;
      l.splice(pos,1);

    }else{
      l = this.state.filterTags.concat(tagName);
    }

    this.setState({ filterTags: l, needUpdate: true });

  }

  render(){
    return (

      <div className="container-fluid">

        <Nav update={this.update} needUpdate={this.state.needUpdate} handleSearch={this.handleSearch} tags={this.state.tags} filterTags={this.state.filterTags} handleFilter={this.handleFilter}/>

        <LinksTable update={this.update} needUpdate={this.state.needUpdate} searchTerm={this.state.searchTerm} tags={this.state.tags} filterTags={this.state.filterTags}/>
      </div>
      
    );
  }
}

export default App;
