import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentGame } from '../../redux/games/games.selectors';
import { selectPlayerName } from '../../redux/player/player.selector';

const ProtectedRoute = ({
  children,
  currentGame,
  playerName,
  condition,
  redirect,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={() => {
        if (currentGame.length === 0 || !playerName) {
          return <Redirect to="/" />;
        }
        if (condition) {
          return <Redirect to={redirect} />;
        }
        return children;
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  playerName: selectPlayerName
});

export default connect(mapStateToProps)(ProtectedRoute);
