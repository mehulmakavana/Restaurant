import React, { Component } from "react";

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
        <div className="user-data">
          {this.state.people.map((user) => (
            <div key={user._id}>
              <div>
                <div className="Single-user">
                  <div className="user-info">UserId :- {user._id}</div>
                  <div className="user-info">Name :- {user.name}</div>
                  <div className="user-info">Email :- {user.email}</div>
                  <div className="user-info">PhoneNo :- {user.phone}</div>
                  <div className="user-info">
                    Created At :- {user.created_At}
                  </div>
                </div>

              
                  <div>
                    <button
                      className="btn6"
                      onClick={() => this.delete(user._id)}
                      variant="danger"
                    >
                      Delete
                    </button>
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
