import React, {useRef, useState} from 'react'
import Form from 'react-bootstrap/cjs/Form'
import Container from "react-bootstrap/cjs/Container";
import Button from "react-bootstrap/cjs/Button";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useHistory } from "react-router-dom";

export default function SignUp({firebase}){
    const [error, setError] = useState(null)
    const [errorOn, setErrorOn] = useState(false)
    const Email = useRef()
    const Password = useRef()
    const Username = useRef()
    const history = useHistory()
    const onSubmit= (e, Email, Password, Username) => {
        e.preventDefault();
        firebase.doCreateUserWithEmailAndPassword(Email, Password).then(authUser =>{
            return firebase
                .user(authUser.user.uid)
                .set({
                    Username,
                });

        }).then(()=>{
            history.push(ROUTES.VIDEOS)
        }).catch(error => {
            setError(error)
            setErrorOn(true)
        });

    }

    return(
        <Container className='w-100'>
        <h1 className='text-center'>Sign Up</h1>
        <Form onSubmit={(event) => onSubmit(event, Email.current.value, Password.current.value, Username.current.value) }>
            <Form.Group>
                <Form.Control type='text' placeholder='Username' ref={Username} required/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='text' placeholder='Email' ref={Email} required/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='Password' ref={Password} required minLength='6'/>
            </Form.Group>
            <Form.Group className='d-flex justify-content-center'>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form.Group>
            {errorOn &&<span className=' d-flex justify-content-center'>{error.message}</span>}


        </Form>
            <SignInLink/>
        </Container>
    )

}
const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGNIN}>Sign In</Link>
    </p>
);
