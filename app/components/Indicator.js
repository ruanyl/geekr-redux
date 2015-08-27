import React, { Component, PropTypes } from 'react';
import mui, { CircularProgress } from 'material-ui';
let ThemeManager = new mui.Styles.ThemeManager();

export default class Indicator extends Component {
  render() {
    return (
      <div className="indicator">
        { this.props.pending ?
          <CircularProgress mode="indeterminate" size={0.5} /> :
          null }
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}

Indicator.childContextTypes = {
  muiTheme: React.PropTypes.object
};
