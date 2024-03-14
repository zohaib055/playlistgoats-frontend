/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import socketio from 'socket.io-client';
import ArtistService from '../../services/artist.service';
import UserService from '../../services/user.service';
import PlaylistRow from './playlist_row.component';
import $ from 'jquery';
import AuthService from '../../services/auth.service';
import { getEnvironmentConfig } from '../../config';
import _ from "lodash";
import music from "../../images/music.jpeg";
import userService from '../../services/user.service';
import { ToastContainer, toast } from 'react-toastify';

const textArray = [

  "Playlist curators decided to play hide and seek. 🕵️‍♂️ We’ll find them!",
  "Oops, looks like the music curators are hiding! 🧑‍💻 We’re on it!",
  "Curators are in stealth mode. 🕵️‍♀️ We’ll uncover them for you!",
  "We’re kinda like matchmakers for music artists and playlist curators. ❤️",
  "Think of us as your playlist GPS, leading your music to the right playlists and curators. 🗺️",
  "We’re the backstage pass to connect your music with playlist curators. 🎶 ",
  "Curators are having a heated debate about pineapple on pizza. 🍍 let us find you those playlists!",
  "Curators playing hide and seek again? 🙈 We’ll track them down for you!",
]

const searchWords = [
    
  "Pop",
  "Dua Lipa",
  "Rap",
  "Drake",
  "Latin",
  "R&B",
  "Tyla", 
  "Bad Bunny",
  "Chill",
  "Lofi", 
  "Hip-Hop",
  "Jack Harlow",
  "21 Savage",
  "Gunna",
  "Folk",
  "Americana", 
  "Country", 
  "Placement", 
  "Inquiries", 
  "Instagram", 
  "New"
]


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeKeys = this.onChangeKeys.bind(this);

    this.openModal = this.openModal.bind(this);

    const SOCKET_URL = getEnvironmentConfig().SOCKET_URL;

    
    this.state = {
      textIdx: 0,
      currentUser: {},
      keys: '',
      wordIdx:'',
      searching: false,
      modal: false,
      playlists_data: [],
      playlistInPromo: [],
      savedPlaylist: [],
      loading: false,
      socket: socketio.connect(SOCKET_URL, {
        transports: ['polling', 'websocket'],
        path: '/api/socket/',
        upgrade: false,
        reconnect: false,
        cors: {
          origin: '*',
          credentials: true,
        },
      }),
    };
  }



  openModal() {
    this.modalButton.click();
  }

  onChangeKeys(e) {
    this.setState({ keys: e.target.value });
  }

  handleSearch() {
    this.setState({ playlists_data: [] });
    this.setState({ searching: true });
    this.state.socket.emit('playlist_search', { query: this.state.keys });
  }

  getSavedPlaylist() {

    UserService.getSavedPlaylist().then((response) => {
      const { playlists } = response;
      console.log(response, "response")
      const playlistIds = [];
      playlists.forEach((eachPlaylist) => {
        playlistIds.push(eachPlaylist.playlistId);
      })
      this.setState({
        ...this.state,
        savedPlaylist: playlistIds,
        loading: false
      })
    }).catch((e) => {
      this.setState({ loading: false })
    })
  }

  deleteSavedPlaylist(playlistId) {
    this.setState({loading : true});
    UserService.deleteSavedPlaylist(playlistId).then((response) => {
      this.getSavedPlaylist();
    })
  }

  addSavedPlaylist(data) {
    this.setState({loading : true});
    UserService.addSavedPlaylist(data).then((response) => {
      this.getSavedPlaylist();
    })
  }

  componentDidMount() {

    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 10000);

    this.timeout = setInterval(() => {
      let currentWordIdx = this.state.wordIdx;
      this.setState({ wordIdx: currentWordIdx + 1 });
    }, 3000);

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      this.setState({ redirect: '/login' });
    }
    this.setState({ currentUser: currentUser });

    ArtistService.getPromoPlaylist().then(
      (response) => {
        // this.setState({ playlistInPromo: response.data.playlistsInPromoInfo })
        console.log(response?.data?.playlistsInPromoInfo, '------------');
        this.setState({
          playlistInPromo: response?.data?.playlistsInPromoInfo || [],
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({ loading: false, message: resMessage });
      }
    );
    this.getSavedPlaylist()

    var self = this;
    this.state.socket.on('playlist_data', function (data) {
      try {
        var msg = JSON.parse(
          data.replace(/^\s+|\s+$/g, '').replace(/\\"/g, '"')
        );
        if ('status' in msg) {
          self.setState({ searching: false });
        } else {
          self.setState({
            playlists_data: [...self.state.playlists_data, msg],
          });
        }
      } catch { }
    });

    this.state.socket.on('disconnect', function (data) {
      self.setState({ searching: false });
    });
  }

  componentDidUnmount() {
    clearInterval(this.timeout);
  }

  render() {

    

    let loadingText      = textArray[this.state.textIdx % textArray.length];
    let searchPlaceholder = searchWords[this.state.wordIdx % searchWords.length];

    

    // console.log([...this.state.playlistInPromo].slice(0), " this.state.playlistInPromo")
    return (
      <div>
        <div class='row mb-3'>
          <div class='col'>
            <div class='card bg-100 shadow-none border'>
              <div class='row gx-0 flex-between-center'>
                <div class='col-sm-auto d-flex align-items-center'>
                  <img
                    class='ms-n2'
                    src='/assets/img/illustrations/crm-bar-chart.png'
                    alt=''
                    width='90'
                  />
                  <div>
                    <h6 class='text-primary fs--1 mb-0'>Welcome to the</h6>
                    <h4 class='text-primary fw-bold mb-0'>
                      Playlist SEARCH ENGINE &nbsp;
                      <span class='text-info fw-medium'>for Spotify Users</span>
                    </h4>
                  </div>
                  <img
                    class='ms-n4 d-md-none d-lg-block'
                    src='/assets/img/illustrations/crm-line-chart.png'
                    alt=''
                    width='150'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='row mb-3'>
          <div class='col'>
            <div class='card mb-3'>
              <div class='card-header border-bottom'>
                <div class='row flex-between-end'>
                  <div class='col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center'>
                    <div class='row'>
                      <div class='col-lg-4 border-lg-end border-bottom border-lg-0 pb-3 pb-lg-0'>
                        <div class='d-flex flex-between-center'>
                          <div class='search-box'>
                            <input
                              onChange={this.onChangeKeys}
                              value={this.state.keys}
                              class='form-control search-input fuzzy-search'
                              type='search'
                              placeholder={searchPlaceholder}
                              aria-label='Search'
                            />
                            <span class='fas fa-search search-box-icon'></span>
                          </div>
                        </div>
                      </div>
                      <div class='col-lg-4 border-lg-end border-bottom border-lg-0 py-3 py-lg-0'>
                        <div class=''>
                          <button
                            style={{
                              width: '100%',
                              display:'none'
                            }}
                            class='btn btn-falcon-default dropdown-toggle disabled hidden'
                            id='dropdownMenuButton'
                            type='button'
                            data-bs-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                          >
                            Select your track
                          </button>
                          <div
                            class='dropdown-menu dropdown-menu-end py-0'
                            aria-labelledby='dropdownMenuButton'
                          ></div>
                        </div>
                      </div>
                      <div class='col-lg-4 pt-3 pt-lg-0'>
                        <div class=''>
                          <div class='d-grid gap-2'>
                            <button
                              id='submit-query'
                              style={{
                                width: '100%',
                              }}
                              class='btn btn-falcon-success'
                              onClick={this.handleSearch}
                              disabled={this.state.searching}
                              type='button'
                            >
                              Start Search
                              {this.state.searching ? (
                                <img
                                  src='/assets/img/logo.png'
                                  class='spinner-border'
                                  style={{ marginLeft: '5%' }}
                                  role='status'
                                  aria-hidden='true'
                                />
                              ) : undefined}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="search-buttons text-center mt-4">

              <div class="alert alert-info">
                <strong>Quick Tip!</strong> Check Playlist stats before asking for placement to make sure it's <strong>Bot-Free</strong>.
              </div>
              

                    <>
                      <p>
                        {this.state.searching ? loadingText :  ''}
                      </p>
                    </>
                  
              </div>

              {this.state.playlists_data ? (
                <div className="row mt-2">
                  <>
                    {Object.keys(this.state.playlists_data) && (
                      <>
                        {this.state.playlists_data.map((playlist) => {
                          console.log(playlist, "playlist")
                          return (
                            <>
                              <div className="col-sm-4 mt-3">
                                <div style={{ width: "auto" }}>
                                  <a
                                    target="_blank"
                                    href="#"
                                    rel="noopener noreferrer"
                                    className="card-image-link card p-card"
                                  >
                                    {!_.isEmpty(playlist.image_url) ? (
                                      <img
                                        variant="top"
                                        src={playlist.image_url}
                                        alt=""
                                      />
                                    ) : (
                                      <img src={music} alt="" />
                                    )}
                                  </a>
                                  <div className="text-center">
                                    <div className="card-title">
                                      {playlist.playlist_name}
                                    </div>

                                    <div className="card-text">
                                      <strong> Followers : </strong>{" "}
                                      {playlist.playlist_followers} <br />
                                      <strong> Tracks : </strong>{" "}
                                      {playlist.playlist_number_of_songs} <br />
                                      {
                                        playlist && playlist?.playlist_reference?.length ?
                                          <small>By  {playlist.playlist_reference[0]}</small> : <></>
                                      }


                                      <div>
                                        {playlist.playlist_reference?.length ? (
                                          <PlaylistRow
                                            promo={1}
                                            openModal={this.openModal}
                                            data={playlist}
                                            savedPlaylist={this.state.savedPlaylist}
                                            onAddSavePlaylist={() => this.addSavedPlaylist(playlist)}
                                            onDeleteSavePlaylist={() => this.deleteSavedPlaylist(playlist.playlist_id)}
                                            isPlaylistSaved={this.state.savedPlaylist.includes(playlist.playlist_id)}
                                            loading={this.state.loading}
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}

                    {this.state.selectedCategory === "albums" &&
                      Object.keys(this.state.playlists_data) && (
                        <>
                          {this.state.playlists_data.albums?.items.map(
                            (album) => {
                              return (
                                <>
                                  <div className="col-sm-4 mt-3">
                                    <div style={{ width: "auto" }}>
                                      <a
                                        target="_blank"
                                        href={album.external_urls.spotify}
                                        rel="noopener noreferrer"
                                        className="card-image-link card p-card"
                                      >
                                        {!_.isEmpty(album.images) ? (
                                          <img
                                            variant="top"
                                            src={album.images[0].url}
                                            alt=""
                                          />
                                        ) : (
                                          <img src={music} alt="" />
                                        )}
                                      </a>
                                      <div className="text-center">
                                        <div className="card-title">
                                          {album.name}
                                        </div>
                                        <div className="card-text">
                                          <small>
                                            {album.artists
                                              .map((artist) => artist.name)
                                              .join(", ")}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </>
                      )}

                    {this.state.selectedCategory === "artists" &&
                      Object.keys(this.state.playlists_data) && (
                        <>
                          {this.state.playlists_data.artists?.items.map(
                            (artist) => {
                              return (
                                <>
                                  <div className="col-sm-4 mt-3">
                                    <div style={{ width: "auto" }}>
                                      <a
                                        target="_blank"
                                        href={artist.external_urls.spotify}
                                        rel="noopener noreferrer"
                                        className="card-image-link card p-card"
                                      >
                                        {!_.isEmpty(artist.images) ? (
                                          <img
                                            variant="top"
                                            src={artist.images[0].url}
                                            alt=""
                                          />
                                        ) : (
                                          <img src={music} alt="" />
                                        )}
                                      </a>
                                      <div className="text-center">
                                        <div className="card-title">
                                          {artist.name}
                                          <br />
                                          Followers : {artist.followers.total}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </>
                      )}
                  </>
                </div>
              ) : (
                <p className="text-center mt-5 p-10">
                  No records, Please try again
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          class='btn btn-primary'
          ref={(button) => (this.modalButton = button)}
          style={{ visibility: 'hidden' }}
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
        ></button>
        <div
          class='modal fade'
          id='staticBackdrop'
          data-bs-keyboard='false'
          data-bs-backdrop='static'
          tabindex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog modal-lg mt-6' role='document'>
            <div class='modal-content border-0'>
              <div class='position-absolute top-0 end-0 mt-3 me-3 z-index-1'>
                <button
                  class='btn-close btn btn-sm btn-circle d-flex flex-center transition-base'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body p-0'>
                <div class='bg-light rounded-top-lg py-3 ps-4 pe-6'>
                  <h4 class='mb-1' id='staticBackdropLabel'>
                    ASK FOR PLACEMENT:
                  </h4>
                </div>
                <div class='p-4'>
                  <div class='row'>
                    <div class='col-lg-9'>
                      <div class='d-flex'>
                        <span class='fa-stack ms-n1 me-3'>
                          <i class='fas fa-circle fa-stack-2x text-200'></i>
                          <i
                            class='fa-inverse fa-stack-1x text-primary fas fa-error'
                            data-fa-transform='shrink-2'
                          ></i>
                        </span>
                        <div class='flex-1'>
                          <p>
                            Your activation code does not allow you to send
                            requests to this genre. Please purchase another
                            activation code{' '}
                            <a href='mailto:playlistgoats@gmail.com'>here</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
        />
      </div>
    );
  }
}
