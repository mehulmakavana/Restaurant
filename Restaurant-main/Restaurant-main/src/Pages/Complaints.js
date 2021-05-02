import React, { Component } from 'react';
import './Complaints.css'

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

  renderTableData() {
    return this.state.people.map((data) => {
      const { _id, orderId, title, message } = data
      return (

        <tr key={_id}>

          <td><div className="name">{orderId}</div></td>

          <td><div className="price">{title}
          </div></td>

          <td><div className="description">{message}
          </div></td>

        </tr>
      )
    })
  }

  render() {

    return (

      <div>

        <h1>Complaints</h1>

        <div className="flex">

          <div className="content">

            <table id="table2" >

              <tr>
                <th>Order-Id</th>
                <th>Title</th>
                <th>Message</th>
              </tr>

            </table>

          </div>

          <div>

            <table id='students1'>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
  }
}

export default Complaints

