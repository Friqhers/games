import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify'
import Query from "../src/graphql/queries"



class App extends Component {
  state = { games: [] }
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(Query.listGames))
    this.setState({
      games: data.data.listGames.items
    })
  }
  render() {
    return (
      <div className="App">
          {this.state.games.map((game,index)=>{
            <p key={index}>
              {game.name}
            </p>

          })}
      </div>
    );
  }
}

export default App;
