import React, { Component } from 'react';
import './RDetails.scss'

export class RDetail extends Component {

    constructor(props) {

        super(props);
        this.state = {

            people: [],

        }
    }


    async componentDidMount() {

        const url = "http://localhost:8020/restaurant/getrestaurants"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.list, loading: false });
        this.searchArray = data
      }


    render() {

        return (

            <div>
            <h1>Restaurants Details</h1>
            <div>
            <table className="rd">
             
             <td>RestaurantName</td>
             <td>Payments</td>
             <td>Time</td>
          
           </table>

     

              {this.state.people.map((detail) => (
                <div key={detail._id}>
                  <div>
                    <div>
                    <table className="rd1">
                        <tr>
                          <td> {detail.RestaurantName}</td>
                          <td> {detail.payment}</td>
                          <td>{detail.createdAt}</td>
                        
                          
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

export default RDetail;

// import axios from "axios";
// import React, { Component } from "react";

// class Payment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       phone: "",
//       table: "",
//       message: "",
//       loading: true,
//     };
//   }

//   handlePhone(e) {
//     let phone = e.target.value;
//     this.setState({ phone: phone });
//   }

//   handleTable(e) {
//     let table = e.target.value;
//     this.setState({ table: table });
//   }

//   handleUpload(e) {
//       let phone = this.state.phone;
//       let table = this.state.table;
//       let formdata = new FormData();

//       formdata.append("phone", phone);
//       formdata.append("table", table);

//       axios({
//         url: `http://localhost:8020/book/checkout`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         data: formdata,
//       })
//       .then(response => response.json())
//       .then(data => this.setState({form:data.message}));
//     }

//   render() {
//     return (
//       <div>
//         <h1>Payment</h1>

//         <div className="rn">
//           <div className="rn1">
//             <div className="rn2">
//               <div className="sd">Phone Number</div>
//               <div className="sd1">
//                 <input
//                   type="number"
//                   className="sd2"
//                   name="phone"
//                   onChange={(e) => this.handlePhone(e)}
//                 />
//               </div>

//               <div className="ed">Table Number</div>
//               <div className="ed1">
//                 <input
//                   type="text"
//                   className="ed2"
//                   name="table"
//                   onChange={(e) => this.handleTable(e)}
//                 />
//               </div>

//               <div className="rb">
//                 <button className="rb1" onClick={(e) => this.handleUpload(e)}>
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {this.state.form}
//       </div>
//     );
//   }
// }

// export default Payment;



