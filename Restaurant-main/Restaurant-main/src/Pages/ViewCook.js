import React, { Component } from "react";
import './ViewStaff.scss';

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
      <div className="aspp">

        <div className="aspp1">

          <label className="label">Edit Details</label>

            <div className="dtl">
            <div className="title">Name</div>
            <div className="text1">
              <input
                className="text2"
                type="text"
                name="name"
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <div className="email">Email</div>
            <div className="email1">
              <input
                className="email2"
                type="text"
                name="email"
               
                onChange={(e) => this.handleEmail(e)}
              />
            </div>

            <div className="phone">Phone</div>
            <div className="phone1">
              <input
                className="phone2"
                type="text"
                name="phone"
                onChange={(e) => this.handlePhone(e)}
              />
            </div>

            <div className="popbtn">
              <button className="popbtn1" onClick={(e) => this.update(e)}>
                Update
              </button>
            </div>

        <div className="popbtn2">
            <button className="popbtn3" onClick={this.props.closePopup}>X</button>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
export class viewCook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(cook) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: cook._id,
    });
  }
  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "cook",
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
        <h1>All Cook</h1>
        <div>
        <table className="wt1">
         
         <td>Name</td>
         <td>Email</td>
         <td>Phone</td>
         <td>Time</td>
         <td>Action</td>
         
      
       </table>
          {this.state.people.map((cook) => (
            <div key={cook._id}>
              <div>
                <div>
                <table className="wt">
                    <tr>
                      <td> {cook.name}</td>
                      <td> {cook.email}</td>
                      <td>{cook.phone}</td>
                      <td>{cook.created_At}</td>

                      <td >
                        <button className="sb sb1" onClick={() => this.togglePopup(cook)}>
                          Edit item
                        </button>

                        <button className=" sb sb1"
                          onClick={() => this.delete(cook._id)}
                          variant="danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    </table>
                
                </div>

                {this.state.showPopup ? (
                  <Popup
                    _id={this.state.id}
                    closePopup={() => this.togglePopup(cook)}
                  />
                ) : null}
              </div>
            </div>
          ))}
        
        </div>
      </div>
    );
  }
}
export default viewCook;
