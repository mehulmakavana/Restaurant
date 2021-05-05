import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Category from './Pages/Category';
import Order from './Pages/Order';
import ViewCook from './Pages/ViewCook';
import ViewUser from './Pages/ViewUser';
import ViewWaiter from './Pages/ViewWaiter';
import ViewManager from './Pages/ViewManager';
import Ratings from './Pages/Ratings';
import Menu from './Pages/Menu';
import AddStaff from './Pages/AddStaff';
import Complaints from './Pages/Complaints';
import Revenue from './Pages/Revenue';
import CreateTable from './Pages/CreateTable';



function App() {
  return (

    <Router>
      <Navbar />

      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/Category' component={Category} />
        <Route path='/CreateTable' component={CreateTable} />
        <Route path='/Order' component={Order} />
        <Route path='/ViewCook' component={ViewCook} />
        <Route path='/ViewUser' component={ViewUser} />
        <Route path='/ViewWaiter' component={ViewWaiter} />
        <Route path='/ViewManager' component={ViewManager} />
        <Route path='/Ratings' component={Ratings} />
        <Route path='/Menu/:_id' component={Menu} />
        <Route path='/AddStaff' component={AddStaff} />
        <Route path='/Complaints' component={Complaints} />
        <Route path='/Revenue' component={Revenue} />
          




      </Switch>
    </Router>

  );
}

export default App;