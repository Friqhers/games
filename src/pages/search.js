import React, { Component } from 'react';

import { API, graphqlOperation, graphql } from 'aws-amplify'
import { listGames, getGame } from "../graphql/queries"
import { Link } from "react-router-dom";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            search_name: "",
            search_name_url: "",
        }
    }
    async componentDidMount() {
        console.log("componentDidmount");
        const data = await API.graphql(graphqlOperation(listGames, { filter: { name: { contains: `${this.props.match.params.search_name}` } } }))
        if (data != null) {
            this.setState({
                games: data.data.listGames.items

            })
        }
        console.log(this.state.games);
    }
    async getGame() {
        console.log("getGame");
        const data = await API.graphql(graphqlOperation(listGames, { filter: { name: { contains: `${this.state.search_name_url}` } } }))
        if (data != null) {
            this.setState({
                games: data.data.listGames.items

            })
        }
        console.log(this.state.games);

    }
    handleKeyPress = (e) => {
        console.log("handlekeyPress");
        if (e.key === "Enter") {
            if (this.state.search_name != "") {
                this.setState({ games: [] });
                this.getGame();
                this.props.history.push(`/search/${this.state.search_name}`);
            }
        }
    }
    // {this.state.games.map(game => (
    //   game.name
    // ))}
    render() {
        const search_name = this.state.search_name;

        return (
            <div className="container-fluid">

                {/*HEADER START*/}
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark justify-content-left fixed-top">
                    <Link className="nav-brand-home home" to="/">
                        HOME
          </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapsibleNavbar"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item .active">
                                <a className="nav-link" href="upcominggames.html">
                                    TEST
                </a>
                            </li>
                            <li className="nav-item .active">
                                <a className="nav-link" href="upcominggames2019.html">
                                    TEST
                </a>
                            </li>

                            <li className="nav-item .active">
                                <input type="text" placeholder="Search" value={search_name}
                                    onChange={e => {
                                        this.setState({
                                            search_name: e.currentTarget.value,
                                            search_name_url: e.currentTarget.value
                                        });
                                    }}
                                    onKeyDown={this.handleKeyPress}
                                />
                                <Link className="btn btn-success"
                                    to={search_name != null && search_name.length != 0 && search_name != "Search" ? (`/search/${search_name}`) : (`/search/${this.props.match.params.search_name}`)
                                    } onClick={e => {
                                        if (search_name != "") {
                                            this.setState({ games: [] });
                                            this.getGame();
                                        }
                                    }}
                                >Search</Link>
                            </li>

                        </ul>

                    </div>
                </nav>
                {/*HEADER END*/}

            </div>
        );
    }
}

export default Search;
