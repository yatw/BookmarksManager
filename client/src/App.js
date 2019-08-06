import React, {Component} from 'react';
import './App.css';
import Customers from "./components/customers/customers.js";
import EditModal from './components/Modals/editModal';
import Nav from "./components/Navigation/navigation.js";
import LinksTable from "./components/Tables/LinksTable/linksTable.js";



class App extends Component{

  constructor() {
    super();
    this.state = {
      editModalShown: false,
        linkId : null,
        linkUrl : null,
        linkTitle : null,
        linkDetail : null
    };
  }

  handleEditClick = (id, url, title, detail) => {

    this.setState({editModalShown:true, linkId: id, linkUrl: url, linkTitle: title, linkDetail : detail });

  }
  
  render(){

    const {linkId, linkUrl, linkTitle, linkDetail} = this.state;

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
            <LinksTable handleEditClick={this.handleEditClick}/>
          </tbody>
          
        </table>

        <EditModal isShown={this.state.editModalShown} linkId={linkId} linkUrl={linkUrl} linkTitle={linkTitle}  linkDetail={linkDetail} />
      </div>
      
    );
  }
}

export default App;
