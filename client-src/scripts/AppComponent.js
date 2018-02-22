var $ = require('jquery'),
  React = require('react');

var NavBar = require('./NavBarComponent.js'),
  LoginPanel = require('./LoginPanelComponent.js'),
  MixList = require('./MixListComponent.js');


var App = module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },

  componentDidMount: function() {
    // Get logged in user
    $.ajax({
      url: '/auth/whoami',
      dataType: 'json',
      success: function(data) {
        if (typeof data.isNotLogged === 'undefined') {
          this.setState({user: data});
          console.log('--------- User data on client ---------');
          console.log(JSON.stringify(data));
        }
      }.bind(this),
      error: function(xhr, status, err) {
        if (xhr.status != 401) // Ignore 'unauthorized' responses before logging in
          console.error('Failed to retrieve logged user.');
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <NavBar user={this.state.user} />
        { this.state.user == null ?
          <LoginPanel />
          :
          <MixList animateIn="true"/>
        }
        <div className="credits">Image credits: w-dog.net, icons8.com</div>
      </div>
    );
  }
});
