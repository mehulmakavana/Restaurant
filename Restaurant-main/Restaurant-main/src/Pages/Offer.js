import React, { Component } from "react";
import "./Offer.scss";
import axios from "axios";


class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
     offer:""
     
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
    }).then(
      (res) => {
      },
      (err) => {}
    );
  }
  
  render()
  {

    return (
      <div>
        <h1>Restaurant Offer Set</h1>
       
        <div>
         

          <div className="ct">
            <div className="ct1">
              <div className="ct2">
                <div className="title">Set The Offer</div>
                <div className="text1">
                  <input
                    type="number"
                    className="text2"
                    min="1"
                    name="offer"
                    onChange={(e) => this.handleOffer(e)}
                  />
                </div>

                <div className="button1">
                  <button
                    className="btn1"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         
      
      
      </div>
    );
  }
}
export default Offer;
