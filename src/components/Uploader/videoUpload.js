import React, { Component } from 'react'
import VideoForm from "./videoForm";
import {FirebaseContext, withFirebase} from "../Firebase";
import Container from "react-bootstrap/cjs/Container";

import {compose} from 'recompose'
import {withAuthorization} from '../Session/'
import AuthUserContext from "../Session/context";



class Uploader extends Component {

    render() {
        return(
            <Container>
                <h1>Upload</h1>
                <AuthUserContext.Consumer>
                    {authUser => <VideoForm firebase={this.props.firebase} width={this.props.width} height={this.props.height} authUser={authUser}/>}
                </AuthUserContext.Consumer>
            </Container>
        )
    }

}

const condition = authUser =>
    authUser;
const UploaderPage = withAuthorization(condition)(Uploader)
export default UploaderPage
