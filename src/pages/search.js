import React, { Component } from 'react';

import { API, graphqlOperation, graphql } from 'aws-amplify'
import { listGames, getGame } from "../graphql/queries"
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            search_name: "",
            search_name_url: "",
            isLoading: false,
        }
    }
    async componentDidMount() {
        console.log("componentDidmount");
        this.setState({ isLoading: true });
        const data = await API.graphql(graphqlOperation(listGames, { filter: { name: { contains: `${this.props.match.params.search_name}` } } }))
        if (data != null) {
            this.setState({
                games: data.data.listGames.items,
                isLoading: false

            })
        }
        console.log(this.state.games);
    }
    async getGame() {
        console.log("getGame");
        this.setState({ isLoading: true });
        const data = await API.graphql(graphqlOperation(listGames, { filter: { name: { contains: `${this.state.search_name_url}` } } }))
        if (data != null) {
            this.setState({
                games: data.data.listGames.items,
                isLoading: false
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
    renderGames() {
        console.log("renderGames");
        if (true) {
            return (
                <div>
                    {this.state.isLoading ? (<div className="col-lg-12 loader"><ClipLoader margin={100} sizeUnit={"px"} size={150} color='#7720A2'></ClipLoader> </div>) : (
                        <div id="test">{
                            Array.isArray(this.state.games) &&
                            this.state.games.map(result => (result.description != "" ?
                                <div className="search_gamecard">
                                    <div key={result.id}>
                                        <div className="game_card align-items-center">
                                            <Link id="game_header_link" to={`/details/${result.id}`}>
                                                <h4 className="text-center .mx-auto d-block title">{
                                                    result.name
                                                }</h4>
                                            </Link>


                                            {result.images != null ? (<Link to={`/search/details/${result.id}`} className="rounded .mxauto d-block">
                                                <img src={result.thumbnail_img} className="rounded imagePoster"></img>
                                            </Link>
                                            ) : null}
                                            <div className="align-bottom">
                                                <p className="text-center game_text">
                                                    <b>Release Date: </b>
                                                    {result.release_date}

                                                </p>

                                                <p className="text-center game_text">
                                                    <b>Rating: </b>
                                                    {result.rating}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> : (false)
                            ))
                        }</div>
                    )}
                </div>
            );
        } else {
            return (
                <div><h3>No Result Found!</h3></div>
            );
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

                {/*Row 1 START*/}
                <div className="row content">

                    {/*Col 1 START*/}
                    <div className="col-lg-12 search_gamecard" id="center_text">
                        {
                            this.renderGames()
                        }
                    </div>
                    {/*Col 1 END*/}
                </div>
                {/*Row 1 END*/}

            </div>
        );
    }
}

export default Search;
