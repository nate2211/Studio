import React, { useState, Suspense, lazy, useEffect, useMemo} from 'react'
import SignUp from "./SignUp";
import Container from "react-bootstrap/cjs/Container";
import {FirebaseContext} from "../Firebase";
import SignIn from "./SignIn";
import Card from "react-bootstrap/cjs/Card";
import {Link} from "react-router-dom";
import AuthUserContext from '../Session/context'
import {withAuthorization} from "../Session";
import VideoList from "../VideoList/VideoList";
import {useSortVideos} from "../../hooks/useSortVideos";
import {useCountRenders} from "../../hooks/useCountRenders";
import SignOut from "./SignOut";
import PasswordChange from "./PasswordChange";
function AccountMain(props){

    const [signUp, setSignUp] = useState(false)
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    const videos = useSortVideos(props.firebase, authUser.uid)
    const [videoList, setVideoList] = useState(undefined)
    useCountRenders('AccountMain')


    return (
        <Container className='w-75'>
            <h1>Account</h1>
            <Card>
                <Card.Header>Username: {authUser.Username}</Card.Header>
                <Card.Body>
                    Email: {authUser.email}
                </Card.Body>
                <Card.Footer>
                    <SignOut firebase={props.firebase}/>
                </Card.Footer>
                <Card.Footer>
                    <PasswordChange firebase={props.firebase}/>
                </Card.Footer>
            </Card>
            {videoList?<VideoList videos={videos}/>:<span>None</span>}
        </Container>)

}

const condition = authUser =>
    authUser;

export default withAuthorization(condition)(AccountMain)
