import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import GameDetails from './pages/gamedetails';

class App extends Component {
 
  render() {

    return (
      <div>
         <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route exact={true} path='/search/:search_name' component={Search} />
            <Route exact={true} path='/details/:id' component={GameDetails} />


            {/* 
            
            <Route exact={true} path='/search/details/:id' component={GameDetails_Game} /> */}

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
