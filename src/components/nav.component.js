/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ReferModal from './referal_modal/ReferModal';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.copyClipboard = this.copyClipboard.bind(this);
    this.myRef = React.createRef();
    this.state = {
      showModal: false,
      hover: false,
      activeSubscription: true
    };
  }

  copyClipboard() {
    const referalLink = `https://app.playlistgoats.com/signup?referalCode=${AuthService.getCurrentUser().currentUser?.referral?.referralCode
      }`;
    // window.clipboardData.setData("Text",referalLink)
    navigator.clipboard.writeText(referalLink);
    alert(
      'You Copied Your Referral Link, Earn A Free Monthly Membership For Every Friend You Sign Up Using This Link!'
    );
  }
  logOut() {
    AuthService.logout();
  }
  componentWillMount() {
    const currentUser = AuthService.getCurrentUser();

    if(currentUser) {

      this.setState({ currentUser: currentUser });


      AuthService.getCustomerSubscription().then((response) => {

        const subStatus = response?.data?.subscriptionDetails?.pause_collection?.behavior === 'void' ? false : true;
  
        this.setState({ activeSubscription: subStatus })
  
        if (this.state.activeSubscription === false) {
          this.props.handlerNav('subscriptionDetails')
        } else {
    
          this.props.handlerNav('search')
        }
      })
    } else {

      this.setState({ redirect: '/login' });
    } 
  }

  componentDidMount() {
    setTimeout(() => {
      AuthService.logout();
    }, 60 * 60 * 1000);
  }
  handleMouseIn() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const isTrail = AuthService.getCurrentUser()?.currentUser?.isTestAccount;
    // if (this.state.redirect) {
    //   this.props.history.push(this.state.redirect);
    //   window.location.reload();
    // }
    // const referalLink = `https://app.playlistgoats.com/signup?referalCode=${AuthService.getCurrentUser().currentUser?.referral?.referralCode
    //   }`;
    const referralExist = AuthService.getCurrentUser() && AuthService.getCurrentUser().currentUser?.referral
      ?.referralCode
      ? true
      : false;

    return (
      <nav class='navbar navbar-light navbar-vertical navbar-expand-xl'>
        {this.state.showModal && <ReferModal />}
        <div class='d-flex align-items-center'>
          <div class='toggle-icon-wrapper'>
            <button
              class='btn navbar-toggler-humburger-icon navbar-vertical-toggle'
              data-bs-toggle='tooltip'
              data-bs-placement='left'
              title='Toggle Navigation'
            >
              <span class='navbar-toggle-icon'>
                <span class='toggle-line'></span>
              </span>
            </button>
          </div>
          <a class='navbar-brand' href='/'>
            <div class='d-flex align-items-center py-3'>
              <img class='me-2' src='/assets/img/logo.png' alt='' width='40' />
              <span class='font-sans-serif'>PlaylistGOATS</span>
            </div>
          </a>
        </div>
        <div class='collapse navbar-collapse' id='navbarVerticalCollapse'>
          <div class='navbar-vertical-content'>
            <ul class='navbar-nav flex-column mb-3' id='navbarVerticalNav'>
              <li class='nav-item'>
                <div class='row navbar-vertical-label-wrapper mt-3 mb-2'>
                  <div class='col-auto navbar-vertical-label'>Menu</div>
                  <div class='col ps-0'>
                    <hr class='mb-0 navbar-vertical-divider' />
                  </div>
                </div>
                {AuthService.getCurrentUser().currentUser.ac.roleId === 1 && this.state.activeSubscription ? (
                  <a
                    class='nav-link'
                    href='/search/curators'
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span class='nav-link-icon'>
                        <span class='fa fa-search'></span>
                      </span>
                      <span class='nav-link-text ps-1'>Search Curators</span>
                    </div>
                  </a>
                ) : undefined}
                {AuthService.getCurrentUser().currentUser.ac.roleId != 3 && this.state.activeSubscription ? (
                  <a
                    class='nav-link'
                    href='/chat'
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span class='nav-link-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                      </span>
                      <span class='nav-link-text ps-1'>


                        Chat </span>
                      {/* <span class="badge rounded-pill badge-soft-warning">999999</span>
                                        <span class="badge rounded-pill badge-soft-success">9999</span> */}
                    </div>
                  </a>
                ) : undefined}

                {
                  this.state.activeSubscription &&
                  <a
                    class='nav-link'
                    href='/bot/checker'
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span class='nav-link-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                          <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                        </svg>
                      </span>
                      <span class='nav-link-text ps-1'>Bot Checker</span>
                    </div>
                  </a>
                }
                {
                  this.state.activeSubscription &&
                  <a
                    class={`nav-link ${isTrail ? 'menu-item-disabled' : ''
                      } hoverable-container`}
                    href='/saved/playlists'
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span
                        class={`nav-link-icon ${isTrail ? 'menu-item-disabled' : ''
                          }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16">
                          <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                        </svg>
                      </span>
                      <span
                        class={`nav-link-text ps-1  ${isTrail ? 'menu-item-disabled' : ''
                          }`}
                      >
                        Saved Playlist
                      </span>
                    </div>
                    {isTrail && (
                      <div className='tooltips'>
                        <a href='https://playlistgoats.com/get-access-now2/'>
                          Please Purchase Your PlaylistGOATS Activation Code Here
                        </a>
                      </div>
                    )}
                  </a>
                }
                {this.state.activeSubscription && AuthService.getCurrentUser().currentUser.ac.roleId == 3 ? (
                  <a
                    class='nav-link'
                    onClick={() => this.props.handlerNav('admin')}
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span class='nav-link-icon'>
                        <span class='fas fa-thumbtack'></span>
                      </span>
                      <span class='nav-link-text ps-1'>Admin dashboard</span>
                      {/* <span class="badge rounded-pill badge-soft-warning">999999</span>
                                        <span class="badge rounded-pill badge-soft-success">9999</span> */}
                    </div>
                  </a>
                ) : undefined}
              </li>
              <li class='nav-item'>
                <div class='row navbar-vertical-label-wrapper mt-3 mb-2'>
                  <div class='col-auto navbar-vertical-label'>Account</div>
                  <div class='col ps-0'>
                    <hr class='mb-0 navbar-vertical-divider' />
                  </div>
                </div>
                {
                  this.state.activeSubscription &&
                  <a
                    class='nav-link'
                    data-bs-toggle='modal'
                    data-bs-target={
                      AuthService.getCurrentUser().currentUser.ac.roleId == 1
                        ? '#spotify-link'
                        : ''
                    }
                    role='button'
                  >
                    <div class='d-flex align-items-center'>
                      <span class='nav-link-icon'>
                        <span class='fa fa-link'></span>
                      </span>
                      {AuthService.getCurrentUser().currentUser.ac.roleId == 1 ? (
                        <>
                          {' '}
                          {AuthService.getCurrentUser().currentUser
                            .spotifyArtistName ? (
                            <span class='nav-link-text ps-1 text-success'>
                              Spotify Artist Connected -{' '}
                              {
                                AuthService.getCurrentUser().currentUser
                                  .spotifyArtistName
                              }
                              {AuthService.getCurrentUser().currentUser
                                .spotifyArtistPopularity ? (
                                ` - Popularity ${AuthService.getCurrentUser().currentUser
                                  .spotifyArtistPopularity
                                }`
                              ) : (
                                <></>
                              )}
                            </span>
                          ) : (
                            <span class='nav-link-text ps-1'>
                              Connect Spotify Artist Profile
                            </span>
                          )}
                        </>
                      ) : (
                        <span class='nav-link-text ps-1 text-success'>
                          Welcome{' '}
                          {AuthService.getCurrentUser().currentUser.ac.roleId == 3
                            ? 'admin'
                            : 'curator'}
                          ! {AuthService.getCurrentUser().currentUser.email}
                        </span>
                      )}
                    </div>
                  </a>
                }


                {this.state.activeSubscription && AuthService.getCurrentUser().currentUser.ac.roleId === 1 &&
                  referralExist ? (
                  <>
                  </>
                ) : (
                  <></>
                )}
                <a
                  class='nav-link'
                  href='/subscription'
                  role='button'
                >
                  <div class='d-flex align-items-center'>
                    <span class='nav-link-icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="fas fa-sync-alt" viewBox="0 0 16 16">
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                      </svg>
                    </span>
                    <span class='nav-link-text ps-1'>Subscription</span>
                  </div>
                </a>
                <a
                  class='nav-link'
                  href='/login'
                  role='button'
                  onClick={this.logOut}
                >
                  <div class='d-flex align-items-center'>
                    <span class='nav-link-icon'>
                      <span class='fa fa-sign-out-alt'></span>
                    </span>
                    <span class='nav-link-text ps-1 text-danger'>Logout</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
