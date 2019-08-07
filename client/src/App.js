import React, {Component} from 'react';
import './App.css';
import Customers from "./components/customers/customers.js";
import Nav from "./components/Navigation/navigation.js";
import LinksTable from "./components/Tables/LinksTable/linksTable.js";



class App extends Component{


  render(){

    return (

      <div className="container-fluid">

        <Nav/>
                
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-primary">Primary</button>

        <hr/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{width: '1%'}}>#</th>
              <th scope="col" style={{width: '0%', display:'none'}}></th>
              <th scope="col" style={{width: '1%'}}>Star</th>
              <th scope="col" style={{width: '20%'}}>Title</th>
              <th scope="col" style={{width: '65%'}}>Description</th>
              <th scope="col" style={{width: '5%'}}>CreatedDate</th>
              <th scope="col" style={{width: '1%'}}>Read</th>
              <th scope="col" style={{width: '1%'}}></th>
            </tr>
          </thead>

          <tbody>
            <LinksTable/>
          </tbody>
          
        </table>

      </div>
      
    );
  }
}

export default App;
