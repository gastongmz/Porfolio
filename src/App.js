import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import { Main, LoginPage, GridPage, UsuarioPage } from './pages'
import { BackToTop } from './components'
import ScrollToTop from './utils/ScrollToTop'
import PrivateRoute from './utils/PrivateRoute';
import './App.css'

function App() {

  const { theme } = useContext(ThemeContext);

  console.log("%cPORTFOLIO", `color:${theme.primary}; font-size:50px`);
  console.log("PROFOLIO", `color:${theme.tertiary}; font-size:20px`);
  // console.log = console.warn = console.error = () => {};

  //const pathServer = '/TPO'
  const pathServer= ''
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path={pathServer + "/"} exact component={Main} />
          <Route path={pathServer + "/login"} exact component={LoginPage} />
          <PrivateRoute component={GridPage} path={pathServer +"/grid"} exact />  
          <PrivateRoute component={UsuarioPage} path={pathServer +"/usuario"} exact />          
          <Redirect to="/" />
        </Switch>
      </Router>
      <BackToTop />
    </div>
  );
}

export default App;
