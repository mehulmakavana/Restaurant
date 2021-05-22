import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Category from './Pages/Category';
import OrdersHistory from './Pages/OrdersHistory';
import ViewCook from './Pages/ViewCook';
import ViewUser from './Pages/ViewUser';
import ViewWaiter from './Pages/ViewWaiter';
import ViewManager from './Pages/ViewManager';
import Ratings from './Pages/Ratings';
import AddStaff from './Pages/AddStaff';
import Complaints from './Pages/Complaints';
import Revenue from './Pages/Revenue';
import CreateTable from './Pages/CreateTable';
import RDetails from './Pages/RDetails';
import Payment from './Pages/Payment';
import Ingredients from './Pages/Ingredients';
import TableOrder from './Pages/TableOrder';



function App() {
  return (

    <Router>
      <Sidebar />

      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/Category' component={Category} />
        <Route path='/Ingredients' component={Ingredients} />
        <Route path='/CreateTable' component={CreateTable} />
        <Route path='/OrdersHistory' component={OrdersHistory} />
        <Route path='/ViewManager/ViewCook' component={ViewCook} />
        <Route path='/ViewManager/ViewUser' component={ViewUser} />
        <Route path='/ViewManager/ViewWaiter' component={ViewWaiter} />
        <Route path='/ViewManager' component={ViewManager} />
        <Route path='/Ratings' component={Ratings} />
        <Route path='/AddStaff' component={AddStaff} />
        <Route path='/Complaints' component={Complaints} />
        <Route path='/Payment' component={Payment} />
        <Route path='/Revenue' component={Revenue} />
        <Route path='/RDetails' component={RDetails} />
        <Route path='/TableOrder' component={TableOrder} />



          




      </Switch>
    </Router>

  );
}

export default App;