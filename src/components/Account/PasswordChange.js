import React,{useRef}  from 'react';
import Form from 'react-bootstrap/cjs/Form';
import Button from 'react-bootstrap/cjs/Button';
export default function PasswordChange(props) {
    const Email = useRef()
    const onSubmit = (event) => {
        props.firebase.doPasswordReset(Email.current.value).then(r => console.log(r))
        event.preventDefault()
    }
    return(<Form>
        <h1>Password Change</h1>
        <Form.Group onSubmit={(event) => onSubmit(event)}>
            <Form.Control type='text' required placeholder='Email' ref={Email}/>
        </Form.Group>
        <Button type='submit'>
            Submit
        </Button>
    </Form>)

}
