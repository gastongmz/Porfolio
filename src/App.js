import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from "react";

import { ThemeContext } from './contexts/ThemeContext';
import { Main, BlogPage, ProjectPage, LoginPage,GridPage } from './pages'
import { BackToTop } from './components'
import ScrollToTop from './utils/ScrollToTop'
import PrivateRoute from './utils/PrivateRoute';



import './App.css'
import Protected from './utils/Protected';



function App() {

  const { theme } = useContext(ThemeContext);

  console.log("%cDEVELOPER PORTFOLIO", `color:${theme.primary}; font-size:50px`);
  console.log("%chttps://github.com/hhhrrrttt222111/developer-portfolio", `color:${theme.tertiary}; font-size:20px`);
  // console.log = console.warn = console.error = () => {};

  //const pathServer= '/TPO'
  
  /*
  const [isLoggedIn, setisLoggedIn] = useState();
  const logIn = () => {
  setisLoggedIn(true);
  localStorage.setItem("auth", JSON.stringify(true));
  console.log("setisLoggedIn:" + isLoggedIn)
  };
  const logOut = () => {    
  setisLoggedIn(false);
  localStorage.setItem("auth", JSON.stringify(false));
  console.log("setisLoggedIn:" + isLoggedIn)
  };  */
  
  const pathServer= ''
  return (
    <div className="app">
   {/*   {isLoggedIn ? (        
  <button onClick={logOut}>Logout</button>
      ) : (
  <button onClick={logIn}>Login</button>
      )}*/}
      <Router>
        <ScrollToTop/>
        <Switch>
          
          <Route path={pathServer +"/"} exact component={Main} />
          <Route path={pathServer +"/login"} exact component={LoginPage} /> 
          <PrivateRoute component={GridPage} path="/grid" exact/>                   
           {/*<Protected component={GridPage} path="/grid" exact/>   */}
          <Route path={pathServer +"/blog"} exact component={BlogPage} />
          <Route path={pathServer +"/projects"} exact component={ProjectPage} />

          <Redirect to="/" />
        </Switch>
      </Router>
      <BackToTop />
    </div>
  );
}

export default App;
