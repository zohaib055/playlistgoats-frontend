/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { extractInstragramId } from "../../helper";
import ArtistService from "../../services/artist.service";
import AuthService from "../../services/auth.service";
import AskForPlacementModal from "./ask_placement";

export default class PlaylistRow extends Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
    this.handleRedirectToInstaRoute =
      this.handleRedirectToInstaRoute.bind(this);
    this.closePlacementModal = this.closePlacementModal.bind(this);

    this.state = {
      ...this.props.data,
      placementModal: false,
    };
  }
  state = {
    hover: false,
  };
  handleRedirectToInstaRoute = (instagramUrl) => {
    window.location.replace(`https://Instagram.com/${instagramUrl}`);
  };

  closePlacementModal = () => {
    this.setState({ placementModal: false });
  };

  sendMsg() {
    console.log("==== State ====");

    console.log(this.state);

    this.setState({ placementModal: true });

    // this.props.openModal();

    // ArtistService.newRequest(
    //   this.state.playlist_id,
    //   this.state.playlist_reference[0],
    //   this.state.playlist_name
    // ).then(
    //   () => {
    //     this.setState({ requested: true });
    //   },
    //   (error) => {
    //     alert(error);
    //     this.setState({ loading: false, message: error });
    //   }
    // );
  }

  handleMouseIn() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    let instagramId = extractInstragramId(this.state.playlist_description);
    const isTrail = AuthService.getCurrentUser()?.currentUser?.isTestAccount;
    const {
      isPlaylistSaved,
      onDeleteSavePlaylist,
      onAddSavePlaylist,
      loading,
    } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <tr data-id={this.state.playlist_id} class="align-middle">
            {instagramId !== "N/A" ? (
              <td class="col-md-3 text-truncate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                >
                  <path
                    fill="#8585cc"
                    d="M30.5,38.5c4.418,0,8-3.582,8-8v-21c0-4.418-3.582-8-8-8h-21c-4.418,0-8,3.582-8,8v21 c0,4.418,3.582,8,8,8H30.5z"
                  ></path>
                  <path
                    fill="#8d8dd8"
                    d="M3.4,4.331C2.217,5.726,1.5,7.528,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-21 c0-0.503-0.052-0.992-0.141-1.469C32.135,4.22,24.832,2,17,2C12.229,2,7.657,2.832,3.4,4.331z"
                  ></path>
                  <path
                    fill="#bd82f4"
                    d="M1.505,9.404C1.504,9.437,1.5,9.468,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V12.897 C32.439,8.56,25.021,6,17,6C11.465,6,6.22,7.226,1.505,9.404z"
                  ></path>
                  <path
                    fill="#ed73f4"
                    d="M1.5,13.88V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V17.981C32.724,13.013,25.217,10,17,10 C11.394,10,6.124,11.414,1.5,13.88z"
                  ></path>
                  <path
                    fill="#f97dcd"
                    d="M17,14c-5.705,0-11.014,1.664-15.5,4.509V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-6.935 C33.194,17.698,25.534,14,17,14z"
                  ></path>
                  <path
                    fill="#fc9c95"
                    d="M17,18c-5.861,0-11.237,2.033-15.5,5.411V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-0.238 C34.143,22.925,26.152,18,17,18z"
                  ></path>
                  <path
                    fill="#ffac99"
                    d="M17,22c-6.145,0-11.66,2.651-15.5,6.859V30.5c0,4.418,3.582,8,8,8h21c2.465,0,4.668-1.117,6.136-2.87 C33.648,27.674,25.999,22,17,22z"
                  ></path>
                  <path
                    fill="#ffc49c"
                    d="M30.5,38.5c0.957,0,1.87-0.177,2.721-0.485C31.087,31.065,24.649,26,17,26 c-6.186,0-11.592,3.309-14.566,8.248C3.778,36.777,6.437,38.5,9.5,38.5H30.5z"
                  ></path>
                  <path
                    fill="#ffde8d"
                    d="M17,30c-5.137,0-9.573,2.984-11.684,7.309C6.535,38.06,7.964,38.5,9.5,38.5h19.683 C27.35,33.542,22.595,30,17,30z"
                  ></path>
                  <path
                    fill="#fff69f"
                    d="M17,34c-3.319,0-6.193,1.813-7.753,4.487C9.332,38.49,9.415,38.5,9.5,38.5h15.26 C23.203,35.818,20.324,34,17,34z"
                  ></path>
                  <path
                    fill="#8b75a1"
                    d="M31,2c3.86,0,7,3.14,7,7v22c0,3.86-3.14,7-7,7H9c-3.86,0-7-3.14-7-7V9c0-3.86,3.14-7,7-7H31 M31,1H9 C4.582,1,1,4.582,1,9v22c0,4.418,3.582,8,8,8h22c4.418,0,8-3.582,8-8V9C39,4.582,35.418,1,31,1L31,1z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M27.5 11A1.5 1.5 0 1 0 27.5 14A1.5 1.5 0 1 0 27.5 11Z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="M20 14A6 6 0 1 0 20 26A6 6 0 1 0 20 14Z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="M33,14.5c0-4.142-3.358-7.5-7.5-7.5 c-2.176,0-8.824,0-11,0C10.358,7,7,10.358,7,14.5c0,2.176,0,8.824,0,11c0,4.142,3.358,7.5,7.5,7.5c2.176,0,8.824,0,11,0 c4.142,0,7.5-3.358,7.5-7.5C33,23.324,33,16.676,33,14.5z"
                  ></path>
                </svg>
                <a
                  href={`https://Instagram.com/${instagramId}`}
                  data-id={this.state.playlist_id}
                  class="not_requested rounded-pill badge-soft-warning  text-truncate mb-2 insta"
                  target="_blank"
                  disabled={instagramId === "N/A" ? true : false}
                  style={{ fontSize: 14 }}
                >
                  <span className="p-1">{instagramId}</span>
                </a>
              </td>
            ) : (
              <></>
            )}
          </tr>
          <tr>
            {this.state.requested ? (
              <td class="col-md-3 text-truncate">
                <button
                  data-id={this.state.playlist_id}
                  disabled={this.state.requested}
                  class="pending btn rounded-pill d-block badge-soft-success"
                  type="button"
                  style={{ fontSize: 14 }}
                >
                  Asked, wait response
                  <span
                    class="ms-1 fas fa-check"
                    data-fa-transform="shrink-2"
                  ></span>
                </button>
              </td>
            ) : (
              <td class="col-md-3">
                <div className="hoverable-container">
                  {isTrail && (
                    <div
                      class="tooltips"
                      style={{ position: "absolute", left: -70, bottom: 10 }}
                    >
                      <a href="https://playlistgoats.com/get-access-now2/">
                        Please Purchase Your PlaylistGOATS{"\n"} Activation Code
                        Here
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => (isTrail ? null : this.sendMsg())}
                    data-id={this.state.playlist_id}
                    className="not_requested btn stats-btn rounded-pill d-block badge-soft-warning  text-truncate mt-2 mb-2"
                    type="button"
                    style={{ fontSize: 14 }}
                  >
                    Ask for placement ?
                    {/* <span
                  class='ms-1 fas fa-question'
                  data-fa-transform='shrink-2'
                ></span> */}
                  </button>
                </div>
              </td>
            )}
          </tr>
          <tr data-id={`save-${this.state.playlist_id}`} class="align-middle">
            {
              <td class="col-md-3 text-truncate">
                <button
                  onClick={() => {
                    if (isPlaylistSaved) {
                      onDeleteSavePlaylist();
                    } else {
                      onAddSavePlaylist();
                    }
                  }}
                  data-id={this.state.playlist_id}
                  disabled={loading}
                  style={{ fontSize: 14 }}
                  class="not_requested btn stats-btn rounded-pill d-block badge-soft-warning"
                  type="button"
                >
                  {isPlaylistSaved === false ? (
                    <svg
                      fill="#000000"
                      width="15px"
                      height="15px"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M26 0H6a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6zm-6 2v3a1 1 0 1 0 2 0V2h1v7H9V2zm10 24a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2h1a4 4 0 0 1 4 4zM24 14H8a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V15a1 1 0 0 0-1-1zm-1 12H9V16h14zM12 20h8a1 1 0 0 0 0-2h-8a1 1 0 0 0 0 2zM12 24h8a1 1 0 0 0 0-2h-8a1 1 0 0 0 0 2z" />
                    </svg>
                  ) : (
                    <>
                      <svg
                        width="15px"
                        height="15px"
                        viewBox="0 -0.5 21 21"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>delete [#1487]</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-179.000000, -360.000000)"
                            fill="#000000"
                          >
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <path
                                d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                id="delete-[#1487]"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </>
                  )}{" "}
                  &nbsp;
                  {isPlaylistSaved ? "Delete from saved list" : "Save playlist"}
                </button>
              </td>
            }
          </tr>
          <tr>
            <button onClick={()=> window.open(`/playlist/analyzer/${this.state.playlist_id}`, "_blank")} class="stats-btn not_requested btn rounded-pill d-block badge-soft-warning">
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n      .cls-1 {\n        fill: #101010;\n        fill-rule: evenodd;\n      }\n    ",
                    }}
                  />
                </defs>
                <path
                  id="stats1"
                  className="cls-1"
                  d="M1091,264h-22a1,1,0,0,1-1-1V241a1,1,0,0,1,2,0v21h21A1,1,0,0,1,1091,264Zm-5-4a1,1,0,0,1-1-1V248a1,1,0,0,1,2,0v11A1,1,0,0,1,1086,260Zm-4,0h0a1,1,0,0,1-1-1v-7a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1v7A1,1,0,0,1,1082,260Zm-4,0a1,1,0,0,1-1-1V243a1,1,0,0,1,2,0v16A1,1,0,0,1,1078,260Zm-4,0a1,1,0,0,1-1-1V249a1,1,0,0,1,2,0v10A1,1,0,0,1,1074,260Z"
                  transform="translate(-1068 -240)"
                />
              </svg>
              &nbsp; Playlist stats
            </button>
          </tr>
        </div>
        {this.state.placementModal && (
          <AskForPlacementModal
            placementModal={this.state.placementModal}
            setPlacementModal={this.closePlacementModal}
            data={this.state}
          />
        )}
      </>
    );
  }
}
