import React, { Component } from 'react';
import './TotalStaff.css'

export class User extends Component {

  constructor(props) {

    super(props);
    this.state = {

      people: [],
      selectedOption: "",
      activerole:"user"

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/all/geteveryone"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.persons, loading: false });
    this.searchArray = data

  }

  handleOptionChange(e) {
    let selectedOption = e.target.value
    this.setState({ selectedOption: selectedOption })
  }

  renderTableData() {
    return this.state.people.map((data) => {
      const { _id, phone, name, email } = data
      return (

        <tr key={_id}>

          <td><div className="name">{name}</div></td>

          <td><div className="price">{email}
          </div></td>

          <td><div className="description">{phone}
          </div></td>

        </tr>
      )
    })
  }



  render() {

    return (

      <div>

        <h1>Staff</h1>

        <div className="flex">

          <div className="content">

            <table id="table2" >

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Payment Method</th>
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

export default User

