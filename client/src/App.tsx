import './App.css';
import React, { useEffect, useState } from 'react';
import EventsApiService from './services/EventsApiService';
import UsersApiService from './services/UsersApiService';
import Spinner from './components/Handling/Spinner';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Error from './components/Handling/Error';
import auth from './utils/auth';
import NavBar from './components/Navbar';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Logout from './components/User/Logout';
import Profile from './components/User/Profile';
import Events from './containers/Events/Events';
import EventDetails from './components/Event/EventDetails';
import NewEvent from './containers/Events/NewEvent';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Event } from './interfaces/Event';
import { User } from './interfaces/User';

function App() {
  const [status, setStatus] = useState(false);
  const initialEventState: Event[] = [];
  const [events, setEvents] = useState(initialEventState);
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  let email: string = '';
  let password: string = '';
  let firstName: string = '';
  let eventList: Event[] = [];
  let lastName: string = '';
  let photo: string = '';
  let host: boolean = false;
  let userTypeChosen: boolean = false;

  const initialUserState: User = {
    email,
    eventList,
    firstName,
    lastName,
    password,
    photo,
    host,
  };
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    EventsApiService.getEvents()
      .then((event: Event[]) => setEvents(event))
      .then(() => setStatus(true));
  }, []);

  const createEvent = (body: Event) => {
    EventsApiService.createEvent(body).then((event) =>
      setEvents([...events, event]),
    );
  };
  const signUpDown = (dir: string, id: string) => {
    if (dir === 'up') {
      EventsApiService.signUp(id)
        .then((updated) =>
          setEvents((events) => {
            const index: number = events.findIndex(
              (event) => event._id === updated._id,
            );
            const copy: Event[] = [...events];
            copy.splice(index, 1, updated);
            return copy;
          }),
        )
        .then(() => updateUser());
    } else {
      EventsApiService.signDown(id)
        .then((updated) =>
          setEvents((events) => {
            const index = events.findIndex(
              (event) => event._id === updated._id,
            );
            const copy = [...events];
            copy.splice(index, 1, updated);
            return copy;
          }),
        )
        .then(() => updateUser());
    }
  };
  function updateUser() {
    UsersApiService.profile().then((updated) => setUser(updated));
  }
  return (
    <div className="App">
      {!status ? (
        <Spinner />
      ) : (
        <main>
          <NavBar isAuthenticated={isAuthenticated} user={user} />
          <AnimatePresence>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/register"
                render={(props) => (
                  <Register
                    {...props}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} setIsAuthenticated={setIsAuthenticated} />
                )}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <Logout {...props} setIsAuthenticated={setIsAuthenticated} />
                )}
              />
              <Route
                path="/new-event"
                render={() => (
                  <NewEvent createEvent={createEvent} user={user} />
                )}
              />
              <Route
                path="/profile"
                render={() => <Profile user={user} setUser={setUser} />}
              />
              {/* <Route path='/my-events' exact render={() => (
                <MyEvents user={user} />)} /> */}

              <Route
                path="/events"
                exact
                render={() => <Events events={events} />}
              />
              <Route
                path="/events/:id"
                render={() => (
                  <EventDetails
                    events={events}
                    signUpDown={signUpDown}
                    user={user}
                  />
                )}
              />
              {/* <Route path='/users/:id' exact component={UserDetails}/> */}
              <Route component={Error} />
            </Switch>
          </AnimatePresence>
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
