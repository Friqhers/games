import React, { Component } from 'react';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify'
import {listGames}from "./graphql/queries"



class App extends Component {
  state = { games: [] }
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(listGames))
    this.setState({
      games: data.data.listGames.items
    })
    console.log(this.state.games);
  }
  render() {
    return (
      <div className="App">
         {this.state.games.map(game =>(
           game.name
         ))}
      </div>
    );
  }
}

export default App;
