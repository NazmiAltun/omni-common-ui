import React, { Component } from 'react';
import Timer from './Timer';
import userManager from './userManager';
import log from 'loglevel';
import Config from 'domain/Config';

export default class IdleTimeoutHandler extends Component {
  componentWillMount() {
    this.timer = new Timer();

    this._signOut = this._signOut.bind(this);
    this._invokeIdleTimer = this._invokeIdleTimer.bind(this);

    this._invokeIdleTimer();
    window.document.addEventListener('click', this._invokeIdleTimer);
    window.document.addEventListener('keypress', this._invokeIdleTimer);
  }

  componentWillUnmount() {
    this.timer.cancel();
    window.document.removeEventListener('click', this._invokeIdleTimer);
    window.document.removeEventListener('keypress', this._invokeIdleTimer);
  }

  _invokeIdleTimer() {
    log.debug('IdleTimeoutHandler - Will start a new timer');
    this.timer.invoke(this._signOut, Config.get('idleTimeout') * 1000);
  }

  _signOut() {
    log.debug('IdleTimeoutHandler - Will sign out!');
    userManager.signoutRedirect();
  }

  render() {
    return this.props.children;
  }
}

IdleTimeoutHandler.propTypes = {
  children: React.PropTypes.node,
};