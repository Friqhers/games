import React, { Component } from "react";

import { API, graphqlOperation, graphql } from "aws-amplify";
import { listGames, getGame } from "../graphql/queries";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


import { Player } from "video-react";

class GameDetails extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      // images:[],
      search_name: "",
      search_name_url: "",
      isLoading: false
    };
  }
  async componentDidMount() {
    console.log("componentDidmount");
    this.setState({ isLoading: true });
    const data = await API.graphql(
      graphqlOperation(listGames, {
        filter: { id: { contains: `${this.props.match.params.id}` } }
      })
    );
    if (data != null) {
      this.setState({
        games: data.data.listGames.items,
        isLoading: false
      });
    }
    console.log(this.state.games);
  }

  // returnImages(result) {
  //     console.log("return images:", result.images);
  //     return (
  //         <div>

  //             {result.images.forEach(img => (
  //                 <div className="image_card">
  //                     <img src={img.images}></img>
  //                 </div>
  //             ))}

  //         </div>
  //     );
  // }
  renderGame() {
    console.log("renderGames");
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
          <div>
            {this.state.games.map(result => (
              <div key={result.id}>
                <div className="container-fluid text-center">
                  {/*MIDDLE START */}

                  {/*Row 1 start */}
                  <div className="row content row_">
                    {/*COLUMN 1 START*/}

                    <div
                      className="col-lg-4 text-center details_left"
                      id="center_text"
                    >
                      <br />
                      <img src={result.thumbnail_img} />
                    </div>
                    {/*COLUMN 1 END*/}

                    {/*COLUMN 2 START*/}
                    <div className="col-lg-8" id="center_text">
                      <h1 className="text-center title_details">
                        {result.name}
                      </h1>
                      <p className="text-left">{result.description}</p>
                    </div>
                    {/*COLUMN 2 END*/}
                  </div>
                  {/*Row 1 END */}

                  {/*Row 2 start */}
                  <div className="row content row_">
                    {/*COLUMN 1 START*/}
                    <div
                      className="col-lg-4 text-left details_left"
                      id="center_text"
                    >
                      <br />
                      <h4 className="text-center">Details</h4>
                      <p>
                        <b>Release Date: </b>
                        {result.release_date}
                      </p>
                      <p>
                        <b>Genre: </b> {result.genre}{" "}
                      </p>
                      <p>
                        <b>Rating: </b> {result.rating}
                      </p>
                      <p>
                        <b>Platform</b> {result.platform}
                      </p>
                    </div>
                    {/*COLUMN 1 END*/}

                    {/*COLUMN 2 START*/}
                    <div className="col-lg-8" id="center_text">
                      <h1 className="text-center title_details">Galery</h1>
                      <div>
                        <Player
                          playsInline
                          src={result.video}
                        />
                      </div>
                      <div className="detail_images">
                        {result.images.map(img => (
                          <img className="rounded" src={img} />
                        ))}
                      </div>
                    </div>
                    {/*COLUMN 2 END*/}
                  </div>
                  {/*Row 2 END */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return <div className="container-fluid">{this.renderGame()}</div>;
  }
}
export default GameDetails;
