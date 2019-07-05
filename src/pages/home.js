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
import "../css/main.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      search_name: ""
    };
  }

  async componentDidMount() {
    console.log("componentDidmount");
    const data = await API.graphql(graphqlOperation(listGames));
    if (data != null) {
      this.setState({
        games: data.data.listGames.items
      });
    }
    console.log(this.state.games);
  }
  // {this.state.games.map(game => (
  //   game.name
  // ))}
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
                    <div className="search_gamecard .mx-auto d-block">
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
                                className="rounded imagePoster img-fluid"
                              />
                            </Link>
                          ) : null}
                          <br />
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
  handleKeyPress = e => {
    console.log("handlekeyPress");
    if (e.key === "Enter") {
      if (this.state.search_name != "") {
        this.setState({ games: [] });
        this.props.history.push(`/search/${this.state.search_name}`);
      }
    }
  };
  render() {
    const search_name = this.state.search_name;

    return (
      <div className="container-fluid">
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
                <Link className="btn btn-succes"
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
        <div className="row">
          <div class="col-lg-12">{this.renderGames()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
