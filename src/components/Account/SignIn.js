import React, {useRef, useState, Component} from 'react'
import Form from 'react-bootstrap/cjs/Form'
import Container from "react-bootstrap/cjs/Container";
import Button from "react-bootstrap/cjs/Button";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import PasswordChange from "./PasswordChange";

export default function SignIn({firebase}) {
    const [error, setError] = useState(null);
    const [errorOn, setErrorOn] = useState(false);
    const Email = useRef()
    const Password = useRef()
    const history = useHistory();


    const onSubmit = (Email, Password,event) => {
        event.preventDefault();
        firebase.doSignInWithEmailAndPassword(Email.current.value, Password.current.value).then(() => {
            history.push('/videos')
        }).catch((error) => {
            setError(error)
            setErrorOn(true)

        })

    }
    return(
        <Container>
            <Form onSubmit={(event) => onSubmit(Email, Password, event )}>
                <Form.Group>
                    <Form.Control type='email' placeholder='Email' ref={Email} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' ref={Password} required/>
                </Form.Group>
                <Form.Group>
                    <Button type='sub it' variant="primary">
                        Sign In
                    </Button>
                </Form.Group>
                {errorOn &&<span className=' d-flex justify-content-center'>{error.message}</span>}
            </Form>
            <SignUpLink/>
            <PasswordChangeLink/>
        </Container>
    )

}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
    </p>
);
const PasswordChangeLink = () => (
    <p>
        <Link to={ROUTES.PASSWORDCHANGE}>Change Password</Link>
    </p>
);

