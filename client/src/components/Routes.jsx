import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './sessions/Login';

import Artists from './artists/Index';
import NewArtist from './artists/New';
import EditArtist from './artists/Edit';

// import Songs from './songs/Index';
// import NewSong from './songs/New';
// import EditSong from './songs/Edit';

function Routes ({user, setUser}){
    return (
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" render={
            renderProps => <Login
              {...renderProps}
              setUser={setUser}
            />
          }/>
          <Route exact path="/artists" render={
            renderProps => <Artists
              {...renderProps}
              user={user}
            />
          }/>
          <Route exact path="/artists/new" render={
            renderProps => <NewArtist
              {...renderProps}
              user={user}
            />
          }/>
          <Route exact path="/artists/edit" render={
            renderProps => <EditArtist
              {...renderProps}
              user={user}
            />
          }/>
          
          
          {/* <Route exact path="/songs" render={
            renderProps => <Songs
              {...renderProps}
              user={user}
            />
          }/>
          <Route exact path="/songs/new" component={NewSong}/>
          <Route exact path="/songs/edit" component={EditSong}/> */}
      </Switch>  
    );
}

export default Routes;