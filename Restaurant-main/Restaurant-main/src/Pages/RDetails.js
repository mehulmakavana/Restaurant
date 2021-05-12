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

