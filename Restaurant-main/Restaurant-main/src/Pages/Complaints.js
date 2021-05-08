import React, { Component } from 'react';
import './Complaints.scss'

export class Complaints extends Component {

  constructor(props) {

    super(props);
    this.state = {

      people: [],
      
    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/complaint/complaints"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.complaints, loading: false });
    this.searchArray = data

  }


  render() {

    return (

      <div>
      <h1>Complaints</h1>
      <div>
      <table className="cmt">
       
       <td>Title</td>
       <td>Message</td>
  
    
     </table>
        {this.state.people.map((complaints) => (
          <div key={complaints._id}>
            <div>
           
              <table className="cmt1">
                  <tr>
                    <td> {complaints.title}</td>
                    <td> {complaints.message}</td>
                    
                  </tr>
                  </table>
              
              </div>

           
          </div>
        ))}
      
      </div>
    </div>
  );
}
}

export default Complaints

