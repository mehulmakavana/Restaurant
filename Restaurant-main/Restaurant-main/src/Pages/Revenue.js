import axios from 'axios';
import React, { Component } from 'react';
import './Revenue.css'

class Revenue extends Component {

  constructor(props) {

    super(props);
    this.state = {

      startdate: "",
      enddate: "",
      result: [],
      loading: true,

    }
  }

  handleStartDate(e) {

    let startdate = e.target.value
    this.setState({ startdate: startdate })
  }

  handleEndDate(e) {

    let enddate = e.target.value
    this.setState({ enddate: enddate })
  }

  handleUpload(e) {

    let startdate = this.state.startdate
    let enddate = this.state.enddate
    let formdata = new FormData()

    formdata.append('startdate', startdate)
    formdata.append('enddate', enddate)

    axios({
      url: `http://localhost:8020/revenue/revenuedates`,
      method: "POST",
      headers: {
        authorization: `your token`
      },
      data: formdata
    })
      .then(response => {
        const result = response.data;
        this.setState({ result });
      })

  }

  render() {

    const { id } = this.state;

    return (

      <div>

        <h1>Revenue</h1>

        <div className="rn">

          <div className="sd">Start-Date</div>
          <div className="sd1">
            <input type="text" className="sd2" name="startdate" onChange={(e) => this.handleStartDate(e)} />
          </div>

          <div className="ed">End-Date</div>
          <div className="ed1">
            <input type="text" className="ed2" name="enddate" onChange={(e) => this.handleEndDate(e)} />
          </div>

          <div className="rb">
            <button className="rb1" onClick={(e) => this.handleUpload(e)}>Upload</button>
          </div>
        </div>

        {
          this.state.result.map(item => <div>
            <div>SUM :- {item.SUM}</div>
            <div>COUNT :- {item.COUNT}</div>
          </div>

          )
        }

      </div>

    )
  }
}

export default Revenue;
