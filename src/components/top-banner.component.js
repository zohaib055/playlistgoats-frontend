import React, { Component } from 'react';
import AuthService from '../services/auth.service';

const TIMER_KEY = 'TIMER';

export default class TopBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now(),
    };
  }
  componentDidMount() {
    // localStorage.removeItem(TIMER_KEY);

    let isTrail = this.props.isTrail;
    if (isTrail) {
      let target = localStorage.getItem(TIMER_KEY);
      if (!target) {
        target = new Date().getTime() + 600000;
        localStorage.setItem(TIMER_KEY, target);
      }
      if (target - Date.now() <= 0) {
        this.setState({ timer: 0 });
        AuthService.logout();
        return;
      }

      this.setState({ timer: (target - Date.now()) / 1000 });
      this.timerInterval = setInterval(() => {
        if (this.state.timer <= 0) {
          this.setState({ timer: 0 });
          clearInterval(this.timerInterval);
          AuthService.logout();
          localStorage.removeItem(TIMER_KEY);
          return;
        }

        this.setState({ timer: this.state.timer - 1 });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  getFormattedTime(t) {
    const seconds = Math.floor(t % 60);
    console.log({ seconds });
    return `${Math.floor(t / 60)}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  render() {
    let isTrail = this.props.isTrail;
    const { timer } = this.state;
    return (
      <nav class='navbar navbar-light navbar-glass navbar-top navbar-expand'>
        <button
          class='btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarVerticalCollapse'
          aria-controls='navbarVerticalCollapse'
          aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span class='navbar-toggle-icon'>
            <span class='toggle-line'></span>
          </span>
        </button>
        <a class='navbar-brand me-1 me-sm-3' href='/'>
          <div class='d-flex align-items-center'>
            <img class='me-2' src='/assets/img/logo.png' alt='' width='40' />
            <span class='font-sans-serif'>PlaylistGOATS</span>
          </div>
        </a>

        <ul class='navbar-nav navbar-nav-icons ms-auto flex-row align-items-center'>
          {isTrail ? (
            <p
              style={{
                textAlign: 'center',
                color: 'red',
                fontSize: 22,
                alignContent: 'center',
                marginBottom: 0,
              }}
            >
              {' ' + this.getFormattedTime(timer)}
            </p>
          ) : (
            <></>
          )}
          <li class='nav-item'>
            <div class='theme-control-toggle fa-icon-wait px-2'>
              <input
                class='form-check-input ms-0 theme-control-toggle-input'
                id='themeControlToggle'
                type='checkbox'
                data-theme-control='theme'
                value='dark'
              />
              <label
                class='mb-0 theme-control-toggle-label theme-control-toggle-light'
                for='themeControlToggle'
                data-bs-toggle='tooltip'
                data-bs-placement='left'
                title='Switch to light theme'
              >
                <span class='fas fa-sun fs-0'></span>
              </label>
              <label
                class='mb-0 theme-control-toggle-label theme-control-toggle-dark'
                for='themeControlToggle'
                data-bs-toggle='tooltip'
                data-bs-placement='left'
                title='Switch to dark theme'
              >
                <span class='fas fa-moon fs-0'></span>
              </label>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
