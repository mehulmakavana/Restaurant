import React, { Component } from "react";
import './Staff.scss'

export class viewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "user",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    this.setState({ people: data.list, loading: false });
  }

  delete(_id) {
    fetch("http://localhost:8020/all/delete/" + _id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  render() {
    const url = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";

    if (this.state.loading) {
      return (
        <div>
          <div className="logo">
            <img height="100px" width="100px" src={url} />
          </div>
          <div className="state">loading...</div>
        </div>
      );
    }
    return (
      <div>
        <h1>All user</h1>
        <div>
        <table className="wt1">
         
         <td>Name</td>
         <td>Email</td>
         <td>Phone</td>
         <td>Action</td>
      
       </table>
          {this.state.people.map((user) => (
            <div key={user._id}>
              <div>
                <div>
                <table className="wt">
                    <tr>
                      <td> {user.name}</td>
                      <td> {user.email}</td>
                      <td>{user.phone}</td>
                      <td>
            
                        <button className="sb sb1"
                          onClick={() => this.delete(user._id)}
                          variant="danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    </table>
                
                </div>

            
              </div>
            </div>
          ))}
        
        </div>
      </div>
    );
  }
}

export default viewUser;
