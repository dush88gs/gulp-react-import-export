import React from 'react';

export class SignInForm extends React.Component {
  gotoRegistrationForm() {
    alert("This is Registration");
  }

  render() {
    return (
      <div>
        <form role="form">
          <fieldset>
            <h2>Please Sign In</h2>
            <hr className="colorgraph"/>
            <div className="form-group">
              <input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address"/>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password"/>
            </div>
            <span className="button-checkbox">
              <button type="button" className="btn" data-color="info">Remember Me</button>
                <input type="checkbox" name="remember_me" id="remember_me" checked="checked" className="hidden"/>
              <a href="" className="btn btn-link pull-right">Forgot Password?</a>
            </span>
            <hr className="colorgraph"/>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <input type="submit" className="btn btn-lg btn-success btn-block" value="Sign In"/>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <a href="" className="btn btn-lg btn-primary btn-block" onClick={this.gotoRegistrationForm}>Register</a>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};