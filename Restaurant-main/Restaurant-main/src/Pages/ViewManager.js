import React, { Component } from "react";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }

  update(e) {
    e.preventDefault();

    fetch("http://localhost:8020/all/update/all/" + this.props._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleEmail(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  handlePhone(e) {
    let phone = e.target.value;
    this.setState({ phone: phone });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <div className="container2">
            

            <div className="title">Name</div>
            <div className="text1">
              <input
                className="text2"
                type="text"
                name="name"
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <div className="price1">Email</div>
            <div className="price2">
              <input
                className="price3"
                type="text"
                name="email"
               
                onChange={(e) => this.handleEmail(e)}
              />
            </div>

            <div className="dsc">phone</div>
            <div className="dsc1">
              <input
                className="dsc2"
                type="text"
                name="phone"
                onChange={(e) => this.handlePhone(e)}
              />
            </div>

            <div className="button4">
              <button className="btn4" onClick={(e) => this.update(e)}>
                Update
              </button>
            </div>

            <button onClick={this.props.closePopup}>close</button>
          </div>
        </div>
      </div>
    );
  }
}

class viewManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(manager) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: manager._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "manager",
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
        <div className="head-manager">All manager</div>
        <div className="manager-data">
          {this.state.people.map((manager) => (
            <div key={manager._id}>
              <div>
                <div className="Single-manager">
                  <div className="manager-info">UserId :- {manager._id}</div>
                  <div className="manager-info">Name :- {manager.name}</div>
                  <div className="manager-info">Email :- {manager.email}</div>
                  <div className="manager-info">PhoneNo :- {manager.phone}</div>
                  <div className="manager-info">
                    Created At :- {manager.created_At}
                  </div>
                </div>
                <div>
                  <div>
                    <button className="btn6" onClick={() => this.togglePopup(manager)}>
                      Edit item
                    </button>
                  </div>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(manager)}
                    />
                  ) : null}

                  <button
                    className="btn6"
                    onClick={() => this.delete(manager._id)}
                    variant="danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default viewManager;
