import React, { Component } from 'react';
import './OrderHistory.scss'

export class OrdersHistory extends Component {

    constructor(props) {

        super(props);
        this.state = {

            people: [],

        }
    }


    async componentDidMount() {

        const url = "http://localhost:8020/order/getorders"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.orders, loading: false });
        this.searchArray = data
      }


    render() {

        return (

            <div>
            <h1>Orders History</h1>
            <div>
            <table className="ot">
             
             <td>Name</td>
             <td>Grand-Total</td>
             <td>Payment-Method</td>
        
          
           </table>
              {this.state.people.map((order) => (
                <div key={order._id}>
                  <div>
                    <div>
                    <table className="ot1">
                        <tr>
                          <td> {order.name}</td>
                          <td> {order.grandTotal}</td>
                          <td>{order.paymentMethod}</td>
                          
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

export default OrdersHistory

