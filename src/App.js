import React, { useState, Suspense, lazy, useEffect, useCallback, useLayoutEffect} from 'react'
import './App.css';
import UploaderPage from "./components/Uploader/videoUpload";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import VideoList from "./components/VideoList/VideoList";
import VideoDetail from "./components/VideoList/VideoDetail";
import Navigation from "./components/Navigation/NavBar";
import Container from "react-bootstrap/cjs/Container";
import AccountMain from "./components/Account/AccountMain";
import SignIn from "./components/Account/SignIn"
import SignUp from "./components/Account/SignUp";
import FirebaseContext from "./components/Firebase/context";
import AuthUserContext from "./components/Session/context";
import { withAuthentication } from './components/Session';
import PasswordChange from "./components/Account/PasswordChange";
import {useCountRenders} from "./hooks/useCountRenders"


function App(props) {
    const [account, setAccount] = useState(false);
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useCountRenders('App')
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }



    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

  return (
    <Container className="App bg-light" >
      <Router>
          <Navigation/>
          <Route path={ROUTES.LANDING} exact component={(props) => (<FirebaseContext.Consumer>
              {firebase => <UploaderPage  {...props} width={width} height={height} firebase={firebase} />}
              </FirebaseContext.Consumer>
          )}/>
          <Route path={ROUTES.VIDEOS} exact component={(props) => (
              <VideoList {...props}  width={width} height={height} />
          )}/>
          <Route path={`${ROUTES.VIDEOS}/:id`}
                 component={(props) => (
              <VideoDetail {...props} width={width} height={height} />
          )}/>
          <Route path={ROUTES.ACCOUNT}
                 component={(props) => (
                     <FirebaseContext.Consumer>
                         {firebase => <AccountMain {...props} firebase={firebase} width={width} height={height} />}
                     </FirebaseContext.Consumer>
                 )}/>
          <Route path={ROUTES.SIGNUP} component={(props) => (<FirebaseContext.Consumer>
              {firebase => <SignUp {...props} width={width} height={height} firebase={firebase}/>}
              </FirebaseContext.Consumer>
          )}/>
          <Route path={ROUTES.SIGNIN} component={(props) => (<FirebaseContext.Consumer>
              {firebase => <SignIn {...props} width={width} height={height} firebase={firebase}/>}
          </FirebaseContext.Consumer>)}/>
          <Route path={ROUTES.PASSWORDCHANGE} component={(props) => (<FirebaseContext.Consumer>
              {firebase => <PasswordChange {...props} width={width} height={height} firebase={firebase}/>}
          </FirebaseContext.Consumer>)}/>

      </Router>
    </Container>
  );
}

export default withAuthentication(App);
