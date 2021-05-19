import React, { Component } from "react";
import axios from "axios";
import "./Ingredients.scss";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      people: [],
      showSecondPopup: false,
      loading: true,
      imageUrl: "",
      Price: "",
      description: "",
      offer: "",
      activeId1: null,
    };
    this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/ingredients/getIngredients";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.ingredients, loading: false });
    this.searchArray = data;
  }

  handleItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleItemPrice(e) {
    let Price = e.target.value;
    this.setState({ Price: Price });
  }

  handleItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  handleItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemUpload(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let Price = this.state.Price;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("IngredientName", name);
    formdata.append("price", Price);
    formdata.append("description", description);

    axios({
      url: "http://localhost:8020/ingredients/addingredient/",
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

  toggleSecondPopup(data) {
    this.setState({
      showSecondPopup: !this.state.showSecondPopup,
      activeId1: data._id,
    });
  }

  delete(_id) {
    fetch("http://localhost:8020/ingredients/delete/" + _id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Add Ingredients</h1>
          <div>
            <div className="ai">
              <div className="ai1">
                <div className="ai2">
                  <div className="ingredient-title">Image</div>
                  <div className="ingredient-text1">
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => this.handleItemFile(e)}
                    />
                  </div>

                  <div className="ingredient-title">Ingrediant Name</div>
                  <div className="ingredient-text1">
                    <input
                      className="ingredient-text2"
                      type="text"
                      name="name"
                      onChange={(e) => this.handleItemName(e)}
                    />
                  </div>

                  <div className="ingredient-title">Price (RS)</div>
                  <div className="price-i2">
                    <input
                      className="price-i3"
                      type="number"
                      name="originalPrice"
                      min="1"
                      onChange={(e) => this.handleItemPrice(e)}
                    />
                  </div>

                  <div className="ingredient-title">Description</div>
                  <div className="dsc-i1">
                    <textarea
                      className="dsc-i2"
                      type="text"
                      name="description"
                      onChange={(e) => this.handleItemDescription(e)}
                    />
                  </div>

                  <div className="upload-button1">
                    <button
                      className="upload-btn1"
                      onClick={(e) => this.handleItemUpload(e)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="itn"> Ingredients</label>

          <div>
            <table className="ait">
              <td>Title</td>
              <td>Image</td>
              <td>Price</td>
              <td>Description</td>
              <td>Action</td>
            </table>

            {this.state.people.map((data) => (
              <div key={data._id}>
                <div>
                  <div>
                    <table className="ait1">
                      <tr>
                        <td> {data.IngredientName}</td>
                        <td>
                          <img
                            height="80px"
                            width="80px"
                            className="img"
                            src={data.imageUrl}
                          />
                        </td>

                        <td>{data.price} ₹</td>
                        <td>{data.description}</td>

                        <td>
                          <button
                            className="eitb eitb1"
                            onClick={() => this.toggleSecondPopup(data)}
                          >
                            Edit Item
                          </button>

                          <button
                            className="eitb eitb1"
                            onClick={() => this.delete(data._id)}
                            variant="danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {this.state.showSecondPopup ? (
                    <SecondPopup
                      id1={this.state.activeId1}
                      closeSecondPopup={() => this.toggleSecondPopup(data)}
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

export default Ingredients;

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

  EditItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemEdit(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("IngredientName", name);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/ingredients/update/` + this.props.id1,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.setState({ showSecondPopup: !this.state.showSecondPopup });
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
      <div className="add-ip">
        <div className="add-ip1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeSecondPopup}
            >
              X
            </button>
          </div>

          <div>
            <label className="il">Edit Item</label>
            <div>
              <div className="ai">
                <div className="ai1">
                  <div className="ai2">
                    <div className="ingredient-title">Image</div>
                    <div className="ingredient-text1">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.EditItemFile(e)}
                      />
                    </div>

                    <div className="ingredient-title">Ingredient-Title</div>
                    <div className="text-i1">
                      <input
                        className="text-i2"
                        type="text"
                        name="name"
                        onChange={(e) => this.EditItemName(e)}
                      />
                    </div>

                    <div className="ingredient-title">Price (RS)</div>
                    <div className="price-i2">
                      <input
                        className="price-i3"
                        type="number"
                        name="originalPrice"
                        min="1"
                        onChange={(e) => this.EditItemPrice(e)}
                      />
                    </div>

                    <div className="ingredient-title">Description</div>
                    <div className="dsc-i1">
                      <textarea
                        className="dsc-i2"
                        type="text"
                        name="description"
                        onChange={(e) => this.EditItemDescription(e)}
                      />
                    </div>

                    <div className="upload-button1">
                      <button
                        className="upload-btn1"
                        onClick={(e) => this.handleItemEdit(e)}
                      >
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
