import React, { Component } from "react";

import { API, graphqlOperation, graphql } from "aws-amplify";
import { listGames, getGame } from "../graphql/queries";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      search_name: "",
      search_name_url: "",
      isLoading: false,
      isFound: false,
    };
  }
  async componentDidMount() {
    console.log("componentDidmount");
    this.setState({ isLoading: true });
    const data = await API.graphql(
      graphqlOperation(listGames, {
        filter: {
          name: {
            contains: `${this.props.match.params.search_name}`
          }
        }
      })
    );
    if (data != null) {
      this.setState({
        games: data.data.listGames.items,
        isLoading: false,
        isFound: true
      });
    }

    console.log(this.state.games);
  }
  async getGame() {
    console.log("getGame");
    this.setState({ isLoading: true });
    const data = await API.graphql(
      graphqlOperation(listGames, {
        filter: {
          name: { contains: `${this.state.search_name_url}` }
        }
      })
    );
    if (data != null) {
      this.setState({
        games: data.data.listGames.items,
        isLoading: false,
        isFound: true
      });
    }

    console.log(this.state.games);
  }
  handleKeyPress = e => {
    console.log("handlekeyPress");
    if (e.key === "Enter") {
      if (this.state.search_name != "") {
        this.setState({ games: [] });
        this.getGame();
        this.props.history.push(`/search/${this.state.search_name}`);
      }
    }
  };
  renderGames() {
    console.log("renderGames");
    if (true) {
      return (
        <div>
          {this.state.isLoading ? (
            <div className="col-lg-12 loader">
              <ClipLoader
                margin={100}
                sizeUnit={"px"}
                size={150}
                color="#7720A2"
              />{" "}
            </div>
          ) : (
            <div className="row d-flex justify-content-center" id="test">
              {Array.isArray(this.state.games) &&
                this.state.games.map(result =>
                  result.description != "" ? (
                    <div className="search_gamecard">
                      <div key={result.id}>
                        <div className="game_card align-items-center">
                          <Link
                            id="game_header_link"
                            to={`/details/${result.id}`}
                          >
                            <h4 className="text-center .mx-auto d-block title">
                              {result.name}
                            </h4>
                          </Link>

                          {result.images != null ? (
                            <Link
                              to={`/details/${result.id}`}
                              className="rounded .mxauto d-block"
                            >
                              <img
                                src={result.thumbnail_img}
                                className="rounded imagePoster"
                              />
                            </Link>
                          ) : null}
                          <div className="align-bottom">
                            <p className="text-center game_text">
                              <b>Release Date: </b>
                              {result.release_date}
                            </p>
                            <p className="text-center game_text">
                              <b>Genre: </b> {result.genre}{" "}
                            </p>
                            <p className="text-center game_text">
                              <b>Rating: </b>
                              {result.rating}
                            </p>
                            <p className="text-center game_text">
                              <b>Platform</b> {result.platform}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    false
                  )
                )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h3>No Result Found!</h3>
        </div>
      );
    }
  }
  // {this.state.games.map(game => (
  //   game.name
  // ))}
  render() {
    const search_name = this.state.search_name;

    return (
      <div className="container-fluid background">
        {/*HEADER START*/}
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/">Test</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">Test</Link>
              </Nav.Link>
              <NavDropdown title="Dropdown test" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/">Test</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/">Test</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/">Test</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/">Test</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={e => {
                  this.setState({
                    search_name: e.currentTarget.value
                  });
                }}
                onKeyDown={this.handleKeyPress}
                style={{ width: "370px" }}
              />
              <Button>
                <Link
                  className="btn btn-succes"
                  to={
                    search_name !== null &&
                    search_name.length !== 0 &&
                    search_name !== "Search"
                      ? `/search/${search_name}`
                      : "/"
                  }
                >
                  Search
                </Link>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/*HEADER END*/}

        {/*Row 1 START*/}
        <div className="row">
          {/*Col 1 START*/}
          <div className="col-lg-12" id="center_text">
            {this.renderGames()}
          </div>
          {/*Col 1 END*/}
        </div>
        {/*Row 1 END*/}
      </div>
    );
  }
}

export default Search;
