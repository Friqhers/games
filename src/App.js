import React, { Component } from 'react';
import './App.css';

import { API, graphqlOperation, graphql } from 'aws-amplify'
import { listGames,getGame } from "./graphql/queries"

class App extends Component {
  state = { games: [] }
  async componentDidMount() {
    console.log("componentDidmount");
    const data = await API.graphql(graphqlOperation(listGames, { filter: { name: { contains: 'Forza' } } }))
    if (data != null) {
      this.setState({
        games: data.data.listGames.items

      })
    }
    console.log(this.state.games);

  }
  render() {

    return (
      <div className="App">
        {this.state.games.map(game => (
          game.name
        ))}

        Test
      </div>
    );
  }
}

export default App;
