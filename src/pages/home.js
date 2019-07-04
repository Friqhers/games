import React, { Component } from 'react';

import { API, graphqlOperation, graphql } from 'aws-amplify'
import { listGames,getGame } from "../graphql/queries"

class Home extends Component {
  constructor(){
    super();
    this.state={
      games: [],
      search_name: "",
    }
  }

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
      <div className="container-fluid">
        {this.state.games.map(game => (
          game.name
        ))}

        
      </div>
    );
  }
}

export default Home;
