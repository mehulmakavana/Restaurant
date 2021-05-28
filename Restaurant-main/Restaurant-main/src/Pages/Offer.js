import React, { Component } from "react";
import "./Offer.scss";
import axios from "axios";

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: "",
      products: [],
      defaultOffers:"0",
    };
  }

  handleOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  handleUpload(e) {
    let offer = this.state.offer;

    let formdata = new FormData();

    formdata.append("offer", offer);

    axios({
      url: `http://localhost:8020/offer/offer`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { products } = data;
        this.setState({ products });
      });
  }

  handleRemoveUpload(e) {
    let offer = this.state.defaultOffers;

    let formdata = new FormData();

    formdata.append("offer", offer);

    axios({
      url: `http://localhost:8020/offer/offer`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { products } = data;
        this.setState({ products });
      });
  }


  render() {
    return (
      <div>
        <h1>Restaurant Offer Set</h1>

        <div>
          <div className="ofr">
            <div className="ofr1">
              <div className="ofr2">
                <div className="sio">Set All Item Offer (%)</div>
                <div className="sio1">
                  <input
                    type="number"
                    className="text2"
                    placeholder="Value In Percentage"
                    min="1"
                    max="100"
                    name="offer"
                    onChange={(e) => this.handleOffer(e)}
                  />
                </div>

                <div className="ofrb">
                  <button
                    className="ofrb1"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="sio">Remove All Item Offer (%)</div>
              <div className="sio1">
                <input
                  type="number"
                  className="text2"
                  
                  min="0"
                  max="0"
                  name="offer"
                  value="0"
                  onChange={(e) => this.handleOffer(e)}
                />
              </div>

              <div className="ofrb">
                <button className="ofrb1" onClick={(e) => this.handleRemoveUpload(e)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="oft">
              <td>Name</td>
              <td>Original Price</td>
              <td>Offer</td>
              <td> <div className="ofrp">Offer Price</div></td>
            </table>


        {this.state.products.map((item) => (
          <div key={item._id}>
           
            <div>
              <table className="oft1">
                <tr>
                  <td>
                    <div>{item.name}</div>
                  </td>

                  <td>
                    <div>{item.originalPrice}</div>
                  </td>
                  <td>
                    <div>{item.offer}</div>
                  </td>

                  <td>
                    <div className="ofrp" >{item.offerPrice.toFixed()}</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Offer;
