import React, { Component } from 'react';
import './Menu.css';
import axios from 'axios';



export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      categoryName: null,
      people: [],
      id: null,
      showPopup: false,
      activeOrderId: null,
      loading: true,
      imageUrl: "",
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
    this.searchArray = data;
  }
  render() {
    return (
      <div>
        <div>
          <h1>Add Category</h1>

          <div className="ac">
            <div className="ac1">
              <div className="ac2">
                <div className="title">Image</div>
                <div className="text1">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFile(e)}
                  />
                </div>

                <div className="title">Category-Name</div>
                <div className="text1">
                  <input
                    type="text"
                    className="text2"
                    name="categoryName"
                    onChange={(e) => this.handleName(e)}
                  />
                </div>

                <div className="button1">
                  <button
                    className="btn1"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="tn">Categories</label>
          <div>
            <table className="act">
              <td>Category-Name</td>
              <td>Image</td>
              <td>Action</td>
            </table>
            {this.state.people.map((data) => (
              <div key={data._id}>
                <div>
                  <div>
                    <table className="act1">
                      <tr>
                        <td> {data.categoryName}</td>
                        <td>
                          <img
                            height="100px"
                            width="100px"
                            className="img"
                            src={data.imageUrl}
                          />
                        </td>
                        <td>
                          <button
                            className="teb teb1"
                            onClick={() => this.togglePopup(data)}
                          >
                            Add Menu
                          </button>

                          <button
                            className="teb teb1"
                            onClick={() => this.delete(data._id)}
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
                      _id={this.state.activeId}
                      text="Close Me"
                      closePopup={() => this.togglePopup(data)}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class SecondPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      showSecondPopup: false,
      loading: true,
      imageUrl: "",
      originalPrice: "",
      description: "",
      offer: "",
      activeId1: null,
    };
    this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  EditItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  EditItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  EditItemPrice(e) {
    let originalPrice = e.target.value;
    this.setState({ originalPrice: originalPrice });
  }

  EditItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  EditItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemEdit(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let offer = this.state.offer;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("name", name);
    formdata.append("offer", offer);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/menu/update/` + this.props.id1,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.setState({ showSecondPopup: !this.state.showSecondPopup });
        this.componentDidMount();

      },
      (err) => {}
    );
  }

  toggleSecondPopup(data) {
    this.setState({
      showSecondPopup: !this.state.showSecondPopup,
      activeId1: data._id,
    });
  }

  render() {
    return (
      <div className="acp">
        <div className="acp1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeSecondPopup}
            >
              X
            </button>
          </div>



          <div>
    <label className="mn">Edit Item</label>
    <div>
      <div className="ac">
        <div className="ac1">
          <div className="ac2">
            <div className="text1">
              <input
                type="file"
                name="file"
                onChange={(e) => this.EditItemFile(e)}
                />
            </div>

            <div className="title">Sub-Title</div>
            <div className="text1">
              <input
                className="text2"
                type="text"
                name="name"
                onChange={(e) => this.EditItemName(e)}
                />
            </div>

            <div className="title">Price (RS)</div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="originalPrice"
                min="1"
                onChange={(e) => this.EditItemPrice(e)}
                />
            </div>

            <div className="title">Offer</div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="offer"
                min="1"
                onChange={(e) => this.EditItemOffer(e)}
                />
            </div>

            <div className="title">Description</div>
            <div className="dsc1">
              <textarea
                className="dsc2"
                type="text"
                name="description"
                onChange={(e) => this.EditItemDescription(e)}
                />
            </div>

            <div className="button1">
              <button
                className="btn1"
                onClick={(e) => this.handleItemEdit(e)}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 
</div>
</div>
);
}
}

class Menu extends Component {

  constructor(props) {

    super(props);
    this.state = {

      file: null,
      name: null,
      people: [],
      loading: true,
      imageUrl: "",
      id: null,
      originalPrice: "",
      description: "",
      offer: "",
      isOpen: false,
      error: null,
      showPopup: false


    }
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: data._id
    });
  }

  async componentDidMount() {

    const url = "http://localhost:8020/menu/menues"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
    this.searchArray = data
  }


  handleName(e) {
    let name = e.target.value
    this.setState({ name: name })
  }

  handleFile(e) {
    let file = e.target.files[0]
    this.setState({ file: file })
  }

  handlePrice(e) {
    let originalPrice = e.target.value
    this.setState({ originalPrice: originalPrice })
  }

  handleOffer(e) {
    let offer = e.target.value
    this.setState({ offer: offer })
  }

  handleDescription(e) {
    let description = e.target.value
    this.setState({ description: description })
  }


  handleUpload(e) {
    let menu = this.state.menu;
    let menu = this.state.menu;
    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("categoryName", categoryName);

    axios({
      url: `http://localhost:8020/categorypost/create`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.componentDidMount();
      },
      (err) => {}
    );
  }

  delete(id) {
    fetch("http://localhost:8020/categorypost/delete/" + id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      activeId: data._id,
    });
  }

}
  

  render() {


      return (
        <div>
          <div>
            <h1>Add Category</h1>
  
            <div className="me">
              <div className="me1">
                <div className="me2">
                  <div className="title1">Image</div>
                  <div className="text12">
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => this.handleFile(e)}
                    />
                  </div>
  
                  <div className="title">Category-Name</div>
                  <div className="text1">
                    <input
                      type="text"
                      className="text2"
                      name="categoryName"
                      onChange={(e) => this.handleName(e)}
                    />
                  </div>
  
                  <div className="button1">
                    <button
                      className="btn1"
                      onClick={(e) => this.handleUpload(e)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div>
            <label className="tn">Categories</label>
            <div>
              <table className="act">
                <td>Category-Name</td>
                <td>Image</td>
                <td>Action</td>
              </table>
              {this.state.people.map((data) => (
                <div key={data._id}>
                  <div>
                    <div>
                      <table className="act1">
                        <tr>
                          <td> {data.categoryName}</td>
                          <td>
                            <img
                              height="100px"
                              width="100px"
                              className="img"
                              src={data.imageUrl}
                            />
                          </td>
                          <td>
                            <button
                              className="teb teb1"
                              onClick={() => this.togglePopup(data)}
                            >
                              Add Menu
                            </button>
  
                            <button
                              className="teb teb1"
                              onClick={() => this.delete(data._id)}
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
                        _id={this.state.activeId}
                        text="Close Me"
                        closePopup={() => this.togglePopup(data)}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
export default Menu;